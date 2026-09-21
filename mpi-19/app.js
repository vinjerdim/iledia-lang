'use strict';

/* ============================================================
   app.js — Interactive English Learning: Conditional Sentences
   Sections:
   1.  State & storage
   2.  Navigation
   3.  Stage dispatcher
   4.  Stage: Orientation
   5.  Stage: Pattern Explorer
   6.  Stage: Context Practice
   7.  Stage: Sentence Builder
   8.  Stage: Text Application
   9.  Stage: Conversation Scenario
   10. Stage: Review
   11. Stage: Results
   12. Helpers & utilities
   13. Init
   ============================================================ */

/* ============================================================
   1. STATE & STORAGE
   ============================================================ */

const STAGES = [
  'orientasi', 'explorer', 'practice',
  'builder', 'textapp', 'conversation',
  'review', 'results'
];

const STAGE_LABELS = [
  'Orientation', 'Pattern Explorer', 'Context Practice',
  'Sentence Builder', 'Text Application', 'Conversation',
  'Review', 'Results'
];

const STORAGE_KEY = 'eng-conditional-v1';

const State = {
  currentStage: 'orientasi',
  completedStages: {},

  /* Explorer */
  explorerTypeIdx: 0,          // which conditional type is shown
  explorerExampleIdx: 0,       // which example within the type
  explorerExampleRevealed: {}, // { 'zero-0': true, ... }
  explorerAnswers: {},         // { typeId: selectedOptionIdx }
  explorerChecked: {},         // { typeId: true }

  /* Practice */
  practiceIdx: 0,
  practiceAnswers: {},         // { questionId: selectedOptionIdx }
  practiceChecked: {},         // { questionId: true }
  practiceRetried: {},         // { questionId: true }

  /* Builder */
  builderIdx: 0,
  builderOrders: {},           // { sentenceId: [partId, ...] }
  builderChecked: {},          // { sentenceId: true }

  /* Text Application */
  textAnswers: {},             // { questionId: selectedOptionIdx }
  textChecked: {},             // { questionId: true }

  /* Conversation */
  convIdx: 0,
  convAnswers: {},             // { convId: selectedOptionIdx }
  convChecked: {},             // { convId: true }

  /* Mistakes for review */
  mistakes: [],                // [{ stage, questionId, label, correctText, selectedText, explanation }]

  /* Score tracking */
  score: {
    explorerTotal: 0, explorerCorrect: 0,
    practiceTotal: 0, practiceCorrect: 0,
    builderTotal: 0, builderCorrect: 0,
    textTotal: 0, textCorrect: 0,
    convTotal: 0, convCorrect: 0
  }
};

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(State));
  } catch (e) { /* storage unavailable — continue silently */ }
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const saved = JSON.parse(raw);
    if (typeof saved !== 'object' || !saved.currentStage) return false;
    Object.assign(State, saved);
    return true;
  } catch (e) { return false; }
}

function clearState() {
  try { localStorage.removeItem(STORAGE_KEY); } catch (e) { /* ignore */ }
  State.currentStage = 'orientasi';
  State.completedStages = {};
  State.explorerTypeIdx = 0;
  State.explorerExampleIdx = 0;
  State.explorerExampleRevealed = {};
  State.explorerAnswers = {};
  State.explorerChecked = {};
  State.practiceIdx = 0;
  State.practiceAnswers = {};
  State.practiceChecked = {};
  State.practiceRetried = {};
  State.builderIdx = 0;
  State.builderOrders = {};
  State.builderChecked = {};
  State.textAnswers = {};
  State.textChecked = {};
  State.convIdx = 0;
  State.convAnswers = {};
  State.convChecked = {};
  State.mistakes = [];
  State.score = {
    explorerTotal: 0, explorerCorrect: 0,
    practiceTotal: 0, practiceCorrect: 0,
    builderTotal: 0, builderCorrect: 0,
    textTotal: 0, textCorrect: 0,
    convTotal: 0, convCorrect: 0
  };
}

/* ============================================================
   2. NAVIGATION
   ============================================================ */

