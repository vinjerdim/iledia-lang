'use strict';

/* ============================================================
   app.js — Application logic for MPI 2
   English: Place, Quantity & Time

   Shared utilities (esc, shuffle, the ordering helpers, showNotice,
   buildFeedbackBox, the stage machine, the exercise stage, the store)
   live in shared/engine.js.

   Sections:
    1.  Constants
    2.  State & storage
    3.  Navigation
    4.  Render dispatcher
    5.  Stage: Orientation
    6.  Stage: Notice It
    7.  Stage: Your Questions
    8.  Stage: Evidence Board
    9.  Stage: Pattern Lab
    10. Stage: Test Your Rules
    11. Stage: Describe Your Workshop
    12. Stage: Reflection
    13. Stage: Results
    14. Helpers
    15. Reset & init
   ============================================================ */

/* ============================================================
   1. CONSTANTS
   ============================================================ */

var STAGES = [
  'orientation',
  'noticeIt',
  'questions',
  'evidence',
  'patternLab',
  'verification',
  'generalization',
  'reflection',
  'results',
];

var STAGE_LABELS = [
  'Orientation',
  'Notice It',
  'Your Questions',
  'Evidence Board',
  'Pattern Lab',
  'Test Your Rules',
  'Describe Your Workshop',
  'Reflection',
  'Results',
];

var STORAGE_KEY = 'eng-place-quantity-time-v1';

/* Enough markers for the longest option list any stage shows. */
var OPTION_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

/* ============================================================
   2. STATE & STORAGE
   ============================================================ */

var State = {
  currentStage: 'orientation',
  completedStages: {},

  /* Stage 2 — Notice It */
  noticeMarked: {},
  noticeChecked: false,

  /* Stage 3 — Your Questions */
  questionOrder: [],
  selectedQuestions: {},
  ownQuestion: '',
  questionsSubmitted: false,

  /* Stage 4 — Evidence Board */
  evidenceOrder: [],
  evidencePlacement: {},
  evidencePicked: null,
  evidenceChecked: false,

  /* Stage 5 — Pattern Lab */
  patternOptionOrder: {},
  patternRuleOrder: {},
  patternAnswers: {},
  patternTableDone: {},
  patternFirstTry: {},
  patternRules: {},

  /* Stage 6 — Test Your Rules */
  verificationOptionOrder: {},
  verificationIdx: 0,
  verificationExercises: [],

  /* Stage 7 — Describe Your Workshop */
  builderIdx: 0,
  builderPools: {},
  builderPlaced: {},
  builderChecked: {},
  builderFirstTry: {},
  ownWriting: '',
  rubricChecked: {},

  /* Stage 8 — Reflection */
  reflectionAnswers: {},
  confidence: null,

  /* Collected across stages 6 and 7 */
  mistakes: [],
};

var store = createStore({ key: STORAGE_KEY, state: State });
var saveState = store.save;

var mistakeLog = createMistakeLog(State);

/*
 * Builds every array/map whose shape depends on DATA. Called at start-up
 * and again after a reset, so a data file that gains a question does not
 * leave a stale array behind.
 *
 * This is also where every list a learner answers from is shuffled. Each
 * order is stored in State rather than re-rolled per render: an option
 * that moves while it is being read is a usability bug, and a reload must
 * not hand the learner a second, easier arrangement of the same question.
 */
function initDerivedState() {
  ensureExerciseArray(State, 'verificationExercises', DATA.verification.soal, defaultExerciseEntry);

  /* The investigation questions are written pattern-first in data.js,
     which would quietly tell the learner which ones "count". */
  State.questionOrder = keepShuffledOrder(
    State.questionOrder,
    idsOf(DATA.problemStatement.candidates)
  );

  /* The evidence cards arrive grouped by bucket in data.js, which would
     give the answer away, so the tray order is shuffled. */
  State.evidenceOrder = keepShuffledOrder(State.evidenceOrder, idsOf(DATA.evidence.cards));

  DATA.patternLab.tables.forEach(function (t) {
    /* The dropdown lists the answers in the order the rows need them —
       first row first — so an unshuffled select is a free answer key. */
    State.patternOptionOrder[t.id] = keepShuffledOrder(State.patternOptionOrder[t.id], t.options);

    /* Same for the rule statements: the correct one is written first in
       every table, so an unshuffled list would answer itself. */
    State.patternRuleOrder[t.id] = keepShuffledOrder(
      State.patternRuleOrder[t.id],
      idsOf(t.rule.options)
    );
  });

  /* The exercise stage renders `s.options` straight from DATA, so the
     shuffle is applied to that array itself before the first render. The
     A/B/C markers are positional and the answer is matched by id, so
     reordering here changes nothing but what the learner sees. */
  DATA.verification.soal.forEach(function (s) {
    if (!s.options) return;
    State.verificationOptionOrder[s.id] = keepShuffledOrder(
      State.verificationOptionOrder[s.id],
      idsOf(s.options)
    );
    s.options = orderByIds(s.options, State.verificationOptionOrder[s.id]);
  });

  /* The word bank holds the sentence in order plus its distractors, so it
     has to be shuffled before it is ever shown. */
  DATA.generalization.builder.forEach(function (b) {
    var pool = State.builderPools[b.id];
    if (!Array.isArray(pool) || pool.length !== b.parts.length + b.distractors.length) {
      State.builderPools[b.id] = shuffle(b.parts.concat(b.distractors));
    }
    if (!Array.isArray(State.builderPlaced[b.id])) State.builderPlaced[b.id] = [];
  });
}

/* ============================================================
   3. NAVIGATION
   ============================================================ */

var machine = createStageMachine({
  stages: STAGES,
  stageLabels: STAGE_LABELS,
  state: State,
  save: saveState,
  render: function () {
    renderCurrentStage();
  },
});

var navigateTo = machine.navigateTo;
var completeStage = machine.completeStage;

/* Marks the current stage done and moves on — the pattern every
   "continue" button at the foot of a stage uses. */
function finishStage(stageId) {
  var idx = STAGES.indexOf(stageId);
  completeStage(stageId);
  navigateTo(STAGES[idx + 1]);
}

/* ============================================================
   4. RENDER DISPATCHER
   ============================================================ */

var STAGE_RENDERERS = {
  orientation: renderOrientation,
  noticeIt: renderNoticeIt,
  questions: renderQuestions,
  evidence: renderEvidence,
  patternLab: renderPatternLab,
  verification: renderVerification,
  generalization: renderGeneralization,
  reflection: renderReflection,
  results: renderResults,
};

