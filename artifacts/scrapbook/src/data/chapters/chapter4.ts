export type Polaroid = {
  id: number;
  assetKey: string | null;
  caption: string;
  date: string;
  chatSnippet: { speaker: 'you' | 'me'; text: string }[];
  memory: string;
  rotate: number;
  offsetX: number;
  offsetY: number;
  tapeAngle: number;
  tapeColor: string;
  hasHiddenNote?: boolean;
};

export type HiddenNote = {
  title: string;
  body: string;
  signOff: string;
};

export const chapter4Data = {
  chapterNumber: 'Chapter Four',
  title: 'Little Moments We Captured',
  intro:
    'The camera roll no one else sees. The ones taken mid-laugh, mid-sentence, mid-nothing at all — which turned out to be everything.',
  handwrittenParagraph:
    'I keep coming back to these. Not the posed ones. The ones where neither of us was ready, and somehow we both were.',
  annotation: '← my favourite roll',

  polaroids: [
    {
      id: 1,
      assetKey: 'polaroid-2',
      caption: 'quiet reading afternoons',
      date: 'October, sometime',
      chatSnippet: [
        { speaker: 'me', text: 'you look very serious right now' },
        { speaker: 'you', text: 'I am very serious. this is serious reading.' },
        { speaker: 'me', text: 'you haven\'t turned a page in 20 mins' },
      ],
      memory: 'You fell asleep three pages in. I didn\'t wake you.',
      rotate: -4,
      offsetX: 0,
      offsetY: 0,
      tapeAngle: 3,
      tapeColor: 'rgba(255,220,150,0.55)',
    },
    {
      id: 2,
      assetKey: 'polaroid-3',
      caption: 'the long way home',
      date: 'A Tuesday, I think',
      chatSnippet: [
        { speaker: 'you', text: 'we literally missed the stop' },
        { speaker: 'me', text: 'I was talking to you' },
        { speaker: 'you', text: 'worth it though' },
        { speaker: 'me', text: 'obviously' },
      ],
      memory: 'We added 40 minutes to the journey on purpose. Neither of us admitted it.',
      rotate: 3,
      offsetX: 0,
      offsetY: 0,
      tapeAngle: -5,
      tapeColor: 'rgba(200,230,200,0.55)',
    },
    {
      id: 3,
      assetKey: 'polaroid-4',
      caption: 'wandering without maps',
      date: 'That warm Sunday',
      chatSnippet: [
        { speaker: 'me', text: 'I think we\'re lost' },
        { speaker: 'you', text: 'we\'re not lost we\'re exploring' },
        { speaker: 'me', text: 'those are the same thing' },
        { speaker: 'you', text: '🙃' },
      ],
      memory: 'We found a tiny bookshop neither of us knew existed. We spent an hour inside.',
      rotate: -2,
      offsetX: 0,
      offsetY: 0,
      tapeAngle: 7,
      tapeColor: 'rgba(255,200,200,0.5)',
    },
    {
      id: 4,
      assetKey: 'polaroid-1',
      caption: 'our usual spot',
      date: 'Every other weekend',
      chatSnippet: [
        { speaker: 'you', text: 'same corner again?' },
        { speaker: 'me', text: 'it\'s our corner' },
        { speaker: 'you', text: 'it\'s a public café' },
        { speaker: 'me', text: 'our public café corner' },
      ],
      memory: 'The staff started bringing our order before we asked. That felt like something.',
      rotate: 4,
      offsetX: 0,
      offsetY: 0,
      tapeAngle: -3,
      tapeColor: 'rgba(200,210,255,0.55)',
      hasHiddenNote: true,
    },
    {
      id: 5,
      assetKey: null,
      caption: 'still developing…',
      date: 'Not long ago',
      chatSnippet: [
        { speaker: 'me', text: 'did you take that?' },
        { speaker: 'you', text: 'obviously' },
        { speaker: 'me', text: 'without telling me?!' },
        { speaker: 'you', text: 'it was a good moment' },
      ],
      memory: 'Some moments are too good to announce. You just take them quietly.',
      rotate: -3,
      offsetX: 0,
      offsetY: 0,
      tapeAngle: 4,
      tapeColor: 'rgba(255,220,150,0.5)',
    },
    {
      id: 6,
      assetKey: null,
      caption: 'the one we almost missed',
      date: 'You know which one',
      chatSnippet: [
        { speaker: 'you', text: 'quick, take a photo' },
        { speaker: 'me', text: 'of what' },
        { speaker: 'you', text: 'just — this. all of this.' },
      ],
      memory: '"All of this" was just a street at golden hour. But you were in it.',
      rotate: 2,
      offsetX: 0,
      offsetY: 0,
      tapeAngle: -6,
      tapeColor: 'rgba(200,230,200,0.5)',
    },
  ] as Polaroid[],

  hiddenNote: {
    title: 'Found you.',
    body: 'I put this here on purpose. Because you always find the things I try to hide. I wasn\'t sure when you\'d find it, but I knew you would. That\'s the thing about you — you notice. You always notice.',
    signOff: '— always yours.',
  } as HiddenNote,

  filmStrip: [
    'frame 1 — before we started',
    'frame 2 — the middle part',
    'frame 3 — still here',
    'frame 4 — us',
    'frame 5 — all of this',
    'frame 6 — still going',
  ],

  quote: '"A photograph is a secret about a secret."',
  attribution: '— Diane Arbus',
};
