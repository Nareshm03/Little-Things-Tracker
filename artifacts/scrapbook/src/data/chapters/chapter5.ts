export type JournalPhoto = {
  id: number;
  assetKey: string | null;
  caption: string;
  date: string;
  chatSnippet: { speaker: 'you' | 'me'; text: string }[];
  memory: string;
  rotate: number;
  tapeColor: string;
  tapeAngle: number;
  offsetX: number;
};

export type HiddenFlowerNote = {
  title: string;
  body: string;
  signOff: string;
};

export const chapter5Data = {
  chapterNumber: 'Chapter Five',
  title: 'Days That Felt Peaceful',
  intro:
    'Not every memory is loud. Some of the ones that stayed the longest were barely there at all — a shared silence, the sound of bells carried on warm air, and the feeling of nowhere else to be.',
  handwrittenParagraph:
    'You don't have to say much when you're in the right place with the right person. We sat for hours once and it still wasn't long enough.',
  annotation: 'temple visit, Oct',

  pullQuote: '"We didn\'t need to fill the silence. Just being there — that was enough."',

  journalPhotos: [
    {
      id: 1,
      assetKey: 'polaroid-3',
      caption: 'the long quiet walk',
      date: 'October, early morning',
      chatSnippet: [
        { speaker: 'me', text: 'it\'s so still here' },
        { speaker: 'you', text: 'I know. don\'t move.' },
        { speaker: 'me', text: 'I\'m not moving' },
        { speaker: 'you', text: 'good.' },
      ],
      memory: 'The kind of quiet that doesn\'t feel empty. It felt full.',
      rotate: -1.5,
      tapeColor: 'rgba(232,184,109,0.5)',
      tapeAngle: 2,
      offsetX: 0,
    },
    {
      id: 2,
      assetKey: 'polaroid-1',
      caption: 'temple steps, afternoon light',
      date: 'Same October',
      chatSnippet: [
        { speaker: 'you', text: 'can we just stay?' },
        { speaker: 'me', text: 'how long' },
        { speaker: 'you', text: 'a while.' },
        { speaker: 'me', text: 'okay.' },
      ],
      memory: 'We stayed much longer than we planned. Neither of us mentioned the time.',
      rotate: 1,
      tapeColor: 'rgba(200,220,200,0.5)',
      tapeAngle: -3,
      offsetX: 0,
    },
    {
      id: 3,
      assetKey: 'polaroid-4',
      caption: 'somewhere on the route back',
      date: 'The evening after',
      chatSnippet: [
        { speaker: 'me', text: 'I don\'t want this to end' },
        { speaker: 'you', text: 'it doesn\'t have to' },
        { speaker: 'me', text: '…okay' },
      ],
      memory: 'That walk home felt sacred. Like the day was still holding us.',
      rotate: -0.5,
      tapeColor: 'rgba(210,200,240,0.5)',
      tapeAngle: 4,
      offsetX: 0,
    },
    {
      id: 4,
      assetKey: 'polaroid-2',
      caption: 'the reading corner we found',
      date: 'A slow Sunday',
      chatSnippet: [
        { speaker: 'you', text: 'you look very peaceful right now' },
        { speaker: 'me', text: 'I am' },
        { speaker: 'you', text: 'good. stay that way.' },
      ],
      memory: 'I fell asleep twice. You let me both times. That\'s care.',
      rotate: 1.5,
      tapeColor: 'rgba(255,220,150,0.5)',
      tapeAngle: -2,
      offsetX: 0,
    },
    {
      id: 5,
      assetKey: null,
      caption: 'the one we almost didn\'t take',
      date: 'You know which one',
      chatSnippet: [
        { speaker: 'you', text: 'hold on — don\'t move' },
        { speaker: 'me', text: 'why' },
        { speaker: 'you', text: 'just — this is nice' },
        { speaker: 'me', text: '…yeah. it is.' },
      ],
      memory: 'Some moments don\'t need a reason. This was one of them.',
      rotate: -1,
      tapeColor: 'rgba(230,200,200,0.5)',
      tapeAngle: 3,
      offsetX: 0,
    },
  ] as JournalPhoto[],

  hiddenFlowerNote: {
    title: 'you found this.',
    body: 'I pressed this flower the day we visited. I wasn\'t sure why I kept it — I think I knew, even then, that this was one of those days I\'d want to hold onto. So here it is. Held.',
    signOff: '— pressed between these pages for you.',
  } as HiddenFlowerNote,

  petalColors: [
    'rgba(255,182,193,0.55)',
    'rgba(255,218,185,0.50)',
    'rgba(255,192,203,0.50)',
    'rgba(250,210,180,0.45)',
    'rgba(255,170,160,0.40)',
    'rgba(240,220,200,0.50)',
    'rgba(255,200,180,0.45)',
    'rgba(220,190,210,0.50)',
  ],

  quote: '"There is a kind of silence that two people can share that is better than any conversation."',
  attribution: '— found in the margins of an old book',
};