function navigateTo(stageId) {
  const targetIdx = STAGES.indexOf(stageId);
  const currentIdx = STAGES.indexOf(State.currentStage);
  if (targetIdx === -1) return;

  if (targetIdx > currentIdx) {
    for (let i = currentIdx; i < targetIdx; i++) {
      if (!State.completedStages[STAGES[i]]) {
        showNotice('Please complete "' + STAGE_LABELS[i] + '" first.');
        return;
      }
    }
  }

  State.currentStage = stageId;
  saveState();
  updateStageNav();
  renderCurrentStage();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function completeStage(stageId) {
  State.completedStages[stageId] = true;
  saveState();
  updateStageNav();
  updateProgress();
}

function updateStageNav() {
  const items = document.querySelectorAll('.stage-nav__item');
  const currentIdx = STAGES.indexOf(State.currentStage);

  items.forEach(function (item) {
    const sid = item.dataset.stage;
    const idx = STAGES.indexOf(sid);
    item.removeAttribute('aria-current');
    item.classList.remove('is-complete');
    item.disabled = false;

    if (sid === State.currentStage) {
      item.setAttribute('aria-current', 'step');
    } else if (State.completedStages[sid]) {
      item.classList.add('is-complete');
    }

    if (idx > currentIdx && !State.completedStages[STAGES[idx - 1]]) {
      item.disabled = true;
    }
  });
}

function updateProgress() {
  const total = STAGES.length;
  const done = Object.keys(State.completedStages).length;
  const pct = Math.round((done / total) * 100);
  const barFill = document.getElementById('progressFill');
  const barLabel = document.getElementById('progressLabel');
  if (barFill) barFill.style.width = pct + '%';
  if (barLabel) barLabel.textContent = done + ' of ' + total + ' stages completed';
}

/* ============================================================
   3. STAGE DISPATCHER
   ============================================================ */

function renderCurrentStage() {
  if (!DATA || !DATA.meta) {
    document.getElementById('stageContainer').innerHTML =
      '<div class="panel panel--error"><p>Lesson data could not be loaded. Please refresh the page.</p></div>';
    return;
  }
  const container = document.getElementById('stageContainer');
  container.innerHTML = '';
  updateProgress();

  switch (State.currentStage) {
    case 'orientasi':    renderOrientasi(container);    break;
    case 'explorer':     renderExplorer(container);     break;
    case 'practice':     renderPractice(container);     break;
    case 'builder':      renderBuilder(container);      break;
    case 'textapp':      renderTextApp(container);      break;
    case 'conversation': renderConversation(container); break;
    case 'review':       renderReview(container);       break;
    case 'results':      renderResults(container);      break;
    default:
      container.innerHTML = '<div class="panel"><p>Stage not found.</p></div>';
  }
}

/* ============================================================
   4. STAGE: ORIENTATION
   ============================================================ */

function renderOrientasi(container) {
  container.innerHTML = `
    <section aria-labelledby="orientasi-heading">
      <div class="stage-head">
        <span class="stage-head__kicker">STAGE 1 — ORIENTATION</span>
        <p class="stage-head__goal">Understand what you will practice and how to use this application.</p>
      </div>

      <div class="panel panel--hero">
        <h2 id="orientasi-heading">${esc(DATA.meta.title)}</h2>
        <p style="font-size:1.05rem;margin-bottom:var(--space-4);">
          <strong>Learning Objective:</strong><br>
          ${esc(DATA.meta.objective)}
        </p>

        <div class="panel panel--info" style="margin-bottom:0;">
          <h3 style="margin-bottom:var(--space-3);">In this application you will:</h3>
          <ol class="objectives-list">
            <li><span class="objectives-list__num">1</span><strong>Explore</strong> the different conditional sentence patterns through interactive examples — see how condition and result connect.</li>
            <li><span class="objectives-list__num">2</span><strong>Practice</strong> choosing the correct conditional structure based on realistic workplace and school scenarios.</li>
            <li><span class="objectives-list__num">3</span><strong>Build</strong> conditional sentences by arranging parts in the correct order.</li>
            <li><span class="objectives-list__num">4</span><strong>Apply</strong> your understanding to a short text passage — identify and interpret conditional sentences in context.</li>
            <li><span class="objectives-list__num">5</span><strong>Use</strong> conditional sentences in realistic conversation scenarios.</li>
            <li><span class="objectives-list__num">6</span><strong>Review</strong> your mistakes with explanations and retry.</li>
            <li><span class="objectives-list__num">7</span><strong>Reflect</strong> on your progress and see areas for improvement.</li>
          </ol>
        </div>
      </div>

      <div class="panel panel--compact">
        <h3>How to use this application</h3>
        <div class="hero-steps">
          <div class="hero-steps__item"><span class="hero-steps__num">1</span>Work through each stage in order using the navigation bar above.</div>
          <div class="hero-steps__item"><span class="hero-steps__num">2</span>Take time to think before submitting — feedback explains the reasoning, not just "right or wrong."</div>
          <div class="hero-steps__item"><span class="hero-steps__num">3</span>You can <strong>retry</strong> any activity to improve your understanding.</div>
          <div class="hero-steps__item"><span class="hero-steps__num">4</span>Speaking activities are marked for <strong>classroom practice</strong> — your teacher will assess those.</div>
        </div>
      </div>

      <div class="panel panel--compact" style="background:var(--color-warning-soft);border-left:4px solid var(--color-warning);">
        <p style="margin:0;font-size:0.88rem;color:var(--color-warning-strong);">
          <strong>For teachers:</strong> The scores shown in this application are formative practice indicators only.
          They do not replace teacher observation, speaking assessment, or summative grading decisions.
        </p>
      </div>

      <div class="btn-group btn-group--end">
        <button type="button" class="btn btn--primary btn--large" id="startBtn">
          Start Learning →
        </button>
      </div>
    </section>`;

  document.getElementById('startBtn').addEventListener('click', function () {
    completeStage('orientasi');
    navigateTo('explorer');
  });
}

/* ============================================================
   5. STAGE: PATTERN EXPLORER
   ============================================================ */

function renderExplorer(container) {
  const types = DATA.conditionalTypes;
  if (!types || types.length === 0) {
    container.innerHTML = '<div class="panel panel--error"><p>Conditional type data is missing.</p></div>';
    return;
  }

  const typeIdx = Math.min(State.explorerTypeIdx, types.length - 1);
  const type = types[typeIdx];
  const explorerQ = DATA.explorerQuestions.find(function (q) { return q.typeId === type.id; });

  /* Build type tabs */
  const tabsHTML = types.map(function (t, i) {
    const isActive = i === typeIdx;
    const isDone = State.explorerChecked[t.id];
    return `<button type="button"
      class="explorer-tab ${isActive ? 'is-active' : ''} ${isDone ? 'is-done' : ''}"
      data-typeidx="${i}"
      aria-pressed="${isActive}"
      ${isActive ? 'aria-current="true"' : ''}>
      <span class="explorer-tab__badge">${esc(t.badge)}</span>
      <span class="explorer-tab__name">${esc(t.name)}</span>
      ${isDone ? '<span class="explorer-tab__check" aria-label="completed">✓</span>' : ''}
    </button>`;
  }).join('');

  /* Build examples */
  const examplesHTML = type.examples.map(function (ex, i) {
    const key = type.id + '-' + i;
    const revealed = !!State.explorerExampleRevealed[key];
    return `<div class="example-card ${revealed ? 'is-revealed' : ''}">
      <div class="example-card__context"><em>${esc(ex.context)}</em></div>
      <div class="example-card__condition">
        <span class="example-card__clause-label">CONDITION</span>
        <span class="example-card__clause-text">${esc(ex.condition)}</span>
      </div>
      <div class="example-card__result">
        <span class="example-card__clause-label">RESULT</span>
        ${revealed
          ? `<span class="example-card__clause-text">${esc(ex.result)}</span>
             <div class="example-card__translation">${esc(ex.indonesian)}</div>`
          : `<button type="button" class="btn btn--ghost btn--small reveal-result-btn" data-exkey="${key}" aria-label="Reveal the result clause">
              Reveal Result →
            </button>`
        }
      </div>
    </div>`;
  }).join('');

  /* Build understanding check */
  const checked = !!(explorerQ && State.explorerChecked[type.id]);
  const selectedIdx = State.explorerAnswers[type.id] !== undefined ? State.explorerAnswers[type.id] : null;

  let checkHTML = '';
  if (explorerQ) {
    const optionsHTML = explorerQ.options.map(function (opt, i) {
      let cls = 'option-btn';
      if (selectedIdx === i) cls += ' is-selected';
      if (checked) {
        cls += opt.correct ? ' is-correct' : ' is-incorrect-choice';
        if (selectedIdx === i && !opt.correct) cls += ' is-selected-wrong';
      }
      return `<button type="button" class="option-btn ${checked ? 'is-disabled' : ''}" data-optidx="${i}"
        ${checked ? 'disabled aria-disabled="true"' : ''}
        aria-pressed="${selectedIdx === i}">
        <span class="option-btn__marker" aria-hidden="true">${String.fromCharCode(65 + i)}</span>
        <span class="option-btn__text">${esc(opt.text)}</span>
        ${checked && opt.correct ? '<span class="option-btn__indicator" aria-hidden="true">✓</span>' : ''}
        ${checked && selectedIdx === i && !opt.correct ? '<span class="option-btn__indicator" aria-hidden="true">✗</span>' : ''}
      </button>`;
    }).join('');

    let feedbackHTML = '';
    if (checked && selectedIdx !== null) {
      const isCorrect = explorerQ.options[selectedIdx].correct;
      feedbackHTML = `<div class="feedback-box feedback-box--${isCorrect ? 'success' : 'error'}" role="alert">
        <span class="feedback-box__icon" aria-hidden="true">${isCorrect ? '✓' : '✗'}</span>
        <div class="feedback-box__body">${isCorrect ? explorerQ.feedback.correct : explorerQ.feedback.incorrect}</div>
      </div>`;
    }

    checkHTML = `
      <div class="panel panel--compact" style="margin-top:var(--space-4);">
        <h3>Check Your Understanding</h3>
        <p class="question-text">${esc(explorerQ.question)}</p>
        <div class="options-list" role="group" aria-label="Answer options">${optionsHTML}</div>
        ${feedbackHTML}
        <div class="btn-group">
          ${!checked
            ? `<button type="button" class="btn btn--primary" id="checkExplorerBtn"
                ${selectedIdx !== null ? '' : 'disabled'}>Check Answer</button>`
            : `<button type="button" class="btn btn--ghost" id="retryExplorerBtn">↩ Try Again</button>`
          }
        </div>
      </div>`;
  }

  /* Navigation buttons */
  const allTypesChecked = types.every(function (t) { return State.explorerChecked[t.id]; });
  const prevType = typeIdx > 0 ? types[typeIdx - 1] : null;
  const nextType = typeIdx < types.length - 1 ? types[typeIdx + 1] : null;

  container.innerHTML = `
    <section aria-labelledby="explorer-heading">
      <div class="stage-head">
        <span class="stage-head__kicker">STAGE 2 — PATTERN EXPLORER</span>
        <p class="stage-head__goal">Explore how condition and result connect in each conditional type. Reveal examples, then check your understanding.</p>
      </div>

      <div class="panel">
        <h2 id="explorer-heading" class="sr-only">Pattern Explorer</h2>

        <div class="explorer-tabs" role="tablist" aria-label="Conditional types">
          ${tabsHTML}
        </div>

        <div class="explorer-type-panel" id="explorerTypePanel">
          <div class="type-header">
            <span class="type-badge">${esc(type.badge)}</span>
            <h3 class="type-name">${esc(type.name)}</h3>
          </div>
          <div class="type-meta">
            <div class="type-structure">
              <span class="type-meta__label">Structure:</span>
              <code class="type-meta__code">${esc(type.structure)}</code>
            </div>
            ${type.altStructure ? `<div class="type-structure type-structure--alt">
              <span class="type-meta__label">Also:</span>
              <code class="type-meta__code">${esc(type.altStructure)}</code>
            </div>` : ''}
            <div class="type-use">
              <span class="type-meta__label">Used for:</span>
              <span>${esc(type.use)}</span>
            </div>
            <div class="type-signal panel panel--info" style="margin:var(--space-3) 0 0 0;padding:var(--space-2) var(--space-3);">
              <span class="type-meta__label">Signal: </span>${type.signal}
            </div>
          </div>

          <h4 style="margin-top:var(--space-4);">Examples — see how condition and result connect:</h4>
          <div class="examples-grid">${examplesHTML}</div>
        </div>

        ${checkHTML}

        <div class="btn-group btn-group--spread" style="margin-top:var(--space-5);">
          <button type="button" class="btn btn--ghost" id="prevTypeBtn" ${prevType ? '' : 'disabled'}>
            ← ${prevType ? esc(prevType.name) : 'Previous'}
          </button>
          <div style="display:flex;gap:var(--space-2);">
            ${nextType
              ? `<button type="button" class="btn btn--ghost" id="nextTypeBtn">
                  ${esc(nextType.name)} →
                </button>`
              : ''
            }
            ${allTypesChecked
              ? `<button type="button" class="btn btn--primary" id="toPracticeBtn">
                  Continue to Practice →
                </button>`
              : ''
            }
          </div>
        </div>
      </div>
    </section>`;

  /* Events */
  container.querySelectorAll('.explorer-tab').forEach(function (btn) {
    btn.addEventListener('click', function () {
      State.explorerTypeIdx = parseInt(btn.dataset.typeidx, 10);
      State.explorerExampleIdx = 0;
      saveState();
      renderExplorer(container);
    });
  });

  container.querySelectorAll('.reveal-result-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      State.explorerExampleRevealed[btn.dataset.exkey] = true;
      saveState();
      renderExplorer(container);
    });
  });

  container.querySelectorAll('.option-btn:not(.is-disabled)').forEach(function (btn) {
    btn.addEventListener('click', function () {
      State.explorerAnswers[type.id] = parseInt(btn.dataset.optidx, 10);
      saveState();
      renderExplorer(container);
    });
  });

  const checkBtn = document.getElementById('checkExplorerBtn');
  if (checkBtn) {
    checkBtn.addEventListener('click', function () {
      const selIdx = State.explorerAnswers[type.id];
      if (selIdx === undefined || selIdx === null) {
        showNotice('Please select an answer first.');
        return;
      }
      const isCorrect = explorerQ.options[selIdx].correct;
      State.explorerChecked[type.id] = true;

      /* Score — count only first attempt */
      if (!State.score['explorer_' + type.id + '_counted']) {
        State.score.explorerTotal++;
        if (isCorrect) State.score.explorerCorrect++;
        State.score['explorer_' + type.id + '_counted'] = true;
      }

      if (!isCorrect) {
        addMistake('explorer', 'explorer-' + type.id,
          type.name + ': Understanding Check',
          explorerQ.options.find(function (o) { return o.correct; }).text,
          explorerQ.options[selIdx].text,
          explorerQ.feedback.incorrect
        );
      }

      saveState();
      renderExplorer(container);
    });
  }

  const retryBtn = document.getElementById('retryExplorerBtn');
  if (retryBtn) {
    retryBtn.addEventListener('click', function () {
      State.explorerChecked[type.id] = false;
      delete State.explorerAnswers[type.id];
      saveState();
      renderExplorer(container);
    });
  }

  const prevBtn = document.getElementById('prevTypeBtn');
  if (prevBtn && !prevBtn.disabled) {
    prevBtn.addEventListener('click', function () {
      State.explorerTypeIdx = Math.max(0, typeIdx - 1);
      saveState();
      renderExplorer(container);
    });
  }

  const nextTypeBtn = document.getElementById('nextTypeBtn');
  if (nextTypeBtn) {
    nextTypeBtn.addEventListener('click', function () {
      State.explorerTypeIdx = Math.min(types.length - 1, typeIdx + 1);
      saveState();
      renderExplorer(container);
    });
  }

  const toPracticeBtn = document.getElementById('toPracticeBtn');
  if (toPracticeBtn) {
    toPracticeBtn.addEventListener('click', function () {
      completeStage('explorer');
      navigateTo('practice');
    });
  }
}