function renderCurrentStage() {
  var container = document.getElementById('stageContainer');
  if (!container) return;
  var renderer = STAGE_RENDERERS[State.currentStage];
  if (!renderer) {
    container.innerHTML = '<div class="panel"><p>Unknown stage.</p></div>';
    return;
  }
  renderer(container);
}

/* Wraps a stage body in its <section> and heading. */
function stageShell(label, kicker, goal, bodyHTML) {
  return (
    '<section aria-label="' +
    esc(label) +
    '">' +
    buildStageHead(kicker, goal) +
    bodyHTML +
    '</section>'
  );
}

/* ============================================================
   5. STAGE: ORIENTATION
   ============================================================ */

function renderOrientation(container) {
  var D = DATA.orientation;

  var objectivesHTML = D.objectives
    .map(function (o, i) {
      return (
        '<li><span class="objectives-list__num">' + (i + 1) + '</span><span>' + o + '</span></li>'
      );
    })
    .join('');

  var stepsHTML = D.steps
    .map(function (s, i) {
      return (
        '<div class="hero-steps__item">' +
        '<span class="hero-steps__num">' +
        (i + 1) +
        '</span><span>' +
        s +
        '</span></div>'
      );
    })
    .join('');

  var topicsHTML = DATA.meta.subTopics
    .map(function (t) {
      return '<li>' + t + '</li>';
    })
    .join('');

  container.innerHTML = stageShell(
    'Orientation',
    D.kicker,
    D.goal,
    '<div class="panel panel--hero">' +
      '<h2>' +
      esc(DATA.meta.title) +
      '</h2>' +
      '<p><strong>Learning objective:</strong> ' +
      DATA.meta.objective +
      '</p>' +
      '<ul>' +
      topicsHTML +
      '</ul>' +
      '<div class="scenario-box">' +
      '<span class="scenario-box__label">' +
      esc(D.scenarioLabel) +
      '</span>' +
      '<p class="scenario-box__text">' +
      D.scenario +
      '</p></div>' +
      '<p>' +
      D.lead +
      '</p>' +
      '</div>' +
      '<div class="panel">' +
      '<h3>By the end you will be able to</h3>' +
      '<ul class="objectives-list">' +
      objectivesHTML +
      '</ul></div>' +
      '<div class="panel">' +
      '<h3>How this module runs</h3>' +
      '<div class="hero-steps">' +
      stepsHTML +
      '</div>' +
      '<p style="font-size:0.85rem;color:var(--color-ink-muted);margin:0;">' +
      esc(D.note) +
      '</p></div>' +
      '<div class="btn-group btn-group--end">' +
      '<button type="button" class="btn btn--primary btn--large" id="orientNextBtn">' +
      'Start discovering &rarr;</button></div>'
  );

  document.getElementById('orientNextBtn').addEventListener('click', function () {
    finishStage('orientation');
  });
}

/* ============================================================
   6. STAGE: NOTICE IT  (stimulation)
   ============================================================ */

/* A stable key for one token, so marks survive a reload. */
function noticeKey(li, ti) {
  return 'l' + li + '-' + ti;
}

function noticeTargets() {
  var out = [];
  DATA.noticeIt.text.forEach(function (line, li) {
    line.forEach(function (tok, ti) {
      if (typeof tok === 'object' && tok.w) out.push(noticeKey(li, ti));
    });
  });
  return out;
}

function noticeScore() {
  var targets = noticeTargets();
  var hits = targets.filter(function (k) {
    return State.noticeMarked[k];
  }).length;
  return { hits: hits, total: targets.length };
}

function renderNoticeIt(container) {
  var D = DATA.noticeIt;
  var checked = State.noticeChecked;

  var textHTML = D.text
    .map(function (line, li) {
      var inner = line
        .map(function (tok, ti) {
          if (typeof tok === 'string') return esc(tok);
          var key = noticeKey(li, ti);
          var marked = !!State.noticeMarked[key];
          var cls = 'notice-token';
          if (checked) {
            cls += marked ? ' is-hit' : ' is-miss';
          } else if (marked) {
            cls += ' is-marked';
          }
          return (
            '<button type="button" class="' +
            cls +
            '" data-notice-key="' +
            key +
            '"' +
            (checked ? ' disabled' : '') +
            ' aria-pressed="' +
            (marked ? 'true' : 'false') +
            '">' +
            esc(tok.w) +
            '</button>'
          );
        })
        .join('');
      return '<p class="notice-text__line">' + inner + '</p>';
    })
    .join('');

  var score = noticeScore();

  var feedbackHTML = '';
  var actionHTML = '';

  if (checked) {
    var teaserHTML = D.familyTeaser
      .map(function (t) {
        return '<li>' + t + '</li>';
      })
      .join('');
    feedbackHTML =
      buildFeedbackBox(
        'info',
        '&#128269;',
        '<strong>You marked ' +
          score.hits +
          ' of the ' +
          score.total +
          ' working words.</strong> ' +
          'The ones you walked past are outlined in red above.'
      ) +
      '<div class="panel panel--info" style="margin-top:var(--space-4);">' +
      '<h3>' +
      esc(D.debriefTitle) +
      '</h3><p>' +
      D.debrief +
      '</p><ul>' +
      teaserHTML +
      '</ul></div>';
    actionHTML =
      '<div class="btn-group btn-group--end">' +
      '<button type="button" class="btn btn--primary btn--large" id="noticeNextBtn">' +
      'Ask my questions &rarr;</button></div>';
  } else {
    var markedCount = Object.keys(State.noticeMarked).filter(function (k) {
      return State.noticeMarked[k];
    }).length;
    feedbackHTML =
      '<p class="notice-tally">You have marked <strong>' +
      markedCount +
      '</strong> word' +
      (markedCount === 1 ? '' : 's') +
      '. Mark at least ' +
      D.minFound +
      ' before you check.</p>';
    actionHTML =
      '<div class="btn-group btn-group--end">' +
      '<button type="button" class="btn btn--primary" id="noticeCheckBtn">' +
      'Check what I noticed</button></div>';
  }

  container.innerHTML = stageShell(
    'Notice It',
    D.kicker,
    D.goal,
    '<div class="panel">' +
      '<p style="font-size:0.88rem;color:var(--color-ink-muted);">' +
      D.instruction +
      '</p>' +
      '<div class="info-board">' +
      '<span class="info-board__label">Workshop 3 &middot; Information board</span>' +
      '<div class="notice-text">' +
      textHTML +
      '</div></div>' +
      feedbackHTML +
      '</div>' +
      actionHTML
  );

  container.querySelectorAll('[data-notice-key]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var key = btn.dataset.noticeKey;
      State.noticeMarked[key] = !State.noticeMarked[key];
      saveState();
      renderNoticeIt(container);
    });
  });

  var checkBtn = document.getElementById('noticeCheckBtn');
  if (checkBtn) {
    checkBtn.addEventListener('click', function () {
      var marked = Object.keys(State.noticeMarked).filter(function (k) {
        return State.noticeMarked[k];
      }).length;
      if (marked < D.minFound) {
        showNotice('Mark at least ' + D.minFound + ' words before checking.');
        return;
      }
      State.noticeChecked = true;
      saveState();
      renderNoticeIt(container);
    });
  }

  var nextBtn = document.getElementById('noticeNextBtn');
  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      finishStage('noticeIt');
    });
  }
}

