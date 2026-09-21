'use strict';

/* ============================================================
   engine.js — Shared utilities for every MPI learning module

   Loaded as a plain <script> (no bundler) before data.js and
   app.js in each module. Everything is exposed as a global so a
   module's app.js can call it directly.

   Sections:
    1. Text, list & answer-checking utilities
    2. Notice (toast)
    3. Render utilities
    4. Stage navigation machine
    5. Exercise stage (multiple choice & text input)
    6. State persistence
    7. Mistake log & score table
   ============================================================ */

/* ============================================================
   1. TEXT, LIST & ANSWER-CHECKING UTILITIES
   ============================================================ */

function esc(str) {
  var m = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return String(str).replace(/[&<>"']/g, function (ch) {
    return m[ch];
  });
}

/*
 * Normalises a learner's typed answer so that harmless variation does not
 * count as a mistake: case, surrounding/duplicated whitespace, curly
 * apostrophes, and trailing sentence punctuation are all levelled out.
 *
 *   normalizeAnswer("  There’s  a book. ") -> "there's a book"
 *
 * Apostrophes are deliberately KEPT, because in this subject the
 * difference between "there is" and "there's" is content, not noise —
 * pass both forms to checkTextAnswer() when both should be accepted.
 */
function normalizeAnswer(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/[‘’ʼ]/g, "'")
    .replace(/[“”]/g, '"')
    .toLowerCase()
    .replace(/[.!?,;:]+\s*$/, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/*
 * True when `input` matches any of the accepted answers after
 * normalisation. `accepted` may be a single string or an array, so data
 * files can write `answer: 'are'` or `answer: ['there is', "there's"]`.
 */
function checkTextAnswer(input, accepted) {
  var list = Array.isArray(accepted) ? accepted : [accepted];
  var normalized = normalizeAnswer(input);
  if (normalized === '') return false;
  return list.some(function (a) {
    return normalizeAnswer(a) === normalized;
  });
}

/*
 * Plain text from a label that may carry <em>/<strong> markup — used
 * wherever a value is escaped for display again, e.g. the mistake list,
 * where the markup would otherwise be shown to the learner as source.
 */
function stripTags(html) {
  return String(html)
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&rsquo;/g, "'")
    .replace(/&mdash;/g, '—')
    .replace(/&amp;/g, '&')
    .trim();
}

/* Word count of a free-text answer, used by the "write your own" stages. */
function countWords(str) {
  var trimmed = String(str || '').trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}

/*
 * An unbiased index in [0, limit) taken from the platform CSPRNG.
 *
 * Rejection sampling, rather than a plain modulo: 2^32 is not a multiple
 * of most limits, so `value % limit` would quietly favour the low indices
 * and the same words would drift towards the front of every word bank.
 * crypto.getRandomValues needs no secure context, so this still works when
 * a teacher opens the page straight from disk over file://.
 */
function randomIndex(limit) {
  var range = 4294967296; /* 2^32 — the number of values a Uint32 can hold */
  var ceiling = range - (range % limit);
  var buf = new Uint32Array(1);
  do {
    crypto.getRandomValues(buf);
  } while (buf[0] >= ceiling);
  return buf[0] % limit;
}

/* Fisher–Yates on a copy — the caller's array is never reordered. */
function shuffle(arr) {
  var out = arr.slice();
  for (var i = out.length - 1; i > 0; i--) {
    var j = randomIndex(i + 1);
    var tmp = out[i];
    out[i] = out[j];
    out[j] = tmp;
  }
  return out;
}

/* The ids of a list of { id, ... } records, in their data-file order. */
function idsOf(list) {
  return list.map(function (item) {
    return item.id;
  });
}

function findById(list, id) {
  return list.filter(function (item) {
    return item.id === id;
  })[0];
}

/* A copy of `list` reordered to follow `ids`. Records whose id is missing
   from `ids` are dropped, so a stale stored order can never silently hide
   half a question's options — callers pair this with keepShuffledOrder(),
   which re-seeds the order whenever it stops matching the data. */
