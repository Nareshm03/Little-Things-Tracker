export type SealedLetter = {
  id: number;
  sealColor: string;
  sealGlyph: string;
  previewLine: string;
  chatSnippet: { speaker: 'you' | 'me'; text: string }[];
  memory: string;
  offset: number;
};

export type FloatingNote = {
  id: number;
  text: string;
  rotate: number;
  x: number;
  y: number;
  driftY: number;
  duration: number;
  delay: number;
};

export type Star = {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  delay: number;
  duration: number;
};

export type SecretLetter = {
  title: string;
  body: string;
  signOff: string;
};

export const chapter6Data = {
  chapterNumber: 'Chapter Six',
  title: 'The Nights We Never Forgot',
  intro:
    'Some things only come out late at night. When the world goes quiet and it\'s just the two of you, words arrive that wouldn\'t dare show up in daylight.',
  annotation: 'written past midnight',

  letters: [
    {
      id: 1,
      sealColor: '#8B1A1A',
      sealGlyph: 'M',
      previewLine: 'Do you remember that late-night call…',
      chatSnippet: [
        { speaker: 'me', text: 'it\'s 3am. go to sleep.' },
        { speaker: 'you', text: 'you first.' },
        { speaker: 'me', text: 'we both know I\'m not going to.' },
        { speaker: 'you', text: 'I know. that\'s why I said it.' },
      ],
      memory:
        'We talked until the sky turned that particular shade of almost-not-dark. Neither of us mentioned the time. Neither of us said goodnight.',
      offset: 0,
    },
    {
      id: 2,
      sealColor: '#2C4A6E',
      sealGlyph: '✦',
      previewLine: 'The night it rained and we didn\'t go inside…',
      chatSnippet: [
        { speaker: 'you', text: 'it\'s raining' },
        { speaker: 'me', text: 'I know' },
        { speaker: 'you', text: 'we should go in' },
        { speaker: 'me', text: 'probably' },
        { speaker: 'you', text: '…' },
        { speaker: 'me', text: 'in a bit' },
      ],
      memory:
        'The streetlights turned every puddle into something worth looking at. I remember your shoulder against mine. We were soaked and neither of us moved.',
      offset: 60,
    },
    {
      id: 3,
      sealColor: '#5C3D6E',
      sealGlyph: '◆',
      previewLine: 'Some conversations only happen after midnight…',
      chatSnippet: [
        { speaker: 'me', text: 'can I tell you something' },
        { speaker: 'you', text: 'always' },
        { speaker: 'me', text: 'I think about you more than I let on' },
        { speaker: 'you', text: 'I know.' },
        { speaker: 'you', text: 'I think about you more than you think I do.' },
      ],
      memory:
        'There\'s a version of bravery that only exists past midnight. Things said at 2am that can\'t be unsaid by morning — and weren\'t meant to be.',
      offset: 120,
    },
  ] as SealedLetter[],

  floatingNotes: [
    { id: 1, text: 'still awake?', rotate: -6, x: 68, y: 12, driftY: -18, duration: 14, delay: 0 },
    { id: 2, text: 'goodnight ❤', rotate: 4, x: 82, y: 35, driftY: -12, duration: 18, delay: 3 },
    { id: 3, text: '3:47 am', rotate: -3, x: 55, y: 58, driftY: -20, duration: 16, delay: 6 },
    { id: 4, text: 'don\'t hang up', rotate: 7, x: 74, y: 72, driftY: -15, duration: 20, delay: 1 },
    { id: 5, text: 'just a little longer', rotate: -5, x: 60, y: 22, driftY: -10, duration: 22, delay: 8 },
  ] as FloatingNote[],

  secretLetter: {
    title: 'For the late-night version of you.',
    body: 'I want you to know that my favourite version of our story is the one that happens when everyone else is asleep. The things said in the dark, the pauses that mean more than sentences, the staying. That\'s the part I keep.',
    signOff: '— yours, at every hour.',
  } as SecretLetter,

  pullQuote: '"The most important things are the hardest to say. They are the things you get ashamed of — because words diminish them."',
  attribution: '— Stephen King, The Body',

  moonMessage: 'You are my favourite kind of night.',

  rainEnabled: true,
};
