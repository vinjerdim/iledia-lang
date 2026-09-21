'use strict';

/* ============================================================
   data.js — All learning content for MPI 2
   English: Place, Quantity & Time

   Every sentence a learner reads lives here, so app.js only has to
   decide HOW things are shown, never WHAT is taught.

   The stages follow the Discovery Learning syntax:
     stimulation → problem statement → data collection →
     data processing → verification → generalisation

   One scenario carries the whole module: Workshop 3 at a vocational
   school, where Andi has to fill in the information board by the door.
   ============================================================ */

var DATA = {
  meta: {
    title: 'Place, Quantity & Time',
    objective:
      'Describe <strong>where</strong> things are, <strong>how many</strong> there are and ' +
      '<strong>when</strong> things happen — and ask about all three.',
    subTopics: [
      'Regular plural nouns: <strong>-s · -es · -ies</strong>',
      'Place words: <strong>in · on · under · at</strong>',
      'Time words with clock times, days, months and years',
      'Question words: <strong>what · where · when · who · how many · what time</strong>',
    ],
  },

  /* ==========================================================
     STAGE 1 — ORIENTATION
     ========================================================== */
  orientation: {
    kicker: 'Stage 1 — Orientation',
    goal: 'Know what you are about to discover and how this module works.',
    scenarioLabel: 'Situation',
    scenario:
      'Workshop 3 has a new information board beside the door, and Andi has been asked to fill ' +
      'it in for the visiting students: what is kept in the room, how many of each, where every ' +
      'item lives, and when each class uses the workshop. Every line he writes hides a pattern — ' +
      'and by the end of this module you will have worked those patterns out yourself.',
    lead:
      'Nobody is going to hand you the grammar rules in this module. You will <strong>collect ' +
      'the evidence first</strong>, then write the rules yourself, then test whether your rules ' +
      'survive sentences they have never seen.',
    objectives: [
      'Notice the words that carry <em>how many</em>, <em>where</em> and <em>when</em> in an English description.',
      'Group real sentences by the job their key word is doing.',
      'Build your own rule table for plural endings, place words, time words and question words.',
      'Test your rules on new sentences, including the ones designed to break them.',
      'Describe a real room of your own — its contents, its layout and its timetable.',
    ],
    steps: [
      'Read the information board and mark the words that do the work.',
      'Choose the questions you want to answer.',
      'Sort real sentences into evidence groups.',
      'Turn your evidence into four rule tables.',
      'Test your rules on new sentences.',
      'Describe your own workshop, then reflect on what still feels shaky.',
    ],
    note:
      'Your progress is saved in this browser, so you can close the tab and come back to the ' +
      'same stage later.',
  },

  /* ==========================================================
     STAGE 2 — NOTICE IT (stimulation)

     Each line is an array of tokens. A plain string is ordinary text;
     an object { w, k } is a target word the learner should notice,
     where k is the family it belongs to — revealed only as a teaser
     after the check, never as a rule at this stage.
       k: 'quantity' | 'place' | 'time' | 'asking'
     ========================================================== */
  noticeIt: {
    kicker: 'Stage 2 — Notice It',
    goal: 'Find the words that carry how many, where and when. No rules yet.',
    instruction:
      'This is Andi&rsquo;s draft of the information board. <strong>Click every word that tells ' +
      'you how many there are, where something is, when something happens, or that turns the ' +
      'line into a question.</strong> Nothing is marked right or wrong yet — you are only ' +
      'noticing.',
    minFound: 10,
    text: [
      [
        'There are ',
        { w: 'twelve', k: 'quantity' },
        ' ',
        { w: 'workbenches', k: 'quantity' },
        ' ',
        { w: 'in', k: 'place' },
        ' this room.',
      ],
      [
        'The ',
        { w: 'toolboxes', k: 'quantity' },
        ' are ',
        { w: 'on', k: 'place' },
        ' the shelf ',
        { w: 'under', k: 'place' },
        ' the window.',
      ],
      [
        { w: 'Three', k: 'quantity' },
        ' safety ',
        { w: 'helmets', k: 'quantity' },
        ' hang ',
        { w: 'at', k: 'place' },
        ' the door.',
      ],
      [
        'The practical class starts ',
        { w: 'at', k: 'time' },
        ' ',
        { w: '07.15', k: 'time' },
        ' ',
        { w: 'on', k: 'time' },
        ' ',
        { w: 'Monday', k: 'time' },
        '.',
      ],
      [
        'The new engine ',
        { w: 'stands', k: 'quantity' },
        ' arrive ',
        { w: 'in', k: 'time' },
        ' ',
        { w: 'July', k: 'time' },
        '.',
      ],
      [
        { w: 'How many', k: 'asking' },
        ' ',
        { w: 'keys', k: 'quantity' },
        ' are in the box? ',
        { w: 'Where', k: 'asking' },
        ' are the ',
        { w: 'brushes', k: 'quantity' },
        '?',
      ],
    ],
    debriefTitle: 'Four families, still no rules',
    debrief:
      'Look at what you marked. The words fall into four families, and this module is the story ' +
      'of what decides each one:',
    familyTeaser: [
      'Words that <strong>changed their ending</strong> because there was more than one of something.',
      'Very short words that kept saying <strong>where</strong>: <em>in, on, under, at</em>.',
      'The <strong>same</strong> short words saying <strong>when</strong> — with a clock, a day, a month.',
      'Words at the front that turned the line into a <strong>question</strong>.',
    ],
  },

  /* ==========================================================
     STAGE 3 — YOUR QUESTIONS (problem statement)

     `focus: true` marks a question about the pattern. The others are
     perfectly good questions — they simply belong to vocabulary or
     pronunciation, and the feedback says so instead of hiding them.
     ========================================================== */
  problemStatement: {
    kicker: 'Stage 3 — Your Questions',
    goal: 'Decide what you actually want to find out before anyone tells you.',
    instruction:
      'A pattern is only worth hunting if you know what you are hunting for. Choose ' +
      '<strong>at least three</strong> questions you want this module to answer, then add one ' +
      'of your own.',
    minSelected: 3,
    candidates: [
      {
        id: 'q1',
        text: 'Why does <em>toolbox</em> become <em>toolboxes</em>, but <em>key</em> only becomes <em>keys</em>?',
        focus: true,
      },
      {
        id: 'q2',
        text: 'What decides between <em>in</em>, <em>on</em>, <em>under</em> and <em>at</em> when I say where something is?',
        focus: true,
      },
      {
        id: 'q3',
        text: 'Why is it <em>at 07.15</em>, but <em>on Monday</em> and <em>in July</em>?',
        focus: true,
      },
      {
        id: 'q4',
        text: 'Which question word do I use when the answer is a number?',
        focus: true,
      },
      {
        id: 'q5',
        text: 'How do I pronounce the ending of <em>buses</em> and <em>brushes</em>?',
        focus: false,
        note: 'A fair question — but it is about sound, and the pattern you are hunting is about spelling and choice.',
      },
      {
        id: 'q6',
        text: 'What is the English word for <em>tang</em> and <em>obeng</em>?',
        focus: false,
        note: 'That is vocabulary. A dictionary answers it in five seconds; an investigation is not needed.',
      },
      {
        id: 'q7',
        text: 'Does the noun after a number always have to change its ending?',
        focus: true,
      },
      {
        id: 'q8',
        text: 'When is <em>what time</em> a better question than <em>when</em>?',
        focus: true,
      },
    ],
    ownQuestionLabel: 'One question of your own',
    ownQuestionHint:
      'Write the question in whatever language you think in — it is your investigation, not a test answer.',
    ownQuestionPlaceholder: 'I want to know why…',
    feedbackFocus:
      '<strong>Every question you picked is a pattern question.</strong> They are exactly what ' +
      'the evidence in the next stage can answer — keep them in view while you sort.',
    feedbackMixed:
      '<strong>Some of your questions are about words, not about patterns.</strong> Keep them: ' +
      'a dictionary or your teacher will answer them in a minute. The evidence board that comes ' +
      'next can only answer the questions about <em>what decides</em> the form you choose.',
    nextButtonLabel: 'Collect the evidence →',
  },

  /* ==========================================================
     STAGE 4 — EVIDENCE BOARD (data collection)

     Two cards deliberately share the same key word (`at the door` and
     `at 07.15`), so the board cannot be sorted by spotting the word
     alone — the learner has to read what the word is pointing at.
     ========================================================== */
  evidence: {
    kicker: 'Stage 4 — Evidence Board',
    goal: 'Group real sentences by the job their key word is doing.',
    instruction:
      'Here are sixteen real sentences from Workshop 3. Click a card, then click the board it ' +
      'belongs on. You are not being marked yet — you are building the dataset you will read ' +
      'the pattern from.',
    buckets: [
      {
        id: 'quantity',
        name: 'One, or more than one?',
        clue: 'hammers · benches · keys · batteries',
      },
      {
        id: 'place',
        name: 'Where something is',
        clue: 'in · on · under · at',
      },
      {
        id: 'time',
        name: 'When something happens',
        clue: 'at 07.15 · on Friday · in August',
      },
      {
        id: 'asking',
        name: 'Asking for information',
        clue: 'what · where · when · who · how many · what time',
      },
    ],
    cards: [
      { id: 'e1', text: 'We keep six <strong>hammers</strong> in this room.', bucket: 'quantity' },
      { id: 'e2', text: 'Both <strong>benches</strong> need new clamps.', bucket: 'quantity' },
      { id: 'e3', text: 'The <strong>keys</strong> are always in the drawer.', bucket: 'quantity' },
      {
        id: 'e4',
        text: 'Two <strong>batteries</strong> are still charging.',
        bucket: 'quantity',
      },

      { id: 'e5', text: 'The first aid box is <strong>on</strong> the wall.', bucket: 'place' },
      { id: 'e6', text: 'Your helmet is <strong>in</strong> the locker.', bucket: 'place' },
      { id: 'e7', text: 'The trolley is <strong>under</strong> the bench.', bucket: 'place' },
      { id: 'e8', text: 'We meet <strong>at</strong> the workshop door.', bucket: 'place' },

      { id: 'e9', text: 'The practical starts <strong>at</strong> 07.15.', bucket: 'time' },
      { id: 'e10', text: 'We clean the room <strong>on</strong> Friday.', bucket: 'time' },
      { id: 'e11', text: 'The new machines arrive <strong>in</strong> August.', bucket: 'time' },
      { id: 'e12', text: 'Andi joined this class <strong>in</strong> 2025.', bucket: 'time' },

      {
        id: 'e13',
        text: '<strong>How many</strong> students are in the group?',
        bucket: 'asking',
      },
      {
        id: 'e14',
        text: '<strong>Where</strong> do you keep the safety glasses?',
        bucket: 'asking',
      },
      {
        id: 'e15',
        text: '<strong>What time</strong> does the afternoon shift finish?',
        bucket: 'asking',
      },
      { id: 'e16', text: '<strong>Who</strong> has the key to the tool store?', bucket: 'asking' },
    ],
    checkLabel: 'Check my sorting',
    allPlacedMessage: 'Put every card on a board before you check.',
    perfectFeedback:
      'Your dataset is clean — every table in the next stage can be read straight off these boards.',
    partialFeedback:
      'Look again at the cards outlined in red. Two of them use the <em>same</em> word as a card ' +
      'on another board — what the word points at is what decides the board.',
  },

  /* ==========================================================
     STAGE 5 — PATTERN LAB (data processing)

     Each table is filled from the evidence just sorted; the rule
     statement below it only unlocks once the table itself is right.
     ========================================================== */
  patternLab: {
    kicker: 'Stage 5 — Pattern Lab',
    goal: 'Turn your sorted evidence into four rules you wrote yourself.',
    instruction:
      'Fill in each table from the evidence you just sorted, then choose the rule statement that ' +
      'matches the table you built. Nothing here is guesswork — every answer is visible on the ' +
      'Evidence Board.',
    tableCorrectFeedback:
      '<strong>The table is right.</strong> Now say what it means — the rule statement is below.',
    tableWrongFeedback:
      '<strong>Not every row matches the evidence yet.</strong> The wrong cells are marked in ' +
      'red; go back to the board that holds those sentences and read them again.',
    incompleteMessage: 'Fill in every row of the table before you check it.',
    tables: [
      {
        id: 'plural',
        title: 'Table 1 — What ending does the plural take?',
        headers: ['One', 'How the word ends', 'Plural ending'],
        options: ['+ s', '+ es', 'y → ies'],
        rows: [
          { label: 'hammer', label2: 'ends in <em>r</em>', answer: '+ s' },
          { label: 'bench', label2: 'ends in <em>ch</em>', answer: '+ es' },
          { label: 'box', label2: 'ends in <em>x</em>', answer: '+ es' },
          { label: 'brush', label2: 'ends in <em>sh</em>', answer: '+ es' },
          { label: 'bus', label2: 'ends in <em>s</em>', answer: '+ es' },
          { label: 'key', label2: 'vowel + <em>y</em>', answer: '+ s' },
          { label: 'battery', label2: 'consonant + <em>y</em>', answer: 'y → ies' },
        ],
        rule: {
          question: 'Which statement matches the table you just built?',
          options: [
            {
              id: 'a',
              label:
                'The <strong>letters at the end of the noun</strong> choose the ending: after <em>s, x, ch, sh</em> the plural adds <em>-es</em>; a consonant before <em>-y</em> turns it into <em>-ies</em>; everything else simply adds <em>-s</em>.',
            },
            {
              id: 'b',
              label:
                'Long nouns take <em>-es</em> and short nouns take <em>-s</em>, because <em>-es</em> is easier to hear.',
            },
            {
              id: 'c',
              label:
                'Nouns that name tools take <em>-s</em>; nouns that name places and containers take <em>-es</em>.',
            },
          ],
          correct: 'a',
          explanation:
            'Read the middle column downwards. What the noun <em>means</em> never mattered once — ' +
            '<em>key</em> and <em>battery</em> both end in <em>-y</em> and still behave differently, ' +
            'because the letter in front of the <em>-y</em> is different.',
        },
      },
      {
        id: 'place',
        title: 'Table 2 — Which word puts a thing in its place?',
        headers: ['The kind of space', 'Word'],
        options: ['in', 'on', 'under', 'at'],
        rows: [
          { label: 'Inside a closed space — a locker, a drawer, a room', answer: 'in' },
          { label: 'Touching a surface — a shelf, a wall, a table', answer: 'on' },
          { label: 'Lower than something else — below the bench', answer: 'under' },
          { label: 'One exact point — the door, the gate, the bus stop', answer: 'at' },
        ],
        rule: {
          question: 'Which statement matches the table you just built?',
          options: [
            {
              id: 'a',
              label:
                'The <strong>kind of space</strong> chooses the word: a space you can be inside takes <em>in</em>, a surface takes <em>on</em>, a position below takes <em>under</em>, and a single point takes <em>at</em>.',
            },
            {
              id: 'b',
              label:
                '<em>In</em> is for big places and <em>at</em> is for small places, whatever shape they have.',
            },
            {
              id: 'c',
              label:
                '<em>On</em> and <em>at</em> mean the same thing, so either of them works in any sentence.',
            },
          ],
          correct: 'a',
          explanation:
            'The workshop door is not a small room — it is a point you stand at. Size is not what ' +
            'decides; the shape of the space is.',
        },
      },
      {
        id: 'time',
        title: 'Table 3 — The same little words, now for time',
        headers: ['What comes after the word', 'Word'],
        options: ['in', 'on', 'at'],
        rows: [
          { label: 'A clock time — <em>07.15</em>, <em>half past two</em>', answer: 'at' },
          { label: 'A day — <em>Monday</em>, <em>Friday</em>', answer: 'on' },
          { label: 'A date — <em>17 August</em>', answer: 'on' },
          { label: 'A month — <em>July</em>', answer: 'in' },
          { label: 'A year — <em>2026</em>', answer: 'in' },
        ],
        rule: {
          question: 'Which statement matches the table you just built?',
          options: [
            {
              id: 'a',
              label:
                'The <strong>size of the time unit</strong> chooses the word, exactly as the shape of the space did: a point on the clock takes <em>at</em>, a single day or date takes <em>on</em>, and a stretch you sit inside — a month, a year — takes <em>in</em>.',
            },
            {
              id: 'b',
              label:
                '<em>At</em> is used in the morning, <em>on</em> in the afternoon and <em>in</em> in the evening.',
            },
            {
              id: 'c',
              label:
                'Time expressions always take <em>on</em>; <em>at</em> and <em>in</em> only work for places.',
            },
          ],
          correct: 'a',
          explanation:
            'Put Table 2 beside Table 3. A point (the door · 07.15) takes <em>at</em>; a surface or ' +
            'a single day takes <em>on</em>; something you are inside (the room · July) takes ' +
            '<em>in</em>. One idea, two jobs.',
        },
      },
      {
        id: 'asking',
        title: 'Table 4 — Which word opens the question?',
        headers: ['What you are missing', 'Question word'],
        options: ['what', 'where', 'when', 'who', 'how many', 'what time'],
        rows: [
          { label: 'The place of something', answer: 'where' },
          { label: 'The day, or the time in general', answer: 'when' },
          { label: 'The exact time on the clock', answer: 'what time' },
          { label: 'The number of things', answer: 'how many' },
          { label: 'The name of a thing', answer: 'what' },
          { label: 'The person', answer: 'who' },
        ],
        rule: {
          question: 'Which statement matches the table you just built?',
          options: [
            {
              id: 'a',
              label:
                'The <strong>information you are missing</strong> chooses the word — and <em>how many</em> is always followed by a <strong>plural noun</strong>, because you are asking about more than one.',
            },
            {
              id: 'b',
              label: 'The question word is chosen by the verb that follows it.',
            },
            {
              id: 'c',
              label:
                '<em>When</em> and <em>what time</em> are the same question, so the choice never matters.',
            },
          ],
          correct: 'a',
          explanation:
            'Every row names a missing piece of information, not a verb. And notice the fourth row: ' +
            'the moment you ask <em>how many</em>, the noun after it is already plural — ' +
            '<em>how many students</em>, never <em>how many student</em>.',
        },
      },
    ],
    nextButtonLabel: 'Test my rules →',
  },

  /* ==========================================================
     STAGE 6 — TEST YOUR RULES (verification)

     Four items exist to break a rule that was stated too loosely:
       v3  keys — a vowel before -y keeps the plain -s
       v4  batteries — a consonant before -y takes -ies
       v7  at the door — a point, not a container
       v12 what time vs when — both grammatical, context decides
     ========================================================== */
  verification: {
    kicker: 'Stage 6 — Test Your Rules',
    goal: 'Put the rules you wrote under pressure, including the awkward cases.',
    instruction:
      'A rule is only worth keeping if it survives new sentences. Some of these are designed to ' +
      'break a rule that was stated too simply.',
    soal: [
      {
        id: 'v1',
        type: 'choice',
        rule: 'plural',
        scenario: 'Andi counts the tool boxes on the rack.',
        stem: 'There are four ___ on the rack.',
        question: 'Which plural fits?',
        options: [
          { id: 'a', label: 'boxes' },
          { id: 'b', label: 'boxs' },
          { id: 'c', label: 'box' },
        ],
        correct: 'a',
        hints: [
          'What letter does <em>box</em> end in?',
          'After <em>s, x, ch, sh</em> the plural needs a whole extra syllable.',
        ],
        explanation:
          '<em>Box</em> ends in <em>-x</em>, so the plural adds <em>-es</em>: <em>boxes</em>.',
      },
      {
        id: 'v2',
        type: 'input',
        rule: 'plural',
        scenario: 'Two workbenches have loose clamps.',
        stem: 'Both ___ need new clamps.',
        question: 'Type the plural of <em>bench</em>.',
        answer: ['benches'],
        hints: [
          '<em>Bench</em> ends in <em>ch</em>.',
          'Endings in <em>s, x, ch, sh</em> all behave the same way.',
        ],
        explanation:
          '<em>Bench</em> ends in <em>-ch</em>, so it takes <em>-es</em>: <em>benches</em>.',
      },
      {
        id: 'v3',
        type: 'choice',
        rule: 'plural',
        scenario: 'The tool store cannot be opened this morning.',
        stem: 'The two ___ to the tool store are missing.',
        question: 'Which plural of <em>key</em> is right?',
        options: [
          { id: 'a', label: 'keys' },
          { id: 'b', label: 'keies' },
          { id: 'c', label: 'keyes' },
        ],
        correct: 'a',
        hints: [
          'Look at the letter <strong>before</strong> the <em>-y</em>.',
          '<em>e</em> is a vowel — and the <em>-ies</em> spelling only happens after a consonant.',
        ],
        explanation:
          'A <strong>vowel</strong> stands before the <em>-y</em> in <em>key</em>, so nothing changes: ' +
          '<em>keys</em>. Only a consonant before <em>-y</em> gives <em>-ies</em>.',
      },
      {
        id: 'v4',
        type: 'input',
        rule: 'plural',
        scenario: 'Two cordless drills are on charge near the door.',
        stem: 'Three ___ are charging near the door.',
        question: 'Type the plural of <em>battery</em>.',
        answer: ['batteries'],
        hints: [
          'What kind of letter comes before the <em>-y</em> here?',
          '<em>r</em> is a consonant, so this is the case where the <em>-y</em> itself changes.',
        ],
        explanation:
          'A consonant (<em>r</em>) stands before the <em>-y</em>, so the <em>-y</em> becomes ' +
          '<em>-ies</em>: <em>batteries</em>. Compare it with <em>keys</em> in the previous question.',
      },
      {
        id: 'v5',
        type: 'choice',
        rule: 'place',
        scenario: 'A new student asks where to leave his helmet.',
        stem: 'Your helmet is ___ the locker.',
        question: 'Which place word fits?',
        options: [
          { id: 'a', label: 'in' },
          { id: 'b', label: 'on' },
          { id: 'c', label: 'at' },
        ],
        correct: 'a',
        hints: [
          'Is a locker a surface, a point, or a space you can put things inside?',
          'A closed space takes the word for being inside it.',
        ],
        explanation: 'A locker is a closed space, so the helmet is <em>in</em> it.',
      },
      {
        id: 'v6',
        type: 'choice',
        rule: 'place',
        scenario: 'The trolley has to be out of the walkway.',
        stem: 'The trolley is ___ the bench, so nobody trips over it.',
        question: 'Which place word fits?',
        options: [
          { id: 'a', label: 'under' },
          { id: 'b', label: 'on' },
          { id: 'c', label: 'in' },
        ],
        correct: 'a',
        hints: [
          'The trolley is not on the bench top and not inside the bench.',
          'It is lower than the bench.',
        ],
        explanation:
          'The trolley is <strong>lower</strong> than the bench, which is exactly the job of ' +
          '<em>under</em>.',
      },
      {
        id: 'v7',
        type: 'input',
        rule: 'place',
        scenario: 'The class waits outside before the instructor arrives.',
        stem: 'We wait for the instructor ___ the workshop door.',
        question: 'Type the missing place word.',
        answer: ['at'],
        hints: [
          'A door is not a room you stand inside, and not a surface you stand on.',
          'It is a single point you can meet at.',
        ],
        explanation:
          'A door is a <strong>point</strong>, not a space — so it takes <em>at</em>. ' +
          '<em>In the workshop</em> is the room; <em>at the door</em> is the spot.',
      },
      {
        id: 'v8',
        type: 'choice',
        rule: 'time',
        scenario: 'The timetable on the board gives the exact minute.',
        stem: 'The practical starts ___ 07.15.',
        question: 'Which time word fits?',
        options: [
          { id: 'a', label: 'at' },
          { id: 'b', label: 'on' },
          { id: 'c', label: 'in' },
        ],
        correct: 'a',
        hints: [
          'How long is 07.15 — a point, a day, or a whole month?',
          'A point on the clock behaves like a point in space.',
        ],
        explanation:
          '07.15 is a point on the clock, so it takes <em>at</em> — the same word a point in space takes.',
      },
      {
        id: 'v9',
        type: 'choice',
        rule: 'time',
        scenario: 'Every group cleans the workshop once a week.',
        stem: 'We clean the room ___ Friday.',
        question: 'Which time word fits?',
        options: [
          { id: 'a', label: 'on' },
          { id: 'b', label: 'at' },
          { id: 'c', label: 'in' },
        ],
        correct: 'a',
        hints: ['Friday is not a minute and not a month.', 'A single day takes its own word.'],
        explanation: 'A day — and a date such as <em>17 August</em> — takes <em>on</em>.',
      },
      {
        id: 'v10',
        type: 'input',
        rule: 'time',
        scenario: 'The school has ordered new equipment for next semester.',
        stem: 'The new machines arrive ___ August.',
        question: 'Type the missing time word.',
        answer: ['in'],
        hints: [
          'August is a whole month, not one day of it.',
          'A stretch of time you sit inside takes the same word as a room.',
        ],
        explanation:
          'A month (and a year) is a stretch you are inside, so it takes <em>in</em>: ' +
          '<em>in August</em>, <em>in 2026</em>.',
      },
      {
        id: 'v11',
        type: 'choice',
        rule: 'asking',
        scenario: 'Andi needs a number for the attendance sheet.',
        stem: '___ students are there in your group?',
        question: 'Which question opening fits?',
        options: [
          { id: 'a', label: 'How many' },
          { id: 'b', label: 'How much' },
          { id: 'c', label: 'What' },
        ],
        correct: 'a',
        hints: [
          'The answer Andi wants is a number of people he can count.',
          'Notice that the noun after the blank is already plural.',
        ],
        explanation:
          'Countable things take <em>how many</em>, and the noun after it stays plural: ' +
          '<em>how many students</em>, never <em>how many student</em>.',
      },
      {
        id: 'v12',
        type: 'choice',
        rule: 'asking',
        scenario: 'Andi has to write the exact finishing minute on the board.',
        stem: '___ does the afternoon shift finish?',
        question: 'Which question word gets him the exact minute?',
        options: [
          { id: 'a', label: 'What time' },
          { id: 'b', label: 'When' },
          { id: 'c', label: 'Where' },
        ],
        correct: 'a',
        hints: [
          'Both of the first two options are correct English — but they invite different answers.',
          '<em>When</em> can be answered with &ldquo;after the break&rdquo;. Andi needs a clock reading.',
        ],
        explanation:
          '<em>When</em> is not wrong, but it accepts a vague answer. <em>What time</em> asks for ' +
          'the clock: <em>at 15.30</em>.',
      },
    ],
    nextButtonLabel: 'Describe my own workshop →',
  },

  /* ==========================================================
     STAGE 7 — DESCRIBE YOUR WORKSHOP (generalisation)
     ========================================================== */
  generalization: {
    kicker: 'Stage 7 — Describe Your Workshop',
    goal: 'Apply the four rules to a room and a timetable you actually know.',
    builderInstruction:
      'Warm up first. Click the words in the right order to build each sentence. Click a word you ' +
      'have placed to take it back. Some words in the bank do not belong in the sentence at all.',
    builder: [
      {
        id: 'b1',
        context: 'You are counting the workbenches in your own room.',
        parts: ['There', 'are', 'twelve', 'workbenches', 'in', 'this', 'room'],
        distractors: ['is', 'workbench', 'on'],
        hint: 'More than one bench, and the room is a space you are inside.',
      },
      {
        id: 'b2',
        context: 'You point at the shelf above the sink.',
        parts: ['The', 'brushes', 'are', 'on', 'the', 'shelf'],
        distractors: ['brush', 'in', 'is'],
        hint: 'A shelf is a surface, and there is more than one brush.',
      },
      {
        id: 'b3',
        context: 'You tell a new student when the practical begins.',
        parts: ['The', 'practical', 'starts', 'at', '07.15', 'on', 'Monday'],
        distractors: ['in', 'of'],
        hint: 'A clock time and a day need different words — and the clock time comes first.',
      },
      {
        id: 'b4',
        context: 'You ask the technician about the helmets.',
        parts: ['How', 'many', 'helmets', 'are', 'in', 'the', 'locker?'],
        distractors: ['much', 'helmet', 'is'],
        hint: 'You are counting, so the noun after the question word stays plural.',
      },
    ],
    builderCorrect: 'Exactly right.',
    builderWrong: 'Not yet — check the order, then try again.',
    builderIncomplete: 'Use all of the words that belong in the sentence first.',
    writeTitle: 'Now write your own information board',
    writeInstruction:
      'Describe a real room you use — your workshop, your lab, your classroom, the kitchen at ' +
      'home. Write <strong>four to six sentences</strong> that say <strong>how many</strong> ' +
      'things are there, <strong>where</strong> they are and <strong>when</strong> the room is ' +
      'used, and finish with <strong>one question</strong> a visitor might ask.',
    writeLabel: 'My information board',
    writePlaceholder: 'There are…\nThe … are on…\nOur practical starts at… on…\nHow many…?',
    rubricTitle: 'Check your own writing',
    rubricInstruction:
      'Read your board back slowly and tick only what is honestly true. Nobody scores this but ' +
      'you — and an honest tick is worth more than a full box.',
    rubric: [
      {
        id: 'r1',
        text: 'Every plural noun has the right ending (<em>-s</em>, <em>-es</em> or <em>-ies</em>), and I checked the letter before each <em>-y</em>.',
      },
      {
        id: 'r2',
        text: 'Each place word (<em>in / on / under / at</em>) matches the kind of space it describes.',
      },
      {
        id: 'r3',
        text: 'My time expressions use <em>at</em> for a clock time, <em>on</em> for a day or date, and <em>in</em> for a month or year.',
      },
      {
        id: 'r4',
        text: 'I used at least one number, and the noun after it is plural whenever it is more than one.',
      },
      {
        id: 'r5',
        text: 'My question starts with a question word, and if I used <em>how many</em>, a plural noun follows it.',
      },
    ],
    minWords: 20,
    tooShortMessage: 'Write at least four sentences before you check your work.',
    nextButtonLabel: 'Continue to reflection →',
  },

  /* ==========================================================
     STAGE 8 — REFLECTION
     ========================================================== */
  reflection: {
    kicker: 'Stage 8 — Reflection',
    goal: 'Name what is solid and what is still shaky, in your own words.',
    noMistakesTitle: 'Nothing to review',
    noMistakesText:
      'You answered every question correctly on the first attempt. Read your rule card once more ' +
      'anyway — being able to <em>state</em> a rule is different from getting the answers right.',
    mistakesTitle: 'Sentences worth a second look',
    mistakesLead:
      'These are the items you did not get right first time. The rule behind each one is printed ' +
      'underneath it.',
    promptsTitle: 'Your reflection',
    prompts: [
      {
        id: 'p1',
        label: 'Which of the four rules became obvious the moment you saw the evidence?',
        placeholder: 'The clearest one for me was…',
      },
      {
        id: 'p2',
        label: 'Which one do you still mix up, and what will you look at first next time?',
        placeholder: 'I still confuse… so next time I will check…',
      },
      {
        id: 'p3',
        label: 'Where outside this room could you use these sentences this week?',
        placeholder: 'I could use them when…',
      },
    ],
    confidenceLabel:
      'Right now, how confident do you feel describing a room and its timetable in English?',
    confidenceOptions: [
      { id: 'low', label: 'Still shaky — I need the rule tables in front of me.' },
      { id: 'mid', label: 'Getting there — I can do it slowly, with checking.' },
      { id: 'high', label: 'Confident — I could describe this room out loud right now.' },
    ],
    minAnswered: 2,
    incompleteMessage: 'Answer at least two of the reflection questions before you continue.',
    nextButtonLabel: 'See my results →',
  },

  /* ==========================================================
     STAGE 9 — RESULTS
     ========================================================== */
  results: {
    kicker: 'Stage 9 — Results',
    goal: 'See what you built and what you scored.',
    ruleCardTitle: 'Your rule card',
    ruleCardLead: 'These are the rules you worked out for yourself in the Pattern Lab.',
    ruleCards: [
      {
        id: 'plural',
        title: 'Plural endings',
        body: 'The <strong>last letters</strong> decide. After <em>s · x · ch · sh</em> &rarr; <em>-es</em> · consonant + <em>y</em> &rarr; <em>-ies</em> · everything else &rarr; <em>-s</em>.',
      },
      {
        id: 'place',
        title: 'Place words',
        body: 'The <strong>shape of the space</strong> decides. Inside &rarr; <em>in</em> · on a surface &rarr; <em>on</em> · below &rarr; <em>under</em> · one exact point &rarr; <em>at</em>.',
      },
      {
        id: 'time',
        title: 'Time words',
        body: 'The <strong>size of the unit</strong> decides, the same way. Clock time &rarr; <em>at</em> · day or date &rarr; <em>on</em> · month or year &rarr; <em>in</em>.',
      },
      {
        id: 'asking',
        title: 'Question words',
        body: 'The <strong>missing information</strong> decides: place &rarr; <em>where</em> · time &rarr; <em>when</em> · clock &rarr; <em>what time</em> · number &rarr; <em>how many</em> + a plural noun.',
      },
    ],
    messageGood:
      'Strong work. You did not just answer questions — you built the rules first and then defended them.',
    messageOk:
      'A solid pass. Go back to the Pattern Lab table for the rule that cost you the most marks, then retry Stage 6.',
    messageNeedsWork:
      'The patterns have not settled yet, and that is fair — four of them at once is a lot. Redo the Evidence Board slowly; the sorting is what makes the tables obvious.',
    completionTitle: 'What you completed',
    restartLabel: 'Start again from the beginning',
  },
};