function orderByIds(list, ids) {
  return ids
    .map(function (id) {
      return findById(list, id);
    })
    .filter(function (item) {
      return !!item;
    });
}

/* Keeps a stored display order if it still covers exactly `ids`, otherwise
   builds a fresh shuffle. Re-using the stored order is what stops cards and
   answer options from jumping around on every re-render or reload; the
   staleness check is what re-seeds it after a reset or a data file that
   gained an entry. */
function keepShuffledOrder(current, ids) {
  var usable =
    Array.isArray(current) &&
    current.length === ids.length &&
    ids.every(function (id) {
      return current.indexOf(id) !== -1;
    });
  return usable ? current : shuffle(ids);
}

/* ============================================================
   2. NOTICE (TOAST)
   ============================================================ */

var noticeTimer = null;

function showNotice(msg, elementId) {
  var el = document.getElementById(elementId || 'appNotice');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('is-visible');
  if (noticeTimer) clearTimeout(noticeTimer);
  noticeTimer = setTimeout(function () {
    el.classList.remove('is-visible');
  }, 3500);
}

/* ============================================================
   3. RENDER UTILITIES
   ============================================================ */

function buildFeedbackBox(type, icon, html) {
  return (
    '<div class="feedback-box feedback-box--' +
    esc(type) +
    '" role="alert">' +
    '<span class="feedback-box__icon" aria-hidden="true">' +
    icon +
    '</span>' +
    '<div class="feedback-box__body">' +
    html +
    '</div>' +
    '</div>'
  );
}

/*
 * A row of dots showing progress through the questions of one stage.
 * `statuses[i]` is 'correct', 'incorrect', or null/undefined.
 */
function buildQuestionProgress(total, current, statuses, label) {
  var dots = '';
  for (var i = 0; i < total; i++) {
    var cls = 'q-dot';
    if (i === current) cls += ' q-dot--current';
    else if (statuses && statuses[i] === 'correct') cls += ' q-dot--correct';
    else if (statuses && statuses[i] === 'incorrect') cls += ' q-dot--incorrect';
    dots += '<span class="' + cls + '" title="Question ' + (i + 1) + '"></span>';
  }
  var text = label || 'Question ' + (current + 1) + ' of ' + total;
  return (
    '<div class="question-progress" aria-label="Question progress">' +
    '<span class="question-progress__label">' +
    esc(text) +
    '</span>' +
    '<span class="question-progress__dots">' +
    dots +
    '</span>' +
    '</div>'
  );
}

/* Standard stage heading: small kicker line plus the stage's goal. */
function buildStageHead(kicker, goal) {
  return (
    '<div class="stage-head">' +
    '<span class="stage-head__kicker">' +
    esc(kicker) +
    '</span>' +
    '<p class="stage-head__goal">Goal: ' +
    esc(goal) +
    '</p>' +
    '</div>'
  );
}

/* ============================================================
   4. STAGE NAVIGATION MACHINE
   ============================================================ */

/*
 * Builds the stage machine shared by every module: the stage list in the
 * header, the lock on stages whose predecessor is unfinished, and the
 * progress bar.
 *
 * opts:
 *   stages          ordered array of stage ids (required)
 *   stageLabels     labels parallel to `stages` (required)
 *   state           the module's State object (required, mutated in place)
 *   save            function() — persists State (required)
 *   render          function() — renders the active stage (required)
 *   notice          function(msg) — optional, defaults to showNotice
 *   messages        optional string overrides, so a module in another
 *                   language can reuse this machine:
 *                     lockedStage(label) -> string
 *                     progress(done, total) -> string
 *   listId, progressFillId, progressLabelId   optional element ids
 *
 * Returns { navigateTo, completeStage, updateStageNav, buildStageNav, updateProgress }.
 */
