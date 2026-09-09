import { ContextQuestion } from '../types';

export const CONTEXT_QUESTIONS: ContextQuestion[] = [
  {
    id: 'ctx-1',
    targetWord: 'arid',
    sentence: 'Unlike the lush, rain-soaked rainforest, the Mojave region is so [arid] that plants must store moisture in their thick stems for months.',
    options: [
      'Extremely dry and barren of rainfall',
      'Freezing cold with constant snowfall',
      'Filled with tall towering pine trees',
      'Surrounded by rushing freshwater rivers'
    ],
    correctIndex: 0,
    explanation: 'The context clue "Unlike the lush, rain-soaked rainforest" signals a direct contrast, and "must store moisture... for months" proves the environment is extremely dry.',
    clueTip: 'Look for the contrast clue word "Unlike" which shows the opposite of rain-soaked.',
    category: 'nature',
    gradeLevel: 6
  },
  {
    id: 'ctx-2',
    targetWord: 'bewildered',
    sentence: 'When Marcus opened the puzzle box and found five hundred identical white pieces without a picture guide, he stood [bewildered], scratching his head in total confusion.',
    options: [
      'Excited and eager to start right away',
      'Completely confused and puzzled',
      'Bored and sleepy from reading instructions',
      'Proud of completing the task effortlessly'
    ],
    correctIndex: 1,
    explanation: '"Scratching his head in total confusion" directly defines bewildered as being deeply confused or perplexed.',
    clueTip: 'The phrase "in total confusion" is a restatement clue that explains the meaning directly.',
    category: 'feelings',
    gradeLevel: 6
  },
  {
    id: 'ctx-3',
    targetWord: 'diligence',
    sentence: 'Thanks to her tireless [diligence]—studying flashcards every single evening and rewriting her lab notes—Elena received the highest grade in the chemistry unit.',
    options: [
      'Pure luck or chance',
      'Careful, persistent effort and hard work',
      'Rushing through tasks at the last minute',
      'Relying entirely on classmates for answers'
    ],
    correctIndex: 1,
    explanation: 'The examples of "studying flashcards every single evening" and "rewriting her lab notes" demonstrate persistent and disciplined hard work.',
    clueTip: 'Notice the specific actions listed between the dashes as examples of what she did.',
    category: 'school',
    gradeLevel: 6
  },
  {
    id: 'ctx-4',
    targetWord: 'obsolete',
    sentence: 'Once digital streaming services allowed people to watch movies instantly on their phones, bulky VHS tapes quickly became [obsolete] and were packed into garage sales.',
    options: [
      'Very expensive and rare to purchase',
      'Outdated and no longer in common use',
      'Dangerous and harmful to keep at home',
      'Popular among teenagers worldwide'
    ],
    correctIndex: 1,
    explanation: 'Because digital streaming replaced them and they were "packed into garage sales," VHS tapes became outdated and no longer used.',
    clueTip: 'Cause-and-effect clue: streaming made the old format unnecessary.',
    category: 'technology',
    gradeLevel: 7
  },
  {
    id: 'ctx-5',
    targetWord: 'catalyst',
    sentence: 'The student council’s passionate speech about recycling acted as a [catalyst], sparking a rapid wave of enthusiasm that led to composting bins in every cafeteria.',
    options: [
      'A barrier that prevents any positive change',
      'Something that triggers or speeds up an event',
      'A quiet disagreement between two friends',
      'A strict rule enforced by school security'
    ],
    correctIndex: 1,
    explanation: '"Sparking a rapid wave of enthusiasm that led to..." shows that the speech was the triggering agent that produced swift action.',
    clueTip: 'Look at what happened immediately after: "sparking a rapid wave of enthusiasm."',
    category: 'science',
    gradeLevel: 8
  },
  {
    id: 'ctx-6',
    targetWord: 'nocturnal',
    sentence: 'While diurnal songbirds chirp at sunrise, owls and bats are strictly [nocturnal], sleeping through the bright daylight and hunting when midnight arrives.',
    options: [
      'Capable of flying across oceans',
      'Active primarily during the night',
      'Preferring to build nests underground',
      'Eating only fruits and plant seeds'
    ],
    correctIndex: 1,
    explanation: 'The contrast with "diurnal songbirds" and the explanation "sleeping through the bright daylight and hunting when midnight arrives" clearly reveals nocturnal means active at night.',
    clueTip: 'Notice the clue: "hunting when midnight arrives."',
    category: 'animals',
    gradeLevel: 6
  },
  {
    id: 'ctx-7',
    targetWord: 'deplete',
    sentence: 'If farmers continue to pump groundwater faster than rain can refill the aquifer, they will inevitably [deplete] the water supply until the wells run bone dry.',
    options: [
      'Purify and make cleaner to drink',
      'Exhaust or drain completely',
      'Freeze into solid underground glaciers',
      'Share equally with neighboring towns'
    ],
    correctIndex: 1,
    explanation: '"Pumping faster than rain can refill" until the wells "run bone dry" shows that deplete means exhausting or using up the supply.',
    clueTip: 'The phrase "until the wells run bone dry" shows the end result of depleting resources.',
    category: 'environment',
    gradeLevel: 7
  },
  {
    id: 'ctx-8',
    targetWord: 'scrutinize',
    sentence: 'Before purchasing the antique violin, the music instructor took out a magnifying glass to [scrutinize] the wood for tiny hairline cracks and warped edges.',
    options: [
      'Clean quickly with a wet sponge',
      'Examine closely and thoroughly',
      'Play loudly in front of an audience',
      'Decorate with colorful stickers'
    ],
    correctIndex: 1,
    explanation: 'Using a "magnifying glass" to search for "tiny hairline cracks" shows an intense, detailed, and close inspection.',
    clueTip: 'The tool mentioned—a magnifying glass—indicates close, thorough inspection.',
    category: 'school',
    gradeLevel: 7
  },
  {
    id: 'ctx-9',
    targetWord: 'empathetic',
    sentence: 'Instead of judging her friend who forgot his lines in the play, Chloe showed an [empathetic] attitude by reminding him that everyone gets stage fright sometimes.',
    options: [
      'Competitive and wanting to win alone',
      'Understanding and caring about others’ feelings',
      'Confused and unable to follow directions',
      'Strict and demanding immediate perfection'
    ],
    correctIndex: 1,
    explanation: 'By comforting him and sharing that "everyone gets stage fright," Chloe demonstrated sympathy, kindness, and emotional understanding.',
    clueTip: 'Contrast clue: "Instead of judging," she offered comforting reassurance.',
    category: 'people',
    gradeLevel: 6
  },
  {
    id: 'ctx-10',
    targetWord: 'reluctant',
    sentence: 'Though his teammates urged him to try the roller coaster, Mateo was [reluctant], taking three slow backward steps while clutching the safety railing tightly.',
    options: [
      'Hesitant and unwilling to proceed',
      'Furious and screaming at everyone',
      'Thrilled and running to the front car',
      'Drowsy and wanting an afternoon nap'
    ],
    correctIndex: 0,
    explanation: 'Mateo’s body language—"taking three slow backward steps while clutching the safety railing"—demonstrates hesitation and reluctance.',
    clueTip: 'Look at Mateo’s physical action of stepping back away from the ride.',
    category: 'feelings',
    gradeLevel: 8
  },
  {
    id: 'ctx-11',
    targetWord: 'resourceful',
    sentence: 'When our flashlight batteries died on the dark campsite, our [resourceful] scout leader reflected the moonlight with a polished metal saucepan to illuminate our tent path.',
    options: [
      'Easily frightened and panic-prone',
      'Clever at finding solutions to problems',
      'Careless about following basic rules',
      'Unwilling to ask anyone for assistance'
    ],
    correctIndex: 1,
    explanation: 'Using a saucepan to reflect moonlight when flashlight batteries failed is a prime example of being clever, inventive, and resourceful.',
    clueTip: 'Her unusual and clever solution shows she is good at problem-solving.',
    category: 'everyday',
    gradeLevel: 7
  },
  {
    id: 'ctx-12',
    targetWord: 'itinerary',
    sentence: 'The tour guide checked our daily [itinerary] to make sure we arrived at the museum by 10:00 AM, the historic castle by 1:30 PM, and the harbor ferry before sunset.',
    options: [
      'A receipt for bought souvenir items',
      'A planned schedule of travel routes and stops',
      'A permission slip signed by parents',
      'A secret map of hidden buried treasure'
    ],
    correctIndex: 1,
    explanation: 'The list of scheduled locations and times (10:00 AM, 1:30 PM, sunset) describes a travel schedule or itinerary.',
    clueTip: 'The list of exact times and destinations indicates a planned schedule.',
    category: 'travel',
    gradeLevel: 6
  }
];