/* ============================================================
   7. STAGE: YOUR QUESTIONS  (problem statement)
   ============================================================ */

/* The candidates in their shuffled order, so the pattern questions do not
   simply sit at the top of the list. */
function questionCandidates() {
  return orderByIds(DATA.problemStatement.candidates, State.questionOrder || []);
}

function renderQuestions(container) {
  var D = DATA.problemStatement;
  var submitted = State.questionsSubmitted;

  var listHTML = questionCandidates()
    .map(function (q, i) {
      var selected = !!State.selectedQuestions[q.id];
      var cls = 'option-btn';
      if (selected) cls += ' is-selected';
      if (submitted) cls += ' is-disabled';
      var noteHTML =
        submitted && selected && q.note
          ? '<span class="hypothesis-note">' + esc(q.note) + '</span>'
          : '';
      return (
        '<button type="button" class="' +
        cls +
        '" data-question-id="' +
        esc(q.id) +
        '"' +
        (submitted ? ' disabled' : '') +
        ' aria-pressed="' +
        (selected ? 'true' : 'false') +
        '">' +
        '<span class="option-btn__marker" aria-hidden="true">' +
        (selected ? '&#10003;' : i + 1) +
        '</span>' +
        '<span class="option-btn__text">' +
        q.text +
        noteHTML +
        '</span></button>'
      );
    })
    .join('');

  var selectedIds = Object.keys(State.selectedQuestions).filter(function (k) {
    return State.selectedQuestions[k];
  });

  var feedbackHTML = '';
  var actionHTML = '';

  if (submitted) {
    var offFocus = selectedIds.filter(function (id) {
      var q = findById(D.candidates, id);
      return q && !q.focus;
    });
    feedbackHTML = buildFeedbackBox(
      offFocus.length ? 'warning' : 'success',
      offFocus.length ? '&#128161;' : '&#10003;',
      offFocus.length ? D.feedbackMixed : D.feedbackFocus
    );
    actionHTML =
      '<div class="btn-group btn-group--end">' +
      '<button type="button" class="btn btn--primary btn--large" id="questionsNextBtn">' +
      esc(D.nextButtonLabel) +
      '</button></div>';
  } else {
    actionHTML =
      '<div class="btn-group btn-group--end">' +
      '<button type="button" class="btn btn--primary" id="questionsSubmitBtn">' +
      'These are my questions</button></div>';
  }

  container.innerHTML = stageShell(
    'Your Questions',
    D.kicker,
    D.goal,
    '<div class="panel">' +
      '<p style="font-size:0.88rem;color:var(--color-ink-muted);">' +
      D.instruction +
      '</p>' +
      '<div class="options-list">' +
      listHTML +
      '</div>' +
      '<div class="field-group" style="margin-top:var(--space-5);">' +
      '<label for="ownQuestion">' +
      esc(D.ownQuestionLabel) +
      '</label>' +
      '<p class="field-hint">' +
      esc(D.ownQuestionHint) +
      '</p>' +
      '<textarea id="ownQuestion" class="input-textarea" rows="3" placeholder="' +
      esc(D.ownQuestionPlaceholder) +
      '"' +
      (submitted ? ' readonly' : '') +
      '>' +
      esc(State.ownQuestion) +
      '</textarea></div>' +
      feedbackHTML +
      '</div>' +
      actionHTML
  );

  container.querySelectorAll('[data-question-id]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var id = btn.dataset.questionId;
      State.selectedQuestions[id] = !State.selectedQuestions[id];
      saveState();
      renderQuestions(container);
    });
  });

  var ta = document.getElementById('ownQuestion');
  if (ta && !submitted) {
    ta.addEventListener('input', function () {
      State.ownQuestion = ta.value;
      saveState();
    });
  }

  var submitBtn = document.getElementById('questionsSubmitBtn');
  if (submitBtn) {
    submitBtn.addEventListener('click', function () {
      if (selectedIds.length < D.minSelected) {
        showNotice('Choose at least ' + D.minSelected + ' questions first.');
        return;
      }
      State.questionsSubmitted = true;
      saveState();
      renderQuestions(container);
    });
  }

  var nextBtn = document.getElementById('questionsNextBtn');
  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      finishStage('questions');
    });
  }
}

/* ============================================================
   8. STAGE: EVIDENCE BOARD  (data collection)
   ============================================================ */

function evidenceScore() {
  var correct = DATA.evidence.cards.filter(function (c) {
    return State.evidencePlacement[c.id] === c.bucket;
  }).length;
  return { correct: correct, total: DATA.evidence.cards.length };
}

/* The cards in the shuffled tray order, so a learner cannot read the
   grouping off the order they were written in. */
function evidenceCards() {
  return orderByIds(DATA.evidence.cards, State.evidenceOrder || []);
}