function createStageMachine(opts) {
  var stages = opts.stages;
  var stageLabels = opts.stageLabels;
  var state = opts.state;
  var save = opts.save;
  var render = opts.render;
  var notice = opts.notice || showNotice;
  var messages = opts.messages || {};
  var listId = opts.listId || 'stageNavList';
  var progressFillId = opts.progressFillId || 'progressFill';
  var progressLabelId = opts.progressLabelId || 'progressLabel';

  var lockedMessage =
    messages.lockedStage ||
    function (label) {
      return 'Finish the "' + label + '" stage first.';
    };
  var progressMessage =
    messages.progress ||
    function (done, total) {
      return done + ' of ' + total + ' stages completed';
    };

  function navigateTo(stageId) {
    var targetIdx = stages.indexOf(stageId);
    var currentIdx = stages.indexOf(state.currentStage);
    if (targetIdx === -1) return;

    if (targetIdx > currentIdx) {
      for (var i = currentIdx; i < targetIdx; i++) {
        if (!state.completedStages[stages[i]]) {
          notice(lockedMessage(stageLabels[i]));
          return;
        }
      }
    }

    state.currentStage = stageId;
    save();
    updateStageNav();
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function completeStage(stageId) {
    state.completedStages[stageId] = true;
    save();
    updateStageNav();
    updateProgress();
  }

  function updateStageNav() {
    var items = document.querySelectorAll('.stage-nav__item[data-stage]');
    var currentIdx = stages.indexOf(state.currentStage);
    items.forEach(function (item) {
      var sid = item.dataset.stage;
      var idx = stages.indexOf(sid);
      item.removeAttribute('aria-current');
      item.classList.remove('is-complete');
      item.disabled = false;
      if (sid === state.currentStage) item.setAttribute('aria-current', 'step');
      else if (state.completedStages[sid]) item.classList.add('is-complete');
      if (idx > currentIdx && !state.completedStages[stages[idx - 1]]) item.disabled = true;
    });
  }

  function buildStageNav() {
    var list = document.getElementById(listId);
    if (!list) return;
    list.innerHTML = stages
      .map(function (sid, i) {
        return (
          '<li class="stage-nav__list-item">' +
          '<button type="button" class="stage-nav__item" data-stage="' +
          esc(sid) +
          '">' +
          '<span class="stage-nav__num">' +
          (i + 1) +
          '</span>' +
          '<span class="stage-nav__label">' +
          esc(stageLabels[i]) +
          '</span>' +
          '</button></li>'
        );
      })
      .join('');
    list.querySelectorAll('.stage-nav__item').forEach(function (btn) {
      btn.addEventListener('click', function () {
        navigateTo(btn.dataset.stage);
      });
    });
    updateStageNav();
  }

  function updateProgress() {
    var total = stages.length;
    var done = Object.keys(state.completedStages).length;
    var pct = Math.round((done / total) * 100);
    var fill = document.getElementById(progressFillId);
    var label = document.getElementById(progressLabelId);
    if (fill) {
      fill.style.width = pct + '%';
      fill.parentElement.setAttribute('aria-valuenow', pct);
    }
    if (label) label.textContent = progressMessage(done, total);
  }

  return {
    navigateTo: navigateTo,
    completeStage: completeStage,
    updateStageNav: updateStageNav,
    buildStageNav: buildStageNav,
    updateProgress: updateProgress,
  };
}

/* ============================================================
   5. EXERCISE STAGE
   ============================================================ */

/* The label of one option of a 'choice' question, by its id — the text a
   mistake log or a review stage shows back instead of the bare id. */
function optionLabel(s, optId) {
  var opt = findById(s.options || [], optId);
  return opt ? opt.label : optId;
}

/*
 * Builds one question-practice stage — the pattern that repeats in nearly
 * every module. It owns the per-question state, the progress dots, the
 * feedback box, the tiered-hint flow, and the Next / Continue buttons.
 * What is unique per question (the scenario, the sentence stem, the
 * question itself) comes from `renderPrompt`.
 *
 * Two question types are supported and MAY BE MIXED inside one stage,
 * because the type is read per question from `s.type`:
 *   'choice' — multiple choice, answered once
 *   'input'  — type the missing word(s), may be retried
 *
 * cfg (common):
 *   soal                   array of questions from DATA (never replaced)
 *   getExercises()         function returning the current per-question state
 *                          array — MUST be a function, because loading state
 *                          replaces (not mutates) that array
 *   getIndex, setIndex     accessors for the active question index
 *   save                   function() — persists State
 *   renderPrompt(s)        HTML unique to the question
 *   idPrefix               DOM id prefix (e.g. 'vf' -> vfInput, vfCheckBtn)
 *   sectionLabel, kicker, goal, instruction   stage heading text
 *   nextButtonLabel        label of the button shown once every question is done
 *   onFinish()             called when that button is clicked — the module
 *                          marks the stage complete and navigates onward
 *   onAnswered(s, ex)      (optional) called once per question the first
 *                          time it is settled — used to log mistakes/score
 *   defaultType            (optional) type for questions without `s.type`
 *   buildHead()            (optional) replaces the stage heading markup
 *
 * cfg ('input' questions only):
 *   inputPlaceholder, inputAriaLabel   (optional)
 *   revealAfterAttempts    (optional, default 2) attempts before the
 *                          "Show answer" button appears
 *   emptyMessage           (optional) notice shown for an empty input
 *
 * A question may carry `hints` (array, revealed one level per click) or
 * `hint` (single string). An 'input' question carries `answer` (a string
 * or an array of accepted spellings); a 'choice' question carries
 * `options` ([{id, label}]) and `correct` (the winning option id).
 *
 * Returns { render(container) }.
 */
function createExerciseStage(cfg) {
  var soal = cfg.soal;
  var prefix = cfg.idPrefix;
  var letters = cfg.letters || ['A', 'B', 'C', 'D', 'E'];
  var revealAfter = cfg.revealAfterAttempts || 2;
  var emptyMessage = cfg.emptyMessage || 'Type your answer first.';

  function typeOf(s) {
    return s.type || cfg.defaultType || 'choice';
  }

  function hintsOf(s) {
    if (Array.isArray(s.hints)) return s.hints;
    return s.hint ? [s.hint] : [];
  }

  function isAnswered(s, ex) {
    if (typeOf(s) === 'choice') return ex.chosen !== null && ex.chosen !== undefined;
    return !!(ex.correct || ex.revealed);
  }

  function statusOf(s, ex) {
    if (ex.correct) return 'correct';
    if (typeOf(s) === 'choice') {
      return ex.chosen !== null && ex.chosen !== undefined ? 'incorrect' : null;
    }
    return ex.revealed || ex.attempts > 0 ? 'incorrect' : null;
  }

  /* Fires onAnswered exactly once per question, however it was settled. */
  function settle(s, ex) {
    if (ex.logged) return;
    ex.logged = true;
    if (cfg.onAnswered) cfg.onAnswered(s, ex);
  }

  function buildHead() {
    if (cfg.buildHead) return cfg.buildHead();
    return buildStageHead(cfg.kicker, cfg.goal);
  }

  function buildHintsHTML(s, ex) {
    var hints = hintsOf(s);
    return hints
      .slice(0, ex.hintLevel || 0)
      .map(function (h, i) {
        var label = hints.length > 1 ? 'Hint ' + (i + 1) : 'Hint';
        return buildFeedbackBox('warning', '&#128161;', '<strong>' + label + ':</strong> ' + h);
      })
      .join('');
  }

  function buildHintButton(s, ex) {
    var hints = hintsOf(s);
    var level = ex.hintLevel || 0;
    if (hints.length === 0 || level >= hints.length) return '';
    var label = hints.length > 1 ? 'Hint (' + (level + 1) + '/' + hints.length + ')' : 'Hint';
    return (
      '<button type="button" class="btn btn--ghost btn--small" id="' +
      prefix +
      'HintBtn">&#128161; ' +
      label +
      '</button>'
    );
  }

  function buildInputBody(s, ex) {
    var feedbackHTML = '';
    if (ex.correct) {
      feedbackHTML = buildFeedbackBox(
        'success',
        '&#10003;',
        '<strong>Correct!</strong> <span class="explanation-text">' + s.explanation + '</span>'
      );
    } else if (ex.revealed) {
      feedbackHTML = buildFeedbackBox(
        'info',
        '&#128065;',
        '<strong>Answer:</strong> <em>' +
          esc(Array.isArray(s.answer) ? s.answer[0] : s.answer) +
          '</em><div class="explanation-text">' +
          s.explanation +
          '</div>'
      );
    } else {
      var errorHTML =
        ex.attempts > 0
          ? buildFeedbackBox(
              'error',
              '&#10007;',
              '<strong>' +
                esc(ex.userInput) +
                '</strong> is not right yet. Try again, or take a hint.'
            )
          : '';
      feedbackHTML = errorHTML + buildHintsHTML(s, ex);
    }

    var actionHTML = '';
    if (!ex.correct && !ex.revealed) {
      var revealBtnHTML =
        ex.attempts >= revealAfter
          ? '<button type="button" class="btn btn--ghost btn--small" id="' +
            prefix +
            'RevealBtn">Show answer</button>'
          : '';
      actionHTML =
        '<div class="btn-group">' +
        '<input type="text" id="' +
        prefix +
        'Input" class="input-text" style="max-width:220px;" placeholder="' +
        esc(cfg.inputPlaceholder || 'your answer') +
        '" aria-label="' +
        esc(cfg.inputAriaLabel || 'Your answer') +
        '" autocomplete="off" value="' +
        esc(ex.userInput || '') +
        '">' +
        '<button type="button" class="btn btn--primary" id="' +
        prefix +
        'CheckBtn">Check</button>' +
        buildHintButton(s, ex) +
        revealBtnHTML +
        '</div>';
    }

    return cfg.renderPrompt(s) + actionHTML + feedbackHTML;
  }

  function buildChoiceBody(s, ex) {
    var answered = ex.chosen !== null && ex.chosen !== undefined;

    var choicesHTML = s.options
      .map(function (opt, i) {
        var cls = 'option-btn';
        if (answered) {
          cls += ' is-disabled';
          if (opt.id === s.correct) cls += ' is-correct';
          else if (opt.id === ex.chosen) cls += ' is-selected-wrong';
          else cls += ' is-incorrect-choice';
        }
        var indicator = '';
        if (answered && opt.id === s.correct) indicator = '&#10003;';
        else if (answered && opt.id === ex.chosen) indicator = '&#10007;';
        return (
          '<button type="button" class="' +
          cls +
          '" data-opt-id="' +
          esc(opt.id) +
          '"' +
          (answered ? ' disabled' : '') +
          '>' +
          '<span class="option-btn__marker" aria-hidden="true">' +
          letters[i] +
          '</span>' +
          '<span class="option-btn__text">' +
          opt.label +
          '</span>' +
          '<span class="option-btn__indicator" aria-hidden="true">' +
          indicator +
          '</span>' +
          '</button>'
        );
      })
      .join('');

    var feedbackHTML = '';
    if (answered) {
      feedbackHTML = ex.correct
        ? buildFeedbackBox(
            'success',
            '&#10003;',
            '<strong>Correct!</strong> <span class="explanation-text">' + s.explanation + '</span>'
          )
        : buildFeedbackBox(
            'error',
            '&#10007;',
            '<strong>Not quite.</strong> <span class="explanation-text">' +
              s.explanation +
              '</span>'
          );
    } else {
      feedbackHTML = buildHintsHTML(s, ex);
    }

    var hintRow = answered
      ? ''
      : (function () {
          var btn = buildHintButton(s, ex);
          return btn ? '<div class="btn-group">' + btn + '</div>' : '';
        })();

    return (
      cfg.renderPrompt(s) +
      '<div class="options-list" id="' +
      prefix +
      'Choices">' +
      choicesHTML +
      '</div>' +
      hintRow +
      feedbackHTML
    );
  }

  function render(container) {
    /* Re-read every render: loading state replaces this array. */
    var exArr = cfg.getExercises();
    var idx = cfg.getIndex();
    var s = soal[idx];
    var ex = exArr[idx];
    var isChoice = typeOf(s) === 'choice';

    var allDone = exArr.every(function (e, i) {
      return isAnswered(soal[i], e);
    });

    var statuses = exArr.map(function (e, i) {
      return statusOf(soal[i], e);
    });

    var navHTML = '';
    if (isAnswered(s, ex)) {
      if (idx < soal.length - 1) {
        navHTML =
          '<div class="btn-group btn-group--end">' +
          '<button type="button" class="btn btn--primary" id="' +
          prefix +
          'NextBtn">Next question &rarr;</button></div>';
      } else if (allDone) {
        navHTML =
          '<div class="btn-group btn-group--end">' +
          '<button type="button" class="btn btn--primary btn--large" id="' +
          prefix +
          'FinishBtn">' +
          esc(cfg.nextButtonLabel) +
          '</button></div>';
      }
    }

    container.innerHTML =
      '<section aria-label="' +
      esc(cfg.sectionLabel) +
      '">' +
      buildHead() +
      '<div class="panel">' +
      '<p style="font-size:0.88rem;color:var(--color-ink-muted);margin-bottom:var(--space-3);">' +
      esc(cfg.instruction) +
      '</p>' +
      buildQuestionProgress(soal.length, idx, statuses) +
      (isChoice ? buildChoiceBody(s, ex) : buildInputBody(s, ex)) +
      '</div>' +
      navHTML +
      '</section>';

    var inp = document.getElementById(prefix + 'Input');
    var checkBtn = document.getElementById(prefix + 'CheckBtn');
    var hintBtn = document.getElementById(prefix + 'HintBtn');
    var revealBtn = document.getElementById(prefix + 'RevealBtn');
    var nextBtn = document.getElementById(prefix + 'NextBtn');
    var finishBtn = document.getElementById(prefix + 'FinishBtn');

    if (inp) {
      inp.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && checkBtn) checkBtn.click();
      });
    }

    if (checkBtn) {
      checkBtn.addEventListener('click', function () {
        if (!inp) return;
        var val = inp.value;
        if (normalizeAnswer(val) === '') {
          showNotice(emptyMessage);
          return;
        }
        ex.userInput = val;
        ex.attempts += 1;
        ex.correct = checkTextAnswer(val, s.answer);
        if (ex.correct) settle(s, ex);
        cfg.save();
        render(container);
      });
    }

    if (hintBtn) {
      hintBtn.addEventListener('click', function () {
        ex.hintLevel = Math.min((ex.hintLevel || 0) + 1, hintsOf(s).length);
        cfg.save();
        render(container);
      });
    }

    if (revealBtn) {
      revealBtn.addEventListener('click', function () {
        ex.revealed = true;
        settle(s, ex);
        cfg.save();
        render(container);
      });
    }

    container.querySelectorAll('[data-opt-id]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (ex.chosen !== null && ex.chosen !== undefined) return;
        ex.chosen = btn.dataset.optId;
        ex.attempts += 1;
        ex.correct = ex.chosen === s.correct;
        settle(s, ex);
        cfg.save();
        render(container);
      });
    });

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        cfg.setIndex(idx + 1);
        cfg.save();
        render(container);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    if (finishBtn) {
      finishBtn.addEventListener('click', function () {
        cfg.onFinish();
      });
    }
  }

  return { render: render };
}