/* ============================================================
   6. STAGE: CONTEXT PRACTICE
   ============================================================ */

function renderPractice(container) {
  const questions = DATA.practiceQuestions;
  if (!questions || questions.length === 0) {
    container.innerHTML = '<div class="panel panel--error"><p>Practice questions data is missing.</p></div>';
    return;
  }

  const idx = Math.min(State.practiceIdx, questions.length - 1);
  const q = questions[idx];
  const checked = !!State.practiceChecked[q.id];
  const selectedIdx = State.practiceAnswers[q.id] !== undefined ? State.practiceAnswers[q.id] : null;
  const progress = idx + 1;
  const total = questions.length;

  /* Options */
  const optionsHTML = q.options.map(function (opt, i) {
    let extraCls = '';
    if (checked) {
      if (opt.correct) extraCls = ' is-correct';
      else if (selectedIdx === i) extraCls = ' is-selected-wrong';
      else extraCls = ' is-incorrect-choice';
    } else if (selectedIdx === i) {
      extraCls = ' is-selected';
    }
    return `<button type="button"
      class="option-btn${extraCls}${checked ? ' is-disabled' : ''}"
      data-optidx="${i}"
      ${checked ? 'disabled aria-disabled="true"' : ''}
      aria-pressed="${selectedIdx === i}">
      <span class="option-btn__marker" aria-hidden="true">${String.fromCharCode(65 + i)}</span>
      <span class="option-btn__text">${esc(opt.text)}</span>
      ${checked && opt.correct ? '<span class="option-btn__indicator" aria-hidden="true">✓</span>' : ''}
      ${checked && selectedIdx === i && !opt.correct ? '<span class="option-btn__indicator" aria-hidden="true">✗</span>' : ''}
    </button>`;
  }).join('');

  /* Feedback */
  let feedbackHTML = '';
  if (checked && selectedIdx !== null) {
    const isCorrect = q.options[selectedIdx].correct;
    let feedbackText = '';
    if (isCorrect) {
      feedbackText = q.feedback.correct;
    } else if (q.feedback.incorrect && typeof q.feedback.incorrect === 'object') {
      feedbackText = q.feedback.incorrect[selectedIdx] || q.feedback.general || '';
    } else {
      feedbackText = q.feedback.incorrect || q.feedback.general || '';
    }
    if (q.feedback.general && !isCorrect) {
      feedbackText += '<br><br><strong>Concept review:</strong> ' + q.feedback.general;
    }
    feedbackHTML = `<div class="feedback-box feedback-box--${isCorrect ? 'success' : 'error'}" role="alert">
      <span class="feedback-box__icon" aria-hidden="true">${isCorrect ? '✓' : '✗'}</span>
      <div class="feedback-box__body">${feedbackText}</div>
    </div>`;
  }

  /* Stem for completion type */
  const stemHTML = q.type === 'complete' && q.stem
    ? `<div class="sentence-stem">${esc(q.stem)}</div>`
    : '';

  /* Nav */
  const allDone = questions.every(function (qq) { return !!State.practiceChecked[qq.id]; });
  const hasPrev = idx > 0;
  const hasNext = idx < questions.length - 1;

  container.innerHTML = `
    <section aria-labelledby="practice-heading">
      <div class="stage-head">
        <span class="stage-head__kicker">STAGE 3 — CONTEXT PRACTICE</span>
        <p class="stage-head__goal">Choose the most appropriate conditional sentence based on the situation. Think about the context before selecting.</p>
      </div>

      <div class="question-progress" aria-label="Question progress">
        <span class="question-progress__label">Question ${progress} of ${total}</span>
        <div class="question-progress__dots">
          ${questions.map(function (qq, i) {
            let cls = 'q-dot';
            if (State.practiceChecked[qq.id]) {
              cls += State.practiceAnswers[qq.id] !== undefined && qq.options[State.practiceAnswers[qq.id]].correct
                ? ' q-dot--correct' : ' q-dot--incorrect';
            }
            if (i === idx) cls += ' q-dot--current';
            return `<span class="${cls}" title="Question ${i + 1}" aria-hidden="true"></span>`;
          }).join('')}
        </div>
      </div>

      <div class="panel">
        <h2 id="practice-heading" class="sr-only">Context Practice</h2>
        <div class="scenario-box">
          <span class="scenario-box__label">Scenario</span>
          <p class="scenario-box__text">${esc(q.scenario)}</p>
        </div>
        <div class="question-text-main">
          <p>${esc(q.question)}</p>
          ${stemHTML}
        </div>
        <div class="options-list" role="group" aria-label="Answer options">${optionsHTML}</div>
        ${feedbackHTML}
        <div class="btn-group btn-group--spread" style="margin-top:var(--space-4);">
          <button type="button" class="btn btn--ghost" ${hasPrev ? '' : 'disabled'} id="prevPracticeBtn">
            ← Previous
          </button>
          <div style="display:flex;gap:var(--space-2);flex-wrap:wrap;">
            ${checked
              ? `<button type="button" class="btn btn--ghost" id="retryPracticeBtn">↩ Retry</button>`
              : `<button type="button" class="btn btn--primary" id="checkPracticeBtn"
                  ${selectedIdx !== null ? '' : 'disabled'}>Check Answer</button>`
            }
            ${hasNext
              ? `<button type="button" class="btn btn--ghost" id="nextPracticeBtn"
                  ${checked ? '' : 'disabled'}>Next →</button>`
              : allDone
                ? `<button type="button" class="btn btn--primary" id="toBuilderBtn">Continue to Sentence Builder →</button>`
                : `<button type="button" class="btn btn--ghost" id="nextPracticeBtn" disabled>Next →</button>`
            }
          </div>
        </div>
      </div>
    </section>`;

  /* Events */
  container.querySelectorAll('.option-btn:not(.is-disabled)').forEach(function (btn) {
    btn.addEventListener('click', function () {
      State.practiceAnswers[q.id] = parseInt(btn.dataset.optidx, 10);
      saveState();
      renderPractice(container);
    });
  });

  const checkBtn = document.getElementById('checkPracticeBtn');
  if (checkBtn) {
    checkBtn.addEventListener('click', function () {
      const sel = State.practiceAnswers[q.id];
      if (sel === undefined) { showNotice('Please select an answer first.'); return; }
      State.practiceChecked[q.id] = true;

      if (!State.score['practice_' + q.id + '_counted']) {
        State.score.practiceTotal++;
        if (q.options[sel].correct) State.score.practiceCorrect++;
        State.score['practice_' + q.id + '_counted'] = true;
      }

      if (!q.options[sel].correct) {
        const correctOpt = q.options.find(function (o) { return o.correct; });
        let incorrectFb = '';
        if (q.feedback.incorrect && typeof q.feedback.incorrect === 'object') {
          incorrectFb = q.feedback.incorrect[sel] || '';
        } else {
          incorrectFb = q.feedback.incorrect || '';
        }
        /* Append general concept reminder if not already the full feedback */
        if (q.feedback.general && incorrectFb !== q.feedback.general) {
          incorrectFb = incorrectFb ? incorrectFb + ' ' + q.feedback.general : q.feedback.general;
        }
        addMistake('practice', q.id,
          'Practice Q' + (idx + 1) + ': ' + q.question.substring(0, 60) + '…',
          correctOpt ? correctOpt.text : '',
          q.options[sel].text,
          incorrectFb
        );
      }

      saveState();
      renderPractice(container);
    });
  }

  const retryBtn = document.getElementById('retryPracticeBtn');
  if (retryBtn) {
    retryBtn.addEventListener('click', function () {
      State.practiceChecked[q.id] = false;
      delete State.practiceAnswers[q.id];
      saveState();
      renderPractice(container);
    });
  }

  const prevBtn = document.getElementById('prevPracticeBtn');
  if (prevBtn && !prevBtn.disabled) {
    prevBtn.addEventListener('click', function () {
      State.practiceIdx = Math.max(0, idx - 1);
      saveState();
      renderPractice(container);
    });
  }

  const nextBtn = document.getElementById('nextPracticeBtn');
  if (nextBtn && !nextBtn.disabled) {
    nextBtn.addEventListener('click', function () {
      State.practiceIdx = Math.min(questions.length - 1, idx + 1);
      saveState();
      renderPractice(container);
    });
  }

  const toBuilderBtn = document.getElementById('toBuilderBtn');
  if (toBuilderBtn) {
    toBuilderBtn.addEventListener('click', function () {
      completeStage('practice');
      navigateTo('builder');
    });
  }
}

