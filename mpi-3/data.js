'use strict';

/* ============================================================
   data.js — Learning content for MPI 3
   English: Simple Present — Habits & Facts

   Everything a teacher would want to change lives here; app.js only
   decides how it behaves. The rules themselves are never stated to the
   learner before Stage 5 — they are written as *options* there, so the
   learner chooses the statement that matches the table they built.

   HTML is allowed in text fields (and is inserted unescaped) so that
   <em> and <strong> can carry the emphasis a grammar lesson needs.
   Anything a learner types is escaped by app.js instead.
   ============================================================ */

var DATA = {
  meta: {
    title: 'Simple Present: Habits & Facts',
    objective:
      'Write complete sentences about <strong>what you do again and again</strong> and ' +
      '<strong>what is simply true</strong> — and ask someone else about theirs.',
    subTopics: [
      'The extra ending after <em>he · she · it</em>: <strong>-s · -es · -ies</strong>',
      'Positive sentences: habits and facts',
      'Negative sentences: <strong>don&rsquo;t · doesn&rsquo;t</strong> + plain verb',
      'Questions and short answers: <strong>Do &hellip;? · Does &hellip;?</strong>',
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
      'Dina&rsquo;s school has a partner school abroad, and every student has been asked to write ' +
      'a <strong>profile card</strong> for a pen pal they have never met: what she does every ' +
      'morning, what is true about her family and her school, what she never does — and the ' +
      'questions she wants to ask back. Every line she writes hides a pattern, and by the end of ' +
      'this module you will have worked those patterns out yourself.',
    lead:
      'Nobody is going to hand you the grammar rules in this module. You will <strong>collect ' +
      'the evidence first</strong>, then write the rules yourself, then test whether your rules ' +
      'survive sentences they have never seen.',
    objectives: [
      'Notice the words that carry the <em>action</em>, the <em>repetition</em> and the <em>asking</em> in an English description.',
      'Group real sentences by the job the subject and the verb are doing together.',
      'Build your own rule tables for habits and facts, the verb ending, the negative and the question.',
      'Test your rules on new sentences, including the ones designed to break them.',
      'Write a complete profile card about your own habits, your own facts, and one question of your own.',
    ],
    steps: [
      'Read Dina&rsquo;s profile card and mark the words that do the work.',
      'Choose the questions you want to answer.',
      'Sort real sentences into evidence boards.',
      'Turn your evidence into five rule tables.',
      'Test your rules on new sentences.',
      'Write your own profile card, then reflect on what still feels shaky.',
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
       k: 'verb' | 'signal' | 'helper'
     ========================================================== */
  noticeIt: {
    kicker: 'Stage 2 — Notice It',
    goal: 'Find the words that carry the action, the repetition and the asking. No rules yet.',
    instruction:
      'This is Dina&rsquo;s profile card. <strong>Click every word that says what somebody does, ' +
      'that tells you how often or when it happens again, or that helps to turn the line into a ' +
      'negative or a question.</strong> Nothing is marked right or wrong yet — you are only ' +
      'noticing.',
    minFound: 10,
    text: [
      ['My name is Dina. I ', { w: 'live', k: 'verb' }, ' in Salatiga with my family.'],
      [
        'I ',
        { w: 'get up', k: 'verb' },
        ' at half past four ',
        { w: 'every morning', k: 'signal' },
        '.',
      ],
      [
        'My mother ',
        { w: 'teaches', k: 'verb' },
        ' at a primary school, and my father ',
        { w: 'works', k: 'verb' },
        ' in a small garage.',
      ],
      [
        'I ',
        { w: 'always', k: 'signal' },
        ' ',
        { w: 'help', k: 'verb' },
        ' him ',
        { w: 'on Sundays', k: 'signal' },
        '.',
      ],
      [
        'My sister ',
        { w: 'studies', k: 'verb' },
        ' in Yogyakarta. She ',
        { w: 'comes', k: 'verb' },
        ' home ',
        { w: 'twice a month', k: 'signal' },
        '.',
      ],
      [
        'Our class ',
        { w: 'starts', k: 'verb' },
        ' at seven, and the school library ',
        { w: 'opens', k: 'verb' },
        ' at half past six.',
      ],
      [
        'I ',
        { w: "don't", k: 'helper' },
        ' ',
        { w: 'drink', k: 'verb' },
        ' coffee, and my sister ',
        { w: "doesn't", k: 'helper' },
        ' ',
        { w: 'eat', k: 'verb' },
        ' meat.',
      ],
      [
        { w: 'Do', k: 'helper' },
        ' you ',
        { w: 'play', k: 'verb' },
        ' football after school? ',
        { w: 'Does', k: 'helper' },
        ' your family ',
        { w: 'watch', k: 'verb' },
        ' television ',
        { w: 'in the evening', k: 'signal' },
        '?',
      ],
    ],
    debriefTitle: 'What the card is hiding',
    debrief:
      'Read the action words again, slowly. Some of them are wearing an extra letter and some ' +
      'are not — and the card is perfectly correct either way. Something in each sentence is ' +
      'deciding that. Finding out <em>what</em> is the job of the next four stages.',
    familyTeaser: [
      'Words that say <strong>what somebody does</strong> — look at which ones end in an extra letter.',
      'Words that say <strong>how often</strong> or <strong>when</strong> it happens again.',
      'Small helper words — <em>do</em>, <em>does</em>, <em>don&rsquo;t</em>, <em>doesn&rsquo;t</em> — that show up only in certain kinds of sentence.',
    ],
  },

  /* ==========================================================
     STAGE 3 — YOUR QUESTIONS (problem statement)

     focus: true marks a pattern question — one this module can
     actually answer from evidence. The others are perfectly good
     questions that a dictionary answers, and the feedback says so
     without pushing them away.
     ========================================================== */
  problemStatement: {
    kicker: 'Stage 3 — Your Questions',
    goal: 'Name the questions your investigation is going to answer.',
    instruction:
      'A discovery starts with a question somebody actually wants answered. Choose at least ' +
      '<strong>three</strong> questions you want this module to settle, then add one of your own.',
    minSelected: 3,
    candidates: [
      {
        id: 'q1',
        text: 'Why does <em>teaches</em> end in <em>-es</em> when <em>live</em> ends in nothing at all?',
        focus: true,
        note: 'A pattern question — Stage 4 collects the evidence for it.',
      },
      {
        id: 'q2',
        text: 'What does <em>garage</em> mean in Indonesian?',
        focus: false,
        note: 'Worth asking, but a dictionary answers it — no pattern is hiding inside it.',
      },
      {
        id: 'q3',
        text: 'Which subjects make the verb take an extra ending, and which leave it alone?',
        focus: true,
        note: 'A pattern question — Table 2 is built from exactly this.',
      },
      {
        id: 'q4',
        text: 'Why is it <em>doesn&rsquo;t eat</em> and never <em>doesn&rsquo;t eats</em>?',
        focus: true,
        note: 'A pattern question — and one of the most useful in the whole module.',
      },
      {
        id: 'q5',
        text: 'How do you say <em>teaches</em> out loud?',
        focus: false,
        note: 'A fair question for your teacher, but pronunciation is not what this evidence shows.',
      },
      {
        id: 'q6',
        text: 'How do you turn <em>You play football</em> into a question?',
        focus: true,
        note: 'A pattern question — Table 5 answers it.',
      },
      {
        id: 'q7',
        text: 'Which lines on the card are habits, and which ones are just true?',
        focus: true,
        note: 'A pattern question — and the reason this tense has two jobs at once.',
      },
      {
        id: 'q8',
        text: 'Is Salatiga far from Yogyakarta?',
        focus: false,
        note: 'A real question about the world, but a map answers it, not the grammar.',
      },
    ],
    feedbackFocus:
      '<strong>Every question you chose is a pattern question.</strong> Each one can be settled ' +
      'by looking hard at real sentences — which is exactly what you are about to do.',
    feedbackMixed:
      '<strong>Some of your questions need a dictionary or a map rather than evidence.</strong> ' +
      'Keep them — they are good questions — but notice the difference: a pattern question can ' +
      'be answered by comparing sentences you already have.',
    ownQuestionLabel: 'One question of your own',
    ownQuestionHint:
      'Something the card made you wonder about. It does not have to be a clever question — an ' +
      'honest one is worth more.',
    ownQuestionPlaceholder: 'I want to know why…',
    nextButtonLabel: 'Collect the evidence →',
  },

  /* ==========================================================
     STAGE 4 — EVIDENCE BOARD (data collection)

     Sixteen sentences, four to a board. The boards are sorted by what
     the subject and the verb are doing together, because that is the
     split Tables 2, 4 and 5 are read from. Every card also happens to
     be either a habit or a fact, which is what Table 1 reads.
     ========================================================== */
  evidence: {
    kicker: 'Stage 4 — Evidence Board',
    goal: 'Group real sentences by what the subject and the verb are doing together.',
    instruction:
      'Here are sixteen sentences from Dina&rsquo;s world. Click a card, then click the board it ' +
      'belongs on. You are not being marked yet — you are building the dataset you will read the ' +
      'pattern from.',
    buckets: [
      {
        id: 'thirdSingular',
        name: 'He / She / It does it',
        clue: 'one person, one place, one thing',
      },
      {
        id: 'plainSubject',
        name: 'I / You / We / They do it',
        clue: 'me, you, or more than one',
      },
      {
        id: 'negative',
        name: 'It does NOT happen',
        clue: 'don&rsquo;t · doesn&rsquo;t',
      },
      {
        id: 'question',
        name: 'Asking whether it happens',
        clue: 'Do&hellip;? · Does&hellip;?',
      },
    ],
    cards: [
      {
        id: 'e1',
        text: 'Dina <strong>gets up</strong> at half past four every morning.',
        bucket: 'thirdSingular',
      },
      {
        id: 'e2',
        text: 'Her mother <strong>teaches</strong> at a primary school.',
        bucket: 'thirdSingular',
      },
      {
        id: 'e3',
        text: 'Her sister <strong>studies</strong> in Yogyakarta.',
        bucket: 'thirdSingular',
      },
      {
        id: 'e4',
        text: 'The school library <strong>opens</strong> at half past six.',
        bucket: 'thirdSingular',
      },

      { id: 'e5', text: 'I <strong>walk</strong> to school every day.', bucket: 'plainSubject' },
      {
        id: 'e6',
        text: 'We <strong>clean</strong> the classroom on Fridays.',
        bucket: 'plainSubject',
      },
      {
        id: 'e7',
        text: 'My parents <strong>work</strong> in the same street.',
        bucket: 'plainSubject',
      },
      {
        id: 'e8',
        text: 'You <strong>play</strong> football after school.',
        bucket: 'plainSubject',
      },

      { id: 'e9', text: 'Dina <strong>doesn&rsquo;t drink</strong> coffee.', bucket: 'negative' },
      {
        id: 'e10',
        text: 'Her sister <strong>doesn&rsquo;t eat</strong> meat.',
        bucket: 'negative',
      },
      {
        id: 'e11',
        text: 'We <strong>don&rsquo;t have</strong> lessons on Sunday.',
        bucket: 'negative',
      },
      {
        id: 'e12',
        text: 'I <strong>don&rsquo;t watch</strong> television in the morning.',
        bucket: 'negative',
      },

      {
        id: 'e13',
        text: '<strong>Does</strong> your mother <strong>teach</strong> English?',
        bucket: 'question',
      },
      {
        id: 'e14',
        text: '<strong>Do</strong> you <strong>play</strong> football after school?',
        bucket: 'question',
      },
      {
        id: 'e15',
        text: '<strong>Does</strong> the library <strong>open</strong> on Saturday?',
        bucket: 'question',
      },
      {
        id: 'e16',
        text: '<strong>Do</strong> your parents <strong>work</strong> near your house?',
        bucket: 'question',
      },
    ],
    checkLabel: 'Check my boards',
    allPlacedMessage: 'Put every card on a board before you check.',
    perfectFeedback:
      'Now the tables in the next stage are just a matter of reading what is already in front of you.',
    partialFeedback:
      'Look again at the cards marked in red. Sort by <em>who</em> is doing it and <em>what ' +
      'shape</em> the sentence has — not by what the sentence is about.',
  },

  /* ==========================================================
     STAGE 5 — PATTERN LAB (data processing)

     Five tables. Each one is checked on its own, and its rule
     statement stays locked until the table itself is right: a rule
     read off a wrong table teaches the wrong pattern.

     The distractor option in Tables 4 and 5 ("doesn't + verb-s",
     "Does + verb-s") is never a correct answer anywhere. That is the
     point — the learner has to discover that the -s is already gone.
     ========================================================== */
  patternLab: {
    kicker: 'Stage 5 — Pattern Lab',
    goal: 'Turn your sorted evidence into five rules you wrote yourself.',
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
    nextButtonLabel: 'Test my rules →',
    tables: [
      {
        id: 'meaning',
        title: 'Table 1 — What is the sentence telling you?',
        headers: ['Sentence from the board', 'What it does'],
        options: ['a habit — it happens again and again', 'a fact — it is simply true'],
        rows: [
          {
            label: 'Dina gets up at half past four <strong>every morning</strong>.',
            answer: 'a habit — it happens again and again',
          },
          {
            label: 'Her mother teaches at a primary school.',
            answer: 'a fact — it is simply true',
          },
          {
            label: 'We clean the classroom <strong>on Fridays</strong>.',
            answer: 'a habit — it happens again and again',
          },
          { label: 'My parents work in the same street.', answer: 'a fact — it is simply true' },
          {
            label: 'I walk to school <strong>every day</strong>.',
            answer: 'a habit — it happens again and again',
          },
          { label: 'Her sister studies in Yogyakarta.', answer: 'a fact — it is simply true' },
        ],
        rule: {
          question: 'Which statement matches the table you just built?',
          options: [
            {
              id: 'a',
              label:
                'This one tense does <strong>both</strong> jobs. When a <strong>repeat signal</strong> is there — <em>every day, on Fridays, always</em> — the sentence is a <strong>habit</strong>; with no repeat signal it simply states what is <strong>true</strong>. The verb itself looks exactly the same either way.',
            },
            {
              id: 'b',
              label: 'Habits use this tense, and facts need a different tense altogether.',
            },
            {
              id: 'c',
              label:
                'A sentence is a habit when it is about a person, and a fact when it is about a place or a thing.',
            },
          ],
          correct: 'a',
          explanation:
            'Compare the first two rows. The verb form does not change between them — only the ' +
            '<strong>repeat signal</strong> does. That is why the words you marked in Stage 2 ' +
            'were worth marking: they are what tells a reader that something comes round again. ' +
            'Option C breaks on your own last row — <em>her sister</em> is a person, and that ' +
            'row is a fact.',
        },
      },
      {
        id: 'subject',
        title: 'Table 2 — Which subjects give the verb an extra ending?',
        headers: ['Subject', 'The verb after it'],
        options: ['plain verb — no ending', 'verb + the extra ending'],
        rows: [
          {
            label: '<strong>I</strong> — <em>I walk to school.</em>',
            answer: 'plain verb — no ending',
          },
          {
            label: '<strong>You</strong> — <em>You play football.</em>',
            answer: 'plain verb — no ending',
          },
          {
            label: '<strong>We</strong> — <em>We clean the classroom.</em>',
            answer: 'plain verb — no ending',
          },
          {
            label: '<strong>They</strong> — <em>They live in Salatiga.</em>',
            answer: 'plain verb — no ending',
          },
          {
            label: '<strong>He / She / It</strong> — <em>She comes home.</em>',
            answer: 'verb + the extra ending',
          },
          {
            label: '<strong>Dina</strong> — one person — <em>Dina gets up early.</em>',
            answer: 'verb + the extra ending',
          },
          {
            label: '<strong>The library</strong> — one thing — <em>The library opens at six.</em>',
            answer: 'verb + the extra ending',
          },
          {
            label: '<strong>My parents</strong> — more than one — <em>My parents work here.</em>',
            answer: 'plain verb — no ending',
          },
        ],
        rule: {
          question: 'Which statement matches the table you just built?',
          options: [
            {
              id: 'a',
              label:
                'Only <strong>he, she, it</strong> — and any single person or thing you could replace with one of them — give the verb its extra ending. <em>I, you, we, they</em> and every plural subject leave the verb plain.',
            },
            {
              id: 'b',
              label:
                'The verb takes the extra ending whenever the subject is a person&rsquo;s name.',
            },
            {
              id: 'c',
              label:
                'The verb takes the extra ending whenever the sentence is about something happening now.',
            },
          ],
          correct: 'a',
          explanation:
            '<em>Dina</em> is a <em>she</em> and <em>the library</em> is an <em>it</em>, so both ' +
            'take the ending. Option B breaks on the very last row of your own table: ' +
            '<em>my parents</em> names people too, and that row takes no ending at all. What ' +
            'counts is not <em>name or not</em> — it is <strong>one or more than one</strong>.',
        },
      },
      {
        id: 'spelling',
        title: 'Table 3 — How is that extra ending spelled?',
        headers: ['Verb', 'How it ends', 'He / She / It &hellip;'],
        options: ['+ s', '+ es', 'y → ies', 'has — a one-off'],
        rows: [
          { label: 'work', label2: 'ends in <em>k</em>', answer: '+ s' },
          { label: 'teach', label2: 'ends in <em>ch</em>', answer: '+ es' },
          { label: 'fix', label2: 'ends in <em>x</em>', answer: '+ es' },
          { label: 'wash', label2: 'ends in <em>sh</em>', answer: '+ es' },
          { label: 'go', label2: 'ends in <em>o</em>', answer: '+ es' },
          { label: 'play', label2: 'vowel + <em>y</em>', answer: '+ s' },
          { label: 'study', label2: 'consonant + <em>y</em>', answer: 'y → ies' },
          { label: 'have', label2: 'no rule helps here', answer: 'has — a one-off' },
        ],
        rule: {
          question: 'Which statement matches the table you just built?',
          options: [
            {
              id: 'a',
              label:
                'The <strong>last letters of the verb</strong> choose the spelling: after <em>s, x, ch, sh</em> and <em>-o</em> the ending is <em>-es</em>; a consonant in front of <em>-y</em> turns it into <em>-ies</em>; a vowel in front of <em>-y</em> keeps a plain <em>-s</em>; everything else simply adds <em>-s</em>. <em>Have</em> is the one you just have to remember: <em>has</em>.',
            },
            {
              id: 'b',
              label: 'Short verbs take <em>-s</em> and longer verbs take <em>-es</em>.',
            },
            {
              id: 'c',
              label:
                'Every verb ending in <em>-y</em> becomes <em>-ies</em>, and the rest add <em>-s</em>.',
            },
          ],
          correct: 'a',
          explanation:
            '<em>Play</em> and <em>study</em> both end in <em>-y</em> and behave differently, so ' +
            'the <em>-y</em> cannot be the whole story — the letter <strong>in front of it</strong> ' +
            'is. That is exactly where option C falls over. Read the middle column downwards: ' +
            'what the verb <em>means</em> never came into it once.',
        },
      },
      {
        id: 'negative',
        title: 'Table 4 — Saying that it does NOT happen',
        headers: ['The positive sentence', 'The same sentence, made negative'],
        options: ["don't + plain verb", "doesn't + plain verb", "doesn't + verb with its ending"],
        rows: [
          { label: 'I drink coffee.', answer: "don't + plain verb" },
          { label: 'We have lessons on Sunday.', answer: "don't + plain verb" },
          { label: 'Dina drink<strong>s</strong> coffee.', answer: "doesn't + plain verb" },
          { label: 'Her sister eat<strong>s</strong> meat.', answer: "doesn't + plain verb" },
          {
            label: 'The library open<strong>s</strong> on Sunday.',
            answer: "doesn't + plain verb",
          },
        ],
        rule: {
          question: 'Which statement matches the table you just built?',
          options: [
            {
              id: 'a',
              label:
                'The helper carries the ending, not the verb. <em>I, you, we, they</em> take <em>don&rsquo;t</em>; <em>he, she, it</em> take <em>doesn&rsquo;t</em> — and in both cases the main verb goes back to its <strong>plain form</strong>, because the <em>-s</em> has already moved onto <em>does</em>.',
            },
            {
              id: 'b',
              label: 'Put <em>not</em> straight after the verb: <em>Dina drinks not coffee.</em>',
            },
            {
              id: 'c',
              label:
                '<em>Doesn&rsquo;t</em> keeps the ending on the verb as well, so the sentence stays in the present.',
            },
          ],
          correct: 'a',
          explanation:
            'Look at the last three rows. <em>Drinks</em>, <em>eats</em> and <em>opens</em> all ' +
            'lost their <em>-s</em> the moment <em>doesn&rsquo;t</em> arrived. There is only ever ' +
            '<strong>one</strong> <em>-s</em> in the sentence, and <em>does</em> is holding it — ' +
            'which is why the third choice in the dropdown was never the answer anywhere.',
        },
      },
      {
        id: 'question',
        title: 'Table 5 — Asking whether it happens',
        headers: ['The statement', 'Turned into a question'],
        options: [
          'Do + subject + plain verb',
          'Does + subject + plain verb',
          'Does + subject + verb with its ending',
        ],
        rows: [
          { label: 'You play football after school.', answer: 'Do + subject + plain verb' },
          { label: 'Your parents work near your house.', answer: 'Do + subject + plain verb' },
          {
            label: 'Your mother teach<strong>es</strong> English.',
            answer: 'Does + subject + plain verb',
          },
          {
            label: 'The library open<strong>s</strong> on Saturday.',
            answer: 'Does + subject + plain verb',
          },
        ],
        rule: {
          question: 'Which statement matches the table you just built?',
          options: [
            {
              id: 'a',
              label:
                'Put <em>Do</em> or <em>Does</em> in front — <em>Does</em> for <em>he, she, it</em>, <em>Do</em> for everyone else — and leave the main verb <strong>plain</strong>, exactly as in the negative. The short answer repeats the helper, not the verb: <em>Yes, she does. · No, they don&rsquo;t.</em>',
            },
            {
              id: 'b',
              label: 'Move the verb to the front of the sentence: <em>Plays you football?</em>',
            },
            {
              id: 'c',
              label: 'Leave the sentence exactly as it is and only add a question mark.',
            },
          ],
          correct: 'a',
          explanation:
            '<em>Does</em> is doing the same job here that it did in Table 4: it takes the ' +
            '<em>-s</em> so the verb does not have to. That is why <em>Does she teaches?</em> has ' +
            'one <em>-s</em> too many, and why the short answer is <em>Yes, she does</em> rather ' +
            'than <em>Yes, she teaches</em>. Two tables, one idea.',
        },
      },
    ],
  },

  /* ==========================================================
     STAGE 6 — TEST YOUR RULES (verification)

     Twelve items. v3/v4, v5, v7, v9 and v12 exist to break a rule
     that was stated too loosely; the explanations say so out loud.
     ========================================================== */
  verification: {
    kicker: 'Stage 6 — Test Your Rules',
    goal: 'Put the rules you wrote under pressure, including the awkward cases.',
    instruction:
      'A rule is only worth keeping if it survives new sentences. Some of these are designed to ' +
      'break a rule that was stated too simply.',
    nextButtonLabel: 'Write my profile →',
    soal: [
      {
        id: 'v1',
        type: 'choice',
        rule: 'spelling',
        scenario: 'Dina writes the line about her mother&rsquo;s job.',
        question: 'Which form fits?',
        stem: 'My mother ___ English at a primary school.',
        options: [
          { id: 'a', label: 'teaches' },
          { id: 'b', label: 'teachs' },
          { id: 'c', label: 'teach' },
        ],
        correct: 'a',
        hints: [
          'Who is doing it — one person, or more than one?',
          'What letters does <em>teach</em> end in?',
        ],
        explanation:
          '<em>My mother</em> is a <em>she</em>, so the verb needs its ending — and ' +
          '<em>teach</em> ends in <em>-ch</em>, so that ending is <em>-es</em>: <em>teaches</em>.',
      },
      {
        id: 'v2',
        type: 'input',
        rule: 'spelling',
        scenario: 'Her father leaves for work before the sun is properly up.',
        question: 'Type the correct form of <em>go</em>.',
        stem: 'My father ___ to the garage at six.',
        answer: ['goes'],
        hints: [
          '<em>My father</em> is a <em>he</em>.',
          '<em>Go</em> ends in <em>-o</em>, and Table 3 has a row for that.',
        ],
        explanation:
          '<em>Go</em> ends in <em>-o</em>, which takes <em>-es</em> just like <em>-ch</em> and ' +
          '<em>-sh</em> do: <em>goes</em>.',
      },
      {
        id: 'v3',
        type: 'choice',
        rule: 'spelling',
        scenario: 'Her little brother is outside every afternoon.',
        question: 'Which form fits?',
        stem: 'My little brother ___ football every afternoon.',
        options: [
          { id: 'a', label: 'plays' },
          { id: 'b', label: 'plaies' },
          { id: 'c', label: 'play' },
        ],
        correct: 'a',
        hints: [
          'Look at the letter immediately in front of the <em>-y</em>.',
          '<em>a</em> is a vowel — and Table 3 kept a separate row for that.',
        ],
        explanation:
          'It is <em>pl-a-y</em>: a <strong>vowel</strong> sits in front of the <em>-y</em>, so ' +
          'the <em>-y</em> stays and only <em>-s</em> is added. Compare it with the next question.',
      },
      {
        id: 'v4',
        type: 'input',
        rule: 'spelling',
        scenario: 'Her sister left home for university last year.',
        question: 'Type the correct form of <em>study</em>.',
        stem: 'My sister ___ in Yogyakarta.',
        answer: ['studies'],
        hints: [
          'Again: what is the letter immediately in front of the <em>-y</em>?',
          '<em>d</em> is a consonant, so this row behaves differently from <em>play</em>.',
        ],
        explanation:
          'A <strong>consonant</strong> in front of the <em>-y</em> turns it into <em>-ies</em>: ' +
          '<em>studies</em>. Put this beside <em>plays</em> and you can see why &ldquo;every verb ' +
          'ending in -y becomes -ies&rdquo; was never the rule.',
      },
      {
        id: 'v5',
        type: 'choice',
        rule: 'subject',
        scenario: 'Dina describes the walk to school with her brother.',
        question: 'Which form fits?',
        stem: 'My brother and I ___ to school together.',
        options: [
          { id: 'a', label: 'walk' },
          { id: 'b', label: 'walks' },
          { id: 'c', label: 'walkes' },
        ],
        correct: 'a',
        hints: [
          'How many people are walking?',
          'Which single word could replace <em>my brother and I</em>?',
        ],
        explanation:
          '<em>My brother and I</em> is <em>we</em> — more than one — so the verb stays plain. ' +
          'The names of people are in there, but names were never what decided the ending.',
      },
      {
        id: 'v6',
        type: 'input',
        rule: 'subject',
        scenario: 'A visitor asks what time she can borrow a book.',
        question: 'Type the correct form of <em>open</em>.',
        stem: 'The school library ___ at half past six.',
        answer: ['opens'],
        hints: [
          'Which single word could replace <em>the school library</em>?',
          'It is an <em>it</em> — one thing.',
        ],
        explanation:
          '<em>The school library</em> is an <em>it</em>, so the verb takes its ending: ' +
          '<em>opens</em>. A subject does not have to be a person to count as <em>he, she, it</em>.',
      },
      {
        id: 'v7',
        type: 'choice',
        rule: 'negative',
        scenario: 'Dina explains what she drinks in the morning — and what she does not.',
        question: 'Which negative is correct?',
        stem: 'Dina ___ coffee.',
        options: [
          { id: 'a', label: 'doesn&rsquo;t drink' },
          { id: 'b', label: 'doesn&rsquo;t drinks' },
          { id: 'c', label: 'don&rsquo;t drink' },
        ],
        correct: 'a',
        hints: [
          '<em>Dina</em> is a <em>she</em> — so which helper?',
          'Count the <em>-s</em> endings in each choice. How many is a sentence allowed?',
        ],
        explanation:
          '<em>Doesn&rsquo;t</em> is already carrying the <em>-s</em>, so <em>drink</em> goes back ' +
          'to its plain form. Option B has the <em>-s</em> twice; option C gives it to nobody.',
      },
      {
        id: 'v8',
        type: 'input',
        rule: 'negative',
        scenario: 'Sunday is the one day with nothing scheduled.',
        question:
          'Make it negative. Type the <strong>two</strong> missing words (the helper and the verb).',
        stem: 'We ___ lessons on Sunday.',
        answer: ["don't have", 'do not have'],
        hints: [
          '<em>We</em> is not <em>he, she</em> or <em>it</em>.',
          'The verb is <em>have</em> — and after a helper it never becomes <em>has</em>.',
        ],
        explanation:
          '<em>We</em> takes <em>don&rsquo;t</em>, and the verb stays plain: <em>don&rsquo;t ' +
          'have</em>. <em>Has</em> only ever appears when there is no helper in front of it.',
      },
      {
        id: 'v9',
        type: 'choice',
        rule: 'question',
        scenario: 'Dina wants to ask her pen pal about his mother&rsquo;s work.',
        question: 'Which question is correct?',
        stem: 'Statement: <em>Your mother teaches English.</em>',
        options: [
          { id: 'a', label: 'Does your mother teach English?' },
          { id: 'b', label: 'Does your mother teaches English?' },
          { id: 'c', label: 'Do your mother teach English?' },
        ],
        correct: 'a',
        hints: [
          '<em>Your mother</em> is a <em>she</em> — so <em>Do</em> or <em>Does</em>?',
          'Once <em>Does</em> is there, what happens to the ending on the main verb?',
        ],
        explanation:
          '<em>Does</em> takes the ending, so <em>teach</em> goes back to plain. Exactly the same ' +
          'move as the negative — one <em>-s</em>, and the helper is holding it.',
      },
      {
        id: 'v10',
        type: 'choice',
        rule: 'question',
        scenario: 'Her pen pal asks about her sister at dinner time.',
        question: 'Which short answer is correct?',
        stem: '&ldquo;Does your sister eat meat?&rdquo; &mdash; &ldquo;___&rdquo;',
        options: [
          { id: 'a', label: 'No, she doesn&rsquo;t.' },
          { id: 'b', label: 'No, she doesn&rsquo;t eats.' },
          { id: 'c', label: 'No, she not eat.' },
        ],
        correct: 'a',
        hints: [
          'A short answer repeats one word from the question.',
          'Which word did the question put in front — the verb, or the helper?',
        ],
        explanation:
          'A short answer sends back the <strong>helper</strong>, not the verb: <em>Yes, she ' +
          'does. · No, she doesn&rsquo;t.</em> Nothing else from the question needs repeating.',
      },
      {
        id: 'v11',
        type: 'choice',
        rule: 'meaning',
        scenario: 'Dina&rsquo;s teacher asks the class to find one sentence that is not a habit.',
        question: 'Which sentence states a <strong>fact</strong> rather than a habit?',
        stem: 'Read all three, then choose.',
        options: [
          { id: 'a', label: 'Water boils at 100 degrees.' },
          { id: 'b', label: 'I always help my father on Sundays.' },
          { id: 'c', label: 'We clean the classroom on Fridays.' },
        ],
        correct: 'a',
        hints: [
          'Look for the repeat signals: <em>always</em>, <em>on Sundays</em>, <em>on Fridays</em>.',
          'Which sentence has nothing that says &ldquo;again and again&rdquo;?',
        ],
        explanation:
          'Water does not boil at 100 degrees <em>on Fridays</em> — it simply does, always and ' +
          'everywhere. No repeat signal, because nothing is coming round again: that is a fact, ' +
          'and it uses the very same verb form as a habit.',
      },
      {
        id: 'v12',
        type: 'choice',
        rule: 'mixed',
        scenario: 'Dina reads her last two lines back before she sends the card.',
        question: 'Which version is completely correct?',
        stem: 'Both halves have to survive your rules.',
        options: [
          {
            id: 'a',
            label: 'My sister doesn&rsquo;t watch television, and she goes to bed at nine.',
          },
          {
            id: 'b',
            label: 'My sister doesn&rsquo;t watches television, and she go to bed at nine.',
          },
          {
            id: 'c',
            label: 'My sister don&rsquo;t watch television, and she goes to bed at nine.',
          },
        ],
        correct: 'a',
        hints: [
          'Check each half on its own.',
          'The half with a helper and the half without one follow different rules.',
        ],
        explanation:
          'After <em>doesn&rsquo;t</em> the verb is plain (<em>watch</em>); with no helper at all, ' +
          '<em>she</em> gives the verb its ending (<em>goes</em>). Option B gets both halves ' +
          'backwards; option C gives <em>she</em> the wrong helper.',
      },
    ],
  },

  /* ==========================================================
     STAGE 7 — WRITE YOUR PROFILE (generalisation)

     The builder is the warm-up; the writing is the real assessment.
     Distractor chips are the wrong-form twins of the real ones, so a
     chip picked by guesswork still shows up as a wrong sentence.
     ========================================================== */
  generalization: {
    kicker: 'Stage 7 — Write Your Profile',
    goal: 'Use all five rules on a person you actually know: yourself.',
    builderInstruction:
      'Warm up first. Click the words in the right order to build each sentence. Click a word you ' +
      'have placed to take it back. Some words in the bank do not belong in the sentence at all.',
    builder: [
      {
        id: 'b1',
        context: 'Start your card with what your morning looks like.',
        parts: ['I', 'get up', 'at', 'five', 'every', 'morning'],
        distractors: ['gets up', 'on'],
        hint: '<em>I</em> never gives the verb an ending, and a habit needs its repeat signal.',
      },
      {
        id: 'b2',
        context: 'Now a line about what your mother does.',
        parts: ['My', 'mother', 'teaches', 'at', 'a', 'primary', 'school'],
        distractors: ['teach', 'teachs'],
        hint: '<em>My mother</em> is a <em>she</em>, and <em>teach</em> ends in <em>-ch</em>.',
      },
      {
        id: 'b3',
        context: 'Add one thing you never do in the morning.',
        parts: ['I', 'don&rsquo;t', 'drink', 'coffee', 'in', 'the', 'morning'],
        distractors: ['doesn&rsquo;t', 'drinks'],
        hint: '<em>I</em> takes <em>don&rsquo;t</em>, and the verb after a helper stays plain.',
      },
      {
        id: 'b4',
        context: 'Finish with a question for your pen pal.',
        parts: ['Does', 'your', 'sister', 'study', 'in', 'another', 'city?'],
        distractors: ['Do', 'studies'],
        hint: '<em>Your sister</em> is a <em>she</em> — and <em>Does</em> is already holding the ending.',
      },
    ],
    builderCorrect: 'Exactly right.',
    builderWrong: 'Not yet — check the order and the verb form, then try again.',
    builderIncomplete: 'Use all of the words that belong in the sentence first.',
    writeTitle: 'Now write your own profile card',
    writeInstruction:
      'Write a profile card for a pen pal who has never met you. Use <strong>four to six ' +
      'complete sentences</strong>: at least two <strong>habits</strong> with their repeat ' +
      'signals, at least one <strong>fact</strong> about your family or your school, at least ' +
      'one <strong>negative</strong> sentence about something you do not do — and finish with ' +
      '<strong>one question</strong> for your pen pal.',
    writeLabel: 'My profile card',
    writePlaceholder: 'My name is…\nI get up at… every morning.\nMy mother…\nI don’t…\nDo you…?',
    minWords: 30,
    tooShortMessage: 'Write at least 30 words — four to six complete sentences.',
    rubricTitle: 'Check your own writing',
    rubricInstruction:
      'Read your card back slowly and tick only what is honestly true. Nobody scores this but ' +
      'you — and an honest tick is worth more than a full box.',
    rubric: [
      {
        id: 'r1',
        text: 'Every verb after <em>he</em>, <em>she</em>, <em>it</em> or one person&rsquo;s name has its ending — and I checked the letter in front of any <em>-y</em>.',
      },
      {
        id: 'r2',
        text: 'The verbs after <em>I</em>, <em>we</em>, <em>they</em> and my plural subjects are still plain.',
      },
      {
        id: 'r3',
        text: 'My negative sentence uses <em>don&rsquo;t</em> or <em>doesn&rsquo;t</em>, and the verb straight after it has no ending.',
      },
      {
        id: 'r4',
        text: 'My question starts with <em>Do</em> or <em>Does</em>, the verb after it is plain, and it ends with a question mark.',
      },
      {
        id: 'r5',
        text: 'At least two sentences are habits and carry a repeat signal (<em>every day</em>, <em>on Mondays</em>, <em>always</em>).',
      },
      {
        id: 'r6',
        text: 'Every sentence is complete — subject, verb and the rest of the information — so I could read it aloud to a stranger and be understood.',
      },
    ],
    nextButtonLabel: 'Reflect on my work →',
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
        label: 'Which of the five rules became obvious the moment you saw the evidence?',
        placeholder: 'The clearest one for me was…',
      },
      {
        id: 'p2',
        label:
          'Where does the extra <em>-s</em> still catch you out, and what will you check first next time?',
        placeholder: 'I still put the -s on… so next time I will check…',
      },
      {
        id: 'p3',
        label:
          'Who outside this classroom could you describe in English this week, and what would you say?',
        placeholder: 'I could describe… I would say…',
      },
    ],
    confidenceLabel:
      'Right now, how confident do you feel writing about your habits and asking someone about theirs?',
    confidenceOptions: [
      { id: 'low', label: 'Still shaky — I need the rule tables in front of me.' },
      { id: 'mid', label: 'Getting there — I can do it slowly, with checking.' },
      { id: 'high', label: 'Confident — I could introduce myself out loud right now.' },
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
        id: 'meaning',
        title: 'Habits and facts',
        body: 'One tense, two jobs. With a <strong>repeat signal</strong> (<em>every day · on Fridays · always</em>) it is a <strong>habit</strong>; with none, it is simply <strong>true</strong>. The verb looks the same either way.',
      },
      {
        id: 'subject',
        title: 'Who gets the ending',
        body: 'The <strong>subject</strong> decides. <em>He · she · it</em> — and any one person or one thing — take <em>verb + ending</em>. <em>I · you · we · they</em> and every plural leave the verb plain.',
      },
      {
        id: 'spelling',
        title: 'Spelling the ending',
        body: 'The <strong>last letters</strong> decide. After <em>s · x · ch · sh · o</em> &rarr; <em>-es</em> · consonant + <em>y</em> &rarr; <em>-ies</em> · vowel + <em>y</em> &rarr; <em>-s</em> · everything else &rarr; <em>-s</em>. And <em>have &rarr; has</em>.',
      },
      {
        id: 'negative',
        title: 'Saying no',
        body: '<em>Don&rsquo;t</em> for <em>I · you · we · they</em> · <em>doesn&rsquo;t</em> for <em>he · she · it</em> — and the verb after it goes <strong>plain</strong>, because the helper is holding the <em>-s</em>.',
      },
      {
        id: 'question',
        title: 'Asking',
        body: '<em>Do</em> or <em>Does</em> goes in front, the verb stays <strong>plain</strong>, and the short answer sends back the helper: <em>Yes, she does. · No, they don&rsquo;t.</em>',
      },
    ],
    messageGood:
      'Strong work. You did not just answer questions — you built the rules first and then defended them.',
    messageOk:
      'A solid pass. Go back to the Pattern Lab table for the rule that cost you the most marks, then retry Stage 6.',
    messageNeedsWork:
      'The patterns have not settled yet, and that is fair — five of them at once is a lot. Redo the Evidence Board slowly; the sorting is what makes the tables obvious.',
    completionTitle: 'What you completed',
    restartLabel: 'Start again from the beginning',
  },
};