function renderEvidence(container) {
  var D = DATA.evidence;
  var checked = State.evidenceChecked;
  var cards = evidenceCards();

  var unplaced = cards.filter(function (c) {
    return !State.evidencePlacement[c.id];
  });

  function cardHTML(card, placed) {
    var cls = 'evidence-card';
    if (!placed && State.evidencePicked === card.id) cls += ' is-picked';
    if (checked && placed) {
      cls += State.evidencePlacement[card.id] === card.bucket ? ' is-right' : ' is-wrong';
    }
    return (
      '<button type="button" class="' +
      cls +
      '" data-card-id="' +
      esc(card.id) +
      '"' +
      (checked ? ' disabled' : '') +
      '>' +
      card.text +
      '</button>'
    );
  }

  var trayHTML = unplaced.length
    ? unplaced
        .map(function (c) {
          return cardHTML(c, false);
        })
        .join('')
    : '<p class="evidence-tray__empty">Every card is on a board.</p>';

  var boardsHTML = D.buckets
    .map(function (b) {
      var inBucket = cards.filter(function (c) {
        return State.evidencePlacement[c.id] === b.id;
      });
      var dropCls = 'evidence-bucket__drop';
      if (State.evidencePicked && !checked) dropCls += ' is-ready';
      return (
        '<div class="evidence-bucket">' +
        '<div class="evidence-bucket__head">' +
        '<span class="evidence-bucket__name">' +
        b.name +
        '</span>' +
        '<span class="evidence-bucket__clue">' +
        b.clue +
        '</span></div>' +
        '<button type="button" class="' +
        dropCls +
        '" data-bucket-id="' +
        esc(b.id) +
        '"' +
        (checked || !State.evidencePicked ? ' disabled' : '') +
        '>' +
        (State.evidencePicked && !checked
          ? 'Drop the card here'
          : inBucket.length + ' card' + (inBucket.length === 1 ? '' : 's')) +
        '</button>' +
        '<div class="evidence-bucket__cards">' +
        inBucket
          .map(function (c) {
            return cardHTML(c, true);
          })
          .join('') +
        '</div></div>'
      );
    })
    .join('');

  var feedbackHTML = '';
  var actionHTML = '';

  if (checked) {
    var sc = evidenceScore();
    var perfect = sc.correct === sc.total;
    feedbackHTML = buildFeedbackBox(
      perfect ? 'success' : 'warning',
      perfect ? '&#10003;' : '&#128161;',
      '<strong>' +
        sc.correct +
        ' of ' +
        sc.total +
        ' cards are on the right board.</strong> ' +
        (perfect ? D.perfectFeedback : D.partialFeedback)
    );
    actionHTML =
      '<div class="btn-group btn-group--spread">' +
      '<button type="button" class="btn btn--ghost" id="evidenceRedoBtn">Sort again</button>' +
      '<button type="button" class="btn btn--primary btn--large" id="evidenceNextBtn">' +
      'Read the pattern &rarr;</button></div>';
  } else {
    actionHTML =
      '<div class="btn-group btn-group--end">' +
      '<button type="button" class="btn btn--primary" id="evidenceCheckBtn">' +
      esc(D.checkLabel) +
      '</button></div>';
  }

  container.innerHTML = stageShell(
    'Evidence Board',
    D.kicker,
    D.goal,
    '<div class="panel">' +
      '<p style="font-size:0.88rem;color:var(--color-ink-muted);">' +
      D.instruction +
      '</p>' +
      '<div class="evidence-tray" aria-label="Cards still to sort">' +
      '<span class="evidence-tray__label">Cards to sort (' +
      unplaced.length +
      ')</span>' +
      '<div class="evidence-tray__cards">' +
      trayHTML +
      '</div></div>' +
      '<div class="evidence-board">' +
      boardsHTML +
      '</div>' +
      feedbackHTML +
      '</div>' +
      actionHTML
  );

  container.querySelectorAll('[data-card-id]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var id = btn.dataset.cardId;
      if (State.evidencePlacement[id]) {
        /* A card already on a board goes back to the tray. */
        delete State.evidencePlacement[id];
        State.evidencePicked = id;
      } else {
        State.evidencePicked = State.evidencePicked === id ? null : id;
      }
      saveState();
      renderEvidence(container);
    });
  });

  container.querySelectorAll('[data-bucket-id]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (!State.evidencePicked) return;
      State.evidencePlacement[State.evidencePicked] = btn.dataset.bucketId;
      State.evidencePicked = null;
      saveState();
      renderEvidence(container);
    });
  });

  var checkBtn = document.getElementById('evidenceCheckBtn');
  if (checkBtn) {
    checkBtn.addEventListener('click', function () {
      if (unplaced.length > 0) {
        showNotice(D.allPlacedMessage);
        return;
      }
      State.evidenceChecked = true;
      State.evidencePicked = null;
      saveState();
      renderEvidence(container);
    });
  }

  var redoBtn = document.getElementById('evidenceRedoBtn');
  if (redoBtn) {
    redoBtn.addEventListener('click', function () {
      /* Only the cards on the wrong board go back, so a learner does not
         have to re-sort the ones they already placed correctly. */
      DATA.evidence.cards.forEach(function (c) {
        if (State.evidencePlacement[c.id] !== c.bucket) delete State.evidencePlacement[c.id];
      });
      State.evidenceChecked = false;
      saveState();
      renderEvidence(container);
    });
  }

  var nextBtn = document.getElementById('evidenceNextBtn');
  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      finishStage('evidence');
    });
  }
}

/* ============================================================
   9. STAGE: PATTERN LAB  (data processing)
   ============================================================ */

function patternKey(tableId, rowIdx) {
  return tableId + '-' + rowIdx;
}

function patternTableCorrect(table) {
  return table.rows.every(function (row, i) {
    return State.patternAnswers[patternKey(table.id, i)] === row.answer;
  });
}

function patternTableFilled(table) {
  return table.rows.every(function (row, i) {
    return !!State.patternAnswers[patternKey(table.id, i)];
  });
}

function patternScore() {
  var correct = 0;
  var total = 0;
  DATA.patternLab.tables.forEach(function (t) {
    var first = State.patternFirstTry[t.id];
    total += t.rows.length + 1; /* rows plus the rule statement */
    if (first) correct += first.correct;
    if (State.patternRules[t.id] === t.rule.correct) correct += 1;
  });
  return { correct: correct, total: total };
}