/* ============================================================
   7. STAGE: SENTENCE BUILDER
   ============================================================ */

function renderBuilder(container) {
  const sentences = DATA.builderSentences;
  if (!sentences || sentences.length === 0) {
    container.innerHTML = '<div class="panel panel--error"><p>Sentence builder data is missing.</p></div>';
    return;
  }

  const idx = Math.min(State.builderIdx, sentences.length - 1);
  const sent = sentences[idx];
  const checked = !!State.builderChecked[sent.id];

  /* Current order for this sentence */
  if (!State.builderOrders[sent.id]) {
    State.builderOrders[sent.id] = [];
  }
  const currentOrder = State.builderOrders[sent.id];

  /* Parts available (not yet placed) */
  const placed = new Set(currentOrder);
  const available = sent.parts.filter(function (p) { return !placed.has(p.id); });

  /* Build the sentence display */
  const sentenceBoxHTML = currentOrder.length === 0
    ? '<div class="builder-placeholder">Click parts below to add them here</div>'
    : currentOrder.map(function (pid, i) {
        const part = sent.parts.find(function (p) { return p.id === pid; });
        if (!part) return '';
        return `<button type="button" class="builder-placed-part" data-pid="${esc(pid)}"
          title="Click to remove" aria-label="Remove: ${esc(part.text)}"
          ${checked ? 'disabled aria-disabled="true"' : ''}>
          ${esc(part.text)}
          ${!checked ? '<span aria-hidden="true" class="builder-remove-icon">×</span>' : ''}
        </button>`;
      }).join(' ');

  const availableHTML = available.map(function (p) {
    return `<button type="button" class="builder-part" data-pid="${esc(p.id)}"
      aria-label="Add part: ${esc(p.text)}"
      ${checked ? 'disabled aria-disabled="true"' : ''}>
      ${esc(p.text)}
    </button>`;
  }).join('');

  /* Feedback */
  let feedbackHTML = '';
  if (checked) {
    const correctOrder = sent.correctOrder;
    const isCorrect = JSON.stringify(currentOrder) === JSON.stringify(correctOrder);
    const correctSentence = correctOrder.map(function (pid) {
      const p = sent.parts.find(function (pp) { return pp.id === pid; });
      return p ? p.text : '';
    }).join(' ');

    feedbackHTML = `<div class="feedback-box feedback-box--${isCorrect ? 'success' : 'error'}" role="alert">
      <span class="feedback-box__icon" aria-hidden="true">${isCorrect ? '✓' : '✗'}</span>
      <div class="feedback-box__body">
        ${isCorrect
          ? '<strong>Correct!</strong> '
          : `<strong>Not quite.</strong> The correct order is:<br>
             <div class="correct-sentence">${esc(correctSentence)}</div>`
        }
        <div class="explanation-text" style="margin-top:var(--space-2);">${sent.explanation}</div>
      </div>
    </div>`;
  }

  /* Hint */
  const hintHTML = `<details class="hint-reveal">
    <summary>💡 Hint</summary>
    <div class="hint-reveal__content"><p>${esc(sent.hint)}</p></div>
  </details>`;

  const allDone = sentences.every(function (s) { return !!State.builderChecked[s.id]; });
  const hasPrev = idx > 0;
  const hasNext = idx < sentences.length - 1;

  const typeInfo = DATA.conditionalTypes.find(function (t) { return t.id === sent.typeId; });

  container.innerHTML = `
    <section aria-labelledby="builder-heading">
      <div class="stage-head">
        <span class="stage-head__kicker">STAGE 4 — SENTENCE BUILDER</span>
        <p class="stage-head__goal">Arrange the parts in the correct order to form a conditional sentence. Click parts to add or remove them.</p>
      </div>

      <div class="question-progress" aria-label="Sentence progress">
        <span class="question-progress__label">Sentence ${idx + 1} of ${sentences.length}</span>
        <div class="question-progress__dots">
          ${sentences.map(function (s, i) {
            let cls = 'q-dot';
            if (State.builderChecked[s.id]) {
              const ord = State.builderOrders[s.id] || [];
              cls += JSON.stringify(ord) === JSON.stringify(s.correctOrder) ? ' q-dot--correct' : ' q-dot--incorrect';
            }
            if (i === idx) cls += ' q-dot--current';
            return `<span class="${cls}" title="Sentence ${i + 1}" aria-hidden="true"></span>`;
          }).join('')}
        </div>
      </div>

      <div class="panel">
        <h2 id="builder-heading" class="sr-only">Sentence Builder</h2>

        ${typeInfo ? `<div class="type-tag"><span class="type-badge type-badge--sm">${esc(typeInfo.badge)}</span> ${esc(typeInfo.name)}</div>` : ''}

        <p class="question-text-main">${esc(sent.instruction)}</p>

        ${hintHTML}

        <div class="builder-area" id="builderArea" aria-label="Sentence being built">
          ${sentenceBoxHTML}
        </div>

        <div class="builder-parts-pool" id="builderPartsPool" aria-label="Available parts">
          <p class="builder-parts-label">Available parts — click to add to your sentence:</p>
          ${availableHTML || '<p class="builder-parts-empty">All parts have been placed. Check your answer or remove a part to rearrange.</p>'}
        </div>

        ${feedbackHTML}

        <div class="btn-group btn-group--spread" style="margin-top:var(--space-4);">
          <button type="button" class="btn btn--ghost" ${hasPrev ? '' : 'disabled'} id="prevBuilderBtn">
            ← Previous
          </button>
          <div style="display:flex;gap:var(--space-2);flex-wrap:wrap;">
            ${!checked
              ? `<button type="button" class="btn btn--ghost" id="clearBuilderBtn"
                  ${currentOrder.length > 0 ? '' : 'disabled'}>Clear</button>
                 <button type="button" class="btn btn--primary" id="checkBuilderBtn"
                  ${currentOrder.length === sent.parts.length ? '' : 'disabled'}>Check Sentence</button>`
              : `<button type="button" class="btn btn--ghost" id="retryBuilderBtn">↩ Retry</button>`
            }
            ${hasNext
              ? `<button type="button" class="btn btn--ghost" id="nextBuilderBtn"
                  ${checked ? '' : 'disabled'}>Next →</button>`
              : allDone
                ? `<button type="button" class="btn btn--primary" id="toTextAppBtn">Continue to Text Application →</button>`
                : `<button type="button" class="btn btn--ghost" disabled>Next →</button>`
            }
          </div>
        </div>
      </div>
    </section>`;

  /* Events */
  container.querySelectorAll('.builder-part').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (checked) return;
      State.builderOrders[sent.id].push(btn.dataset.pid);
      saveState();
      renderBuilder(container);
    });
  });

  container.querySelectorAll('.builder-placed-part').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (checked) return;
      const order = State.builderOrders[sent.id];
      const i = order.indexOf(btn.dataset.pid);
      if (i !== -1) order.splice(i, 1);
      saveState();
      renderBuilder(container);
    });
  });

  const clearBtn = document.getElementById('clearBuilderBtn');
  if (clearBtn && !clearBtn.disabled) {
    clearBtn.addEventListener('click', function () {
      State.builderOrders[sent.id] = [];
      saveState();
      renderBuilder(container);
    });
  }

  const checkBtn = document.getElementById('checkBuilderBtn');
  if (checkBtn && !checkBtn.disabled) {
    checkBtn.addEventListener('click', function () {
      State.builderChecked[sent.id] = true;
      const isCorrect = JSON.stringify(State.builderOrders[sent.id]) === JSON.stringify(sent.correctOrder);

      if (!State.score['builder_' + sent.id + '_counted']) {
        State.score.builderTotal++;
        if (isCorrect) State.score.builderCorrect++;
        State.score['builder_' + sent.id + '_counted'] = true;
      }

      if (!isCorrect) {
        const correctSentence = sent.correctOrder.map(function (pid) {
          const p = sent.parts.find(function (pp) { return pp.id === pid; });
          return p ? p.text : '';
        }).join(' ');
        addMistake('builder', sent.id,
          'Sentence Builder ' + (idx + 1),
          correctSentence,
          State.builderOrders[sent.id].map(function (pid) {
            const p = sent.parts.find(function (pp) { return pp.id === pid; });
            return p ? p.text : pid;
          }).join(' '),
          sent.explanation
        );
      }

      saveState();
      renderBuilder(container);
    });
  }

  const retryBtn = document.getElementById('retryBuilderBtn');
  if (retryBtn) {
    retryBtn.addEventListener('click', function () {
      State.builderChecked[sent.id] = false;
      State.builderOrders[sent.id] = [];
      saveState();
      renderBuilder(container);
    });
  }

  const prevBtn = document.getElementById('prevBuilderBtn');
  if (prevBtn && !prevBtn.disabled) {
    prevBtn.addEventListener('click', function () {
      State.builderIdx = Math.max(0, idx - 1);
      saveState();
      renderBuilder(container);
    });
  }

  const nextBtn = document.getElementById('nextBuilderBtn');
  if (nextBtn && !nextBtn.disabled) {
    nextBtn.addEventListener('click', function () {
      State.builderIdx = Math.min(sentences.length - 1, idx + 1);
      saveState();
      renderBuilder(container);
    });
  }

  const toTextAppBtn = document.getElementById('toTextAppBtn');
  if (toTextAppBtn) {
    toTextAppBtn.addEventListener('click', function () {
      completeStage('builder');
      navigateTo('textapp');
    });
  }
}