/* ============================================================
   6. STATE PERSISTENCE
   ============================================================ */

/*
 * localStorage-backed store for one module's State object.
 *
 * The "initial shape" is taken from `state` itself at the moment
 * createStore() is called — right after `var State = {...}` and before any
 * mutation — so the defaults never have to be written down twice.
 *
 * Returns { save(), load(), reset() }. reset() only restores the fields
 * and clears localStorage; the caller still re-initialises its per-question
 * arrays afterwards.
 */
function createStore(opts) {
  var key = opts.key;
  var state = opts.state;
  var defaults = JSON.parse(JSON.stringify(state));

  function save() {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (e) {
      /* storage unavailable (private mode, quota) — run without saving */
    }
  }

  function load() {
    try {
      var raw = localStorage.getItem(key);
      if (!raw) return false;
      Object.assign(state, JSON.parse(raw));
      return true;
    } catch (e) {
      return false;
    }
  }

  function reset() {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      /* ignore */
    }
    Object.keys(state).forEach(function (k) {
      delete state[k];
    });
    Object.assign(state, JSON.parse(JSON.stringify(defaults)));
  }

  return { save: save, load: load, reset: reset };
}

/*
 * Makes sure a per-question state array exists and is the right length —
 * if not, it is (re)built from makeDefault(question).
 */
