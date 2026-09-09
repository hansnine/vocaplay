import { CategoryInfo, WordItem } from '../types';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'nature',
    name: 'Nature',
    icon: 'Trees',
    description: 'Landscapes, plants, weather phenomena, and natural forces',
    color: 'emerald',
  },
  {
    id: 'science',
    name: 'Science',
    icon: 'FlaskConical',
    description: 'Experiments, physical laws, discovery, and matter',
    color: 'sky',
  },
  {
    id: 'school',
    name: 'School',
    icon: 'GraduationCap',
    description: 'Learning, study habits, research, and academic achievements',
    color: 'indigo',
  },
  {
    id: 'travel',
    name: 'Travel',
    icon: 'Compass',
    description: 'Adventures, navigation, geography, and cultural journeys',
    color: 'amber',
  },
  {
    id: 'feelings',
    name: 'Feelings',
    icon: 'Heart',
    description: 'Emotions, moods, empathy, and psychological states',
    color: 'rose',
  },
  {
    id: 'animals',
    name: 'Animals',
    icon: 'PawPrint',
    description: 'Wildlife, habitats, creature behaviors, and adaptations',
    color: 'orange',
  },
  {
    id: 'technology',
    name: 'Technology',
    icon: 'Cpu',
    description: 'Computing, inventions, digital systems, and automation',
    color: 'violet',
  },
  {
    id: 'environment',
    name: 'Environment',
    icon: 'Globe',
    description: 'Ecosystems, conservation, green energy, and climate balance',
    color: 'teal',
  },
  {
    id: 'people',
    name: 'People & Relationships',
    icon: 'Users',
    description: 'Friendship, teamwork, personality traits, and communication',
    color: 'blue',
  },
  {
    id: 'everyday',
    name: 'Everyday Life',
    icon: 'Sparkles',
    description: 'Daily routines, common choices, habits, and practical skills',
    color: 'slate',
  },
];