/* ============================================================
   8. STAGE: TEXT APPLICATION
   ============================================================ */

function renderTextApp(container) {
  const passage = DATA.textPassage;
  if (!passage) {
    container.innerHTML = '<div class="panel panel--error"><p>Text passage data is missing.</p></div>';
    return;
  }

  const questions = passage.questions;
  const allChecked = questions.every(function (q) { return !!State.textChecked[q.id]; });

  /* Format text */
  const textHTML = passage.text.map(function (line) {
    if (line === '') return '<br>';
    /* Escape HTML first, then highlight conditional markers */
    const escaped = esc(line);
    const highlighted = escaped.replace(/(if|when|unless)\b/gi, function (m) {
      return '<mark class="cond-highlight">' + m + '</mark>';
    });
    return '<p>' + highlighted + '</p>';
  }).join('');

  /* Questions */
  const questionsHTML = questions.map(function (q, qi) {
    const checked = !!State.textChecked[q.id];
    const selectedIdx = State.textAnswers[q.id] !== undefined ? State.textAnswers[q.id] : null;

    const optionsHTML = q.options.map(function (opt, i) {
      let extraCls = '';
      if (checked) {
        if (opt.correct) extraCls = ' is-correct';
        else if (selectedIdx === i) extraCls = ' is-selected-wrong';
        else extraCls = ' is-incorrect-choice';
      } else if (selectedIdx === i) {
        extraCls = ' is-selected';
      }
      return `<button type="button"
        class="option-btn${extraCls}${checked ? ' is-disabled' : ''}"
        data-qid="${esc(q.id)}" data-optidx="${i}"
        ${checked ? 'disabled aria-disabled="true"' : ''}
        aria-pressed="${selectedIdx === i}">
        <span class="option-btn__marker" aria-hidden="true">${String.fromCharCode(65 + i)}</span>
        <span class="option-btn__text">${esc(opt.text)}</span>
        ${checked && opt.correct ? '<span class="option-btn__indicator" aria-hidden="true">✓</span>' : ''}
        ${checked && selectedIdx === i && !opt.correct ? '<span class="option-btn__indicator" aria-hidden="true">✗</span>' : ''}
      </button>`;
    }).join('');

    let feedbackHTML = '';
    if (checked && selectedIdx !== null) {
      const isCorrect = q.options[selectedIdx].correct;
      let fbText = isCorrect ? q.feedback.correct : q.feedback.incorrect;
      if (!isCorrect && q.feedback.incorrect && typeof q.feedback.incorrect === 'object') {
        fbText = q.feedback.incorrect[selectedIdx] || q.feedback.incorrect;
      }
      feedbackHTML = `<div class="feedback-box feedback-box--${isCorrect ? 'success' : 'error'}" role="alert">
        <span class="feedback-box__icon" aria-hidden="true">${isCorrect ? '✓' : '✗'}</span>
        <div class="feedback-box__body">${fbText}</div>
      </div>`;
    }

    return `<div class="text-question panel panel--compact" id="tq-${esc(q.id)}">
      <p class="question-number-label">Question ${qi + 1} of ${questions.length}</p>
      <p class="question-text-main">${esc(q.question)}</p>
      <div class="options-list" role="group" aria-label="Answer options for question ${qi + 1}">${optionsHTML}</div>
      ${feedbackHTML}
      <div class="btn-group" style="margin-top:var(--space-3);">
        ${!checked
          ? `<button type="button" class="btn btn--primary btn--small check-text-btn" data-qid="${esc(q.id)}"
              ${selectedIdx !== null ? '' : 'disabled'}>Check Answer</button>`
          : `<button type="button" class="btn btn--ghost btn--small retry-text-btn" data-qid="${esc(q.id)}">↩ Retry</button>`
        }
      </div>
    </div>`;
  }).join('');

  container.innerHTML = `
    <section aria-labelledby="textapp-heading">
      <div class="stage-head">
        <span class="stage-head__kicker">STAGE 5 — TEXT APPLICATION</span>
        <p class="stage-head__goal">Read the text and answer the comprehension questions about conditional sentences in context.</p>
      </div>

      <div class="panel">
        <h2 id="textapp-heading">${esc(passage.title)}</h2>
        <p style="font-size:0.88rem;color:var(--color-ink-muted);margin-bottom:var(--space-4);">${esc(passage.context)}</p>
        <div class="reading-text" aria-label="Reading passage">
          ${textHTML}
        </div>
        <p style="font-size:0.8rem;color:var(--color-ink-muted);margin-top:var(--space-3);">
          <mark class="cond-highlight" style="font-size:inherit;">Highlighted words</mark> — conditional markers in the text.
        </p>
      </div>

      <div class="panel">
        <h3>Comprehension Questions</h3>
        <p style="font-size:0.88rem;color:var(--color-ink-muted);">Answer each question based on the text above.</p>
        ${questionsHTML}
      </div>

      ${allChecked ? `
        <div class="btn-group btn-group--end">
          <button type="button" class="btn btn--primary" id="toConvBtn">Continue to Conversation →</button>
        </div>` : ''}
    </section>`;

  /* Events */
  container.querySelectorAll('.option-btn:not(.is-disabled)').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const qid = btn.dataset.qid;
      State.textAnswers[qid] = parseInt(btn.dataset.optidx, 10);
      saveState();
      renderTextApp(container);
    });
  });

  container.querySelectorAll('.check-text-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const qid = btn.dataset.qid;
      const sel = State.textAnswers[qid];
      if (sel === undefined) { showNotice('Please select an answer first.'); return; }
      const q = questions.find(function (qq) { return qq.id === qid; });
      if (!q) return;
      State.textChecked[qid] = true;

      if (!State.score['text_' + qid + '_counted']) {
        State.score.textTotal++;
        if (q.options[sel].correct) State.score.textCorrect++;
        State.score['text_' + qid + '_counted'] = true;
      }

      if (!q.options[sel].correct) {
        const correctOpt = q.options.find(function (o) { return o.correct; });
        let fbText = '';
        if (q.feedback.incorrect && typeof q.feedback.incorrect === 'object') {
          fbText = q.feedback.incorrect[sel] || '';
        } else {
          fbText = q.feedback.incorrect || '';
        }
        if (!fbText) fbText = q.feedback.correct || '';
        addMistake('textapp', qid,
          'Text Q: ' + q.question.substring(0, 60) + '…',
          correctOpt ? correctOpt.text : '',
          q.options[sel].text,
          fbText
        );
      }

      saveState();
      renderTextApp(container);
    });
  });

  container.querySelectorAll('.retry-text-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const qid = btn.dataset.qid;
      State.textChecked[qid] = false;
      delete State.textAnswers[qid];
      saveState();
      renderTextApp(container);
    });
  });

  const toConvBtn = document.getElementById('toConvBtn');
  if (toConvBtn) {
    toConvBtn.addEventListener('click', function () {
      completeStage('textapp');
      navigateTo('conversation');
    });
  }
}

