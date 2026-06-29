export type Milestone = {
  id: number;
  label: string;
  note: string;
};

export type FutureCard = {
  id: number;
  icon: string;
  title: string;
  teaser: string;
  bgColor: string;
  tapeColor: string;
  tapeAngle: number;
  pageContent: string;
  handwrittenDetail: string;
  passportStamp?: string;
};

export const chapter7Data = {
  chapterNumber: 'Chapter Seven',
  title: 'Growing Together',
  intro:
    'This isn\'t the end of anything. It\'s just the part of the story where we look up from what we\'ve been and start asking what we\'re becoming.',
  handwrittenEncouragement:
    'You make me want to be better — not to impress you, but because being around you makes me believe I actually can be.',
  annotation: 'still learning, still us',

  milestones: [
    { id: 1, label: 'First conversation', note: 'Neither of us planned it. Neither of us wanted it to end.' },
    { id: 2, label: 'First inside joke', note: 'The moment we invented our own language.' },
    { id: 3, label: 'The quiet certainty', note: 'I looked at you and just knew.' },
    { id: 4, label: 'Becoming something', note: 'The part where "I" quietly became "we."' },
    { id: 5, label: 'Still here', note: 'Still choosing each other. Still finding things to laugh about.' },
  ] as Milestone[],

  futureCards: [
    {
      id: 1,
      icon: '🌙',
      title: 'Dreams',
      teaser: 'The ones we haven\'t spoken aloud yet.',
      bgColor: '#FEF9F0',
      tapeColor: 'rgba(232,184,109,0.55)',
      tapeAngle: -3,
      pageContent:
        'I want to build something with you — not just plans, but a life that actually looks like us. Something that surprises us both. Something that requires us both.',
      handwrittenDetail: 'we\'re just getting started.',
    },
    {
      id: 2,
      icon: '✈️',
      title: 'Places to Visit',
      teaser: 'Everywhere we said "someday."',
      bgColor: '#F0F4FE',
      tapeColor: 'rgba(180,210,240,0.55)',
      tapeAngle: 2,
      pageContent:
        'Someday we\'ll actually go. The bookmarked cafés in cities we haven\'t touched down in yet. The places we read about and said "that sounds like us." I want to see them with you.',
      handwrittenDetail: 'window seat or aisle — I don\'t care, as long as it\'s with you.',
      passportStamp: 'SOMEDAY',
    },
    {
      id: 3,
      icon: '📖',
      title: 'Things to Learn',
      teaser: 'Languages, skills, each other.',
      bgColor: '#F3F0FE',
      tapeColor: 'rgba(200,190,240,0.55)',
      tapeAngle: 4,
      pageContent:
        'I want to learn things with you — new things, small things, the kinds of things you don\'t plan. I want to watch you get excited about something I didn\'t know you cared about.',
      handwrittenDetail: 'curious together is the best way to be.',
    },
    {
      id: 4,
      icon: '🌱',
      title: 'Goals',
      teaser: 'The ones we\'ll hold each other to.',
      bgColor: '#F0FEF4',
      tapeColor: 'rgba(160,220,180,0.55)',
      tapeAngle: -5,
      pageContent:
        'To keep choosing this. To not let the ordinary make us forget how extraordinary it is. To still be talking at 2am, still making each other tea, still noticing the small things.',
      handwrittenDetail: 'the only goal that really matters.',
    },
    {
      id: 5,
      icon: '🌸',
      title: 'Future Memories',
      teaser: 'The ones that haven\'t happened yet.',
      bgColor: '#FEF0F4',
      tapeColor: 'rgba(240,190,200,0.55)',
      tapeAngle: 3,
      pageContent:
        'There are photographs we haven\'t taken yet. Moments we don\'t know we\'ll remember yet. Conversations that will become the stories we tell later. I can\'t wait for all of them.',
      handwrittenDetail: 'saving space for everything we don\'t know yet.',
    },
  ] as FutureCard[],

  hiddenPageText: 'The best memories haven\'t happened yet.',

  pullQuote:
    '"The future belongs to those who believe in the beauty of their dreams."',
  attribution: '— Eleanor Roosevelt',

  closingNote: 'Thank you for every chapter so far.',
};