export const WORDS: WordItem[] = [
  // --- NATURE ---
  {
    id: 'w-nat-1',
    word: 'foliage',
    pronunciation: 'FOH-lee-ij',
    partOfSpeech: 'noun',
    category: 'nature',
    gradeLevel: 6,
    definition: 'The leaves of a plant or tree, especially when considered as a collection.',
    example: 'In autumn, the mountain foliage transforms into vibrant shades of amber, gold, and crimson.',
    synonyms: ['leaves', 'greenery', 'vegetation'],
    antonyms: ['bare branches', 'defoliation'],
    sentenceScramble: {
      scrambled: ['The', 'thick', 'foliage', 'blocked', 'the', 'sunlight', 'completely.'],
      solution: 'The thick foliage blocked the sunlight completely.',
      hint: 'Starts with "The thick foliage..."'
    }
  },
  {
    id: 'w-nat-2',
    word: 'arid',
    pronunciation: 'AIR-id',
    partOfSpeech: 'adjective',
    category: 'nature',
    gradeLevel: 6,
    definition: 'Extremely dry and having very little or no rain; barren of moisture.',
    example: 'Cacti have unique adaptations that allow them to thrive in the arid desert sands.',
    synonyms: ['dry', 'parched', 'barren'],
    antonyms: ['humid', 'moist', 'fertile'],
    sentenceScramble: {
      scrambled: ['Few', 'plants', 'can', 'survive', 'in', 'such', 'an', 'arid', 'climate.'],
      solution: 'Few plants can survive in such an arid climate.',
      hint: 'Subject begins with "Few plants..."'
    }
  },
  {
    id: 'w-nat-3',
    word: 'canopy',
    pronunciation: 'KAN-uh-pee',
    partOfSpeech: 'noun',
    category: 'nature',
    gradeLevel: 7,
    definition: 'The high, continuous roof formed by the treetops in a forest.',
    example: 'Monkeys and tropical birds spend most of their lives high above in the rainforest canopy.',
    synonyms: ['treetop layer', 'overhang', 'roof'],
    sentenceScramble: {
      scrambled: ['Birds', 'sang', 'merrily', 'under', 'the', 'leafy', 'forest', 'canopy.'],
      solution: 'Birds sang merrily under the leafy forest canopy.',
      hint: 'Who was singing? "Birds sang merrily..."'
    }
  },
  {
    id: 'w-nat-4',
    word: 'erosion',
    pronunciation: 'ih-ROH-zhun',
    partOfSpeech: 'noun',
    category: 'nature',
    gradeLevel: 7,
    definition: 'The gradual wearing away of rocks, soil, or earth by wind, water, or ice.',
    example: 'Heavy ocean waves caused coastal erosion, gradually carving caves into the cliffside.',
    synonyms: ['wearing away', 'deterioration', 'abrasion'],
    antonyms: ['buildup', 'accretion', 'preservation'],
    sentenceScramble: {
      scrambled: ['Planting', 'sturdy', 'grass', 'helps', 'prevent', 'soil', 'erosion.'],
      solution: 'Planting sturdy grass helps prevent soil erosion.',
      hint: 'Action starts with "Planting sturdy grass..."'
    }
  },
  {
    id: 'w-nat-5',
    word: 'flourish',
    pronunciation: 'FLUR-ish',
    partOfSpeech: 'verb',
    category: 'nature',
    gradeLevel: 8,
    definition: 'To grow or develop in a healthy, vigorous, or successful way.',
    example: 'With plenty of sunlight and compost, the wildflower garden began to flourish.',
    synonyms: ['thrive', 'prosper', 'bloom'],
    antonyms: ['wither', 'decline', 'fade'],
    sentenceScramble: {
      scrambled: ['Wildflowers', 'will', 'flourish', 'when', 'the', 'spring', 'rains', 'arrive.'],
      solution: 'Wildflowers will flourish when the spring rains arrive.',
      hint: 'Subject is "Wildflowers..."'
    }
  },

  // --- SCIENCE ---
  {
    id: 'w-sci-1',
    word: 'hypothesis',
    pronunciation: 'hy-POTH-uh-sis',
    partOfSpeech: 'noun',
    category: 'science',
    gradeLevel: 6,
    definition: 'A testable explanation or educated prediction about a scientific question.',
    example: 'Maya tested her hypothesis by measuring how fast salt dissolved in warm versus ice-cold water.',
    synonyms: ['educated guess', 'theory', 'supposition'],
    antonyms: ['proven fact', 'certainty'],
    sentenceScramble: {
      scrambled: ['The', 'scientist', 'designed', 'an', 'experiment', 'to', 'test', 'her', 'hypothesis.'],
      solution: 'The scientist designed an experiment to test her hypothesis.',
      hint: 'Who designed it? "The scientist designed..."'
    }
  },
  {
    id: 'w-sci-2',
    word: 'friction',
    pronunciation: 'FRIK-shun',
    partOfSpeech: 'noun',
    category: 'science',
    gradeLevel: 6,
    definition: 'The resistance that one surface or object encounters when moving over another.',
    example: 'The rough rubber tread on your sneakers creates friction that keeps you from slipping on the basketball court.',
    synonyms: ['resistance', 'traction', 'rubbing'],
    antonyms: ['smoothness', 'slippery ease'],
    sentenceScramble: {
      scrambled: ['Ice', 'reduces', 'friction', 'and', 'makes', 'surfaces', 'very', 'slick.'],
      solution: 'Ice reduces friction and makes surfaces very slick.',
      hint: 'Starts with "Ice reduces..."'
    }
  },
  {
    id: 'w-sci-3',
    word: 'velocity',
    pronunciation: 'vuh-LOSS-uh-tee',
    partOfSpeech: 'noun',
    category: 'science',
    gradeLevel: 7,
    definition: 'The speed of an object in a specific direction.',
    example: 'The spacecraft accelerated at incredible velocity as it broke free from Earth’s gravitational pull.',
    synonyms: ['speed', 'pace', 'swiftness'],
    antonyms: ['slowness', 'stagnation'],
    sentenceScramble: {
      scrambled: ['The', 'roller', 'coaster', 'gained', 'maximum', 'velocity', 'on', 'the', 'downward', 'drop.'],
      solution: 'The roller coaster gained maximum velocity on the downward drop.',
      hint: 'The ride is "The roller coaster..."'
    }
  },
  {
    id: 'w-sci-4',
    word: 'catalyst',
    pronunciation: 'KAT-uh-list',
    partOfSpeech: 'noun',
    category: 'science',
    gradeLevel: 8,
    definition: 'A substance that speeds up a chemical reaction without being consumed, or a person/event that sparks change.',
    example: 'Adding yeast served as a catalyst, making the dough rise much quicker than before.',
    synonyms: ['spark', 'stimulant', 'accelerator'],
    antonyms: ['inhibitor', 'hindrance'],
    sentenceScramble: {
      scrambled: ['Her', 'inspiring', 'speech', 'acted', 'as', 'a', 'catalyst', 'for', 'schoolwide', 'reform.'],
      solution: 'Her inspiring speech acted as a catalyst for schoolwide reform.',
      hint: 'Starts with "Her inspiring speech..."'
    }
  },
  {
    id: 'w-sci-5',
    word: 'transparent',
    pronunciation: 'trans-PAIR-unt',
    partOfSpeech: 'adjective',
    category: 'science',
    gradeLevel: 6,
    definition: 'Allowing light to pass through completely so that objects behind can be clearly seen.',
    example: 'The clean glass aquarium was so transparent that we could watch every ripple of the fish’s fins.',
    synonyms: ['clear', 'see-through', 'translucent'],
    antonyms: ['opaque', 'cloudy', 'dark'],
    sentenceScramble: {
      scrambled: ['Clean', 'glass', 'is', 'transparent', 'and', 'lets', 'sunlight', 'shine', 'inside.'],
      solution: 'Clean glass is transparent and lets sunlight shine inside.',
      hint: 'Starts with "Clean glass..."'
    }
  },

  // --- SCHOOL ---
  {
    id: 'w-sch-1',
    word: 'diligence',
    pronunciation: 'DIL-uh-jens',
    partOfSpeech: 'noun',
    category: 'school',
    gradeLevel: 6,
    definition: 'Careful and persistent work or effort.',
    example: 'Through persistent diligence and daily practice, Elena mastered the complex cello solo.',
    synonyms: ['hard work', 'dedication', 'attentiveness'],
    antonyms: ['laziness', 'neglect', 'carelessness'],
    sentenceScramble: {
      scrambled: ['Her', 'diligence', 'in', 'studying', 'earned', 'her', 'top', 'marks.'],
      solution: 'Her diligence in studying earned her top marks.',
      hint: 'Starts with "Her diligence..."'
    }
  },
  {
    id: 'w-sch-2',
    word: 'collaborate',
    pronunciation: 'kuh-LAB-uh-rayt',
    partOfSpeech: 'verb',
    category: 'school',
    gradeLevel: 6,
    definition: 'To work together with someone else on a common goal or project.',
    example: 'The science teacher asked the lab partners to collaborate on their solar system model.',
    synonyms: ['cooperate', 'team up', 'join forces'],
    antonyms: ['disagree', 'compete', 'work alone'],
    sentenceScramble: {
      scrambled: ['Students', 'must', 'collaborate', 'to', 'solve', 'the', 'challenging', 'puzzle.'],
      solution: 'Students must collaborate to solve the challenging puzzle.',
      hint: 'Subject is "Students must..."'
    }
  },
  {
    id: 'w-sch-3',
    word: 'scrutinize',
    pronunciation: 'SKROOT-in-eyez',
    partOfSpeech: 'verb',
    category: 'school',
    gradeLevel: 7,
    definition: 'To examine or inspect someone or something closely and thoroughly.',
    example: 'Before submitting his historical essay, Liam took time to scrutinize every quotation for accuracy.',
    synonyms: ['inspect', 'examine', 'audit'],
    antonyms: ['glance over', 'skim', 'ignore'],
    sentenceScramble: {
      scrambled: ['Always', 'scrutinize', 'your', 'written', 'work', 'for', 'spelling', 'errors.'],
      solution: 'Always scrutinize your written work for spelling errors.',
      hint: 'Starts with an imperative "Always scrutinize..."'
    }
  },
  {
    id: 'w-sch-4',
    word: 'inquisitive',
    pronunciation: 'in-KWIZ-uh-tiv',
    partOfSpeech: 'adjective',
    category: 'school',
    gradeLevel: 7,
    definition: 'Curious or having an eager desire to learn and investigate things.',
    example: 'The inquisitive student asked insightful questions about black holes and planetary orbits.',
    synonyms: ['curious', 'questioning', 'interested'],
    antonyms: ['indifferent', 'uninterested', 'incurious'],
    sentenceScramble: {
      scrambled: ['An', 'inquisitive', 'mind', 'always', 'loves', 'to', 'explore', 'new', 'ideas.'],
      solution: 'An inquisitive mind always loves to explore new ideas.',
      hint: 'Subject is "An inquisitive mind..."'
    }
  },
  {
    id: 'w-sch-5',
    word: 'persevere',
    pronunciation: 'pur-suh-VEER',
    partOfSpeech: 'verb',
    category: 'school',
    gradeLevel: 8,
    definition: 'To continue trying to achieve something despite difficulty, obstacles, or discouragement.',
    example: 'Even when algebra problems seemed overwhelming, Carlos decided to persevere until he found each answer.',
    synonyms: ['persist', 'keep going', 'endure'],
    antonyms: ['give up', 'quit', 'surrender'],
    sentenceScramble: {
      scrambled: ['Champions', 'persevere', 'even', 'when', 'the', 'challenge', 'becomes', 'tough.'],
      solution: 'Champions persevere even when the challenge becomes tough.',
      hint: 'Begins with "Champions..."'
    }
  },

  // --- TRAVEL ---
  {
    id: 'w-trv-1',
    word: 'itinerary',
    pronunciation: 'eye-TIN-uh-rair-ee',
    partOfSpeech: 'noun',
    category: 'travel',
    gradeLevel: 6,
    definition: 'A planned route or journey, often listing dates and scheduled places to visit.',
    example: 'Our family trip itinerary included stops at the Grand Canyon, Bryce Canyon, and Zion National Park.',
    synonyms: ['travel plan', 'schedule', 'route map'],
    sentenceScramble: {
      scrambled: ['Our', 'vacation', 'itinerary', 'includes', 'a', 'boat', 'tour', 'tomorrow.'],
      solution: 'Our vacation itinerary includes a boat tour tomorrow.',
      hint: 'Starts with "Our vacation itinerary..."'
    }
  },
  {
    id: 'w-trv-2',
    word: 'expedition',
    pronunciation: 'ek-spuh-DISH-un',
    partOfSpeech: 'noun',
    category: 'travel',
    gradeLevel: 7,
    definition: 'A journey or voyage undertaken by a group of people with a particular purpose, such as scientific exploration.',
    example: 'The research team organized an expedition to the Arctic to study polar bear habitats.',
    synonyms: ['voyage', 'trek', 'mission'],
    sentenceScramble: {
      scrambled: ['The', 'mountain', 'expedition', 'required', 'warm', 'jackets', 'and', 'ropes.'],
      solution: 'The mountain expedition required warm jackets and ropes.',
      hint: 'Starts with "The mountain expedition..."'
    }
  },
  {
    id: 'w-trv-3',
    word: 'navigate',
    pronunciation: 'NAV-uh-gayt',
    partOfSpeech: 'verb',
    category: 'travel',
    gradeLevel: 6,
    definition: 'To plan and direct the course of a ship, aircraft, or vehicle; to find one’s way through an area.',
    example: 'The captain used compass bearings and nautical charts to navigate safely through the dense fog.',
    synonyms: ['steer', 'pilot', 'guide'],
    antonyms: ['get lost', 'drift'],
    sentenceScramble: {
      scrambled: ['Hikers', 'use', 'a', 'trail', 'map', 'to', 'navigate', 'the', 'forest.'],
      solution: 'Hikers use a trail map to navigate the forest.',
      hint: 'Subject is "Hikers use..."'
    }
  },
  {
    id: 'w-trv-4',
    word: 'scenic',
    pronunciation: 'SEE-nik',
    partOfSpeech: 'adjective',
    category: 'travel',
    gradeLevel: 6,
    definition: 'Providing views of impressive, beautiful, or picturesque natural scenery.',
    example: 'We took the scenic coastal highway because every turn offered breathtaking views of the ocean.',
    synonyms: ['picturesque', 'breathtaking', 'panoramic'],
    antonyms: ['drab', 'ugly', 'unattractive'],
    sentenceScramble: {
      scrambled: ['They', 'stopped', 'at', 'the', 'scenic', 'overlook', 'to', 'take', 'photos.'],
      solution: 'They stopped at the scenic overlook to take photos.',
      hint: 'Action starts with "They stopped..."'
    }
  },
  {
    id: 'w-trv-5',
    word: 'traverse',
    pronunciation: 'truh-VURS',
    partOfSpeech: 'verb',
    category: 'travel',
    gradeLevel: 8,
    definition: 'To travel across, along, or through an area or terrain.',
    example: 'The adventurous hikers managed to traverse the steep ridge before the thunderstorm rolled in.',
    synonyms: ['cross', 'journey across', 'pass over'],
    sentenceScramble: {
      scrambled: ['It', 'took', 'three', 'days', 'to', 'traverse', 'the', 'desert', 'valley.'],
      solution: 'It took three days to traverse the desert valley.',
      hint: 'Starts with "It took three days..."'
    }
  },

  // --- FEELINGS ---
  {
    id: 'w-flg-1',
    word: 'bewildered',
    pronunciation: 'bih-WIL-durd',
    partOfSpeech: 'adjective',
    category: 'feelings',
    gradeLevel: 6,
    definition: 'Completely confused, perplexed, or puzzled.',
    example: 'Sam was bewildered by the optical illusion, unsure which line was truly longer.',
    synonyms: ['perplexed', 'confused', 'baffled'],
    antonyms: ['certain', 'understanding', 'clear-headed'],
    sentenceScramble: {
      scrambled: ['The', 'tricky', 'riddle', 'left', 'everyone', 'feeling', 'bewildered.'],
      solution: 'The tricky riddle left everyone feeling bewildered.',
      hint: 'Begins with "The tricky riddle..."'
    }
  },
  {
    id: 'w-flg-2',
    word: 'ecstatic',
    pronunciation: 'ek-STAT-ik',
    partOfSpeech: 'adjective',
    category: 'feelings',
    gradeLevel: 7,
    definition: 'Overwhelmingly happy, joyful, or thrillingly excited.',
    example: 'The soccer team was ecstatic after scoring the winning goal in the final seconds of the championship.',
    synonyms: ['thrilled', 'overjoyed', 'elated'],
    antonyms: ['miserable', 'devastated', 'gloomy'],
    sentenceScramble: {
      scrambled: ['She', 'felt', 'ecstatic', 'when', 'she', 'won', 'the', 'spelling', 'bee.'],
      solution: 'She felt ecstatic when she won the spelling bee.',
      hint: 'Starts with "She felt ecstatic..."'
    }
  },
  {
    id: 'w-flg-3',
    word: 'apprehension',
    pronunciation: 'ap-rih-HEN-shun',
    partOfSpeech: 'noun',
    category: 'feelings',
    gradeLevel: 7,
    definition: 'Anxiety, fear, or uneasiness that something bad or unpleasant will happen.',
    example: 'Sitting in the waiting room before her oral presentation filled Jordan with apprehension.',
    synonyms: ['anxiety', 'nervousness', 'dread'],
    antonyms: ['confidence', 'serenity', 'assurance'],
    sentenceScramble: {
      scrambled: ['He', 'approached', 'the', 'dark', 'attic', 'stairs', 'with', 'deep', 'apprehension.'],
      solution: 'He approached the dark attic stairs with deep apprehension.',
      hint: 'Starts with "He approached..."'
    }
  },
  {
    id: 'w-flg-4',
    word: 'tranquil',
    pronunciation: 'TRAN-kwil',
    partOfSpeech: 'adjective',
    category: 'feelings',
    gradeLevel: 6,
    definition: 'Calm, peaceful, quiet, and free from disturbance.',
    example: 'Early in the morning, the glassy mountain lake was quiet and tranquil.',
    synonyms: ['peaceful', 'serene', 'placid'],
    antonyms: ['chaotic', 'stormy', 'turbulent'],
    sentenceScramble: {
      scrambled: ['The', 'quiet', 'library', 'was', 'a', 'tranquil', 'place', 'to', 'study.'],
      solution: 'The quiet library was a tranquil place to study.',
      hint: 'Starts with "The quiet library..."'
    }
  },
  {
    id: 'w-flg-5',
    word: 'reluctant',
    pronunciation: 'rih-LUK-tunt',
    partOfSpeech: 'adjective',
    category: 'feelings',
    gradeLevel: 8,
    definition: 'Unwilling, hesitant, or disinclined to do something.',
    example: 'Toby was reluctant to lend his favorite comic book because he worried it might get torn.',
    synonyms: ['hesitant', 'unwilling', 'resistant'],
    antonyms: ['eager', 'enthusiastic', 'willing'],
    sentenceScramble: {
      scrambled: ['She', 'was', 'reluctant', 'to', 'jump', 'into', 'the', 'icy', 'pool.'],
      solution: 'She was reluctant to jump into the icy pool.',
      hint: 'Starts with "She was reluctant..."'
    }
  },

  // --- ANIMALS ---
  {
    id: 'w-ani-1',
    word: 'nocturnal',
    pronunciation: 'nok-TUR-nul',
    partOfSpeech: 'adjective',
    category: 'animals',
    gradeLevel: 6,
    definition: 'Active mainly at night rather than during the day.',
    example: 'Barn owls and bats are nocturnal hunters with keen senses adapted to the dark.',
    synonyms: ['night-active', 'nighttime'],
    antonyms: ['diurnal', 'day-active'],
    sentenceScramble: {
      scrambled: ['Raccoons', 'are', 'nocturnal', 'creatures', 'that', 'hunt', 'at', 'night.'],
      solution: 'Raccoons are nocturnal creatures that hunt at night.',
      hint: 'Starts with "Raccoons are..."'
    }
  },
  {
    id: 'w-ani-2',
    word: 'camouflage',
    pronunciation: 'KAM-uh-flahzh',
    partOfSpeech: 'noun',
    category: 'animals',
    gradeLevel: 6,
    definition: 'Natural coloring or patterns that allow an animal to blend in with its surroundings.',
    example: 'The chameleon used its skin camouflage to hide invisibly among the green leaves.',
    synonyms: ['disguise', 'concealment', 'blend'],
    sentenceScramble: {
      scrambled: ['The', 'moth', 'used', 'camouflage', 'to', 'blend', 'into', 'tree', 'bark.'],
      solution: 'The moth used camouflage to blend into tree bark.',
      hint: 'Subject is "The moth..."'
    }
  },
  {
    id: 'w-ani-3',
    word: 'predator',
    pronunciation: 'PRED-uh-ter',
    partOfSpeech: 'noun',
    category: 'animals',
    gradeLevel: 6,
    definition: 'An animal that naturally preys on, hunts, and eats other animals.',
    example: 'The cheetah is a swift apex predator capable of sprinting at highway speeds.',
    synonyms: ['hunter', 'carnivore'],
    antonyms: ['prey', 'herbivore'],
    sentenceScramble: {
      scrambled: ['The', 'hawk', 'is', 'a', 'sharp-eyed', 'predator', 'in', 'the', 'sky.'],
      solution: 'The hawk is a sharp-eyed predator in the sky.',
      hint: 'Starts with "The hawk..."'
    }
  },
  {
    id: 'w-ani-4',
    word: 'migrate',
    pronunciation: 'MY-grayt',
    partOfSpeech: 'verb',
    category: 'animals',
    gradeLevel: 7,
    definition: 'To move from one habitat or region to another according to the seasons.',
    example: 'Monarch butterflies migrate thousands of miles south to spend the winter in warm pine forests.',
    synonyms: ['relocate', 'journey', 'travel seasonally'],
    antonyms: ['stay put', 'remain'],
    sentenceScramble: {
      scrambled: ['Geese', 'migrate', 'south', 'every', 'autumn', 'to', 'escape', 'the', 'cold.'],
      solution: 'Geese migrate south every autumn to escape the cold.',
      hint: 'Starts with "Geese migrate..."'
    }
  },
  {
    id: 'w-ani-5',
    word: 'forage',
    pronunciation: 'FOR-ij',
    partOfSpeech: 'verb',
    category: 'animals',
    gradeLevel: 8,
    definition: 'To search widely for food or provisions in the wild.',
    example: 'Before the arrival of winter, squirrels tirelessly forage for acorns and hickory nuts.',
    synonyms: ['scavenge', 'hunt for food', 'rummage'],
    sentenceScramble: {
      scrambled: ['Bears', 'forage', 'for', 'sweet', 'berries', 'throughout', 'the', 'summer.'],
      solution: 'Bears forage for sweet berries throughout the summer.',
      hint: 'Starts with "Bears forage..."'
    }
  },

  // --- TECHNOLOGY ---
  {
    id: 'w-tec-1',
    word: 'algorithm',
    pronunciation: 'AL-guh-rith-um',
    partOfSpeech: 'noun',
    category: 'technology',
    gradeLevel: 6,
    definition: 'A step-by-step set of mathematical instructions or rules designed to solve a problem or complete a computer task.',
    example: 'Search engines use a clever algorithm to organize billions of web pages in milliseconds.',
    synonyms: ['procedure', 'formula', 'rule-set'],
    sentenceScramble: {
      scrambled: ['The', 'computer', 'algorithm', 'sorted', 'the', 'data', 'in', 'seconds.'],
      solution: 'The computer algorithm sorted the data in seconds.',
      hint: 'Begins with "The computer algorithm..."'
    }
  },
  {
    id: 'w-tec-2',
    word: 'innovate',
    pronunciation: 'IN-uh-vayt',
    partOfSpeech: 'verb',
    category: 'technology',
    gradeLevel: 7,
    definition: 'To introduce new methods, original ideas, or advanced products.',
    example: 'Engineers continue to innovate by designing electric car batteries that charge in under ten minutes.',
    synonyms: ['invent', 'pioneer', 'modernize'],
    antonyms: ['stagnate', 'copy', 'regress'],
    sentenceScramble: {
      scrambled: ['Great', 'engineers', 'always', 'innovate', 'to', 'make', 'devices', 'faster.'],
      solution: 'Great engineers always innovate to make devices faster.',
      hint: 'Starts with "Great engineers..."'
    }
  },
  {
    id: 'w-tec-3',
    word: 'obsolete',
    pronunciation: 'ob-suh-LEET',
    partOfSpeech: 'adjective',
    category: 'technology',
    gradeLevel: 7,
    definition: 'No longer produced or used; out of date because a superior alternative exists.',
    example: 'Floppy disks became obsolete once small USB thumb drives and cloud storage appeared.',
    synonyms: ['outdated', 'archaic', 'antiquated'],
    antonyms: ['modern', 'cutting-edge', 'current'],
    sentenceScramble: {
      scrambled: ['Cassette', 'tapes', 'became', 'obsolete', 'when', 'digital', 'music', 'arrived.'],
      solution: 'Cassette tapes became obsolete when digital music arrived.',
      hint: 'Subject is "Cassette tapes..."'
    }
  },
  {
    id: 'w-tec-4',
    word: 'automate',
    pronunciation: 'AW-tuh-mayt',
    partOfSpeech: 'verb',
    category: 'technology',
    gradeLevel: 8,
    definition: 'To convert a process or system so that it operates automatically through machines or code.',
    example: 'The robotics company programmed arms to automate the sorting and packing of boxed parcels.',
    synonyms: ['mechanize', 'computerize', 'streamline'],
    antonyms: ['do manually', 'handcraft'],
    sentenceScramble: {
      scrambled: ['Smart', 'factories', 'automate', 'repetitive', 'tasks', 'to', 'save', 'time.'],
      solution: 'Smart factories automate repetitive tasks to save time.',
      hint: 'Starts with "Smart factories..."'
    }
  },
  {
    id: 'w-tec-5',
    word: 'transmit',
    pronunciation: 'trans-MIT',
    partOfSpeech: 'verb',
    category: 'technology',
    gradeLevel: 7,
    definition: 'To pass, broadcast, or send something from one person, place, or device to another.',
    example: 'Cell towers transmit radio waves so smartphones can communicate and load web video.',
    synonyms: ['broadcast', 'send', 'convey'],
    antonyms: ['receive', 'absorb', 'withhold'],
    sentenceScramble: {
      scrambled: ['Satellites', 'transmit', 'weather', 'data', 'back', 'to', 'Earth.'],
      solution: 'Satellites transmit weather data back to Earth.',
      hint: 'Begins with "Satellites transmit..."'
    }
  },

  // --- ENVIRONMENT ---
  {
    id: 'w-env-1',
    word: 'biodiversity',
    pronunciation: 'by-oh-dih-VUR-sih-tee',
    partOfSpeech: 'noun',
    category: 'environment',
    gradeLevel: 6,
    definition: 'The wide variety of plant and animal life in a particular habitat or in the entire world.',
    example: 'Coral reefs support incredible biodiversity, sheltering thousands of species of colorful fish and sea life.',
    synonyms: ['species variety', 'biological richness'],
    sentenceScramble: {
      scrambled: ['Protecting', 'biodiversity', 'keeps', 'our', 'entire', 'planet', 'healthy.'],
      solution: 'Protecting biodiversity keeps our entire planet healthy.',
      hint: 'Action begins with "Protecting biodiversity..."'
    }
  },
  {
    id: 'w-env-2',
    word: 'conservation',
    pronunciation: 'kon-ser-VAY-shun',
    partOfSpeech: 'noun',
    category: 'environment',
    gradeLevel: 6,
    definition: 'The careful preservation, protection, and wise management of natural resources and wildlife.',
    example: 'Water conservation during summer droughts helps ensure reservoirs do not run completely empty.',
    synonyms: ['preservation', 'protection', 'safekeeping'],
    antonyms: ['waste', 'depletion', 'destruction'],
    sentenceScramble: {
      scrambled: ['Wildlife', 'conservation', 'protects', 'endangered', 'animals', 'from', 'harm.'],
      solution: 'Wildlife conservation protects endangered animals from harm.',
      hint: 'Starts with "Wildlife conservation..."'
    }
  },
  {
    id: 'w-env-3',
    word: 'sustainable',
    pronunciation: 'suh-STAY-nuh-bul',
    partOfSpeech: 'adjective',
    category: 'environment',
    gradeLevel: 7,
    definition: 'Able to be maintained or continued over time without depleting or permanently damaging resources.',
    example: 'Bamboo is a sustainable building material because it regrows quickly without harsh chemicals.',
    synonyms: ['renewable', 'eco-friendly', 'viable'],
    antonyms: ['unsustainable', 'depleting', 'wasteful'],
    sentenceScramble: {
      scrambled: ['Solar', 'energy', 'provides', 'a', 'clean', 'and', 'sustainable', 'power', 'source.'],
      solution: 'Solar energy provides a clean and sustainable power source.',
      hint: 'Subject is "Solar energy..."'
    }
  },
  {
    id: 'w-env-4',
    word: 'deplete',
    pronunciation: 'dih-PLEET',
    partOfSpeech: 'verb',
    category: 'environment',
    gradeLevel: 7,
    definition: 'To use up the supply, quantity, or resources of something until little remains.',
    example: 'Overfishing can quickly deplete ocean tuna populations if strict limits are not enforced.',
    synonyms: ['exhaust', 'drain', 'consume'],
    antonyms: ['replenish', 'restore', 'enrich'],
    sentenceScramble: {
      scrambled: ['Excessive', 'mining', 'can', 'deplete', 'precious', 'mineral', 'reserves.'],
      solution: 'Excessive mining can deplete precious mineral reserves.',
      hint: 'Starts with "Excessive mining..."'
    }
  },
  {
    id: 'w-env-5',
    word: 'ecosystem',
    pronunciation: 'EE-koh-sis-tum',
    partOfSpeech: 'noun',
    category: 'environment',
    gradeLevel: 8,
    definition: 'A biological community of interacting organisms and their physical environment.',
    example: 'Pollution in a freshwater creek can disrupt the whole wetland ecosystem, affecting frogs, dragonflies, and herons.',
    synonyms: ['biome', 'ecological community', 'habitat system'],
    sentenceScramble: {
      scrambled: ['Every', 'creature', 'plays', 'a', 'role', 'in', 'a', 'healthy', 'ecosystem.'],
      solution: 'Every creature plays a role in a healthy ecosystem.',
      hint: 'Starts with "Every creature..."'
    }
  },

  // --- PEOPLE & RELATIONSHIPS ---
  {
    id: 'w-peo-1',
    word: 'empathetic',
    pronunciation: 'em-puh-THET-ik',
    partOfSpeech: 'adjective',
    category: 'people',
    gradeLevel: 6,
    definition: 'Showing the ability to understand and share the feelings and perspectives of another person.',
    example: 'An empathetic friend listened patiently while Clara explained why she felt so sad.',
    synonyms: ['compassionate', 'understanding', 'sensitive'],
    antonyms: ['callous', 'unfeeling', 'indifferent'],
    sentenceScramble: {
      scrambled: ['Being', 'empathetic', 'helps', 'you', 'make', 'lasting', 'friendships.'],
      solution: 'Being empathetic helps you make lasting friendships.',
      hint: 'Starts with "Being empathetic..."'
    }
  },
  {
    id: 'w-peo-2',
    word: 'reliable',
    pronunciation: 'rih-LYE-uh-bul',
    partOfSpeech: 'adjective',
    category: 'people',
    gradeLevel: 6,
    definition: 'Consistently good in quality or performance; able to be trusted and depended upon.',
    example: 'Marcus proved to be a reliable partner who always completed his share of the group project on time.',
    synonyms: ['trustworthy', 'dependable', 'faithful'],
    antonyms: ['unreliable', 'fickle', 'undependable'],
    sentenceScramble: {
      scrambled: ['A', 'reliable', 'friend', 'keeps', 'their', 'promises', 'no', 'matter', 'what.'],
      solution: 'A reliable friend keeps their promises no matter what.',
      hint: 'Subject is "A reliable friend..."'
    }
  },
  {
    id: 'w-peo-3',
    word: 'adversary',
    pronunciation: 'AD-vur-sair-ee',
    partOfSpeech: 'noun',
    category: 'people',
    gradeLevel: 7,
    definition: 'One’s opponent or rival in a contest, debate, conflict, or dispute.',
    example: 'After a hard-fought chess match, Jackson politely shook hands with his adversary across the board.',
    synonyms: ['opponent', 'rival', 'competitor'],
    antonyms: ['ally', 'supporter', 'partner'],
    sentenceScramble: {
      scrambled: ['He', 'showed', 'respect', 'to', 'his', 'adversary', 'after', 'the', 'match.'],
      solution: 'He showed respect to his adversary after the match.',
      hint: 'Starts with "He showed respect..."'
    }
  },
  {
    id: 'w-peo-4',
    word: 'compassionate',
    pronunciation: 'kum-PASH-uh-nit',
    partOfSpeech: 'adjective',
    category: 'people',
    gradeLevel: 7,
    definition: 'Feeling or showing deep sympathy and concern for others who are experiencing hardship.',
    example: 'The compassionate volunteer spent Saturday mornings walking rescue dogs at the local shelter.',
    synonyms: ['kindhearted', 'caring', 'benevolent'],
    antonyms: ['cruel', 'harsh', 'heartless'],
    sentenceScramble: {
      scrambled: ['She', 'gave', 'a', 'compassionate', 'hug', 'to', 'comfort', 'her', 'teammate.'],
      solution: 'She gave a compassionate hug to comfort her teammate.',
      hint: 'Starts with "She gave..."'
    }
  },
  {
    id: 'w-peo-5',
    word: 'charismatic',
    pronunciation: 'kair-iz-MAT-ik',
    partOfSpeech: 'adjective',
    category: 'people',
    gradeLevel: 8,
    definition: 'Possessing a compelling charm and warmth that inspires devotion or enthusiasm in others.',
    example: 'The charismatic debate club captain inspired everyone with her humor and confident speaking style.',
    synonyms: ['charming', 'engaging', 'magnetic'],
    antonyms: ['uninspiring', 'dull', 'repellent'],
    sentenceScramble: {
      scrambled: ['His', 'charismatic', 'personality', 'naturally', 'drew', 'people', 'to', 'him.'],
      solution: 'His charismatic personality naturally drew people to him.',
      hint: 'Subject is "His charismatic personality..."'
    }
  },

  // --- EVERYDAY LIFE ---
  {
    id: 'w-eve-1',
    word: 'customary',
    pronunciation: 'KUS-tuh-mair-ee',
    partOfSpeech: 'adjective',
    category: 'everyday',
    gradeLevel: 6,
    definition: 'According to the customs or usual practices associated with a particular society, place, or set of circumstances.',
    example: 'In Japan, it is customary to remove your shoes before stepping into a home.',
    synonyms: ['usual', 'traditional', 'accustomed'],
    antonyms: ['unusual', 'unconventional', 'rare'],
    sentenceScramble: {
      scrambled: ['It', 'is', 'customary', 'to', 'shake', 'hands', 'when', 'meeting', 'someone.'],
      solution: 'It is customary to shake hands when meeting someone.',
      hint: 'Starts with "It is customary..."'
    }
  },
  {
    id: 'w-eve-2',
    word: 'resourceful',
    pronunciation: 'rih-ZORS-ful',
    partOfSpeech: 'adjective',
    category: 'everyday',
    gradeLevel: 7,
    definition: 'Having the ability to find quick, clever ways to overcome difficulties and solve problems.',
    example: 'When the tent zipper snapped, resourceful campers used safety pins and duct tape to keep the door shut.',
    synonyms: ['inventive', 'clever', 'ingenious'],
    antonyms: ['helpless', 'inept', 'unimaginative'],
    sentenceScramble: {
      scrambled: ['A', 'resourceful', 'cook', 'can', 'make', 'delicious', 'meals', 'from', 'leftovers.'],
      solution: 'A resourceful cook can make delicious meals from leftovers.',
      hint: 'Subject is "A resourceful cook..."'
    }
  },
  {
    id: 'w-eve-3',
    word: 'essential',
    pronunciation: 'eh-SEN-shul',
    partOfSpeech: 'adjective',
    category: 'everyday',
    gradeLevel: 6,
    definition: 'Absolutely necessary, extremely important, or indispensable.',
    example: 'Drinking plenty of clean water is essential for staying energized during soccer practice.',
    synonyms: ['necessary', 'crucial', 'vital'],
    antonyms: ['unnecessary', 'optional', 'trivial'],
    sentenceScramble: {
      scrambled: ['Getting', 'enough', 'sleep', 'is', 'essential', 'for', 'growing', 'brains.'],
      solution: 'Getting enough sleep is essential for growing brains.',
      hint: 'Starts with "Getting enough sleep..."'
    }
  },
  {
    id: 'w-eve-4',
    word: 'leisure',
    pronunciation: 'LEE-zhur',
    partOfSpeech: 'noun',
    category: 'everyday',
    gradeLevel: 6,
    definition: 'Free time when one is not working, studying, or performing chores; time for relaxation.',
    example: 'During her leisure time on weekends, Samantha paints watercolors and rides her bicycle.',
    synonyms: ['free time', 'recreation', 'relaxation'],
    antonyms: ['work', 'toil', 'drudgery'],
    sentenceScramble: {
      scrambled: ['He', 'enjoys', 'reading', 'adventure', 'novels', 'at', 'his', 'leisure.'],
      solution: 'He enjoys reading adventure novels at his leisure.',
      hint: 'Starts with "He enjoys reading..."'
    }
  },
  {
    id: 'w-eve-5',
    word: 'spontaneous',
    pronunciation: 'spon-TAY-nee-us',
    partOfSpeech: 'adjective',
    category: 'everyday',
    gradeLevel: 8,
    definition: 'Performed or occurring as a result of a sudden impulse without premeditation or external stimulus.',
    example: 'We took a spontaneous trip to the beach when we saw the sun breaking through the clouds.',
    synonyms: ['unplanned', 'impulsive', 'natural'],
    antonyms: ['planned', 'deliberate', 'calculated'],
    sentenceScramble: {
      scrambled: ['The', 'crowd', 'erupted', 'in', 'spontaneous', 'applause', 'for', 'the', 'singer.'],
      solution: 'The crowd erupted in spontaneous applause for the singer.',
      hint: 'Starts with "The crowd erupted..."'
    }
  }
];

export function getWordById(id: string): WordItem | undefined {
  return WORDS.find((w) => w.id === id);
}

export function getWordsByCategory(category: string): WordItem[] {
  if (category === 'all') return WORDS;
  return WORDS.filter((w) => w.category === category);
}

export function getWordsByGrade(grade: number | 'all'): WordItem[] {
  if (grade === 'all') return WORDS;
  return WORDS.filter((w) => w.gradeLevel === grade);
}