/* ============================================================
   9. STAGE: CONVERSATION SCENARIO
   ============================================================ */

function renderConversation(container) {
  const convs = DATA.conversations;
  if (!convs || convs.length === 0) {
    container.innerHTML = '<div class="panel panel--error"><p>Conversation data is missing.</p></div>';
    return;
  }

  const idx = Math.min(State.convIdx, convs.length - 1);
  const conv = convs[idx];
  const checked = !!State.convChecked[conv.id];
  const selectedIdx = State.convAnswers[conv.id] !== undefined ? State.convAnswers[conv.id] : null;
  const allDone = convs.every(function (c) { return !!State.convChecked[c.id]; });

  /* Dialogue */
  const dialogueHTML = conv.dialogue.map(function (line) {
    const isBlank = line.text === '___';
    if (isBlank) {
      if (checked && selectedIdx !== null) {
        const optText = conv.options[selectedIdx].text;
        return `<div class="dialogue-line dialogue-line--response is-filled">
          <span class="dialogue-speaker">${esc(line.speaker)}</span>
          <span class="dialogue-text">"${esc(optText)}"</span>
        </div>`;
      }
      return `<div class="dialogue-line dialogue-line--response">
        <span class="dialogue-speaker">${esc(line.speaker)}</span>
        <span class="dialogue-blank">— select a response below —</span>
      </div>`;
    }
    return `<div class="dialogue-line">
      <span class="dialogue-speaker">${esc(line.speaker)}</span>
      <span class="dialogue-text">"${esc(line.text)}"</span>
    </div>`;
  }).join('');

  /* Options */
  const optionsHTML = conv.options.map(function (opt, i) {
    let extraCls = '';
    if (checked) {
      if (opt.correct) extraCls = ' is-correct';
      else if (selectedIdx === i) extraCls = ' is-selected-wrong';
      else extraCls = ' is-incorrect-choice';
    } else if (selectedIdx === i) {
      extraCls = ' is-selected';
    }
    return `<button type="button"
      class="option-btn${extraCls}${checked ? ' is-disabled' : ''}"
      data-optidx="${i}"
      ${checked ? 'disabled aria-disabled="true"' : ''}
      aria-pressed="${selectedIdx === i}">
      <span class="option-btn__marker" aria-hidden="true">${String.fromCharCode(65 + i)}</span>
      <span class="option-btn__text">${esc(opt.text)}</span>
      ${checked && opt.correct ? '<span class="option-btn__indicator" aria-hidden="true">✓</span>' : ''}
      ${checked && selectedIdx === i && !opt.correct ? '<span class="option-btn__indicator" aria-hidden="true">✗</span>' : ''}
    </button>`;
  }).join('');

  /* Per-option feedback */
  let feedbackHTML = '';
  if (checked && selectedIdx !== null) {
    const isCorrect = conv.options[selectedIdx].correct;
    feedbackHTML = `<div class="feedback-box feedback-box--${isCorrect ? 'success' : 'error'}" role="alert">
      <span class="feedback-box__icon" aria-hidden="true">${isCorrect ? '✓' : '✗'}</span>
      <div class="feedback-box__body">${conv.options[selectedIdx].feedback}</div>
    </div>`;
  }

  /* Speaking prompt */
  let speakingHTML = '';
  if (checked && conv.speakingPrompt && conv.speakingPrompt.enabled) {
    const sp = conv.speakingPrompt;
    speakingHTML = `<div class="speaking-prompt panel panel--accent" style="margin-top:var(--space-4);">
      <h4>🗣 Speaking Practice (Classroom Activity)</h4>
      <p>${esc(sp.prompt)}</p>
      <div class="speaking-criteria">
        <p class="speaking-criteria__label"><strong>Assessment criteria (for teacher/self-check):</strong></p>
        <ul>
          ${sp.criteria.map(function (c) { return '<li>' + esc(c) + '</li>'; }).join('')}
        </ul>
      </div>
      <p style="font-size:0.82rem;color:var(--color-ink-muted);margin:var(--space-2) 0 0 0;">
        This speaking task is for classroom practice. Your teacher will assess your spoken performance.
      </p>
    </div>`;
  }

  const hasPrev = idx > 0;
  const hasNext = idx < convs.length - 1;

  container.innerHTML = `
    <section aria-labelledby="conv-heading">
      <div class="stage-head">
        <span class="stage-head__kicker">STAGE 6 — CONVERSATION SCENARIO</span>
        <p class="stage-head__goal">Read the conversation context, then select the most appropriate response. Speaking tasks are for classroom practice.</p>
      </div>

      <div class="question-progress" aria-label="Conversation progress">
        <span class="question-progress__label">Scenario ${idx + 1} of ${convs.length}</span>
        <div class="question-progress__dots">
          ${convs.map(function (c, i) {
            let cls = 'q-dot';
            if (State.convChecked[c.id]) {
              cls += State.convAnswers[c.id] !== undefined && convs[i].options[State.convAnswers[c.id]].correct
                ? ' q-dot--correct' : ' q-dot--incorrect';
            }
            if (i === idx) cls += ' q-dot--current';
            return `<span class="${cls}" title="Scenario ${i + 1}" aria-hidden="true"></span>`;
          }).join('')}
        </div>
      </div>

      <div class="panel">
        <h2 id="conv-heading">${esc(conv.title)}</h2>
        <div class="scenario-box">
          <span class="scenario-box__label">Context</span>
          <p class="scenario-box__text">${esc(conv.context)}</p>
        </div>

        <div class="dialogue-box" aria-label="Conversation dialogue">${dialogueHTML}</div>

        <div class="panel panel--compact" style="margin-top:var(--space-4);">
          <p class="question-text-main">${esc(conv.question)}</p>
          <div class="options-list" role="group" aria-label="Response options">${optionsHTML}</div>
          ${feedbackHTML}
          ${speakingHTML}
        </div>

        <div class="btn-group btn-group--spread" style="margin-top:var(--space-4);">
          <button type="button" class="btn btn--ghost" ${hasPrev ? '' : 'disabled'} id="prevConvBtn">
            ← Previous
          </button>
          <div style="display:flex;gap:var(--space-2);flex-wrap:wrap;">
            ${checked
              ? `<button type="button" class="btn btn--ghost" id="retryConvBtn">↩ Retry</button>`
              : `<button type="button" class="btn btn--primary" id="checkConvBtn"
                  ${selectedIdx !== null ? '' : 'disabled'}>Check Answer</button>`
            }
            ${hasNext
              ? `<button type="button" class="btn btn--ghost" id="nextConvBtn"
                  ${checked ? '' : 'disabled'}>Next →</button>`
              : allDone
                ? `<button type="button" class="btn btn--primary" id="toReviewBtn">Continue to Review →</button>`
                : `<button type="button" class="btn btn--ghost" disabled>Next →</button>`
            }
          </div>
        </div>
      </div>
    </section>`;

  /* Events */
  container.querySelectorAll('.option-btn:not(.is-disabled)').forEach(function (btn) {
    btn.addEventListener('click', function () {
      State.convAnswers[conv.id] = parseInt(btn.dataset.optidx, 10);
      saveState();
      renderConversation(container);
    });
  });

  const checkBtn = document.getElementById('checkConvBtn');
  if (checkBtn) {
    checkBtn.addEventListener('click', function () {
      const sel = State.convAnswers[conv.id];
      if (sel === undefined) { showNotice('Please select a response first.'); return; }
      State.convChecked[conv.id] = true;

      if (!State.score['conv_' + conv.id + '_counted']) {
        State.score.convTotal++;
        if (conv.options[sel].correct) State.score.convCorrect++;
        State.score['conv_' + conv.id + '_counted'] = true;
      }

      if (!conv.options[sel].correct) {
        const correctOpt = conv.options.find(function (o) { return o.correct; });
        addMistake('conversation', conv.id,
          conv.title + ': Response Selection',
          correctOpt ? correctOpt.text : '',
          conv.options[sel].text,
          conv.options[sel].feedback
        );
      }

      saveState();
      renderConversation(container);
    });
  }

  const retryBtn = document.getElementById('retryConvBtn');
  if (retryBtn) {
    retryBtn.addEventListener('click', function () {
      State.convChecked[conv.id] = false;
      delete State.convAnswers[conv.id];
      saveState();
      renderConversation(container);
    });
  }

  const prevBtn = document.getElementById('prevConvBtn');
  if (prevBtn && !prevBtn.disabled) {
    prevBtn.addEventListener('click', function () {
      State.convIdx = Math.max(0, idx - 1);
      saveState();
      renderConversation(container);
    });
  }

  const nextBtn = document.getElementById('nextConvBtn');
  if (nextBtn && !nextBtn.disabled) {
    nextBtn.addEventListener('click', function () {
      State.convIdx = Math.min(convs.length - 1, idx + 1);
      saveState();
      renderConversation(container);
    });
  }

  const toReviewBtn = document.getElementById('toReviewBtn');
  if (toReviewBtn) {
    toReviewBtn.addEventListener('click', function () {
      completeStage('conversation');
      navigateTo('review');
    });
  }
}

