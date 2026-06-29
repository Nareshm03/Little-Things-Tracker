export type ComicPanel = {
  id: number;
  badge: string;
  badgeColor: string;
  lines: { speaker: 'you' | 'me'; text: string }[];
  caption: string;
  fullConversation: { speaker: 'you' | 'me'; text: string }[];
  photoAlt: string;
  handwrittenCaption: string;
  doodleColor: string;
};

export type ChatBubble = {
  id: number;
  sender: 'them' | 'us';
  text: string;
  reaction?: string;
};

export type StickerData = {
  id: number;
  emoji: string;
  label: string;
  rotate: number;
  color: string;
};

export type ReactionCard = {
  id: number;
  emoji: string;
  label: string;
  count: number;
  color: string;
};

export const chapter3Data = {
  chapterNumber: 'Chapter Three',
  title: 'The Way We Made Each Other Laugh',
  intro:
    'Between the grand chapters of us were a thousand tiny ones that never made the front page — the ones that made tea shoot out of noses.',

  comicPanels: [
    {
      id: 1,
      badge: 'HA!',
      badgeColor: '#FFD700',
      lines: [
        { speaker: 'you', text: '"I think I burnt the toast."' },
        { speaker: 'me', text: '"It\'s not burnt, it\'s aggressively toasted."' },
      ],
      caption: 'Every. Single. Time.',
      fullConversation: [
        { speaker: 'you', text: 'okay so I may have made breakfast' },
        { speaker: 'me', text: 'that smells... brave' },
        { speaker: 'you', text: 'I think I burnt the toast' },
        { speaker: 'me', text: 'It\'s not burnt, it\'s aggressively toasted' },
        { speaker: 'you', text: 'aggressively toasted 😭 I\'m using that' },
        { speaker: 'me', text: 'it\'s just toast. it believed in itself too much' },
        { speaker: 'you', text: 'I am crying this is the funniest thing' },
      ],
      photoAlt: 'Very dark toast on a plate',
      handwrittenCaption: 'The toast that started a whole vocabulary',
      doodleColor: '#D4844A',
    },
    {
      id: 2,
      badge: 'LOL',
      badgeColor: '#FF6B9D',
      lines: [
        { speaker: 'me', text: '"Are you okay? You look a little pale."' },
        { speaker: 'you', text: '"That\'s just my face."' },
      ],
      caption: 'Said with complete sincerity.',
      fullConversation: [
        { speaker: 'me', text: 'hey are you okay?' },
        { speaker: 'you', text: 'yeah why' },
        { speaker: 'me', text: 'you look a little pale' },
        { speaker: 'you', text: 'that\'s just my face' },
        { speaker: 'me', text: 'your FACE is pale???' },
        { speaker: 'you', text: 'yes hello welcome to me' },
        { speaker: 'me', text: 'i was worried and you just. introduced yourself.' },
        { speaker: 'you', text: 'would you like a brochure' },
      ],
      photoAlt: 'A very neutral expression selfie',
      handwrittenCaption: '"That\'s just my face" - greatest sentence ever',
      doodleColor: '#FF6B9D',
    },
    {
      id: 3,
      badge: 'ZAP!',
      badgeColor: '#7B68EE',
      lines: [
        { speaker: 'you', text: '"We\'ve been standing here for 10 mins."' },
        { speaker: 'me', text: '"We\'re not standing. We\'re marinating."' },
      ],
      caption: 'Waiting for the metro like:',
      fullConversation: [
        { speaker: 'you', text: 'okay where is this metro' },
        { speaker: 'me', text: 'we just got here' },
        { speaker: 'you', text: 'we\'ve been standing here for 10 mins' },
        { speaker: 'me', text: 'we\'re not standing. we\'re marinating.' },
        { speaker: 'you', text: 'I— what are we marinading in' },
        { speaker: 'me', text: 'the city. experience. mild dread.' },
        { speaker: 'you', text: 'oh my god the metro please just arrive' },
        { speaker: 'me', text: 'this is peak living actually' },
      ],
      photoAlt: 'Empty metro platform',
      handwrittenCaption: 'Marinating in mild dread together 🚇',
      doodleColor: '#7B68EE',
    },
    {
      id: 4,
      badge: 'POW!',
      badgeColor: '#FF4500',
      lines: [
        { speaker: 'me', text: '"A pigeon just looked me in the soul."' },
        { speaker: 'you', text: '"What did it see?"' },
        { speaker: 'me', text: '"Everything."' },
      ],
      caption: 'The pigeon incident. We don\'t talk about the pigeon.',
      fullConversation: [
        { speaker: 'me', text: 'okay so something happened' },
        { speaker: 'you', text: 'are you alright' },
        { speaker: 'me', text: 'a pigeon just looked me in the soul' },
        { speaker: 'you', text: 'looked you in the soul' },
        { speaker: 'me', text: 'it held eye contact for 4 full seconds' },
        { speaker: 'you', text: 'what did it see' },
        { speaker: 'me', text: 'everything' },
        { speaker: 'you', text: 'the pigeon KNOWS' },
        { speaker: 'me', text: 'the pigeon KNOWS.' },
      ],
      photoAlt: 'A judgmental looking pigeon',
      handwrittenCaption: 'The pigeon knows. It always knew.',
      doodleColor: '#FF4500',
    },
  ] as ComicPanel[],

  insideJokes: [
    'The pigeon incident (we don\'t talk about it)',
    '"Aggressively toasted" is now a life philosophy',
    'That one time at the metro — the marinating',
    'The "secret" coffee order that isn\'t secret',
    'Your face. Just your whole face.',
  ],

  chatBubbles: [
    { id: 1, sender: 'them', text: 'okay but why is this so funny 😭' },
    { id: 2, sender: 'us', text: 'because WE are so funny' },
    { id: 3, sender: 'them', text: 'you called us funny. to our faces.' },
    { id: 4, sender: 'us', text: 'well someone has to' },
    { id: 5, sender: 'them', text: 'I cannot with you I genuinely cannot' },
    { id: 6, sender: 'us', text: 'and yet here you are 😌' },
  ] as ChatBubble[],

  stickers: [
    { id: 1, emoji: '😂', label: 'can\'t breathe', rotate: -12, color: '#FFF9C4' },
    { id: 2, emoji: '💀', label: 'I died', rotate: 8, color: '#FFE4E1' },
    { id: 3, emoji: '🫶', label: 'still us', rotate: -5, color: '#E8F5E9' },
    { id: 4, emoji: '🐦', label: 'it knew', rotate: 15, color: '#E3F2FD' },
    { id: 5, emoji: '☕', label: 'aggressively toasted', rotate: -10, color: '#FFF3E0' },
  ] as StickerData[],

  reactionCards: [
    { id: 1, emoji: '😭', label: 'cried laughing', count: 847, color: '#FFF9C4' },
    { id: 2, emoji: '🫀', label: 'heart full', count: 312, color: '#FFE4E1' },
    { id: 3, emoji: '🌀', label: 'existential', count: 69, color: '#E3F2FD' },
  ] as ReactionCard[],

  secretMemory: {
    title: 'The Real Inside Joke',
    caption: 'The one no one else gets.',
    content:
      'It\'s not really about the toast, or the pigeon, or the metro. It\'s that we find the same things funny. The exact same micro-absurdities in exactly the same moments. That\'s the joke. That\'s always been the joke.',
    handwrittenNote: 'you get me. that\'s it. that\'s the whole thing.',
  },

  quote: '"Laughter is the shortest distance between two people."',
  attribution: '— Victor Borge (probably)',
};