function renderPatternLab(container) {
  var D = DATA.patternLab;

  var tablesHTML = D.tables
    .map(function (table) {
      var done = !!State.patternTableDone[table.id];
      var headHTML = table.headers
        .map(function (h) {
          return '<th scope="col">' + h + '</th>';
        })
        .join('');

      /* The answers are offered in their shuffled order, the same one on
         every row, so the dropdown cannot be read as an answer key. */
      var tableOptions = State.patternOptionOrder[table.id] || table.options;

      var rowsHTML = table.rows
        .map(function (row, i) {
          var key = patternKey(table.id, i);
          var value = State.patternAnswers[key] || '';
          var cellState = '';
          if (done) {
            cellState = value === row.answer ? ' is-right' : ' is-wrong';
          }
          var optionsHTML = ['<option value="">— choose —</option>']
            .concat(
              tableOptions.map(function (o) {
                return (
                  '<option value="' +
                  esc(o) +
                  '"' +
                  (o === value ? ' selected' : '') +
                  '>' +
                  esc(o) +
                  '</option>'
                );
              })
            )
            .join('');
          var labelCells =
            '<td>' + row.label + '</td>' + (row.label2 ? '<td>' + row.label2 + '</td>' : '');
          return (
            '<tr>' +
            labelCells +
            '<td class="pattern-table__answer' +
            cellState +
            '">' +
            '<select class="input-select" data-pattern-key="' +
            key +
            '" aria-label="Answer for ' +
            esc(stripTags(row.label)) +
            '"' +
            (done && patternTableCorrect(table) ? ' disabled' : '') +
            '>' +
            optionsHTML +
            '</select></td></tr>'
          );
        })
        .join('');

      /* The rule statement only unlocks once the table itself is right —
         a rule read off a wrong table would teach the wrong pattern. */
      var unlocked = done && patternTableCorrect(table);
      var chosenRule = State.patternRules[table.id];

      var ruleHTML = '';
      if (unlocked) {
        var ruleOptions = orderByIds(table.rule.options, State.patternRuleOrder[table.id] || []);
        var optionsListHTML = ruleOptions
          .map(function (opt, i) {
            var cls = 'option-btn';
            if (chosenRule) {
              cls += ' is-disabled';
              if (opt.id === table.rule.correct) cls += ' is-correct';
              else if (opt.id === chosenRule) cls += ' is-selected-wrong';
              else cls += ' is-incorrect-choice';
            }
            return (
              '<button type="button" class="' +
              cls +
              '" data-rule-table="' +
              esc(table.id) +
              '" data-rule-opt="' +
              esc(opt.id) +
              '"' +
              (chosenRule ? ' disabled' : '') +
              '>' +
              '<span class="option-btn__marker" aria-hidden="true">' +
              OPTION_LETTERS[i] +
              '</span>' +
              '<span class="option-btn__text">' +
              opt.label +
              '</span></button>'
            );
          })
          .join('');
        ruleHTML =
          '<div class="rule-choice">' +
          '<p class="question-text-main">' +
          esc(table.rule.question) +
          '</p>' +
          '<div class="options-list">' +
          optionsListHTML +
          '</div>' +
          (chosenRule
            ? buildFeedbackBox(
                chosenRule === table.rule.correct ? 'success' : 'error',
                chosenRule === table.rule.correct ? '&#10003;' : '&#10007;',
                '<span class="explanation-text">' + table.rule.explanation + '</span>'
              )
            : '') +
          '</div>';
      }

      var tableFeedback = '';
      if (done) {
        tableFeedback = patternTableCorrect(table)
          ? buildFeedbackBox('success', '&#10003;', D.tableCorrectFeedback)
          : buildFeedbackBox('error', '&#10007;', D.tableWrongFeedback);
      }

      var checkBtnHTML =
        done && patternTableCorrect(table)
          ? ''
          : '<div class="btn-group btn-group--end">' +
            '<button type="button" class="btn btn--primary btn--small" data-check-table="' +
            esc(table.id) +
            '">Check this table</button></div>';

      return (
        '<div class="panel">' +
        '<h3>' +
        table.title +
        '</h3>' +
        '<div class="pattern-table-wrap">' +
        '<table class="pattern-table"><thead><tr>' +
        headHTML +
        '</tr></thead><tbody>' +
        rowsHTML +
        '</tbody></table></div>' +
        checkBtnHTML +
        tableFeedback +
        ruleHTML +
        '</div>'
      );
    })
    .join('');

  var allRulesDone = DATA.patternLab.tables.every(function (t) {
    return State.patternTableDone[t.id] && patternTableCorrect(t) && State.patternRules[t.id];
  });

  var actionHTML = allRulesDone
    ? '<div class="btn-group btn-group--end">' +
      '<button type="button" class="btn btn--primary btn--large" id="patternNextBtn">' +
      esc(D.nextButtonLabel) +
      '</button></div>'
    : '<p class="context-note">Complete all four tables and state each rule to continue.</p>';

  container.innerHTML = stageShell(
    'Pattern Lab',
    D.kicker,
    D.goal,
    '<div class="panel panel--info">' +
      '<p style="margin:0;font-size:0.9rem;">' +
      D.instruction +
      '</p></div>' +
      tablesHTML +
      actionHTML
  );

  container.querySelectorAll('[data-pattern-key]').forEach(function (sel) {
    sel.addEventListener('change', function () {
      State.patternAnswers[sel.dataset.patternKey] = sel.value;
      saveState();
    });
  });

  container.querySelectorAll('[data-check-table]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var table = findById(DATA.patternLab.tables, btn.dataset.checkTable);
      if (!patternTableFilled(table)) {
        showNotice(D.incompleteMessage);
        return;
      }
      /* Only the first attempt counts towards the score. */
      if (!State.patternFirstTry[table.id]) {
        State.patternFirstTry[table.id] = {
          correct: table.rows.filter(function (row, i) {
            return State.patternAnswers[patternKey(table.id, i)] === row.answer;
          }).length,
          total: table.rows.length,
        };
      }
      State.patternTableDone[table.id] = true;
      saveState();
      renderPatternLab(container);
    });
  });

  container.querySelectorAll('[data-rule-opt]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var tableId = btn.dataset.ruleTable;
      if (State.patternRules[tableId]) return;
      State.patternRules[tableId] = btn.dataset.ruleOpt;
      saveState();
      renderPatternLab(container);
    });
  });

  var nextBtn = document.getElementById('patternNextBtn');
  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      finishStage('patternLab');
    });
  }
}

/* ============================================================
   10. STAGE: TEST YOUR RULES  (verification)
   ============================================================ */