/* ============================================================
   10. STAGE: REVIEW
   ============================================================ */

function renderReview(container) {
  const mistakes = State.mistakes;

  /* Deduplicate by questionId — keep only latest per question */
  const seenIds = {};
  const uniqueMistakes = mistakes.filter(function (m) {
    if (seenIds[m.questionId]) return false;
    seenIds[m.questionId] = true;
    return true;
  });

  if (uniqueMistakes.length === 0) {
    container.innerHTML = `
      <section aria-labelledby="review-heading">
        <div class="stage-head">
          <span class="stage-head__kicker">STAGE 7 — REVIEW</span>
          <p class="stage-head__goal">Review your mistakes and understand where to improve.</p>
        </div>
        <div class="panel panel--success">
          <h2 id="review-heading">Excellent work!</h2>
          <p>You had no mistakes to review across all activities. You answered every question correctly on your first attempt.</p>
          <p>You can still revisit any earlier stage using the navigation bar above.</p>
        </div>
        <div class="btn-group btn-group--end">
          <button type="button" class="btn btn--primary" id="toResultsBtn">Continue to Results →</button>
        </div>
      </section>`;

    document.getElementById('toResultsBtn').addEventListener('click', function () {
      completeStage('review');
      navigateTo('results');
    });
    return;
  }

  const stageLabels = DATA.reviewLabels || {};

  const mistakesHTML = uniqueMistakes.map(function (m, i) {
    const stageName = stageLabels[m.stage] || m.stage;
    return `<div class="mistake-item" id="mistake-${i}">
      <div class="mistake-item__header">
        <span class="mistake-item__stage-badge">${esc(stageName)}</span>
        <span class="mistake-item__label">${esc(m.label)}</span>
      </div>
      <div class="mistake-item__body">
        <div class="mistake-item__row mistake-item__row--wrong">
          <span class="mistake-item__row-label">Your answer:</span>
          <span class="mistake-item__row-text">${esc(m.selectedText)}</span>
        </div>
        <div class="mistake-item__row mistake-item__row--correct">
          <span class="mistake-item__row-label">Correct answer:</span>
          <span class="mistake-item__row-text">${esc(m.correctText)}</span>
        </div>
        <div class="mistake-item__explanation">${m.explanation}</div>
      </div>
    </div>`;
  }).join('');

  container.innerHTML = `
    <section aria-labelledby="review-heading">
      <div class="stage-head">
        <span class="stage-head__kicker">STAGE 7 — REVIEW</span>
        <p class="stage-head__goal">Review your mistakes. Read the explanations carefully — then go back and retry if needed.</p>
      </div>

      <div class="panel">
        <h2 id="review-heading">Your Mistakes (${uniqueMistakes.length})</h2>
        <p style="font-size:0.9rem;color:var(--color-ink-muted);">
          These are questions where your first answer was incorrect. 
          Read the explanation for each one, then use the navigation bar to return and retry any stage.
        </p>
        <div class="mistakes-list">${mistakesHTML}</div>
      </div>

      <div class="btn-group btn-group--end">
        <button type="button" class="btn btn--primary" id="toResultsBtn">Continue to Results →</button>
      </div>
    </section>`;

  document.getElementById('toResultsBtn').addEventListener('click', function () {
    completeStage('review');
    navigateTo('results');
  });
}

