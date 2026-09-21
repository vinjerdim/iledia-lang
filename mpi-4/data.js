'use strict';

/* ============================================================
   data.js — Learning content for MPI 4
   English: Present Continuous — Happening Now

   Everything a teacher would want to change lives here; app.js only
   decides how it behaves. The rules themselves are never stated to the
   learner before Stage 5 — they are written as *options* there, so the
   learner chooses the statement that matches the table they built.

   The whole module runs inside one task (TBLT): a live video broadcast
   the learners will script and read aloud in Stage 7. Stage 1 shows them
   that task before anything else, so every stage in between is visibly
   preparation for something they are going to have to do.

   HTML is allowed in text fields (and is inserted unescaped) so that
   <em> and <strong> can carry the emphasis a grammar lesson needs.
   Anything a learner types is escaped by app.js instead.
   ============================================================ */

var DATA = {
  meta: {
    title: 'Present Continuous: Happening Now',
    objective:
      'Say and write what is <strong>happening at this very moment</strong> — and tell it apart ' +
      'from what simply <strong>happens every day</strong>.',
    subTopics: [
      'The shape: <strong>am · is · are</strong> + verb<strong>-ing</strong>',
      'Now or every day? Present continuous next to the simple present',
      'Spelling the <em>-ing</em>: <em>write &rarr; writing · sit &rarr; sitting · study &rarr; studying</em>',
      'Negatives and questions: <strong>isn&rsquo;t working · Are you watching?</strong>',
    ],
  },

  /* ==========================================================
     STAGE 1 — ORIENTATION  (Discovery: apersepsi · TBLT: pre-task)

     The target task is shown here, before any language work, because
     that is what makes the rest of the module feel like preparation
     rather than exercises.
     ========================================================== */
  orientation: {
    kicker: 'Stage 1 — Orientation',
    goal: 'See the task you are working towards, and how you will get there.',
    scenarioLabel: 'Situation',
    scenario:
      'Your school has a partner school abroad, and this week the two schools are swapping ' +
      '<strong>live video reports</strong>. Rani from the school journalism club has already ' +
      'sent hers: forty-five seconds of camera walking through the canteen, the workshop and ' +
      'the field, telling the other school what is happening <em>as they watch</em>. Now it is ' +
      'your turn to send one back.',
    taskTitle: 'Your task at the end of this module',
    taskBrief:
      'Write and read aloud a <strong>45-second live broadcast</strong> from your own school, ' +
      'for people who have never set foot in it.',
    taskBullets: [
      'At least <strong>two</strong> things that are happening <em>as the camera watches</em>.',
      'At least <strong>one</strong> thing your school does <em>every day</em> — so your audience can hear the difference.',
      'At least <strong>one</strong> thing that is <em>not</em> happening right now.',
      'One <strong>question</strong> back to the school that is watching you.',
    ],
    lead:
      'Nobody is going to hand you the grammar rules in this module. You will <strong>collect ' +
      'the evidence first</strong>, then write the rules yourself, then test whether your rules ' +
      'survive sentences they have never seen — and only then go on air.',
    objectives: [
      'Notice the words that tell you an action is <em>in progress</em> rather than finished or habitual.',
      'Group real sentences by the job the subject, the helper and the verb are doing together.',
      'Build your own rule tables for meaning, for <em>am/is/are</em>, for the <em>-ing</em> spelling, for the negative and for the question.',
      'Test your rules on new sentences, including the ones designed to break them.',
      'Script and deliver a live broadcast about what is happening in your own school right now.',
    ],
    steps: [
      'Watch Rani&rsquo;s broadcast in writing and mark the words that do the work.',
      'Choose the questions you want answered.',
      'Sort real sentences into evidence boards.',
      'Turn your evidence into five rule tables.',
      'Test your rules on new sentences.',
      'Script your own broadcast, check it against the rubric, and go live.',
    ],
    note:
      'Your progress is saved in this browser, so you can close the tab and come back to the ' +
      'same stage later.',
  },

  /* ==========================================================
     STAGE 2 — NOTICE IT  (Discovery: stimulation · TBLT: input)

     Each line is an array of tokens. A plain string is ordinary text;
     an object { w, k } is a clickable word, where k is the family it
     belongs to — revealed only as a teaser after the check, never as a
     rule at this stage.

     k: 'be'     — am / is / are, the helper
        'ing'    — the action word wearing -ing
        'now'    — a signal that pins the action to this moment
        'simple' — a plain simple-present verb           } decoy: true
        'habit'  — a signal of repetition, not of now    } decoy: true

     The two decoy families are the point of this stage: they are
     clickable and they look exactly as inviting as the targets, so a
     learner who marks them finds out at the check that "a word that
     does work" and "a word that shows work in progress" are not the
     same thing. That distinction is the whole module.
     ========================================================== */
  noticeIt: {
    kicker: 'Stage 2 — Notice It',
    goal: 'Find the words that show an action in progress. No rules yet.',
    instruction:
      'This is the transcript of Rani&rsquo;s live broadcast. <strong>Click every word that ' +
      'tells you something is happening right now, while the camera is watching.</strong> Some ' +
      'of the clickable words are about what happens every day instead — you have to decide. ' +
      'Nothing is marked right or wrong until you press the button.',
    minFound: 12,
    liveLabel: 'On air &middot; Live from our school',
    liveMeta: 'Rani &middot; School journalism club &middot; 09:30',
    text: [
      [
        'Hello, Greenfield High! My name is Rani, and you ',
        { w: 'are', k: 'be' },
        ' ',
        { w: 'watching', k: 'ing' },
        ' us live from our school in Salatiga.',
      ],
      [
        'It is half past nine ',
        { w: 'right now', k: 'now' },
        ', and the morning break ',
        { w: 'is', k: 'be' },
        ' just ',
        { w: 'starting', k: 'ing' },
        '.',
      ],
      [
        { w: 'Look', k: 'now' },
        ' at the canteen behind me. Bu Sari ',
        { w: 'is', k: 'be' },
        ' ',
        { w: 'frying', k: 'ing' },
        ' tempe, and thirty students ',
        { w: 'are', k: 'be' },
        ' ',
        { w: 'queueing', k: 'ing' },
        ' in front of her.',
      ],
      [
        'The canteen ',
        { w: 'opens', k: 'simple', decoy: true },
        ' at seven ',
        { w: 'every day', k: 'habit', decoy: true },
        ', but it never looks like this before the break.',
      ],
      [
        { w: 'Now', k: 'now' },
        ' the camera ',
        { w: 'is', k: 'be' },
        ' ',
        { w: 'turning', k: 'ing' },
        ' towards the workshop.',
      ],
      [
        'Three of my friends ',
        { w: 'are', k: 'be' },
        ' ',
        { w: 'fixing', k: 'ing' },
        ' a motorbike engine, and Pak Yusuf ',
        { w: 'is', k: 'be' },
        ' ',
        { w: 'writing', k: 'ing' },
        ' their marks on the board ',
        { w: 'at the moment', k: 'now' },
        '.',
      ],
      [
        'They ',
        { w: 'practise', k: 'simple', decoy: true },
        ' in there ',
        { w: 'twice a week', k: 'habit', decoy: true },
        ', so the room is never quiet.',
      ],
      [
        'I ',
        { w: 'am', k: 'be' },
        ' not ',
        { w: 'showing', k: 'ing' },
        ' you the field yet, because the rain ',
        { w: 'is', k: 'be' },
        ' still ',
        { w: 'falling', k: 'ing' },
        '.',
      ],
      [
        'So, Greenfield High — what ',
        { w: 'are', k: 'be' },
        ' you ',
        { w: 'doing', k: 'ing' },
        ' in your school ',
        { w: 'right now', k: 'now' },
        '?',
      ],
    ],
    debriefTitle: 'Three families — and two words that were not invited',
    debrief:
      'The words in green come in <strong>three families</strong>, and they almost never travel ' +
      'alone. Look at how they sit next to each other before you go on:',
    familyTeaser: [
      'A short helper word — <em>am · is · are</em> — that changes depending on who is in front of it.',
      'An action word wearing <strong>-ing</strong>. In this whole broadcast it never appears without a helper.',
      'A signal that pins the action to this exact moment: <em>right now · at the moment · Look! · Now</em>.',
    ],
    decoyNote:
      'Four of the clickable words were never part of the answer: <em>opens</em>, ' +
      '<em>practise</em>, <em>every day</em> and <em>twice a week</em>. They describe what happens ' +
      '<strong>again and again</strong>, not what is happening while the camera watches — a ' +
      'different job altogether. If you marked any of them they are in amber above, and by ' +
      'Stage 5 you will be able to say exactly what that difference is.',
  },

  /* ==========================================================
     STAGE 3 — YOUR QUESTIONS  (Discovery: problem statement)

     focus: true marks a pattern question — one this module can
     actually answer from evidence. The others are perfectly good
     questions that a dictionary or a map answers, and the feedback
     says so without pushing them away.
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
        text: 'Why is it <em>Bu Sari is frying tempe</em> and not simply <em>Bu Sari fries tempe</em>?',
        focus: true,
        note: 'A pattern question — and the one Table 1 is built from.',
      },
      {
        id: 'q2',
        text: 'What does <em>queueing</em> mean in Indonesian?',
        focus: false,
        note: 'Worth asking, but a dictionary answers it — no pattern is hiding inside it.',
      },
      {
        id: 'q3',
        text: 'Which subjects take <em>am</em>, which take <em>is</em>, and which take <em>are</em>?',
        focus: true,
        note: 'A pattern question — Table 2 answers it from the evidence you sort.',
      },
      {
        id: 'q4',
        text: 'Why does <em>write</em> lose its <em>-e</em> in <em>writing</em>, while <em>study</em> keeps its <em>-y</em> in <em>studying</em>?',
        focus: true,
        note: 'A pattern question — and the one most learners get wrong on the first try.',
      },
      {
        id: 'q5',
        text: 'How do you pronounce <em>queueing</em> out loud?',
        focus: false,
        note: 'A fair question for your teacher, but pronunciation is not what this evidence shows.',
      },
      {
        id: 'q6',
        text: 'How do you turn <em>She is fixing the engine</em> into a question?',
        focus: true,
        note: 'A pattern question — Table 5 answers it.',
      },
      {
        id: 'q7',
        text: 'Which lines describe what is happening as we watch, and which describe what happens every day?',
        focus: true,
        note: 'A pattern question — and the reason this module exists at all.',
      },
      {
        id: 'q8',
        text: 'Is Greenfield High a real school somewhere?',
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
      'Something the broadcast made you wonder about. It does not have to be a clever question ' +
      '— an honest one is worth more.',
    ownQuestionPlaceholder: 'I want to know why…',
    nextButtonLabel: 'Collect the evidence →',
  },

  /* ==========================================================
     STAGE 4 — EVIDENCE BOARD  (Discovery: data collection)

     Sixteen sentences, four to a board. Board 2 exists for one reason:
     without a pile of "every day" sentences sitting next to the "right
     now" pile, there is nothing for the learner to tell apart, and the
     module's whole objective is telling them apart.
     ========================================================== */
  evidence: {
    kicker: 'Stage 4 — Evidence Board',
    goal: 'Group real sentences by the job the subject, the helper and the verb are doing.',
    instruction:
      'Here are sixteen sentences from Rani&rsquo;s broadcast and from her school. Click a card, ' +
      'then click the board it belongs on. You are not being marked yet — you are building the ' +
      'dataset you will read the pattern from.',
    buckets: [
      {
        id: 'happeningNow',
        name: 'Happening as we watch',
        clue: 'am &middot; is &middot; are + verb-ing',
      },
      {
        id: 'everyDay',
        name: 'Every day, or simply true',
        clue: 'no <em>-ing</em> anywhere in sight',
      },
      {
        id: 'negative',
        name: 'NOT happening right now',
        clue: '&rsquo;m not &middot; isn&rsquo;t &middot; aren&rsquo;t',
      },
      {
        id: 'question',
        name: 'Asking what is happening',
        clue: 'Am&hellip;? &middot; Is&hellip;? &middot; Are&hellip;?',
      },
    ],
    cards: [
      {
        id: 'e1',
        text: 'Rani <strong>is standing</strong> at the front gate right now.',
        bucket: 'happeningNow',
      },
      {
        id: 'e2',
        text: 'Thirty students <strong>are queueing</strong> for bakso at the moment.',
        bucket: 'happeningNow',
      },
      {
        id: 'e3',
        text: 'Look! Pak Yusuf <strong>is writing</strong> the marks on the board.',
        bucket: 'happeningNow',
      },
      {
        id: 'e4',
        text: 'I <strong>am holding</strong> the camera with both hands.',
        bucket: 'happeningNow',
      },
      {
        id: 'e5',
        text: 'The canteen <strong>opens</strong> at seven every day.',
        bucket: 'everyDay',
      },
      {
        id: 'e6',
        text: 'My friends <strong>practise</strong> in the workshop twice a week.',
        bucket: 'everyDay',
      },
      {
        id: 'e7',
        text: 'Salatiga <strong>gets</strong> a lot of rain in January.',
        bucket: 'everyDay',
      },
      {
        id: 'e8',
        text: 'Bu Sari <strong>sells</strong> the best tempe in town.',
        bucket: 'everyDay',
      },
      {
        id: 'e9',
        text: 'The rain <strong>is not stopping</strong> yet.',
        bucket: 'negative',
      },
      {
        id: 'e10',
        text: 'We <strong>aren&rsquo;t showing</strong> you the field today.',
        bucket: 'negative',
      },
      {
        id: 'e11',
        text: 'I <strong>am not reading</strong> from a script — this is live.',
        bucket: 'negative',
      },
      {
        id: 'e12',
        text: 'My friends <strong>aren&rsquo;t sitting</strong> down; they are under the engine.',
        bucket: 'negative',
      },
      {
        id: 'e13',
        text: '<strong>Are</strong> you <strong>watching</strong> us in your classroom?',
        bucket: 'question',
      },
      {
        id: 'e14',
        text: '<strong>Is</strong> it <strong>raining</strong> in your city too?',
        bucket: 'question',
      },
      {
        id: 'e15',
        text: 'What <strong>are</strong> your friends <strong>doing</strong> right now?',
        bucket: 'question',
      },
      {
        id: 'e16',
        text: '<strong>Am</strong> I <strong>speaking</strong> too fast for you?',
        bucket: 'question',
      },
    ],
    checkLabel: 'Check my boards',
    allPlacedMessage: 'Every card has to be on a board before you can check.',
    perfectFeedback:
      'Every card is where the evidence says it belongs. Now read down each board before you go ' +
      'on — the pattern is already visible, nobody has just named it yet.',
    partialFeedback:
      'The cards in red are on the wrong board. Read them again and ask one question: is this ' +
      'sentence about a moment, or about a habit?',
  },

  /* ==========================================================
     STAGE 5 — PATTERN LAB  (Discovery: data processing)

     Five tables, each read straight off the boards from Stage 4.
     Tables 4 and 5 each carry dropdown options that are never the
     right answer on any row — that dead option IS the finding.
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
        title: 'Table 1 — Now, or every day?',
        headers: ['Sentence from the board', 'What it tells you'],
        options: ['it is happening as we watch', 'it happens again and again, or is simply true'],
        rows: [
          {
            label:
              'Rani <strong>is standing</strong> at the front gate <strong>right now</strong>.',
            answer: 'it is happening as we watch',
          },
          {
            label: 'The canteen <strong>opens</strong> at seven <strong>every day</strong>.',
            answer: 'it happens again and again, or is simply true',
          },
          {
            label:
              'Thirty students <strong>are queueing</strong> for bakso <strong>at the moment</strong>.',
            answer: 'it is happening as we watch',
          },
          {
            label:
              'My friends <strong>practise</strong> in the workshop <strong>twice a week</strong>.',
            answer: 'it happens again and again, or is simply true',
          },
          {
            label:
              '<strong>Look!</strong> Pak Yusuf <strong>is writing</strong> the marks on the board.',
            answer: 'it is happening as we watch',
          },
          {
            label: 'Bu Sari <strong>sells</strong> the best tempe in town.',
            answer: 'it happens again and again, or is simply true',
          },
        ],
        rule: {
          question: 'Which statement matches the table you just built?',
          options: [
            {
              id: 'a',
              label:
                'Two shapes for two jobs. <strong>am/is/are + verb-ing</strong> shows an action ' +
                '<strong>in progress while you watch</strong> — usually alongside <em>now · right ' +
                'now · at the moment · Look!</em>. The <strong>plain verb</strong> (with its ' +
                '<em>-s</em> after <em>he/she/it</em>) shows what happens <strong>again and ' +
                'again</strong>, or what is simply true.',
            },
            {
              id: 'b',
              label:
                'Both shapes mean exactly the same thing. The <em>-ing</em> shape is just a longer, more polite way of saying it.',
            },
            {
              id: 'c',
              label:
                'The <em>-ing</em> shape is for things that will happen later, and the plain verb is for things happening right now.',
            },
          ],
          correct: 'a',
          explanation:
            'Put rows 1 and 2 side by side. Both are true about the same school on the same ' +
            'morning — but row 1 is a <strong>moment</strong> you could film, and row 2 is a ' +
            '<strong>routine</strong> you could not. That is the difference the two shapes carry, ' +
            'and it is why your broadcast in Stage 7 needs both.',
        },
      },
      {
        id: 'subject',
        title: 'Table 2 — Which helper does the subject take?',
        headers: ['Subject', 'The word in front of the -ing'],
        options: ['am', 'is', 'are'],
        rows: [
          { label: '<strong>I</strong> — <em>I ___ holding the camera.</em>', answer: 'am' },
          { label: '<strong>You</strong> — <em>You ___ watching us live.</em>', answer: 'are' },
          {
            label: '<strong>He / She / It</strong> — <em>She ___ frying tempe.</em>',
            answer: 'is',
          },
          {
            label: '<strong>We</strong> — <em>We ___ walking to the workshop.</em>',
            answer: 'are',
          },
          {
            label: '<strong>They</strong> — <em>They ___ fixing an engine.</em>',
            answer: 'are',
          },
          {
            label:
              '<strong>Pak Yusuf</strong> — one person — <em>Pak Yusuf ___ writing the marks.</em>',
            answer: 'is',
          },
          {
            label:
              '<strong>Thirty students</strong> — more than one — <em>Thirty students ___ queueing.</em>',
            answer: 'are',
          },
        ],
        rule: {
          question: 'Which statement matches the table you just built?',
          options: [
            {
              id: 'a',
              label:
                'The <strong>subject</strong> chooses the helper: <em>I</em> &rarr; <strong>am</strong>; ' +
                '<em>he · she · it</em> and every <strong>single</strong> person or thing &rarr; ' +
                '<strong>is</strong>; <em>you · we · they</em> and every <strong>plural</strong> ' +
                '&rarr; <strong>are</strong>. Whatever the helper is, the action word keeps its ' +
                '<strong>-ing</strong>, unchanged.',
            },
            {
              id: 'b',
              label:
                'The helper depends on the verb: long verbs take <em>are</em> and short verbs take <em>is</em>.',
            },
            {
              id: 'c',
              label:
                '<em>Am</em> is for people, <em>is</em> is for places, and <em>are</em> is for things.',
            },
          ],
          correct: 'a',
          explanation:
            'Option C breaks on your own table: <em>Pak Yusuf</em> is a person and takes ' +
            '<em>is</em>, while <em>thirty students</em> are people too and take <em>are</em>. ' +
            'What changed was not <em>person or thing</em> — it was <strong>one or more than ' +
            'one</strong>. And notice what the last column never does: the <em>-ing</em> is the ' +
            'same on every single row.',
        },
      },
      {
        id: 'spelling',
        title: 'Table 3 — How is the -ing spelled?',
        headers: ['The plain verb, and its -ing form', 'What happened to the spelling'],
        options: [
          'nothing changed — just add -ing',
          'the silent -e was dropped, then -ing added',
          'the last letter was doubled, then -ing added',
          '-ie became -y, then -ing added',
        ],
        rows: [
          {
            label: '<strong>watch</strong> &rarr; <em>watching</em>',
            answer: 'nothing changed — just add -ing',
          },
          {
            label: '<strong>write</strong> &rarr; <em>writing</em>',
            answer: 'the silent -e was dropped, then -ing added',
          },
          {
            label: '<strong>sit</strong> &rarr; <em>sitting</em>',
            answer: 'the last letter was doubled, then -ing added',
          },
          {
            label: '<strong>study</strong> &rarr; <em>studying</em>',
            answer: 'nothing changed — just add -ing',
          },
          {
            label: '<strong>lie</strong> &rarr; <em>lying</em>',
            answer: '-ie became -y, then -ing added',
          },
          {
            label: '<strong>run</strong> &rarr; <em>running</em>',
            answer: 'the last letter was doubled, then -ing added',
          },
          {
            label: '<strong>see</strong> &rarr; <em>seeing</em>',
            answer: 'nothing changed — just add -ing',
          },
          {
            label: '<strong>make</strong> &rarr; <em>making</em>',
            answer: 'the silent -e was dropped, then -ing added',
          },
        ],
        rule: {
          question: 'Which statement matches the table you just built?',
          options: [
            {
              id: 'a',
              label:
                'The <strong>end of the plain verb</strong> decides. Most verbs simply take ' +
                '<strong>-ing</strong>. A verb ending in a <strong>silent -e</strong> drops it ' +
                '(<em>write &rarr; writing</em>). A short verb ending <strong>consonant–vowel–' +
                'consonant</strong> doubles that last letter (<em>sit &rarr; sitting</em>). ' +
                '<strong>-ie</strong> becomes <strong>-y</strong> (<em>lie &rarr; lying</em>). And ' +
                'a final <strong>-y</strong> is never touched: <em>study &rarr; studying</em>.',
            },
            {
              id: 'b',
              label:
                'A verb ending in <em>-y</em> changes to <em>-ie</em> before <em>-ing</em>, exactly as it does in the simple present: <em>study &rarr; studiing</em>.',
            },
            {
              id: 'c',
              label: 'Every verb doubles its last letter before <em>-ing</em>.',
            },
          ],
          correct: 'a',
          explanation:
            'Row 4 is the one to remember. In the simple present you wrote <em>studies</em>, so ' +
            '<em>-y</em> felt like a letter that always changes — but before <strong>-ing</strong> ' +
            'it never moves. Row 7 guards the other side: <em>see</em> ends in <em>-e</em>, but ' +
            'that <em>-e</em> is <strong>heard</strong>, so it stays. Only a <em>silent</em> ' +
            '<em>-e</em> is dropped. And option C dies on row 1 — nobody writes <em>watchching</em>.',
        },
      },
      {
        id: 'negative',
        title: 'Table 4 — Saying that it is NOT happening',
        headers: ['Sentence', 'The shape it uses'],
        options: [
          'am / is / are + not + verb-ing',
          'am / is / are + not + plain verb',
          "don't / doesn't + plain verb",
          "don't / doesn't + verb-ing",
        ],
        rows: [
          {
            label: 'The rain <strong>is not stopping</strong> yet.',
            answer: 'am / is / are + not + verb-ing',
          },
          {
            label: 'We <strong>aren&rsquo;t showing</strong> you the field today.',
            answer: 'am / is / are + not + verb-ing',
          },
          {
            label: 'I <strong>am not reading</strong> from a script.',
            answer: 'am / is / are + not + verb-ing',
          },
          {
            label: 'My friends <strong>aren&rsquo;t sitting</strong> down.',
            answer: 'am / is / are + not + verb-ing',
          },
          {
            label: 'Bu Sari <strong>isn&rsquo;t frying</strong> chicken this morning.',
            answer: 'am / is / are + not + verb-ing',
          },
          {
            label: 'The canteen <strong>doesn&rsquo;t open</strong> on Sunday.',
            answer: "don't / doesn't + plain verb",
          },
        ],
        rule: {
          question: 'Which statement matches the table you just built?',
          options: [
            {
              id: 'a',
              label:
                '<strong>not</strong> slots in straight after <em>am · is · are</em>, and the ' +
                'action word <strong>keeps its -ing</strong>: <em>is not stopping · aren&rsquo;t ' +
                'sitting</em>. Nothing is ever taken off the verb — which is the opposite of the ' +
                'simple present in the last row, where <em>doesn&rsquo;t</em> takes the <em>-s</em> ' +
                'away and leaves the verb plain.',
            },
            {
              id: 'b',
              label:
                'A negative drops the <em>-ing</em> and uses <em>don&rsquo;t</em> or <em>doesn&rsquo;t</em> in place of <em>am · is · are</em>.',
            },
            {
              id: 'c',
              label: '<em>Not</em> goes in front of the helper: <em>I not am reading</em>.',
            },
          ],
          correct: 'a',
          explanation:
            'Two of the four choices in that dropdown were <strong>never</strong> the right ' +
            'answer on any row — <em>am/is/are + not + plain verb</em> and <em>don&rsquo;t/' +
            'doesn&rsquo;t + verb-ing</em>. That is not an accident: the two systems never mix. ' +
            'If <em>am/is/are</em> is there, the <em>-ing</em> stays. If <em>don&rsquo;t/' +
            'doesn&rsquo;t</em> is there, you are in the simple present and the verb goes plain.',
        },
      },
      {
        id: 'question',
        title: 'Table 5 — Asking what is happening',
        headers: ['Question, or the answer to one', 'The shape it uses'],
        options: [
          'Am / Is / Are + subject + verb-ing?',
          'Am / Is / Are + subject + plain verb?',
          'Do / Does + subject + verb-ing?',
          'short answer: Yes or No + subject + am / is / are',
        ],
        rows: [
          {
            label: '<strong>Are</strong> you <strong>watching</strong> us in your classroom?',
            answer: 'Am / Is / Are + subject + verb-ing?',
          },
          {
            label: '<strong>Is</strong> it <strong>raining</strong> in your city too?',
            answer: 'Am / Is / Are + subject + verb-ing?',
          },
          {
            label: 'What <strong>are</strong> your friends <strong>doing</strong> right now?',
            answer: 'Am / Is / Are + subject + verb-ing?',
          },
          {
            label: '<strong>Am</strong> I <strong>speaking</strong> too fast for you?',
            answer: 'Am / Is / Are + subject + verb-ing?',
          },
          {
            label: '&mdash; <em>Yes, they <strong>are</strong>.</em>',
            answer: 'short answer: Yes or No + subject + am / is / are',
          },
          {
            label: '&mdash; <em>No, it <strong>isn&rsquo;t</strong>.</em>',
            answer: 'short answer: Yes or No + subject + am / is / are',
          },
        ],
        rule: {
          question: 'Which statement matches the table you just built?',
          options: [
            {
              id: 'a',
              label:
                'The helper <strong>jumps in front of the subject</strong>, and the action word ' +
                'waits behind it still wearing its <strong>-ing</strong>: <em>Are you ' +
                'watching?</em> The short answer sends back the <strong>helper</strong>, never the ' +
                'verb: <em>Yes, they are. · No, it isn&rsquo;t.</em>',
            },
            {
              id: 'b',
              label:
                '<em>Do</em> or <em>Does</em> goes in front, exactly as in the simple present: <em>Do you watching us?</em>',
            },
            {
              id: 'c',
              label:
                'The question keeps the same word order as the statement, and only a question mark is added.',
            },
          ],
          correct: 'a',
          explanation:
            'Rows 5 and 6 are worth reading twice. Nobody answers <em>Are you watching?</em> with ' +
            '<em>Yes, I watching</em> — the word that comes back is the <strong>helper</strong>. ' +
            'That is the same helper you moved to the front to make the question, and it is the ' +
            'reason <em>Do</em> has no work to do here: <em>am/is/are</em> is already the helper.',
        },
      },
    ],
  },

  /* ==========================================================
     STAGE 6 — TEST YOUR RULES  (Discovery: verification)

     Twelve items. Six of them exist to break a rule that was stated
     too loosely — see mpi-4/README.md for which, and why.
     ========================================================== */
  verification: {
    kicker: 'Stage 6 — Test Your Rules',
    goal: 'Put the rules you wrote under pressure, including the awkward cases.',
    instruction:
      'A rule is only worth keeping if it survives new sentences. Some of these are designed to ' +
      'break a rule that was stated too simply.',
    nextButtonLabel: 'Go live →',
    soal: [
      {
        id: 'v1',
        type: 'choice',
        rule: 'subject',
        scenario: 'Rani turns the camera around to face herself.',
        question: 'Which form fits?',
        stem: 'I ___ holding the camera with both hands.',
        options: [
          { id: 'a', label: 'am' },
          { id: 'b', label: 'is' },
          { id: 'c', label: 'are' },
        ],
        correct: 'a',
        hints: [
          'Who is doing it? Look at the very first word.',
          '<em>I</em> has a helper of its very own — it shares it with nobody.',
        ],
        explanation:
          '<em>I</em> is the only subject in English that takes <strong>am</strong>. Every other ' +
          'subject takes <em>is</em> or <em>are</em>.',
      },
      {
        id: 'v2',
        type: 'input',
        rule: 'spelling',
        scenario: 'Pak Yusuf has his back to the class.',
        question: 'Type the <em>-ing</em> form of <em>write</em>.',
        stem: 'Pak Yusuf is ___ their marks on the board.',
        answer: ['writing'],
        hints: [
          'Say <em>write</em> out loud. Can you hear the <em>-e</em> at the end?',
          'A silent <em>-e</em> does not survive in front of <em>-ing</em>.',
        ],
        explanation:
          'The <em>-e</em> in <em>write</em> is silent, so it is dropped before the ending: ' +
          '<strong>writing</strong>, never <em>writeing</em>.',
      },
      {
        id: 'v3',
        type: 'choice',
        rule: 'spelling',
        scenario: 'Rani mentions her sister, who is away at university this week.',
        question: 'Which form fits?',
        stem: 'My sister ___ for her exams in Yogyakarta this week.',
        options: [
          { id: 'a', label: 'is studying' },
          { id: 'b', label: 'is studiing' },
          { id: 'c', label: 'is studing' },
        ],
        correct: 'a',
        hints: [
          'In the simple present you wrote <em>she studies</em>. Does the same thing happen here?',
          'Go back to row 4 of Table 3 and read it again.',
        ],
        explanation:
          'This is the trap the simple present sets for you. Before <em>-s</em> the <em>-y</em> ' +
          'changes (<em>studies</em>), but before <strong>-ing</strong> it never moves at all: ' +
          '<strong>studying</strong>.',
      },
      {
        id: 'v4',
        type: 'input',
        rule: 'spelling',
        scenario: 'The camera looks down at the floor of the workshop.',
        question: 'Type the <em>-ing</em> form of <em>sit</em>.',
        stem: 'Two mechanics are ___ under the motorbike.',
        answer: ['sitting'],
        hints: [
          'Spell <em>sit</em> out: consonant, vowel, consonant.',
          'A short verb built that way doubles its last letter before <em>-ing</em>.',
        ],
        explanation:
          '<em>Sit</em> is one short syllable ending consonant–vowel–consonant, so the <em>t</em> ' +
          'doubles: <strong>sitting</strong>. Compare <em>visit &rarr; visiting</em>, which is ' +
          'two syllables and does not double.',
      },
      {
        id: 'v5',
        type: 'choice',
        rule: 'spelling',
        scenario: 'The school cat has found somewhere comfortable.',
        question: 'Which form fits?',
        stem: 'The cat ___ on my jacket again.',
        options: [
          { id: 'a', label: 'is lying' },
          { id: 'b', label: 'is lieing' },
          { id: 'c', label: 'is lieying' },
        ],
        correct: 'a',
        hints: [
          '<em>Lie</em> ends in two letters that do not get on with <em>-ing</em>.',
          'Table 3 has one row where <em>-ie</em> turns into something else.',
        ],
        explanation:
          '<em>-ie</em> becomes <strong>-y</strong> before the ending: <em>lie &rarr; ' +
          '<strong>lying</strong></em>, and the same for <em>die &rarr; dying</em>, <em>tie &rarr; tying</em>.',
      },
      {
        id: 'v6',
        type: 'choice',
        rule: 'meaning',
        scenario: 'Rani explains the school timetable to her audience.',
        question: 'Which form fits?',
        stem: 'Our canteen ___ at seven o&rsquo;clock every day.',
        options: [
          { id: 'a', label: 'opens' },
          { id: 'b', label: 'is opening' },
          { id: 'c', label: 'open' },
        ],
        correct: 'a',
        hints: [
          'Could you point a camera at this and film it happening?',
          '<em>Every day</em> is a repeat signal, not a now-signal.',
        ],
        explanation:
          'Nothing is in progress here. <em>Every day</em> describes a <strong>routine</strong>, ' +
          'so this is the simple present — and <em>canteen</em> is one thing, so it takes the ' +
          '<em>-s</em>: <strong>opens</strong>.',
      },
      {
        id: 'v7',
        type: 'choice',
        rule: 'meaning',
        scenario: 'Greenfield High has sent a question, and Rani answers it live.',
        question: 'Which form fits?',
        stem: 'Yes, I ___ the answer to that question.',
        options: [
          { id: 'a', label: 'know' },
          { id: 'b', label: 'am knowing' },
          { id: 'c', label: 'is knowing' },
        ],
        correct: 'a',
        hints: [
          'Try to film somebody <em>knowing</em> something. What would the camera actually see?',
          'Some verbs describe a <em>state</em> rather than an action, and states have no -ing.',
        ],
        explanation:
          'This one breaks the rule "if it is true right now, use <em>-ing</em>". ' +
          '<em>Know</em> describes a <strong>state</strong>, not an action in progress, and ' +
          'states stay plain: <strong>I know</strong>. The same goes for <em>want, like, need, ' +
          'understand, have</em> (when it means <em>own</em>).',
      },
      {
        id: 'v8',
        type: 'choice',
        rule: 'meaning',
        scenario: 'Something moves at the edge of the picture.',
        question: 'Which form fits?',
        stem: 'Look! The school bus ___ through the gate.',
        options: [
          { id: 'a', label: 'is coming' },
          { id: 'b', label: 'comes' },
          { id: 'c', label: 'come' },
        ],
        correct: 'a',
        hints: [
          'What does the word <em>Look!</em> ask the audience to do?',
          'If you can see it happening as you speak, it is in progress.',
        ],
        explanation:
          '<em>Look!</em> and <em>Listen!</em> are now-signals in disguise: they only make sense ' +
          'if something is happening <strong>at this moment</strong>. So the sentence takes ' +
          '<strong>is coming</strong>.',
      },
      {
        id: 'v9',
        type: 'input',
        rule: 'subject',
        scenario: 'Rani turns the camera towards the kitchen door.',
        question: 'Type the missing helper: <em>am</em>, <em>is</em> or <em>are</em>.',
        stem: 'My brother and I ___ cooking for the whole club today.',
        answer: ['are'],
        hints: [
          'Count the people in the subject before you choose.',
          '<em>My brother and I</em> is a way of saying <em>we</em>.',
        ],
        explanation:
          'This breaks the rule "<em>I</em> always takes <em>am</em>". The subject is not ' +
          '<em>I</em> — it is <em>my brother and I</em>, which is <strong>we</strong>, and every ' +
          'plural takes <strong>are</strong>.',
      },
      {
        id: 'v10',
        type: 'choice',
        rule: 'negative',
        scenario: 'The camera points at the wet field.',
        question: 'Which form fits?',
        stem: 'The rain ___ yet, so we are staying under the roof.',
        options: [
          { id: 'a', label: 'isn&rsquo;t stopping' },
          { id: 'b', label: 'doesn&rsquo;t stopping' },
          { id: 'c', label: 'isn&rsquo;t stop' },
        ],
        correct: 'a',
        hints: [
          'Is this about a moment, or about every rainy day?',
          'Once <em>isn&rsquo;t</em> is there, what happens to the <em>-ing</em>?',
        ],
        explanation:
          'Option C is the one worth staring at. In the simple present <em>doesn&rsquo;t</em> ' +
          'strips the verb bare — but <em>isn&rsquo;t</em> never does. The helper and the ' +
          '<strong>-ing</strong> travel together: <strong>isn&rsquo;t stopping</strong>.',
      },
      {
        id: 'v11',
        type: 'choice',
        rule: 'question',
        scenario: 'Rani asks her audience to guess what her classmates are doing.',
        question: 'Which word starts the question?',
        stem: '___ your friends practising in the workshop right now?',
        options: [
          { id: 'a', label: 'Are' },
          { id: 'b', label: 'Is' },
          { id: 'c', label: 'Do' },
        ],
        correct: 'a',
        hints: [
          'There is already an <em>-ing</em> in the sentence. Which helper belongs with it?',
          '<em>Your friends</em> — is that one person, or more than one?',
        ],
        explanation:
          '<em>Do</em> has no job here: <em>am/is/are</em> is already the helper, so it is the ' +
          'one that moves to the front. <em>Your friends</em> is plural, so it is ' +
          '<strong>Are</strong>.',
      },
      {
        id: 'v12',
        type: 'input',
        rule: 'question',
        scenario: 'Greenfield High asks: &ldquo;Is Bu Sari frying tempe right now?&rdquo;',
        question: 'Type the one word that completes the short answer.',
        stem: 'Yes, she ___.',
        answer: ['is'],
        hints: [
          'A short answer never repeats the action word.',
          'Whatever helper started the question comes straight back.',
        ],
        explanation:
          'The short answer sends back the <strong>helper</strong>, not the verb: <em>Yes, she ' +
          '<strong>is</strong>.</em> Nobody says <em>Yes, she frying</em> — and nobody says ' +
          '<em>Yes, she does</em> either, because <em>Do</em> was never in the question.',
      },
    ],
  },

  /* ==========================================================
     STAGE 7 — GO LIVE  (Discovery: generalisation · TBLT: the task)

     Three blocks in one stage, in the TBLT order:
       A. Rehearse — the controlled warm-up
       B. Plan     — the learner drafts their own broadcast
       C. Report   — self-check against the rubric, then read aloud
     ========================================================== */
  generalization: {
    kicker: 'Stage 7 — Go Live',
    goal: 'Use all five rules on the one place you know better than anyone watching: your school.',
    rehearseTitle: 'A. Rehearse',
    builderInstruction:
      'Warm up first. Click the words in the right order to build each line of a broadcast. ' +
      'Click a word you have placed to take it back. Some words in the bank do not belong in the ' +
      'sentence at all.',
    builder: [
      {
        id: 'b1',
        context: 'Open your broadcast: tell the other school what they are looking at.',
        parts: ['You', 'are', 'watching', 'us', 'live', 'from', 'our', 'school'],
        distractors: ['is', 'watch'],
        hint: '<em>You</em> takes <em>are</em>, and the action word after a helper keeps its <em>-ing</em>.',
      },
      {
        id: 'b2',
        context:
          'Now the line that shows the difference: what she does every day, and what she is doing at this moment.',
        parts: [
          'She',
          'sells',
          'tempe',
          'every',
          'day,',
          'but',
          'she',
          'is',
          'frying',
          'it',
          'now',
        ],
        distractors: ['is selling', 'fries'],
        hint: '<em>Every day</em> takes the plain verb with its <em>-s</em>; <em>now</em> takes <em>is</em> + <em>-ing</em>.',
      },
      {
        id: 'b3',
        context: 'Tell your audience one thing that is NOT happening right now.',
        parts: ['We', 'aren&rsquo;t', 'playing', 'football', 'today'],
        distractors: ['don&rsquo;t', 'play'],
        hint: 'After <em>aren&rsquo;t</em> the verb keeps its <em>-ing</em> — nothing is stripped off it.',
      },
      {
        id: 'b4',
        context: 'Finish by asking the other school a question.',
        parts: ['What', 'are', 'you', 'doing', 'in', 'your', 'classroom?'],
        distractors: ['do', 'is'],
        hint: 'The helper jumps in front of the subject, and the <em>-ing</em> waits behind it.',
      },
    ],
    builderCorrect: 'Exactly right.',
    builderWrong: 'Not yet — check the order and the verb form, then try again.',
    builderIncomplete: 'Use all of the words that belong in the sentence first.',
    planTitle: 'B. Plan your broadcast',
    writeTitle: 'Script your 45 seconds',
    writeInstruction:
      'Now write the broadcast you were shown in Stage 1. Walk your camera through your own ' +
      'school and tell a stranger what is going on. Use <strong>five to seven sentences</strong>: ' +
      'at least <strong>two</strong> things happening <em>as the camera watches</em> (with a ' +
      'now-signal), at least <strong>one</strong> thing your school does <em>every day</em>, at ' +
      'least <strong>one negative</strong> about something that is not happening — and finish ' +
      'with <strong>one question</strong> for the school watching you.',
    writeLabel: 'My broadcast script',
    writePlaceholder:
      'Hello from…\nRight now we are…\nLook! Our…\nOur school opens at… every day, but…\nWe aren’t…\nAre you…?',
    minWords: 35,
    tooShortMessage: 'Write at least 35 words — five to seven complete sentences.',
    reportTitle: 'C. Go on air',
    rubricTitle: 'Check your own script before you read it',
    rubricInstruction:
      'Read your script back slowly and tick only what is honestly true. Nobody scores this but ' +
      'you — and an honest tick is worth more than a full box.',
    rubric: [
      {
        id: 'r1',
        text: 'Every <em>-ing</em> action in my script has a helper in front of it — <em>am</em>, <em>is</em> or <em>are</em> — and the helper matches its subject.',
      },
      {
        id: 'r2',
        text: 'I checked the spelling of every <em>-ing</em>: the silent <em>-e</em> dropped, the short verb doubled its last letter, and any <em>-y</em> stayed exactly where it was.',
      },
      {
        id: 'r3',
        text: 'At least two sentences describe something happening <strong>as the camera watches</strong>, and carry a now-signal (<em>right now · at the moment · Look!</em>).',
      },
      {
        id: 'r4',
        text: 'At least one sentence says what my school does <strong>every day</strong> — and that one uses the plain verb, with no <em>-ing</em> on it.',
      },
      {
        id: 'r5',
        text: 'My negative sentence keeps its <em>-ing</em> after <em>am not · isn&rsquo;t · aren&rsquo;t</em>.',
      },
      {
        id: 'r6',
        text: 'My script ends with a question that starts with <em>Am</em>, <em>Is</em> or <em>Are</em>, and I can read the whole thing aloud in about forty-five seconds.',
      },
    ],
    onAirNote:
      'A broadcast is meant to be heard, not read. Stand up, hold an imaginary camera, and read ' +
      'your script out loud to your partner at normal speaking speed. If you run out of breath ' +
      'or out of time, that is information about your sentences — go back and fix them.',
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
        label:
          'What is the quickest test you now use to decide between <em>is working</em> and <em>works</em>?',
        placeholder: 'Before I choose, I ask myself…',
      },
      {
        id: 'p2',
        label:
          'Which part still catches you out — the helper, the <em>-ing</em> spelling, or the negative — and what will you check first next time?',
        placeholder: 'I still get… wrong, so next time I will check…',
      },
      {
        id: 'p3',
        label:
          'If you really sent this broadcast, which sentence in it are you proudest of, and why?',
        placeholder: 'The line I would keep is… because…',
      },
    ],
    confidenceLabel:
      'Right now, how confident do you feel describing what is happening around you in English?',
    confidenceOptions: [
      { id: 'low', label: 'Still shaky — I need the rule tables in front of me.' },
      { id: 'mid', label: 'Getting there — I can do it slowly, with checking.' },
      { id: 'high', label: 'Confident — I could go live and commentate right now.' },
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
        title: 'Now, or every day',
        body: '<strong>am/is/are + verb-ing</strong> = in progress while you watch, usually with <em>now · right now · at the moment · Look!</em>. The <strong>plain verb</strong> = a routine or a plain fact. And a few verbs — <em>know · want · like · need · understand</em> — describe a state, so they stay plain even now.',
      },
      {
        id: 'subject',
        title: 'Which helper',
        body: 'The <strong>subject</strong> decides. <em>I</em> &rarr; <strong>am</strong> · <em>he · she · it</em> and any single person or thing &rarr; <strong>is</strong> · <em>you · we · they</em> and every plural &rarr; <strong>are</strong>. The <em>-ing</em> never changes with it.',
      },
      {
        id: 'spelling',
        title: 'Spelling the -ing',
        body: 'Most verbs just add <strong>-ing</strong>. Silent <em>-e</em> is dropped (<em>write &rarr; writing</em>) · a short consonant–vowel–consonant verb doubles (<em>sit &rarr; sitting</em>) · <em>-ie</em> &rarr; <em>-y</em> (<em>lie &rarr; lying</em>) · and a final <em>-y</em> never moves (<em>study &rarr; studying</em>).',
      },
      {
        id: 'negative',
        title: 'Saying no',
        body: '<em>am not · isn&rsquo;t · aren&rsquo;t</em> + <strong>verb-ing</strong>. The <em>-ing</em> stays put — unlike the simple present, where <em>doesn&rsquo;t</em> takes the <em>-s</em> away.',
      },
      {
        id: 'question',
        title: 'Asking',
        body: 'The helper moves to the front: <em>Are you watching?</em> The verb keeps its <strong>-ing</strong>, and the short answer sends the helper back: <em>Yes, she is. · No, they aren&rsquo;t.</em>',
      },
    ],
    messageGood:
      'Strong work. You did not just answer questions — you built the rules first, defended them against the awkward cases, and then used them live.',
    messageOk:
      'A solid pass. Go back to the Pattern Lab table for the rule that cost you the most marks, then retry Stage 6.',
    messageNeedsWork:
      'The patterns have not settled yet, and that is fair — the hard part is not the <em>-ing</em>, it is deciding when you need it at all. Redo the Evidence Board slowly; the first two boards are the whole lesson.',
    completionTitle: 'What you completed',
    restartLabel: 'Start again from the beginning',
  },
};
