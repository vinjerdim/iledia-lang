'use strict';

/* ============================================================
   data.js — All learning content for MPI 1
   English: To Be, Pronouns & There is/are

   Every sentence a learner reads lives here, so app.js only has to
   decide HOW things are shown, never WHAT is taught.

   The stages follow the Discovery Learning syntax:
     stimulation → problem statement → data collection →
     data processing → verification → generalisation
   ============================================================ */

var DATA = {
  meta: {
    title: 'To Be, Pronouns & There is/are',
    objective:
      'Use <em>to be</em> and pronouns to state the identity and the existence of people and things.',
    subTopics: [
      'To be: <strong>am / is / are</strong>',
      'Personal pronouns &amp; possessive adjectives',
      '<strong>This / that / these / those</strong>',
      '<strong>There is / there are</strong>',
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
      'Rani has to introduce her classroom to an exchange student who has never been there. ' +
      'She writes a short description. Every sentence she writes hides a pattern — and by the ' +
      'end of this module you will have worked that pattern out yourself.',
    lead:
      'Nobody is going to hand you the grammar rules in this module. You will <strong>collect ' +
      'the evidence first</strong>, then write the rules yourself, then test whether your rules ' +
      'survive.',
    objectives: [
      'Identify the words that change shape in an English description (<em>am/is/are</em>, pronouns, <em>this/these</em>, <em>there is/are</em>).',
      'Group real example sentences by the pattern they follow.',
      'Build your own rule table for <em>to be</em>, pointing words, possessive adjectives, and <em>there is/there are</em>.',
      'Test your rules on new sentences, including the tricky ones.',
      'Describe a real place of your own using the rules you built.',
    ],
    steps: [
      'Read and mark — notice which words keep changing.',
      'Choose the questions you want to answer.',
      'Sort real sentences into evidence groups.',
      'Turn your evidence into a rule table.',
      'Test your rules on new sentences.',
      'Describe your own space, then reflect on what still feels shaky.',
    ],
    note:
      'Your progress is saved in this browser, so you can close the tab and come back to the ' +
      'same stage later.',
  },

  /* ==========================================================
     STAGE 2 — NOTICE IT (stimulation)

     Each sentence is an array of tokens. A plain string is ordinary
     text; an object { w, k } is a target word the learner should
     notice, where k is the pattern it belongs to (revealed later,
     never at this stage).
     ========================================================== */
  noticeIt: {
    kicker: 'Stage 2 — Notice It',
    goal: 'Spot the words that change shape when the speaker, the number, or the distance changes.',
    instruction:
      'Read Rani&rsquo;s description. Click every word that you think <strong>changes shape</strong> ' +
      'depending on who or what is being talked about. Do not worry about rules yet — there are none ' +
      'on this page. Just notice.',
    minFound: 10,
    text: [
      ['Hello! ', { w: 'I', k: 'pronoun' }, ' ', { w: 'am', k: 'tobe' }, ' Rani.'],
      [
        { w: 'This', k: 'pointing' },
        ' ',
        { w: 'is', k: 'tobe' },
        ' ',
        { w: 'my', k: 'possessive' },
        ' classroom. ',
        { w: 'It', k: 'pronoun' },
        ' ',
        { w: 'is', k: 'tobe' },
        ' Room 12.',
      ],
      [{ w: 'There are', k: 'existence' }, ' thirty chairs and one long whiteboard inside.'],
      [{ w: 'There is', k: 'existence' }, ' a round clock above the door.'],
      [
        { w: 'Those', k: 'pointing' },
        ' windows at the back ',
        { w: 'are', k: 'tobe' },
        ' always open.',
      ],
      [
        { w: 'My', k: 'possessive' },
        ' friend Dimas sits next to me. ',
        { w: 'He', k: 'pronoun' },
        ' ',
        { w: 'is', k: 'tobe' },
        ' the class captain.',
      ],
      [
        { w: 'His', k: 'possessive' },
        ' bag is under ',
        { w: 'that', k: 'pointing' },
        ' grey table.',
      ],
      [{ w: 'These', k: 'pointing' }, ' books on my desk ', { w: 'are', k: 'tobe' }, ' new.'],
    ],
    debriefTitle: 'So what did you just notice?',
    debrief:
      'Every word you marked belongs to one of four small families. None of them is random — each ' +
      'one is chosen by something else in the sentence. Working out <em>what chooses them</em> is ' +
      'the job of the next few stages.',
    familyTeaser: [
      'Words like <em>am, is, are</em>',
      'Words like <em>I, he, it</em> and <em>my, his</em>',
      'Words like <em>this, that, these, those</em>',
      'Phrases like <em>there is, there are</em>',
    ],
  },

  /* ==========================================================
     STAGE 3 — YOUR QUESTIONS (problem statement)

     `focus: true` marks a question about the pattern itself. The
     others are perfectly reasonable questions, just not the problem
     this module sets out to solve.
     ========================================================== */
  problemStatement: {
    kicker: 'Stage 3 — Your Questions',
    goal: 'Turn what you noticed into questions worth investigating.',
    instruction:
      'A discovery starts with a good question. Pick <strong>at least three</strong> questions you ' +
      'want this module to answer, then add one of your own.',
    minSelected: 3,
    candidates: [
      {
        id: 'q-tobe-subject',
        text: 'Why is it <em>I am</em> but <em>She is</em>? What decides am / is / are?',
        focus: true,
      },
      {
        id: 'q-spelling',
        text: 'How do you spell <em>whiteboard</em> — one word or two?',
        focus: false,
        note: 'A fair question about vocabulary, but it will not explain why the words change shape.',
      },
      {
        id: 'q-pointing',
        text: 'What decides <em>this</em> versus <em>these</em>, and <em>this</em> versus <em>that</em>?',
        focus: true,
      },
      {
        id: 'q-existence',
        text: 'When do we say <em>there is</em> and when <em>there are</em>?',
        focus: true,
      },
      {
        id: 'q-possessive',
        text: 'What is the difference between <em>he</em> and <em>his</em>, or <em>I</em> and <em>my</em>?',
        focus: true,
      },
      {
        id: 'q-accent',
        text: 'How do I pronounce <em>those</em> like a native speaker?',
        focus: false,
        note: 'Useful for speaking practice, but pronunciation is not the pattern we are hunting here.',
      },
      {
        id: 'q-order',
        text: 'Does the pattern still hold if the sentence is a question, e.g. <em>Is this your bag?</em>',
        focus: true,
      },
    ],
    ownQuestionLabel: 'One more question of my own',
    ownQuestionHint:
      'Write it in English or in your own language — nobody is marking the wording, only your thinking.',
    ownQuestionPlaceholder: 'I still want to know why…',
    feedbackFocus:
      'Good — these are <strong>pattern questions</strong>. They ask what <em>decides</em> a word, ' +
      'not what a word means. Keep them in view: the next three stages exist to answer them.',
    feedbackMixed:
      'You picked at least one question about spelling or pronunciation. Those are worth asking, ' +
      'but they will not be answered here — this module hunts for the pattern that decides which ' +
      'form a word takes.',
  },

  /* ==========================================================
     STAGE 4 — EVIDENCE BOARD (data collection)
     ========================================================== */
  evidence: {
    kicker: 'Stage 4 — Evidence Board',
    goal: 'Group real sentences by the family of words they use.',
    instruction:
      'Here are sixteen real sentences from Rani&rsquo;s classroom. Click a card, then click the ' +
      'board it belongs on. You are not being marked yet — you are building the dataset you will ' +
      'read the pattern from.',
    buckets: [
      {
        id: 'tobe',
        name: 'Forms of <em>to be</em>',
        clue: 'am · is · are',
      },
      {
        id: 'pronoun',
        name: 'Words that replace a name',
        clue: 'I · he · she · it · we · they · my · his · her · their',
      },
      {
        id: 'pointing',
        name: 'Words that point at things',
        clue: 'this · that · these · those',
      },
      {
        id: 'existence',
        name: 'Saying that something exists',
        clue: 'there is · there are',
      },
    ],
    cards: [
      { id: 'e1', text: 'I <strong>am</strong> the class secretary.', bucket: 'tobe' },
      { id: 'e2', text: 'The whiteboard <strong>is</strong> two metres long.', bucket: 'tobe' },
      { id: 'e3', text: 'The windows <strong>are</strong> open every morning.', bucket: 'tobe' },
      { id: 'e4', text: 'You <strong>are</strong> late again, Dimas.', bucket: 'tobe' },

      { id: 'e5', text: '<strong>She</strong> teaches us English.', bucket: 'pronoun' },
      { id: 'e6', text: '<strong>Their</strong> uniforms are grey and white.', bucket: 'pronoun' },
      { id: 'e7', text: 'Put the chalk back in <strong>its</strong> box.', bucket: 'pronoun' },
      { id: 'e8', text: '<strong>We</strong> clean the room every Friday.', bucket: 'pronoun' },

      { id: 'e9', text: '<strong>This</strong> chair is broken.', bucket: 'pointing' },
      {
        id: 'e10',
        text: '<strong>That</strong> building across the road is the library.',
        bucket: 'pointing',
      },
      {
        id: 'e11',
        text: '<strong>These</strong> markers do not work any more.',
        bucket: 'pointing',
      },
      {
        id: 'e12',
        text: '<strong>Those</strong> trees were planted last year.',
        bucket: 'pointing',
      },

      { id: 'e13', text: '<strong>There is</strong> a map on the back wall.', bucket: 'existence' },
      {
        id: 'e14',
        text: '<strong>There are</strong> four fans in the ceiling.',
        bucket: 'existence',
      },
      {
        id: 'e15',
        text: '<strong>There is</strong> some chalk dust on the floor.',
        bucket: 'existence',
      },
      {
        id: 'e16',
        text: '<strong>There are</strong> two doors in this room.',
        bucket: 'existence',
      },
    ],
    checkLabel: 'Check my sorting',
    allPlacedMessage: 'Place every card on a board first.',
    perfectFeedback:
      'Every card is on the right board. Your dataset is clean — now read the pattern out of it.',
    partialFeedback:
      'Some cards are on the wrong board. Look again at the <strong>bold</strong> word in each one: ' +
      'that word, not the topic of the sentence, decides where the card belongs.',
  },

  /* ==========================================================
     STAGE 5 — PATTERN LAB (data processing)
     ========================================================== */
  patternLab: {
    kicker: 'Stage 5 — Pattern Lab',
    goal: 'Turn your sorted evidence into rules you wrote yourself.',
    instruction:
      'Fill in each table from the evidence you just sorted, then choose the rule statement that ' +
      'matches the table you built. Nothing here is guesswork — every answer is visible on the ' +
      'Evidence Board.',
    tables: [
      {
        id: 'tobe',
        title: 'Table 1 — Which form of <em>to be</em>?',
        headers: ['Subject', 'Form of <em>to be</em>'],
        options: ['am', 'is', 'are'],
        rows: [
          { label: 'I', answer: 'am' },
          { label: 'You', answer: 'are' },
          { label: 'He / She / It', answer: 'is' },
          { label: 'We / They', answer: 'are' },
          {
            label: 'My friend <span class="pattern-table__aside">(one person)</span>',
            answer: 'is',
          },
          {
            label: 'My friends <span class="pattern-table__aside">(more than one)</span>',
            answer: 'are',
          },
        ],
        rule: {
          question: 'Which statement matches the table you just built?',
          options: [
            {
              id: 'a',
              label:
                'The form of <em>to be</em> is chosen by the <strong>subject</strong>: <em>I</em> takes <em>am</em>, a single third person takes <em>is</em>, and <em>you</em> or any plural takes <em>are</em>.',
            },
            {
              id: 'b',
              label:
                'The form of <em>to be</em> is chosen by the <strong>word right after it</strong>.',
            },
            { id: 'c', label: '<em>Is</em> is for the present and <em>are</em> is for the past.' },
          ],
          correct: 'a',
          explanation:
            'Look down the first column: nothing after the verb ever changed, only the subject did. ' +
            'The subject is what picks the form.',
        },
      },
      {
        id: 'pointing',
        title: 'Table 2 — Which pointing word?',
        headers: ['How many?', 'Near or far?', 'Word'],
        options: ['this', 'that', 'these', 'those'],
        rows: [
          { label: 'One thing', label2: 'Near me', answer: 'this' },
          { label: 'One thing', label2: 'Far from me', answer: 'that' },
          { label: 'More than one', label2: 'Near me', answer: 'these' },
          { label: 'More than one', label2: 'Far from me', answer: 'those' },
        ],
        rule: {
          question: 'Which statement matches the table you just built?',
          options: [
            {
              id: 'a',
              label:
                'Two things choose the word at once: <strong>number</strong> (one or many) and <strong>distance</strong> (near or far).',
            },
            {
              id: 'b',
              label:
                'Only distance matters — <em>this</em> and <em>these</em> are simply politer than <em>that</em> and <em>those</em>.',
            },
            { id: 'c', label: 'Only number matters — near and far are interchangeable.' },
          ],
          correct: 'a',
          explanation:
            'The table has two input columns and one output column. Cover either input column and ' +
            'the word can no longer be predicted — so both matter.',
        },
      },
      {
        id: 'existence',
        title: 'Table 3 — <em>There is</em> or <em>there are</em>?',
        headers: ['What comes next', 'Phrase'],
        options: ['there is', 'there are'],
        rows: [
          { label: 'one chair', answer: 'there is' },
          { label: 'twenty chairs', answer: 'there are' },
          {
            label: 'some water <span class="pattern-table__aside">(cannot be counted)</span>',
            answer: 'there is',
          },
          { label: 'three bottles of water', answer: 'there are' },
        ],
        rule: {
          question: 'Which statement matches the table you just built?',
          options: [
            {
              id: 'a',
              label:
                'The <strong>noun straight after the phrase</strong> decides it: plural &rarr; <em>there are</em>; singular or uncountable &rarr; <em>there is</em>.',
            },
            {
              id: 'b',
              label: 'The size of the thing decides it: big things take <em>there are</em>.',
            },
            {
              id: 'c',
              label: '<em>There is</em> is used for places and <em>there are</em> for people.',
            },
          ],
          correct: 'a',
          explanation:
            'Row 3 is the giveaway: <em>water</em> is a lot of water, but it cannot be counted, so ' +
            'it behaves like a singular and takes <em>there is</em>.',
        },
      },
      {
        id: 'possessive',
        title: 'Table 4 — From pronoun to possessive',
        headers: ['Pronoun (does the action)', 'Possessive (owns something)'],
        options: ['my', 'your', 'his', 'her', 'its', 'our', 'their'],
        rows: [
          { label: 'I', answer: 'my' },
          { label: 'you', answer: 'your' },
          { label: 'he', answer: 'his' },
          { label: 'she', answer: 'her' },
          { label: 'it', answer: 'its' },
          { label: 'we', answer: 'our' },
          { label: 'they', answer: 'their' },
        ],
        rule: {
          question: 'Which statement matches the table you just built?',
          options: [
            {
              id: 'a',
              label:
                'A possessive adjective always has a <strong>noun right after it</strong> — it never stands alone as the subject.',
            },
            {
              id: 'b',
              label: 'A possessive adjective is just the pronoun with <em>-s</em> added.',
            },
            { id: 'c', label: 'Pronouns and possessives can be swapped freely; both are correct.' },
          ],
          correct: 'a',
          explanation:
            'Compare <em>He is late</em> with <em>His bag is late</em>. The possessive needs the ' +
            'noun <em>bag</em> to lean on; the pronoun does not.',
        },
      },
    ],
    incompleteMessage: 'Fill in every row of this table first.',
    ruleLockedMessage: 'Complete the table correctly before choosing your rule.',
    tableCorrectFeedback: 'Table complete. Now state the rule it shows.',
    tableWrongFeedback:
      'Some rows do not match the evidence yet. Go back to the boards you sorted and check them.',
  },

  /* ==========================================================
     STAGE 6 — TEST YOUR RULES (verification)
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
        rule: 'tobe',
        scenario: 'Dimas introduces himself to the exchange student.',
        stem: 'Hello, my name is Dimas. I ___ the class captain.',
        question: 'Which form of <em>to be</em> fits?',
        options: [
          { id: 'a', label: 'am' },
          { id: 'b', label: 'is' },
          { id: 'c', label: 'are' },
        ],
        correct: 'a',
        hints: [
          'Who is the subject of this sentence?',
          '<em>I</em> is the one subject that never takes <em>is</em> or <em>are</em>.',
        ],
        explanation: '<em>I</em> takes <em>am</em> — it is the only subject that does.',
      },
      {
        id: 'v2',
        type: 'choice',
        rule: 'tobe',
        scenario: 'The teacher looks for two students.',
        stem: 'Rani and Dimas ___ in the library now.',
        question: 'Which form of <em>to be</em> fits?',
        options: [
          { id: 'a', label: 'am' },
          { id: 'b', label: 'is' },
          { id: 'c', label: 'are' },
        ],
        correct: 'c',
        hints: [
          'How many people is the sentence about?',
          'Two names joined by <em>and</em> make a plural subject.',
        ],
        explanation:
          '<em>Rani and Dimas</em> is a plural subject, so it takes <em>are</em> — exactly like <em>they</em>.',
      },
      {
        id: 'v3',
        type: 'input',
        rule: 'tobe',
        scenario: 'Rani describes the front of the room.',
        stem: 'The whiteboard ___ very long.',
        question: 'Type the missing form of <em>to be</em>.',
        answer: ['is', "'s"],
        hints: ['One whiteboard, and it is not <em>I</em> or <em>you</em>.'],
        explanation:
          'One thing, third person, so it behaves like <em>it</em> and takes <em>is</em>.',
      },
      {
        id: 'v4',
        type: 'choice',
        rule: 'possessive',
        scenario: 'Rani talks about her sister.',
        stem: 'Sinta is my sister. ___ is a nurse at the clinic.',
        question: 'Which word fits the blank?',
        options: [
          { id: 'a', label: 'He' },
          { id: 'b', label: 'She' },
          { id: 'c', label: 'Her' },
          { id: 'd', label: 'It' },
        ],
        correct: 'b',
        hints: [
          'The blank is the subject of the sentence — the one who <em>is</em> a nurse.',
          '<em>Her</em> would need a noun after it, and there is none here.',
        ],
        explanation:
          'The blank is the subject, so it needs a pronoun, not a possessive: <em>She is a nurse</em>. ' +
          '<em>Her</em> would only work with a noun, as in <em>her clinic</em>.',
      },
      {
        id: 'v5',
        type: 'choice',
        rule: 'possessive',
        scenario: 'Rani points at a bag on the floor.',
        stem: 'That is Dimas. ___ bag is under the table.',
        question: 'Which word fits the blank?',
        options: [
          { id: 'a', label: 'He' },
          { id: 'b', label: 'Him' },
          { id: 'c', label: 'His' },
        ],
        correct: 'c',
        hints: [
          'What comes immediately after the blank?',
          'A noun follows the blank, so the blank must own it.',
        ],
        explanation:
          'The noun <em>bag</em> follows the blank, so a possessive adjective is needed: <em>His bag</em>.',
      },
      {
        id: 'v6',
        type: 'input',
        rule: 'possessive',
        scenario: 'Rani and Dimas share one desk.',
        stem: 'Rani and I share a desk. ___ desk is near the window.',
        question: 'Type the missing possessive adjective.',
        answer: ['our'],
        hints: [
          '<em>Rani and I</em> together means <em>we</em>.',
          'Which possessive belongs to <em>we</em>?',
        ],
        explanation:
          '<em>Rani and I</em> = <em>we</em>, and the possessive of <em>we</em> is <em>our</em>.',
      },
      {
        id: 'v7',
        type: 'choice',
        rule: 'pointing',
        scenario: 'Rani is holding a pen in her hand.',
        stem: '___ is my favourite pen.',
        question: 'Which pointing word fits?',
        options: [
          { id: 'a', label: 'This' },
          { id: 'b', label: 'That' },
          { id: 'c', label: 'These' },
          { id: 'd', label: 'Those' },
        ],
        correct: 'a',
        hints: ['How many pens? And how far away is it?', 'One pen, and it is in her hand.'],
        explanation: 'One thing (<em>pen</em>) and near the speaker, so it is <em>this</em>.',
      },
      {
        id: 'v8',
        type: 'choice',
        rule: 'pointing',
        scenario: 'Rani points through the window at the mountains on the horizon.',
        stem: '___ mountains are in East Java.',
        question: 'Which pointing word fits?',
        options: [
          { id: 'a', label: 'This' },
          { id: 'b', label: 'That' },
          { id: 'c', label: 'These' },
          { id: 'd', label: 'Those' },
        ],
        correct: 'd',
        hints: [
          '<em>Mountains</em> is plural — that rules out two options straight away.',
          'Now add the distance.',
        ],
        explanation: 'Plural and far away, so it is <em>those</em>.',
      },
      {
        id: 'v9',
        type: 'input',
        rule: 'pointing',
        scenario: 'Rani puts two new books on her own desk.',
        stem: '___ books are new.',
        question: 'Type the missing pointing word.',
        answer: ['these'],
        hints: ['Two books, and they are on her own desk.'],
        explanation: 'Plural and near the speaker, so it is <em>these</em>.',
      },
      {
        id: 'v10',
        type: 'choice',
        rule: 'existence',
        scenario: 'Rani checks the bottle on the teacher&rsquo;s desk.',
        stem: '___ some water in the bottle.',
        question: 'Which phrase fits?',
        options: [
          { id: 'a', label: 'There is' },
          { id: 'b', label: 'There are' },
        ],
        correct: 'a',
        hints: [
          'Can you count water? Can you say <em>one water, two waters</em>?',
          'Words you cannot count behave like singular words.',
        ],
        explanation:
          '<em>Water</em> cannot be counted, so it behaves like a singular noun and takes ' +
          '<em>there is</em> — even though there may be a lot of it. This is the case that breaks ' +
          'the rule &ldquo;a lot of something means <em>are</em>&rdquo;.',
      },
      {
        id: 'v11',
        type: 'choice',
        rule: 'existence',
        scenario: 'Rani counts the seats before an exam.',
        stem: '___ thirty chairs in this room.',
        question: 'Which phrase fits?',
        options: [
          { id: 'a', label: 'There is' },
          { id: 'b', label: 'There are' },
        ],
        correct: 'b',
        hints: ['Look at the noun straight after the blank.'],
        explanation: '<em>Chairs</em> is plural and countable, so it takes <em>there are</em>.',
      },
      {
        id: 'v12',
        type: 'choice',
        rule: 'mixed',
        scenario: 'Rani shows the exchange student a photo of two people.',
        stem: '___ my parents. ___ are very kind.',
        question: 'Which pair fills the two blanks?',
        options: [
          { id: 'a', label: '<em>This is</em> … <em>He</em>' },
          { id: 'b', label: '<em>These are</em> … <em>They</em>' },
          { id: 'c', label: '<em>These is</em> … <em>They</em>' },
          { id: 'd', label: '<em>Those are</em> … <em>It</em>' },
        ],
        correct: 'b',
        hints: [
          '<em>Parents</em> is plural, and the photo is in her hand.',
          'The second blank replaces <em>my parents</em> — how many people is that?',
        ],
        explanation:
          'Plural and near, so <em>These</em>; a plural subject takes <em>are</em>; and the pronoun ' +
          'that replaces two people is <em>They</em>. Three of your rules working at once.',
      },
    ],
    nextButtonLabel: 'My rules survived — continue →',
  },

  /* ==========================================================
     STAGE 7 — DESCRIBE YOUR SPACE (generalisation)
     ========================================================== */
  generalization: {
    kicker: 'Stage 7 — Describe Your Space',
    goal: 'Apply the rules you built to a room you actually know.',
    builderInstruction:
      'Warm up first. Click the words in the right order to build each sentence. Click a word you ' +
      'have placed to take it back.',
    builder: [
      {
        id: 'b1',
        context: 'You are standing in the middle of your own classroom.',
        parts: ['This', 'is', 'my', 'classroom'],
        distractors: ['are', 'These', 'I'],
        hint: 'One room, and you are inside it.',
      },
      {
        id: 'b2',
        context: 'You have just counted the seats.',
        parts: ['There', 'are', 'twenty', 'chairs', 'in', 'the', 'room'],
        distractors: ['is', 'a'],
        hint: 'The noun after the phrase is plural.',
      },
      {
        id: 'b3',
        context: 'You point at the windows at the far end of the room.',
        parts: ['Those', 'windows', 'are', 'open'],
        distractors: ['is', 'These', 'window'],
        hint: 'Plural and far away.',
      },
      {
        id: 'b4',
        context: 'Your friend has left his bag behind.',
        parts: ['His', 'bag', 'is', 'under', 'the', 'table'],
        distractors: ['He', 'are', 'their'],
        hint: 'A noun follows the first blank, so it needs an owner word.',
      },
    ],
    builderCorrect: 'Exactly right.',
    builderWrong: 'Not yet — check the order, then try again.',
    builderIncomplete: 'Use all of the words that belong in the sentence first.',
    writeTitle: 'Now write your own',
    writeInstruction:
      'Describe a real place you know well — your classroom, your workshop, your bedroom, your ' +
      'kitchen at home. Write <strong>four to six sentences</strong> in English.',
    writePlaceholder: 'This is my…\nThere is…\nThere are…\nThose…\nMy…',
    writeLabel: 'My description',
    rubricTitle: 'Check your own writing',
    rubricInstruction:
      'Read your description back slowly and tick only what is honestly true. Nobody scores this ' +
      'but you — and an honest tick is worth more than a full box.',
    rubric: [
      { id: 'r1', text: 'Every <em>am / is / are</em> matches its subject.' },
      {
        id: 'r2',
        text: 'I used at least one of <em>this / that / these / those</em>, and the number and distance both fit.',
      },
      {
        id: 'r3',
        text: 'I used <strong>both</strong> <em>there is</em> and <em>there are</em> at least once.',
      },
      {
        id: 'r4',
        text: 'I used at least one possessive adjective (<em>my, his, her, our, their</em>) with a noun after it.',
      },
      {
        id: 'r5',
        text: 'I checked every noun for singular or plural before choosing the word in front of it.',
      },
    ],
    minWords: 15,
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
      'anyway — being able to <em>state</em> the rule is different from getting the answers right.',
    mistakesTitle: 'Sentences worth a second look',
    mistakesLead:
      'These are the items you did not get right first time. The rule behind each one is printed ' +
      'underneath it.',
    promptsTitle: 'Your reflection',
    prompts: [
      {
        id: 'p1',
        label: 'Which of the four rules felt most obvious once you saw the evidence?',
        placeholder: 'The clearest one for me was…',
      },
      {
        id: 'p2',
        label:
          'Which one do you still mix up, and what is the giveaway you will look for next time?',
        placeholder: 'I still confuse… so next time I will check…',
      },
      {
        id: 'p3',
        label: 'Where outside this classroom could you use these sentences this week?',
        placeholder: 'I could use them when…',
      },
    ],
    confidenceLabel: 'Right now, how confident do you feel describing a room in English?',
    confidenceOptions: [
      { id: 'low', label: 'Still shaky — I need to see the rule table again.' },
      { id: 'mid', label: 'Getting there — I can do it slowly, with checking.' },
      { id: 'high', label: 'Confident — I could describe a room out loud right now.' },
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
        id: 'tobe',
        title: 'To be',
        body: 'The <strong>subject</strong> chooses the form. <em>I</em> &rarr; am · one third person &rarr; is · <em>you</em> and every plural &rarr; are.',
      },
      {
        id: 'pointing',
        title: 'Pointing words',
        body: '<strong>Number + distance</strong> choose the word. One/near &rarr; this · one/far &rarr; that · many/near &rarr; these · many/far &rarr; those.',
      },
      {
        id: 'existence',
        title: 'There is / there are',
        body: 'The <strong>noun straight after</strong> chooses the phrase. Plural &rarr; there are · singular or uncountable &rarr; there is.',
      },
      {
        id: 'possessive',
        title: 'Possessive adjectives',
        body: 'A possessive always <strong>leans on a noun</strong>: <em>his bag</em>, not <em>his is late</em>. The pronoun stands alone as the subject.',
      },
    ],
    messageGood:
      'Strong work. You did not just answer questions — you built the rules first and then defended them.',
    messageOk:
      'A solid pass. Go back to the Pattern Lab table for the rule that cost you the most marks, then retry Stage 6.',
    messageNeedsWork:
      'The pattern has not settled yet, and that is fair — this is a lot of grammar at once. Redo the Evidence Board slowly; the sorting is what makes the tables obvious.',
    completionTitle: 'What you completed',
    restartLabel: 'Start again from the beginning',
  },
};