/* ============================================================
   11. STAGE: RESULTS
   ============================================================ */

function renderResults(container) {
  const s = State.score;

  /* Aggregate totals */
  const totalCorrect = s.explorerCorrect + s.practiceCorrect + s.builderCorrect + s.textCorrect + s.convCorrect;
  const totalQuestions = s.explorerTotal + s.practiceTotal + s.builderTotal + s.textTotal + s.convTotal;
  const pct = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

  function sectionRow(label, correct, total) {
    if (total === 0) return '';
    const p = Math.round((correct / total) * 100);
    const cls = p >= 80 ? 'good' : p >= 60 ? 'ok' : 'needswork';
    return `<tr>
      <td>${esc(label)}</td>
      <td>${correct} / ${total}</td>
      <td><div class="score-bar-wrap" aria-label="${p}%">
        <div class="score-bar score-bar--${cls}" style="width:${p}%"></div>
      </div></td>
      <td class="score-pct score-pct--${cls}">${p}%</td>
    </tr>`;
  }

  const hasMistakes = State.mistakes.length > 0;
  const completedAll = STAGES.slice(0, 7).every(function (s) { return State.completedStages[s]; });

  let summaryMessage = '';
  if (pct >= 85) {
    summaryMessage = 'Great work! You have a strong understanding of conditional sentences. Continue to apply them in real conversations.';
  } else if (pct >= 65) {
    summaryMessage = 'Good progress! Review the areas below that need more practice, particularly the conditional types where you made mistakes.';
  } else {
    summaryMessage = 'Keep practicing! Use the Review stage to revisit your mistakes and return to the Pattern Explorer to strengthen your foundation.';
  }

  container.innerHTML = `
    <section aria-labelledby="results-heading">
      <div class="stage-head">
        <span class="stage-head__kicker">STAGE 8 — RESULTS</span>
        <p class="stage-head__goal">Formative practice summary. This shows your progress in this session — not your official grade.</p>
      </div>

      <div class="panel panel--hero ${pct >= 80 ? 'panel--success' : ''}">
        <h2 id="results-heading">Practice Summary</h2>
        <div class="results-score-hero">
          <div class="results-score-circle ${pct >= 80 ? 'score-circle--good' : pct >= 60 ? 'score-circle--ok' : 'score-circle--needswork'}"
            aria-label="Overall score: ${pct}%">
            <span class="results-score-circle__pct">${pct}%</span>
            <span class="results-score-circle__label">${totalCorrect}/${totalQuestions}</span>
          </div>
          <div class="results-score-message">
            <p>${summaryMessage}</p>
          </div>
        </div>
      </div>

      <div class="panel">
        <h3>Performance by Stage</h3>
        ${totalQuestions === 0
          ? '<p>No scored activities completed yet.</p>'
          : `<table class="score-table" aria-label="Performance by stage">
              <thead>
                <tr>
                  <th scope="col">Stage</th>
                  <th scope="col">Score</th>
                  <th scope="col" aria-label="Score bar"></th>
                  <th scope="col">%</th>
                </tr>
              </thead>
              <tbody>
                ${sectionRow('Pattern Explorer', s.explorerCorrect, s.explorerTotal)}
                ${sectionRow('Context Practice', s.practiceCorrect, s.practiceTotal)}
                ${sectionRow('Sentence Builder', s.builderCorrect, s.builderTotal)}
                ${sectionRow('Text Application', s.textCorrect, s.textTotal)}
                ${sectionRow('Conversation', s.convCorrect, s.convTotal)}
              </tbody>
            </table>`
        }
      </div>

      <div class="panel panel--compact">
        <h3>Activities Completed</h3>
        <ul class="completion-list">
          ${STAGES.map(function (sid, i) {
            const done = !!State.completedStages[sid];
            return `<li class="completion-list__item ${done ? 'is-done' : ''}">
              <span class="completion-list__icon" aria-hidden="true">${done ? '✓' : '○'}</span>
              ${esc(STAGE_LABELS[i])}
            </li>`;
          }).join('')}
        </ul>
      </div>

      ${hasMistakes ? `<div class="panel panel--compact" style="border-left:4px solid var(--color-warning);background:var(--color-warning-soft);">
        <h3 style="color:var(--color-warning-strong);">Areas for Review</h3>
        <p style="font-size:0.9rem;color:var(--color-warning-strong);">
          You had <strong>${State.mistakes.length} mistake(s)</strong> in this session. 
          Use the <strong>Review stage</strong> to revisit them, or return to any earlier stage to practice again.
        </p>
      </div>` : ''}

      <div class="panel panel--compact" style="background:var(--color-warning-soft);border-left:4px solid var(--color-warning);">
        <p style="margin:0;font-size:0.88rem;color:var(--color-warning-strong);">
          <strong>Important:</strong> This is a <em>formative practice score</em> — it shows your progress during this session.
          It does not represent your official grade. Your teacher will assess your final performance, including speaking tasks.
        </p>
      </div>

      <div class="btn-group btn-group--spread">
        <button type="button" class="btn btn--ghost" id="reviewMistakesBtn" ${hasMistakes ? '' : 'disabled'}>
          Review Mistakes
        </button>
        <button type="button" class="btn btn--primary" id="resetFromResultsBtn">
          Start Over
        </button>
      </div>
    </section>`;

  document.getElementById('reviewMistakesBtn').addEventListener('click', function () {
    navigateTo('review');
  });

  document.getElementById('resetFromResultsBtn').addEventListener('click', function () {
    confirmReset();
  });

  completeStage('results');
}

/* ============================================================
   12. HELPERS & UTILITIES
   ============================================================ */

function esc(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function addMistake(stage, questionId, label, correctText, selectedText, explanation) {
  /* Remove old entry for same question if it exists */
  State.mistakes = State.mistakes.filter(function (m) {
    return !(m.stage === stage && m.questionId === questionId);
  });
  State.mistakes.push({ stage, questionId, label, correctText, selectedText, explanation: explanation || '' });
}

function showNotice(msg) {
  const el = document.getElementById('appNotice');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('is-visible');
  clearTimeout(showNotice._timeout);
  showNotice._timeout = setTimeout(function () {
    el.classList.remove('is-visible');
  }, 3500);
}

function confirmReset() {
  const confirmed = window.confirm(
    'Are you sure you want to reset? All your progress in this session will be cleared.'
  );
  if (!confirmed) return;
  clearState();
  saveState();
  updateStageNav();
  updateProgress();
  renderCurrentStage();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ============================================================
   13. INIT
   ============================================================ */

(function init() {
  /* Build stage nav */
  const navList = document.getElementById('stageNavList');
  if (navList) {
    STAGES.forEach(function (sid, i) {
      const li = document.createElement('li');
      li.className = 'stage-nav__list-item';
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'stage-nav__item';
      btn.dataset.stage = sid;
      btn.innerHTML = `<span class="stage-nav__num">${i + 1}</span><span class="stage-nav__label">${esc(STAGE_LABELS[i])}</span>`;
      btn.addEventListener('click', function () { navigateTo(sid); });
      li.appendChild(btn);
      navList.appendChild(li);
    });
  }

  /* Reset button */
  const resetBtn = document.getElementById('resetAppBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', confirmReset);
  }

  /* Load persisted state */
  const loaded = loadState();

  /* Update UI */
  updateStageNav();
  updateProgress();
  renderCurrentStage();
})();