var verificationStage = createExerciseStage({
  soal: DATA.verification.soal,
  idPrefix: 'vf',
  sectionLabel: 'Test Your Rules',
  kicker: DATA.verification.kicker,
  goal: DATA.verification.goal,
  instruction: DATA.verification.instruction,
  nextButtonLabel: DATA.verification.nextButtonLabel,
  letters: OPTION_LETTERS,
  getExercises: function () {
    return State.verificationExercises;
  },
  getIndex: function () {
    return State.verificationIdx;
  },
  setIndex: function (i) {
    State.verificationIdx = i;
  },
  save: saveState,
  inputPlaceholder: 'type here',
  inputAriaLabel: 'Your answer',
  renderPrompt: function (s) {
    return (
      '<div class="question-number-label">Question ' +
      (DATA.verification.soal.indexOf(s) + 1) +
      ' &middot; ' +
      esc(ruleName(s.rule)) +
      '</div>' +
      '<div class="scenario-box">' +
      '<span class="scenario-box__label">Situation</span>' +
      '<p class="scenario-box__text">' +
      s.scenario +
      '</p></div>' +
      '<p class="question-text-main">' +
      s.question +
      '</p>' +
      '<p class="sentence-stem">' +
      s.stem +
      '</p>'
    );
  },
  onAnswered: function (s, ex) {
    if (ex.correct) return;
    mistakeLog.record({
      stage: 'verification',
      stageLabel: 'Test Your Rules',
      questionId: s.id,
      label: stripTags(s.stem),
      yourAnswer: ex.chosen ? stripTags(optionLabel(s, ex.chosen)) : ex.userInput || '(revealed)',
      correctAnswer: stripTags(
        s.type === 'choice'
          ? optionLabel(s, s.correct)
          : Array.isArray(s.answer)
            ? s.answer[0]
            : s.answer
      ),
      explanation: s.explanation,
    });
  },
  onFinish: function () {
    finishStage('verification');
  },
});

function renderVerification(container) {
  verificationStage.render(container);
}

/* ============================================================
   11. STAGE: DESCRIBE YOUR WORKSHOP  (generalisation)
   ============================================================ */

function builderSentence(b) {
  var pool = State.builderPools[b.id] || [];
  return (State.builderPlaced[b.id] || []).map(function (idx) {
    return pool[idx];
  });
}

function builderIsCorrect(b) {
  var placed = builderSentence(b);
  if (placed.length !== b.parts.length) return false;
  return placed.every(function (w, i) {
    return w === b.parts[i];
  });
}

function builderScore() {
  var correct = DATA.generalization.builder.filter(function (b) {
    return State.builderFirstTry[b.id] === true;
  }).length;
  return { correct: correct, total: DATA.generalization.builder.length };
}

function renderGeneralization(container) {
  var D = DATA.generalization;
  var b = D.builder[State.builderIdx];
  var pool = State.builderPools[b.id] || [];
  var placed = State.builderPlaced[b.id] || [];
  var checked = State.builderChecked[b.id];
  var correct = checked && builderIsCorrect(b);

  var slotHTML = placed.length
    ? placed
        .map(function (poolIdx, pos) {
          return (
            '<button type="button" class="placed-chip" data-remove-pos="' +
            pos +
            '"' +
            (correct ? ' disabled' : '') +
            ' aria-label="Remove ' +
            esc(pool[poolIdx]) +
            '">' +
            esc(pool[poolIdx]) +
            '</button>'
          );
        })
        .join('')
    : '<span class="sentence-slot__placeholder">Click the words below to build the sentence…</span>';

  var bankHTML = pool
    .map(function (word, idx) {
      var used = placed.indexOf(idx) !== -1;
      return (
        '<button type="button" class="word-chip' +
        (used ? ' is-used' : '') +
        '" data-word-idx="' +
        idx +
        '"' +
        (used || correct ? ' disabled' : '') +
        '>' +
        esc(word) +
        '</button>'
      );
    })
    .join('');

  var feedbackHTML = '';
  if (checked) {
    feedbackHTML = correct
      ? buildFeedbackBox('success', '&#10003;', '<strong>' + esc(D.builderCorrect) + '</strong>')
      : buildFeedbackBox(
          'error',
          '&#10007;',
          esc(D.builderWrong) + ' <span class="explanation-text">' + esc(b.hint) + '</span>'
        );
  }

  var navHTML = '';
  if (correct) {
    navHTML =
      State.builderIdx < D.builder.length - 1
        ? '<div class="btn-group btn-group--end">' +
          '<button type="button" class="btn btn--primary" id="builderNextBtn">' +
          'Next sentence &rarr;</button></div>'
        : '';
  } else {
    navHTML =
      '<div class="btn-group btn-group--end">' +
      (checked
        ? '<button type="button" class="btn btn--ghost" id="builderResetBtn">Clear</button>'
        : '') +
      '<button type="button" class="btn btn--primary" id="builderCheckBtn">Check sentence</button>' +
      '</div>';
  }

  var allBuilt = D.builder.every(function (item) {
    return State.builderChecked[item.id] && builderIsCorrect(item);
  });

  var writingHTML = '';
  if (allBuilt) {
    var rubricHTML = D.rubric
      .map(function (r) {
        var on = !!State.rubricChecked[r.id];
        return (
          '<button type="button" class="rubric-item' +
          (on ? ' is-checked' : '') +
          '" data-rubric-id="' +
          esc(r.id) +
          '" aria-pressed="' +
          (on ? 'true' : 'false') +
          '">' +
          '<span class="rubric-item__box" aria-hidden="true">' +
          (on ? '&#10003;' : '') +
          '</span>' +
          '<span>' +
          r.text +
          '</span></button>'
        );
      })
      .join('');

    writingHTML =
      '<div class="panel">' +
      '<h3>' +
      esc(D.writeTitle) +
      '</h3>' +
      '<p style="font-size:0.9rem;">' +
      D.writeInstruction +
      '</p>' +
      '<div class="field-group">' +
      '<label for="ownWriting">' +
      esc(D.writeLabel) +
      '</label>' +
      '<textarea id="ownWriting" class="input-textarea" rows="7" placeholder="' +
      esc(D.writePlaceholder) +
      '">' +
      esc(State.ownWriting) +
      '</textarea>' +
      '<p class="field-hint" id="wordCount"></p>' +
      '</div>' +
      '<h4>' +
      esc(D.rubricTitle) +
      '</h4>' +
      '<p style="font-size:0.85rem;color:var(--color-ink-muted);">' +
      esc(D.rubricInstruction) +
      '</p>' +
      '<div class="rubric-list">' +
      rubricHTML +
      '</div></div>' +
      '<div class="btn-group btn-group--end">' +
      '<button type="button" class="btn btn--primary btn--large" id="generalNextBtn">' +
      esc(D.nextButtonLabel) +
      '</button></div>';
  }

  container.innerHTML = stageShell(
    'Describe Your Workshop',
    D.kicker,
    D.goal,
    '<div class="panel">' +
      '<p style="font-size:0.88rem;color:var(--color-ink-muted);">' +
      D.builderInstruction +
      '</p>' +
      buildQuestionProgress(
        D.builder.length,
        State.builderIdx,
        D.builder.map(function (item) {
          if (!State.builderChecked[item.id]) return null;
          return builderIsCorrect(item) ? 'correct' : 'incorrect';
        }),
        'Sentence ' + (State.builderIdx + 1) + ' of ' + D.builder.length
      ) +
      '<div class="scenario-box">' +
      '<span class="scenario-box__label">Situation</span>' +
      '<p class="scenario-box__text">' +
      esc(b.context) +
      '</p></div>' +
      '<div class="sentence-slot">' +
      slotHTML +
      '</div>' +
      '<div class="word-bank">' +
      bankHTML +
      '</div>' +
      feedbackHTML +
      '</div>' +
      navHTML +
      writingHTML
  );

  container.querySelectorAll('[data-word-idx]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      placed.push(parseInt(btn.dataset.wordIdx, 10));
      State.builderChecked[b.id] = false;
      saveState();
      renderGeneralization(container);
    });
  });

  container.querySelectorAll('[data-remove-pos]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      placed.splice(parseInt(btn.dataset.removePos, 10), 1);
      State.builderChecked[b.id] = false;
      saveState();
      renderGeneralization(container);
    });
  });

  var checkBtn = document.getElementById('builderCheckBtn');
  if (checkBtn) {
    checkBtn.addEventListener('click', function () {
      if (placed.length < b.parts.length) {
        showNotice(D.builderIncomplete);
        return;
      }
      var ok = builderIsCorrect(b);
      /* Only the first attempt counts towards the score. */
      if (State.builderFirstTry[b.id] === undefined) {
        State.builderFirstTry[b.id] = ok;
        if (!ok) {
          mistakeLog.record({
            stage: 'generalization',
            stageLabel: 'Describe Your Workshop',
            questionId: b.id,
            label: b.context,
            yourAnswer: builderSentence(b).join(' '),
            correctAnswer: b.parts.join(' '),
            explanation: b.hint,
          });
        }
      }
      State.builderChecked[b.id] = true;
      saveState();
      renderGeneralization(container);
    });
  }

  var resetBtn = document.getElementById('builderResetBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      State.builderPlaced[b.id] = [];
      State.builderChecked[b.id] = false;
      saveState();
      renderGeneralization(container);
    });
  }

  var nextBtn = document.getElementById('builderNextBtn');
  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      State.builderIdx += 1;
      saveState();
      renderGeneralization(container);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  var writingEl = document.getElementById('ownWriting');
  var countEl = document.getElementById('wordCount');
  function updateCount() {
    if (!countEl) return;
    countEl.textContent = countWords(State.ownWriting) + ' words written';
  }
  if (writingEl) {
    updateCount();
    writingEl.addEventListener('input', function () {
      State.ownWriting = writingEl.value;
      updateCount();
      saveState();
    });
  }

  container.querySelectorAll('[data-rubric-id]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var id = btn.dataset.rubricId;
      State.rubricChecked[id] = !State.rubricChecked[id];
      saveState();
      renderGeneralization(container);
    });
  });

  var generalNextBtn = document.getElementById('generalNextBtn');
  if (generalNextBtn) {
    generalNextBtn.addEventListener('click', function () {
      if (countWords(State.ownWriting) < D.minWords) {
        showNotice(D.tooShortMessage);
        return;
      }
      finishStage('generalization');
    });
  }
}