function ensureExerciseArray(state, key, soal, makeDefault) {
  if (!state[key] || state[key].length !== soal.length) {
    state[key] = soal.map(function (s) {
      return makeDefault(s);
    });
  }
}

/* The per-question state shape used by createExerciseStage. */
function defaultExerciseEntry() {
  return {
    attempts: 0,
    hintLevel: 0,
    correct: false,
    revealed: false,
    logged: false,
    userInput: '',
    chosen: null,
  };
}

/* ============================================================
   7. MISTAKE LOG & SCORE TABLE
   ============================================================ */

/*
 * Collects what the learner got wrong so a later review stage can show it
 * back to them. Entries are keyed by stage + questionId, so answering the
 * same question again replaces its entry instead of stacking duplicates.
 */
function createMistakeLog(state, key) {
  var field = key || 'mistakes';
  if (!Array.isArray(state[field])) state[field] = [];

  function record(entry) {
    var list = state[field];
    var existing = list.findIndex(function (m) {
      return m.stage === entry.stage && m.questionId === entry.questionId;
    });
    if (existing !== -1) list.splice(existing, 1);
    list.push(entry);
  }

  function clearFor(stage, questionId) {
    state[field] = state[field].filter(function (m) {
      return !(m.stage === stage && m.questionId === questionId);
    });
  }

  function list() {
    return state[field];
  }

  return { record: record, clearFor: clearFor, list: list };
}

