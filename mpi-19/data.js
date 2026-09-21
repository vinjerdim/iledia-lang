'use strict';

/* ============================================================
   data.js — Konten pembelajaran Bahasa Inggris: Conditional Sentences
   Teachers/developers: modify this file to update lesson content
   without touching the application logic in app.js.
   ============================================================ */

const DATA = {

  meta: {
    title: 'Conditional Sentences',
    subject: 'Bahasa Inggris — SMK / Fase F',
    objective: 'Memahami dan menerapkan penggunaan conditional sentences dalam teks dan percakapan.'
  },

  /* ----------------------------------------------------------
     CONDITIONAL TYPES (configurable)
     Teachers can add, remove, or modify types here.
     ---------------------------------------------------------- */
  conditionalTypes: [
    {
      id: 'zero',
      name: 'Zero Conditional',
      badge: 'Type 0',
      structure: 'If + present simple, present simple',
      altStructure: 'When + present simple, present simple',
      use: 'Untuk menyatakan fakta umum, kebenaran ilmiah, atau kejadian yang selalu terjadi ketika kondisi terpenuhi.',
      signal: 'Kondisi ini <em>selalu</em> menghasilkan hasil yang sama — seperti hukum atau kebiasaan.',
      examples: [
        {
          condition: 'If you heat water to 100°C',
          result: 'it boils.',
          context: 'Scientific fact — this is always true.',
          indonesian: 'Jika kamu memanaskan air hingga 100°C, air mendidih.'
        },
        {
          condition: 'If the power goes out',
          result: 'the server shuts down automatically.',
          context: 'A workplace rule or automatic system behavior.',
          indonesian: 'Jika listrik padam, server mati secara otomatis.'
        },
        {
          condition: 'When employees arrive late',
          result: 'they need to fill in a tardiness form.',
          context: 'A company policy that always applies.',
          indonesian: 'Ketika karyawan terlambat, mereka harus mengisi formulir keterlambatan.'
        }
      ]
    },
    {
      id: 'first',
      name: 'First Conditional',
      badge: 'Type 1',
      structure: 'If + present simple, will + base verb',
      altStructure: 'If + present simple, can/may/might + base verb',
      use: 'Untuk menyatakan situasi nyata atau kemungkinan di masa depan.',
      signal: 'Kondisi ini <em>mungkin terjadi</em> — bukan pasti, tapi realistis.',
      examples: [
        {
          condition: 'If you submit the report on time',
          result: 'the manager will review it today.',
          context: 'A realistic workplace situation — the deadline is real.',
          indonesian: 'Jika kamu mengumpulkan laporan tepat waktu, manajer akan meninjaunya hari ini.'
        },
        {
          condition: 'If it rains during the event',
          result: 'we will move the activity indoors.',
          context: 'A contingency plan for a likely situation.',
          indonesian: 'Jika hujan selama acara, kami akan memindahkan kegiatan ke dalam ruangan.'
        },
        {
          condition: 'If she passes the interview',
          result: 'she will start working next Monday.',
          context: 'The job interview is upcoming — the outcome is possible.',
          indonesian: 'Jika dia lulus wawancara, dia akan mulai bekerja hari Senin depan.'
        }
      ]
    },
    {
      id: 'second',
      name: 'Second Conditional',
      badge: 'Type 2',
      structure: 'If + past simple, would + base verb',
      altStructure: 'If + past simple, could/might + base verb',
      use: 'Untuk menyatakan situasi hipotetis, khayalan, atau tidak nyata di masa sekarang atau masa depan.',
      signal: 'Kondisi ini <em>tidak nyata atau sangat tidak mungkin</em> saat ini.',
      examples: [
        {
          condition: 'If I were the team leader',
          result: 'I would organize weekly meetings.',
          context: 'The speaker is not actually the team leader — this is hypothetical.',
          indonesian: 'Jika aku menjadi pemimpin tim, aku akan mengadakan rapat mingguan.'
        },
        {
          condition: 'If our company had more budget',
          result: 'we would hire five new technicians.',
          context: 'The company does not currently have enough budget — imaginary situation.',
          indonesian: 'Jika perusahaan kami memiliki anggaran lebih, kami akan merekrut lima teknisi baru.'
        },
        {
          condition: 'If she spoke better English',
          result: 'she could apply for the international position.',
          context: 'She does not speak fluent English now — hypothetical future.',
          indonesian: 'Jika dia berbicara Bahasa Inggris lebih baik, dia bisa melamar posisi internasional.'
        }
      ]
    },
    {
      id: 'third',
      name: 'Third Conditional',
      badge: 'Type 3',
      structure: 'If + past perfect, would have + past participle',
      altStructure: 'If + past perfect, could have / might have + past participle',
      use: 'Untuk menyatakan situasi yang tidak nyata di masa lalu — sesuatu yang tidak terjadi, sering menyatakan penyesalan atau spekulasi.',
      signal: 'Kondisi ini <em>tidak terjadi di masa lalu</em> — hasilnya pun tidak terjadi.',
      examples: [
        {
          condition: 'If he had checked the deadline',
          result: 'he would have submitted the project on time.',
          context: 'He did NOT check the deadline — so he missed it. Past regret.',
          indonesian: 'Jika dia memeriksa tenggat waktu, dia sudah mengumpulkan proyek tepat waktu.'
        },
        {
          condition: 'If the team had communicated better',
          result: 'they would have avoided the mistake.',
          context: 'The team did not communicate well — so the mistake happened.',
          indonesian: 'Jika tim berkomunikasi lebih baik, mereka bisa menghindari kesalahan itu.'
        },
        {
          condition: 'If she had attended the training',
          result: 'she could have handled the problem herself.',
          context: 'She did not attend the training — so she could not handle it alone.',
          indonesian: 'Jika dia mengikuti pelatihan, dia bisa menangani masalah itu sendiri.'
        }
      ]
    }
  ],

  /* ----------------------------------------------------------
     EXPLORER MINI-QUESTIONS
     One understanding check per conditional type.
     ---------------------------------------------------------- */
  explorerQuestions: [
    {
      typeId: 'zero',
      question: 'Which situation is best expressed with a Zero Conditional?',
      options: [
        { text: 'A company policy that always applies when employees are late.', correct: true },
        { text: 'What might happen if a candidate passes the upcoming job interview.', correct: false },
        { text: 'A manager imagining what she would do if she had a bigger team.', correct: false },
        { text: 'A worker regretting that they did not double-check their report yesterday.', correct: false }
      ],
      feedback: {
        correct: 'Well done! Zero conditional expresses facts or rules that are always true — like a company policy that consistently applies whenever the condition is met.',
        incorrect: 'Not quite. Zero conditional describes what <em>always happens</em> when a condition is met — general truths, facts, or rules. The other options describe possible future events, hypothetical situations, or past regrets, which belong to other conditional types.'
      }
    },
    {
      typeId: 'first',
      question: 'Which sentence uses the First Conditional correctly?',
      options: [
        { text: 'If she would pass the interview, she will get the job.', correct: false },
        { text: 'If she passes the interview, she will get the job.', correct: true },
        { text: 'If she passed the interview, she would get the job.', correct: false },
        { text: 'If she had passed the interview, she would have gotten the job.', correct: false }
      ],
      feedback: {
        correct: 'Correct! First conditional uses <em>If + present simple</em> in the condition clause and <em>will + base verb</em> in the result clause. Option A wrongly uses "would" in the if-clause. Options C and D use past forms, which indicate hypothetical (Type 2) or past unreal (Type 3) situations.',
        incorrect: 'Look carefully at the verb forms. First conditional needs: <strong>If + present simple, will + base verb</strong>. "If she passes" (present simple) + "she will get" (will + base) = First Conditional. The other options mix verb forms incorrectly or shift to Type 2 / Type 3.'
      }
    },
    {
      typeId: 'second',
      question: 'Your colleague says: "I\'m not the manager, but I sometimes think — if I were in charge, I would handle customer complaints differently." What type of conditional is this?',
      options: [
        { text: 'Zero Conditional — it describes a general workplace rule.', correct: false },
        { text: 'First Conditional — it is a realistic plan for the near future.', correct: false },
        { text: 'Second Conditional — it is a hypothetical, imaginary situation.', correct: true },
        { text: 'Third Conditional — it refers to something that happened in the past.', correct: false }
      ],
      feedback: {
        correct: 'Exactly! "If I were in charge" signals that the speaker is NOT in charge — this is an imaginary present situation. Second Conditional uses <em>If + past simple (were/was), would + base verb</em> to express hypothetical or unlikely situations.',
        incorrect: 'The key clue is "I\'m not the manager." The speaker is imagining an unreal present situation — which is the Second Conditional. It is not a general fact (Type 0), not a realistic future plan (Type 1), and not about the past (Type 3).'
      }
    },
    {
      typeId: 'third',
      question: 'A supervisor is reviewing a project and says: "The client was unhappy. If we had tested the software more carefully, we would not have delivered a buggy product." What does this sentence express?',
      options: [
        { text: 'A general technical fact about software testing.', correct: false },
        { text: 'A likely plan for the next software project.', correct: false },
        { text: 'An imaginary situation about the current project.', correct: false },
        { text: 'Regret about something that did not happen in the past.', correct: true }
      ],
      feedback: {
        correct: 'Correct! Third Conditional (<em>If + past perfect, would have + past participle</em>) is used to reflect on a past situation that did NOT happen and its imagined result. The team did NOT test carefully enough — so they delivered a buggy product. This expresses regret about the past.',
        incorrect: 'The phrase "we would not have delivered a buggy product" tells us the delivery already happened — it\'s in the past. Third Conditional describes an <em>unreal past situation</em>: what would have happened if things had been different. This is a past regret, not a current plan or general fact.'
      }
    }
  ],

  /* ----------------------------------------------------------
     CONTEXT PRACTICE QUESTIONS
     Multiple choice and sentence completion.
     ---------------------------------------------------------- */
  practiceQuestions: [
    {
      id: 'p1',
      type: 'mc',
      scenario: 'Rina is a fresh graduate applying for a job at a tech company. Her interview is scheduled for next week.',
      question: 'Which sentence best expresses what will happen if Rina prepares well for the interview?',
      options: [
        { text: 'If she had prepared well, she would have passed the interview.', correct: false },
        { text: 'If she prepares well, she will impress the interviewer.', correct: true },
        { text: 'If she prepared well, she would impress the interviewer.', correct: false },
        { text: 'If she prepares well, she would have impressed the interviewer.', correct: false }
      ],
      correctIdx: 1,
      feedback: {
        correct: 'Well done! This is a First Conditional: <em>If + present simple (prepares), will + base verb (will impress)</em>. The interview is upcoming and the preparation is a realistic possibility — so First Conditional is appropriate.',
        incorrect: {
          0: 'Option A uses Third Conditional (past perfect + would have), which describes an unreal past event. But the interview hasn\'t happened yet — it\'s in the future.',
          2: 'Option C is Second Conditional (past simple + would), which suggests the situation is hypothetical or unlikely. Preparing for an interview is a realistic possibility, so First Conditional is more appropriate.',
          3: 'Option D mixes First Conditional\'s if-clause with Third Conditional\'s result. This is grammatically inconsistent — avoid mixing conditional types this way.'
        },
        general: 'When a future event is realistic and possible, use <strong>First Conditional</strong>: <em>If + present simple, will + base verb</em>.'
      }
    },
    {
      id: 'p2',
      type: 'mc',
      scenario: 'A technician is explaining to a new colleague how a safety system works.',
      question: 'Which sentence correctly describes what always happens when the temperature sensor detects overheating?',
      options: [
        { text: 'If the sensor detects overheating, the system will shut down.', correct: false },
        { text: 'If the sensor detected overheating, the system would shut down.', correct: false },
        { text: 'If the sensor detects overheating, the system shuts down automatically.', correct: true },
        { text: 'If the sensor had detected overheating, the system would have shut down.', correct: false }
      ],
      correctIdx: 2,
      feedback: {
        correct: 'Correct! This is a Zero Conditional: <em>If + present simple, present simple</em>. It describes how the safety system always works — a general fact or automatic rule, not a prediction about the future.',
        incorrect: {
          0: 'Option A (First Conditional) would suggest this might happen in the future, not that it always happens. When explaining a consistent rule or fact, Zero Conditional is clearer.',
          1: 'Option B (Second Conditional) implies the situation is hypothetical or unlikely — inappropriate for describing a reliable system that consistently functions the same way.',
          3: 'Option D (Third Conditional) refers to an unreal past event — not appropriate for explaining how a system currently works.'
        },
        general: 'For facts, rules, or automatic behaviors that always occur under a given condition, use <strong>Zero Conditional</strong>: <em>If + present simple, present simple</em>.'
      }
    },
    {
      id: 'p3',
      type: 'mc',
      scenario: 'Budi is a vocational student. He does not currently have a laptop. He is imagining what he would do differently if he owned one.',
      question: 'Which sentence expresses Budi\'s imaginary situation?',
      options: [
        { text: 'If I have a laptop, I will finish my assignments faster.', correct: false },
        { text: 'If I had a laptop, I would finish my assignments faster.', correct: true },
        { text: 'If I had had a laptop, I would have finished my assignments faster.', correct: false },
        { text: 'If I have a laptop, I would finish my assignments faster.', correct: false }
      ],
      correctIdx: 1,
      feedback: {
        correct: 'Exactly right! Second Conditional: <em>If + past simple (had), would + base verb (would finish)</em>. Budi does NOT have a laptop now — this is a hypothetical, imaginary present situation.',
        incorrect: {
          0: 'Option A (First Conditional) suggests Budi might get a laptop soon and this is a realistic plan. But the scenario says he is imagining — he does not currently have one, making the situation hypothetical.',
          2: 'Option C (Third Conditional) is for unreal past situations. Budi is imagining the present/future, not reflecting on past events.',
          3: 'Option D mixes the if-clause of First Conditional with the result of Second Conditional — this is grammatically inconsistent.'
        },
        general: 'For hypothetical or imaginary present situations (not real now), use <strong>Second Conditional</strong>: <em>If + past simple, would + base verb</em>.'
      }
    },
    {
      id: 'p4',
      type: 'complete',
      scenario: 'Dewi\'s team missed their project deadline last month. The project manager is reviewing what went wrong.',
      question: 'Complete the sentence with the most appropriate form:',
      stem: 'If the team _____ (communicate) better, they _____ (meet) the deadline.',
      correctAnswer: 'If the team had communicated better, they would have met the deadline.',
      blanks: [
        { position: 'condition', verb: 'communicate', correctForm: 'had communicated', type: 'past perfect' },
        { position: 'result', verb: 'meet', correctForm: 'would have met', type: 'would have + past participle' }
      ],
      options: [
        { text: 'had communicated / would have met', correct: true },
        { text: 'communicated / would meet', correct: false },
        { text: 'communicate / will meet', correct: false },
        { text: 'had communicated / would meet', correct: false }
      ],
      correctIdx: 0,
      feedback: {
        correct: 'Correct! Third Conditional: <em>If + past perfect (had communicated), would have + past participle (would have met)</em>. The team missed the deadline last month — this is an unreal past situation. They are reflecting on what should have happened.',
        incorrect: {
          1: 'Option B (communicated / would meet) mixes Second Conditional forms, suggesting a hypothetical present — but the deadline was in the past.',
          2: 'Option C (communicate / will meet) is First Conditional, for realistic future situations — not for past events.',
          3: 'Option D mixes Third Conditional\'s if-clause (had communicated) with Second Conditional\'s result (would meet) — this is inconsistent. Use "would have met" for unreal past results.'
        },
        general: 'For unreal or regretted past situations, use <strong>Third Conditional</strong>: <em>If + past perfect, would have + past participle</em>.'
      }
    },
    {
      id: 'p5',
      type: 'mc',
      scenario: 'A customer service representative is explaining the company\'s return policy to a customer.',
      question: 'Which sentence correctly explains the policy: customers always receive a full refund when they return a product within 7 days?',
      options: [
        { text: 'If customers return the product within 7 days, they will receive a full refund.', correct: false },
        { text: 'If customers return the product within 7 days, they receive a full refund.', correct: true },
        { text: 'If customers returned the product within 7 days, they would receive a full refund.', correct: false },
        { text: 'If customers had returned the product within 7 days, they would have received a full refund.', correct: false }
      ],
      correctIdx: 1,
      feedback: {
        correct: 'Correct! Zero Conditional is appropriate here. The return policy is a guaranteed rule that always applies — not a prediction (First), not a hypothetical (Second), not a past regret (Third).',
        incorrect: {
          0: 'Option A (First Conditional) is almost natural here, but Zero Conditional more precisely expresses a guaranteed policy. "Will receive" implies a prediction; "receive" (present simple) confirms a standing rule.',
          2: 'Option C (Second Conditional) would imply the policy is hypothetical or unlikely — inappropriate for an official company policy.',
          3: 'Option D (Third Conditional) refers to a past unreal situation — not suitable for explaining a current policy.'
        },
        general: 'Company policies, rules, and guaranteed outcomes use <strong>Zero Conditional</strong>: <em>If + present simple, present simple</em>.'
      }
    },
    {
      id: 'p6',
      type: 'mc',
      scenario: 'Hendra did not double-check his calculations before presenting his financial report. His supervisor found errors.',
      question: 'Which sentence best expresses the idea that if Hendra had double-checked, the errors would not have appeared?',
      options: [
        { text: 'If Hendra double-checks his calculations, the errors will not appear.', correct: false },
        { text: 'If Hendra double-checked his calculations, the errors would not appear.', correct: false },
        { text: 'If Hendra had double-checked his calculations, the errors would not have appeared.', correct: true },
        { text: 'If Hendra has double-checked his calculations, the errors will not have appeared.', correct: false }
      ],
      correctIdx: 2,
      feedback: {
        correct: 'Well done! Third Conditional: <em>If + past perfect (had double-checked), would have + past participle (would not have appeared)</em>. Hendra did NOT double-check — this reflects on a past situation that cannot be changed.',
        incorrect: {
          0: 'Option A (First Conditional) refers to a future realistic situation — but the presentation already happened.',
          1: 'Option B (Second Conditional) suggests a hypothetical present, not a past event.',
          3: 'Option D mixes a present perfect if-clause with a future perfect result — this is not a standard conditional pattern.'
        },
        general: 'To discuss what <em>would have happened</em> if a past action had been different, use <strong>Third Conditional</strong>.'
      }
    }
  ],

  /* ----------------------------------------------------------
     SENTENCE BUILDER
     Students arrange scrambled parts to form correct conditionals.
     ---------------------------------------------------------- */
  builderSentences: [
    {
      id: 'b1',
      typeId: 'first',
      instruction: 'Arrange the parts to form a correct First Conditional sentence.',
      hint: 'First Conditional: If + present simple → will + base verb. Which part sounds like a condition about the future?',
      parts: [
        { id: 'b1p1', text: 'If you arrive early', role: 'condition' },
        { id: 'b1p2', text: 'you will have time', role: 'result-part1' },
        { id: 'b1p3', text: 'to review your notes.', role: 'result-part2' }
      ],
      correctOrder: ['b1p1', 'b1p2', 'b1p3'],
      explanation: '"If you arrive early" is the condition (If + present simple). "You will have time to review your notes" is the result (will + base verb). This is a realistic future situation — First Conditional.'
    },
    {
      id: 'b2',
      typeId: 'second',
      instruction: 'Arrange the parts to form a correct Second Conditional sentence.',
      hint: 'Second Conditional: If + past simple → would + base verb. The situation is hypothetical — not real right now.',
      parts: [
        { id: 'b2p1', text: 'would open', role: 'result-verb' },
        { id: 'b2p2', text: 'her own business', role: 'result-object' },
        { id: 'b2p3', text: 'If she had enough capital,', role: 'condition' },
        { id: 'b2p4', text: 'she', role: 'result-subject' }
      ],
      correctOrder: ['b2p3', 'b2p4', 'b2p1', 'b2p2'],
      explanation: '"If she had enough capital" is the condition (If + past simple "had"). The result is "she would open her own business" (would + base verb). She does not have enough capital now — this is Second Conditional.'
    },
    {
      id: 'b3',
      typeId: 'zero',
      instruction: 'Arrange the parts to form a correct Zero Conditional sentence.',
      hint: 'Zero Conditional: If + present simple → present simple. Both clauses use the same tense.',
      parts: [
        { id: 'b3p1', text: 'the alarm sounds', role: 'result' },
        { id: 'b3p2', text: 'If the smoke detector senses smoke,', role: 'condition' },
        { id: 'b3p3', text: 'and the sprinklers activate.', role: 'result-2' }
      ],
      correctOrder: ['b3p2', 'b3p1', 'b3p3'],
      explanation: '"If the smoke detector senses smoke" (If + present simple) is the condition. "The alarm sounds and the sprinklers activate" (present simple) is the automatic result. This always happens — Zero Conditional.'
    },
    {
      id: 'b4',
      typeId: 'third',
      instruction: 'Arrange the parts to form a correct Third Conditional sentence.',
      hint: 'Third Conditional: If + past perfect → would have + past participle. This is about the past — something did NOT happen.',
      parts: [
        { id: 'b4p1', text: 'the client would have been satisfied.', role: 'result' },
        { id: 'b4p2', text: 'we had tested', role: 'condition-verb' },
        { id: 'b4p3', text: 'the application more thoroughly,', role: 'condition-object' },
        { id: 'b4p4', text: 'If', role: 'condition-start' }
      ],
      correctOrder: ['b4p4', 'b4p2', 'b4p3', 'b4p1'],
      explanation: '"If we had tested the application more thoroughly" (If + past perfect) is the condition. "The client would have been satisfied" (would have + past participle) is the imagined past result. They did NOT test thoroughly — Third Conditional.'
    },
    {
      id: 'b5',
      typeId: 'first',
      instruction: 'Arrange the parts to form a correct First Conditional sentence.',
      hint: 'This describes a realistic future outcome at a job fair.',
      parts: [
        { id: 'b5p1', text: 'more companies will offer', role: 'result-part1' },
        { id: 'b5p2', text: 'If many qualified graduates attend the job fair,', role: 'condition' },
        { id: 'b5p3', text: 'on-site interviews.', role: 'result-part2' }
      ],
      correctOrder: ['b5p2', 'b5p1', 'b5p3'],
      explanation: '"If many qualified graduates attend the job fair" is the condition (If + present simple). "More companies will offer on-site interviews" is the realistic future result (will + base verb). First Conditional.'
    }
  ],

  /* ----------------------------------------------------------
     TEXT APPLICATION
     Short passage with comprehension questions.
     ---------------------------------------------------------- */
  textPassage: {
    title: 'A Memo from the Operations Manager',
    context: 'Read the following internal memo from a factory operations manager to the production team.',
    text: [
      'To: All Production Staff',
      'From: Operations Manager',
      'Subject: Safety Protocol and Efficiency Improvement',
      '',
      'Dear Team,',
      '',
      'I would like to remind everyone of the following safety and operational guidelines.',
      '',
      'First, remember that if the temperature in the storage room exceeds 30°C, the cooling system activates automatically. Please do not interfere with this process.',
      '',
      'Second, if you complete your daily inspection checklist before 9:00 AM, the shift supervisor will sign off your report immediately. This helps the team maintain a smooth workflow for the rest of the day.',
      '',
      'Third, I have been thinking about our workflow efficiency. If we reduced unnecessary meetings by 50%, our teams would have more time for focused production work. I will discuss this possibility with the department heads next week.',
      '',
      'Finally, regarding last month\'s production delay: the root cause was a missed maintenance check on Machine 3. If the technician had performed the scheduled maintenance on time, the machine would not have broken down, and we would have met the monthly target.',
      '',
      'Let\'s work together to improve our processes.',
      '',
      'Best regards,',
      'Operations Manager'
    ],
    questions: [
      {
        id: 'tq1',
        question: 'What type of conditional is used in: "if the temperature in the storage room exceeds 30°C, the cooling system activates automatically"?',
        options: [
          { text: 'Zero Conditional — describing an automatic system rule that always applies.', correct: true },
          { text: 'First Conditional — describing a prediction about a future event.', correct: false },
          { text: 'Second Conditional — describing a hypothetical workplace situation.', correct: false },
          { text: 'Third Conditional — reflecting on a past equipment failure.', correct: false }
        ],
        correctIdx: 0,
        feedback: {
          correct: 'Correct! "If the temperature exceeds 30°C, the cooling system activates" — both verbs are in the present simple. It describes an automatic rule that always works the same way. This is Zero Conditional.',
          incorrect: 'Look at the verb forms: "exceeds" (present simple) and "activates" (present simple). Both are in the same tense, describing a system that always behaves the same way under the condition. This is Zero Conditional, not a future prediction, hypothesis, or past event.'
        }
      },
      {
        id: 'tq2',
        question: 'The manager says: "If we reduced unnecessary meetings by 50%, our teams would have more time for focused production work." What does this sentence tell us?',
        options: [
          { text: 'The meetings have already been reduced and production has improved.', correct: false },
          { text: 'The manager is presenting a hypothetical idea — meetings have NOT been reduced yet.', correct: true },
          { text: 'The manager is stating a guaranteed company policy about meeting reductions.', correct: false },
          { text: 'The manager is expressing regret about past meetings that wasted time.', correct: false }
        ],
        correctIdx: 1,
        feedback: {
          correct: 'Well done! Second Conditional ("reduced" + "would have") signals that this is an imaginary or hypothetical scenario. The meetings have not been reduced yet — the manager is simply exploring the idea. The phrase "I will discuss this possibility" confirms it is still just a proposal.',
          incorrect: 'The key verb form is "reduced" (past simple in if-clause) + "would have" (in result clause) — this is Second Conditional. It describes an imaginary present situation: meetings have NOT yet been reduced. The manager is exploring a possibility, not reporting a completed action or a fixed policy.'
        }
      },
      {
        id: 'tq3',
        question: 'Why does the memo use Third Conditional for the Machine 3 situation?',
        options: [
          { text: 'Because the maintenance was performed correctly and the machine worked well.', correct: false },
          { text: 'Because the manager is predicting that Machine 3 might break down next month.', correct: false },
          { text: 'Because the breakdown is a past event that could have been prevented — but was not.', correct: true },
          { text: 'Because the technician always performs maintenance on time.', correct: false }
        ],
        correctIdx: 2,
        feedback: {
          correct: 'Exactly! "If the technician had performed the scheduled maintenance on time, the machine would not have broken down." This is Third Conditional — the maintenance was NOT done, the machine DID break down. It is a past event that cannot be changed, expressing regret and analysis of what should have happened.',
          incorrect: 'Third Conditional (If + past perfect, would have + past participle) is used for past events that did NOT happen and their imagined results. The maintenance was NOT performed → the machine broke down. The manager uses Third Conditional to analyze this past mistake and express what could have happened differently.'
        }
      },
      {
        id: 'tq4',
        question: 'If you wanted to respond to the manager by confirming that you will complete the checklist before 9:00 AM tomorrow, which sentence would be most appropriate?',
        options: [
          { text: '"If I complete the checklist before 9:00 AM tomorrow, the supervisor will sign off my report."', correct: true },
          { text: '"If I completed the checklist before 9:00 AM tomorrow, the supervisor would sign off my report."', correct: false },
          { text: '"If I had completed the checklist before 9:00 AM, the supervisor would have signed off my report."', correct: false },
          { text: '"If I complete the checklist before 9:00 AM, the supervisor signs off my report."', correct: false }
        ],
        correctIdx: 0,
        feedback: {
          correct: 'Correct! First Conditional is right here. You are describing a real plan for tomorrow — completing the checklist is a realistic intention. "If I complete... will sign off" accurately describes the realistic future outcome described in the memo.',
          incorrect: {
            1: 'Option B (Second Conditional) suggests the situation is hypothetical or unlikely — but completing the checklist tomorrow is your actual realistic plan, not an imaginary scenario.',
            2: 'Option C (Third Conditional) refers to something in the past that did not happen — but you are talking about tomorrow\'s plan.',
            3: 'Option D (Zero Conditional) sounds like a permanent rule rather than a personal plan for tomorrow. Though it accurately reflects the memo\'s policy, First Conditional is more natural when you are describing your own future intention.'
          }
        }
      }
    ]
  },

  /* ----------------------------------------------------------
     CONVERSATION SCENARIOS
     ---------------------------------------------------------- */
  conversations: [
    {
      id: 'cv1',
      title: 'Job Interview Practice',
      context: 'Andi is at a job interview at a technology company. The interviewer asks about his plans.',
      dialogue: [
        { speaker: 'Interviewer', text: 'Thank you for coming in today, Andi. Can you tell me — what will you do if you get this position?' },
        { speaker: 'Andi', text: '___' }
      ],
      promptType: 'mc',
      question: 'Which response is most appropriate and grammatically correct for Andi?',
      options: [
        {
          text: '"If I would get this position, I would work very hard to contribute to the company."',
          correct: false,
          feedback: 'This sentence incorrectly uses "would" in the if-clause. In First Conditional, the if-clause must use present simple (not "would"). The correct form is: "If I get this position, I will work hard."'
        },
        {
          text: '"If I get this position, I will focus on learning quickly and contributing to the team\'s goals."',
          correct: true,
          feedback: 'Excellent! This is a well-formed First Conditional response: "If I get" (present simple in if-clause) + "I will focus" (will + base verb in result). The content is professional and directly answers the interviewer\'s question about a realistic future plan.'
        },
        {
          text: '"If I had gotten this position, I would have focused on contributing to the company."',
          correct: false,
          feedback: 'This uses Third Conditional (past perfect + would have), which would mean the position was not received and you are reflecting on the past — but the interview is happening now. First Conditional is appropriate for realistic future plans.'
        },
        {
          text: '"If I got this position, I would try to learn quickly and help the team."',
          correct: false,
          feedback: 'This is Second Conditional (past simple + would), which implies the situation is unlikely or hypothetical. In an actual interview, using Second Conditional could suggest you do not expect to get the job. First Conditional is more confident and appropriate here.'
        }
      ],
      correctIdx: 1,
      speakingPrompt: {
        enabled: true,
        prompt: 'Now practice answering the question aloud: "What will you do if you get this position?" Use First Conditional in your answer. Aim for 2–3 sentences.',
        criteria: [
          'Used First Conditional correctly (If + present simple, will + base verb)',
          'Answer is relevant and professional',
          'Clear and confident delivery'
        ]
      }
    },
    {
      id: 'cv2',
      title: 'Team Meeting — Project Planning',
      context: 'The project team is discussing what went wrong with a previous project and planning improvements.',
      dialogue: [
        { speaker: 'Team Leader', text: 'Looking back at last quarter\'s project, what do you think we could have done better?' },
        { speaker: 'Siti', text: 'I think communication was the main issue.' },
        { speaker: 'Team Leader', text: 'I agree. Can you complete this thought: "If we had communicated more clearly earlier, ___"?' },
        { speaker: 'Siti', text: '___' }
      ],
      promptType: 'mc',
      question: 'Which completion correctly uses Third Conditional and makes sense in context?',
      options: [
        {
          text: '"we will avoid those misunderstandings."',
          correct: false,
          feedback: 'This is a future result clause (will + base verb) — part of First Conditional. But the conversation is about what happened in a past project. We need Third Conditional to complete the sentence.'
        },
        {
          text: '"we would avoid those misunderstandings."',
          correct: false,
          feedback: 'This uses Second Conditional\'s result clause (would + base verb), which refers to a hypothetical present or future. But the if-clause used past perfect ("had communicated") — this mixes Third Conditional\'s if-clause with Second Conditional\'s result. Use "would have avoided" for consistency.'
        },
        {
          text: '"we would have avoided those misunderstandings."',
          correct: true,
          feedback: 'Correct! This completes the Third Conditional sentence consistently: "If we had communicated" (past perfect) + "we would have avoided" (would have + past participle). It reflects on the past project and expresses what could have been different — appropriate for a retrospective discussion.'
        },
        {
          text: '"we avoided those misunderstandings."',
          correct: false,
          feedback: 'This is a simple past tense — not a conditional result clause. It does not match the "If we had communicated..." structure. The result of a Third Conditional must use "would have + past participle."'
        }
      ],
      correctIdx: 2,
      speakingPrompt: {
        enabled: true,
        prompt: 'Practice the full conversation with a partner. After answering with Third Conditional, continue: "What should we do differently in the next project?" Use First or Second Conditional in your suggestion.',
        criteria: [
          'Completed Third Conditional correctly (would have + past participle)',
          'Made a forward-looking suggestion using First or Second Conditional',
          'Participated naturally in the role-play'
        ]
      }
    },
    {
      id: 'cv3',
      title: 'Customer Service — Explaining a Policy',
      context: 'A customer service representative is explaining the warranty policy to a customer at an electronics store.',
      dialogue: [
        { speaker: 'Customer', text: 'What happens if my device stops working within the first year?' },
        { speaker: 'Representative', text: '___' }
      ],
      promptType: 'mc',
      question: 'Which response correctly explains the warranty policy using Zero or First Conditional?',
      options: [
        {
          text: '"If your device stopped working within the first year, we would replace it for free."',
          correct: false,
          feedback: 'Second Conditional (stopped + would replace) implies the warranty is hypothetical or unlikely. For an official company policy, this makes the guarantee sound uncertain. Zero or First Conditional is more appropriate for a guaranteed policy.'
        },
        {
          text: '"If your device stops working within the first year, we replace it or issue a full refund."',
          correct: true,
          feedback: 'Correct! This Zero Conditional response (present simple + present simple) clearly describes a guaranteed warranty policy — something that always applies under these conditions. It is professional, clear, and reassuring for the customer.'
        },
        {
          text: '"If your device had stopped working within the first year, we would have replaced it."',
          correct: false,
          feedback: 'Third Conditional implies the warranty period has already ended or the event happened in the past. But the customer is asking about their current warranty coverage — not a past event.'
        },
        {
          text: '"If your device stops working within the first year, we might replace it."',
          correct: false,
          feedback: 'While grammatically possible, "might replace" introduces unnecessary uncertainty into what should be a clear guarantee. For a confirmed policy, "we replace it" (Zero Conditional) or "we will replace it" (First Conditional) is more appropriate and customer-friendly.'
        }
      ],
      correctIdx: 1,
      speakingPrompt: {
        enabled: true,
        prompt: 'Role-play the customer service scenario. Practice explaining at least two warranty conditions using Zero or First Conditional. Your partner plays the customer asking follow-up questions.',
        criteria: [
          'Used Zero or First Conditional appropriately for policy explanation',
          'Language is clear and professional',
          'Responded naturally to follow-up questions'
        ]
      }
    }
  ],

  /* ----------------------------------------------------------
     REVIEW SECTION — labels for mistake summary
     ---------------------------------------------------------- */
  reviewLabels: {
    explorer: 'Pattern Explorer',
    practice: 'Context Practice',
    builder: 'Sentence Builder',
    textapp: 'Text Application',
    conversation: 'Conversation Scenario'
  }

};