/* ============================================================
   12. STAGE: REFLECTION
   ============================================================ */

function renderReflection(container) {
  var D = DATA.reflection;
  var mistakes = mistakeLog.list();

  var reviewHTML = mistakes.length
    ? '<div class="panel">' +
      '<h3>' +
      esc(D.mistakesTitle) +
      '</h3>' +
      '<p style="font-size:0.9rem;color:var(--color-ink-muted);">' +
      esc(D.mistakesLead) +
      '</p>' +
      buildMistakesList(mistakes) +
      '</div>'
    : '<div class="panel panel--success">' +
      '<h3>' +
      esc(D.noMistakesTitle) +
      '</h3><p style="margin:0;">' +
      D.noMistakesText +
      '</p></div>';

  var promptsHTML = D.prompts
    .map(function (p) {
      return (
        '<div class="field-group">' +
        '<label for="refl-' +
        esc(p.id) +
        '">' +
        esc(p.label) +
        '</label>' +
        '<textarea id="refl-' +
        esc(p.id) +
        '" class="input-textarea" rows="3" data-reflect-id="' +
        esc(p.id) +
        '" placeholder="' +
        esc(p.placeholder) +
        '">' +
        esc(State.reflectionAnswers[p.id] || '') +
        '</textarea></div>'
      );
    })
    .join('');

  /* The confidence options are NOT shuffled: they are a scale, and a
     scale whose rungs move is no longer a scale. */
  var confidenceHTML = D.confidenceOptions
    .map(function (opt, i) {
      var on = State.confidence === opt.id;
      return (
        '<button type="button" class="option-btn' +
        (on ? ' is-selected' : '') +
        '" data-confidence="' +
        esc(opt.id) +
        '" aria-pressed="' +
        (on ? 'true' : 'false') +
        '">' +
        '<span class="option-btn__marker" aria-hidden="true">' +
        OPTION_LETTERS[i] +
        '</span>' +
        '<span class="option-btn__text">' +
        esc(opt.label) +
        '</span></button>'
      );
    })
    .join('');

  container.innerHTML = stageShell(
    'Reflection',
    D.kicker,
    D.goal,
    reviewHTML +
      '<div class="panel">' +
      '<h3>' +
      esc(D.promptsTitle) +
      '</h3>' +
      promptsHTML +
      '<h4>' +
      esc(D.confidenceLabel) +
      '</h4>' +
      '<div class="options-list">' +
      confidenceHTML +
      '</div></div>' +
      '<div class="btn-group btn-group--end">' +
      '<button type="button" class="btn btn--primary btn--large" id="reflectNextBtn">' +
      esc(D.nextButtonLabel) +
      '</button></div>'
  );

  container.querySelectorAll('[data-reflect-id]').forEach(function (ta) {
    ta.addEventListener('input', function () {
      State.reflectionAnswers[ta.dataset.reflectId] = ta.value;
      saveState();
    });
  });

  container.querySelectorAll('[data-confidence]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      State.confidence = btn.dataset.confidence;
      saveState();
      renderReflection(container);
    });
  });

  document.getElementById('reflectNextBtn').addEventListener('click', function () {
    var answered = D.prompts.filter(function (p) {
      return (State.reflectionAnswers[p.id] || '').trim().length > 0;
    }).length;
    if (answered < D.minAnswered) {
      showNotice(D.incompleteMessage);
      return;
    }
    finishStage('reflection');
  });
}