/*
 * Renders the review list produced by createMistakeLog.
 * Each entry: { stage, stageLabel, questionId, label, yourAnswer,
 *               correctAnswer, explanation }.
 */
function buildMistakesList(entries) {
  return (
    '<div class="mistakes-list">' +
    entries
      .map(function (m) {
        return (
          '<div class="mistake-item">' +
          '<div class="mistake-item__header">' +
          '<span class="mistake-item__stage-badge">' +
          esc(m.stageLabel || m.stage) +
          '</span>' +
          '<span class="mistake-item__label">' +
          esc(m.label) +
          '</span>' +
          '</div>' +
          '<div class="mistake-item__body">' +
          '<div class="mistake-item__row mistake-item__row--wrong">' +
          '<span class="mistake-item__row-label">Your answer</span>' +
          '<span class="mistake-item__row-text">' +
          esc(m.yourAnswer) +
          '</span></div>' +
          '<div class="mistake-item__row mistake-item__row--correct">' +
          '<span class="mistake-item__row-label">Correct</span>' +
          '<span class="mistake-item__row-text">' +
          esc(m.correctAnswer) +
          '</span></div>' +
          (m.explanation
            ? '<div class="mistake-item__explanation">' + m.explanation + '</div>'
            : '') +
          '</div></div>'
        );
      })
      .join('') +
    '</div>'
  );
}

/* Maps a percentage onto the three score bands used by the results stage. */
function scoreBand(pct) {
  if (pct >= 80) return 'good';
  if (pct >= 60) return 'ok';
  return 'needswork';
}

/*
 * Renders the per-stage score breakdown.
 * rows: [{ label, correct, total }]
 */
function buildScoreTable(rows) {
  return (
    '<table class="score-table">' +
    '<thead><tr><th scope="col">Stage</th><th scope="col">Score</th>' +
    '<th scope="col">Progress</th></tr></thead><tbody>' +
    rows
      .map(function (r) {
        var pct = r.total > 0 ? Math.round((r.correct / r.total) * 100) : 0;
        var band = scoreBand(pct);
        return (
          '<tr><td>' +
          esc(r.label) +
          '</td>' +
          '<td><span class="score-pct score-pct--' +
          band +
          '">' +
          r.correct +
          '/' +
          r.total +
          '</span></td>' +
          '<td><div class="score-bar-wrap"><div class="score-bar score-bar--' +
          band +
          '" style="width:' +
          pct +
          '%"></div></div></td></tr>'
        );
      })
      .join('') +
    '</tbody></table>'
  );
}