/* ============================================================
   13. STAGE: RESULTS
   ============================================================ */

function collectScores() {
  var notice = noticeScore();
  var evidence = evidenceScore();
  var pattern = patternScore();
  var builder = builderScore();

  var verificationCorrect = State.verificationExercises.filter(function (ex) {
    return ex.correct;
  }).length;

  return [
    { label: 'Notice It', correct: notice.hits, total: notice.total },
    { label: 'Evidence Board', correct: evidence.correct, total: evidence.total },
    { label: 'Pattern Lab', correct: pattern.correct, total: pattern.total },
    {
      label: 'Test Your Rules',
      correct: verificationCorrect,
      total: DATA.verification.soal.length,
    },
    { label: 'Describe Your Workshop', correct: builder.correct, total: builder.total },
  ];
}

function renderResults(container) {
  var D = DATA.results;

  /* Reaching this stage IS completing it — there is no button beyond it,
     so nothing else would ever tick the last row of the checklist. */
  if (!State.completedStages.results) completeStage('results');

  var rows = collectScores();

  var totalCorrect = rows.reduce(function (a, r) {
    return a + r.correct;
  }, 0);
  var totalPoints = rows.reduce(function (a, r) {
    return a + r.total;
  }, 0);
  var pct = totalPoints > 0 ? Math.round((totalCorrect / totalPoints) * 100) : 0;
  var band = scoreBand(pct);
  var message = band === 'good' ? D.messageGood : band === 'ok' ? D.messageOk : D.messageNeedsWork;

  var ruleCardsHTML = D.ruleCards
    .map(function (c) {
      return (
        '<div class="rule-card">' +
        '<span class="rule-card__title">' +
        esc(c.title) +
        '</span>' +
        '<p class="rule-card__body">' +
        c.body +
        '</p></div>'
      );
    })
    .join('');

  var completionHTML = STAGES.map(function (sid, i) {
    var done = !!State.completedStages[sid];
    return (
      '<li class="completion-list__item' +
      (done ? ' is-done' : '') +
      '"><span class="completion-list__icon" aria-hidden="true">' +
      (done ? '&#10003;' : '&#9675;') +
      '</span>' +
      esc(STAGE_LABELS[i]) +
      '</li>'
    );
  }).join('');

  var writingHTML = State.ownWriting.trim()
    ? '<div class="panel">' +
      '<h3>Your information board</h3>' +
      '<p class="own-writing">' +
      esc(State.ownWriting).replace(/\n/g, '<br>') +
      '</p></div>'
    : '';

  container.innerHTML = stageShell(
    'Results',
    D.kicker,
    D.goal,
    '<div class="panel panel--hero">' +
      '<h2>Your results</h2>' +
      '<div class="results-score-hero">' +
      '<div class="results-score-circle score-circle--' +
      band +
      '">' +
      '<span class="results-score-circle__pct">' +
      pct +
      '%</span>' +
      '<span class="results-score-circle__label">' +
      totalCorrect +
      '/' +
      totalPoints +
      '</span></div>' +
      '<div class="results-score-message"><p style="margin:0;">' +
      esc(message) +
      '</p></div>' +
      '</div></div>' +
      '<div class="panel"><h3>Score by stage</h3>' +
      buildScoreTable(rows) +
      '</div>' +
      '<div class="panel"><h3>' +
      esc(D.ruleCardTitle) +
      '</h3>' +
      '<p style="font-size:0.9rem;color:var(--color-ink-muted);">' +
      esc(D.ruleCardLead) +
      '</p>' +
      '<div class="rule-grid">' +
      ruleCardsHTML +
      '</div></div>' +
      writingHTML +
      '<div class="panel"><h3>' +
      esc(D.completionTitle) +
      '</h3>' +
      '<ul class="completion-list">' +
      completionHTML +
      '</ul></div>' +
      '<div class="btn-group btn-group--center">' +
      '<button type="button" class="btn btn--ghost" id="resultsRestartBtn">' +
      esc(D.restartLabel) +
      '</button></div>'
  );

  document.getElementById('resultsRestartBtn').addEventListener('click', openResetModal);
}

/* ============================================================
   14. HELPERS

   The generic ones — idsOf, findById, orderByIds, keepShuffledOrder,
   stripTags, optionLabel, countWords — live in ../shared/engine.js.
   ============================================================ */

var RULE_NAMES = {
  plural: 'plural endings',
  place: 'place words',
  time: 'time words',
  asking: 'question words',
  mixed: 'all four rules',
};

function ruleName(key) {
  return RULE_NAMES[key] || key;
}

/* ============================================================
   15. RESET & INIT
   ============================================================ */

function openResetModal() {
  var modal = document.getElementById('resetModal');
  if (!modal) return;
  modal.style.display = 'flex';
  var cancel = document.getElementById('resetCancelBtn');
  if (cancel) cancel.focus();
}

function closeResetModal() {
  var modal = document.getElementById('resetModal');
  if (modal) modal.style.display = 'none';
}

function doReset() {
  store.reset();
  mistakeLog = createMistakeLog(State);
  initDerivedState();
  /* reset() wipes the stored state, so the orders just re-rolled above are
     unsaved again — the same reason init() saves. Without this, reloading
     straight after a reset would re-shuffle everything a second time. */
  saveState();
  closeResetModal();
  machine.updateStageNav();
  machine.updateProgress();
  renderCurrentStage();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

(function init() {
  store.load();
  initDerivedState();
  /* load() replaces State.mistakes wholesale, so the log has to be
     re-bound to the array that is now in State. */
  mistakeLog = createMistakeLog(State);

  /* Persist the freshly rolled orders straight away. Without this, nothing
     is written until the learner's first interaction, so reloading the very
     first screen would deal them a second, different arrangement of every
     list — exactly what storing the order is meant to prevent. */
  saveState();

  machine.buildStageNav();
  machine.updateProgress();
  renderCurrentStage();

  var resetBtn = document.getElementById('resetAppBtn');
  if (resetBtn) resetBtn.addEventListener('click', openResetModal);

  var cancelBtn = document.getElementById('resetCancelBtn');
  if (cancelBtn) cancelBtn.addEventListener('click', closeResetModal);

  var confirmBtn = document.getElementById('resetConfirmBtn');
  if (confirmBtn) confirmBtn.addEventListener('click', doReset);

  var modal = document.getElementById('resetModal');
  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeResetModal();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeResetModal();
  });
})();
