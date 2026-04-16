// Data for different learning categories
export const categories = {
  animals: {
    name: 'Animaux',
    icon: '🐶',
    words: [
      { word: 'chien', image: '🐶', en: 'dog' },
      { word: 'chat', image: '🐱', en: 'cat' },
      { word: 'lapin', image: '🐰', en: 'rabbit' },
      { word: 'vache', image: '🐄', en: 'cow' },
      { word: 'cheval', image: '🐎', en: 'horse' },
      { word: 'mouton', image: '🐑', en: 'sheep' },
      { word: 'cochon', image: '🐖', en: 'pig' },
      { word: 'poulet', image: '🐔', en: 'chicken' },
      { word: 'canard', image: '🦆', en: 'duck' },
      { word: 'souris', image: '🐭', en: 'mouse' },
      { word: 'lion', image: '🦁', en: 'lion' },
      { word: 'tigre', image: '🐯', en: 'tiger' },
      { word: 'éléphant', image: '🐘', en: 'elephant' },
      { word: 'girafe', image: '🦒', en: 'giraffe' },
      { word: 'singe', image: '🐒', en: 'monkey' },
      { word: 'ours', image: '🐻', en: 'bear' },
    ]
  },
  colors: {
    name: 'Couleurs',
    icon: '🎨',
    words: [
      { word: 'rouge', image: '🔴', en: 'red' },
      { word: 'bleu', image: '🔵', en: 'blue' },
      { word: 'vert', image: '🟢', en: 'green' },
      { word: 'jaune', image: '🟡', en: 'yellow' },
      { word: 'orange', image: '🟠', en: 'orange' },
      { word: 'violet', image: '🟣', en: 'purple' },
      { word: 'rose', image: '🩷', en: 'pink' },
      { word: 'noir', image: '⚫', en: 'black' },
      { word: 'blanc', image: '⚪', en: 'white' },
      { word: 'gris', image: '🔘', en: 'gray' },
      { word: 'marron', image: '🤎', en: 'brown' },
      { word: 'turquoise', image: '🔵', en: 'turquoise' },
    ]
  },
  fruits: {
    name: 'Fruits',
    icon: '🍎',
    words: [
      { word: 'pomme', image: '🍎', en: 'apple' },
      { word: 'banane', image: '🍌', en: 'banana' },
      { word: 'orange', image: '🍊', en: 'orange' },
      { word: 'fraise', image: '🍓', en: 'strawberry' },
      { word: 'raisin', image: '🍇', en: 'grape' },
      { word: 'poire', image: '🍐', en: 'pear' },
      { word: 'pêche', image: '🍑', en: 'peach' },
      { word: 'cerise', image: '🍒', en: 'cherry' },
      { word: 'ananas', image: '🍍', en: 'pineapple' },
      { word: 'mangue', image: '🥭', en: 'mango' },
      { word: 'kiwi', image: '🥝', en: 'kiwi' },
      { word: 'citron', image: '🍋', en: 'lemon' },
    ]
  },
  numbers: {
    name: 'Nombres',
    icon: '🔢',
    words: [
      { word: 'un', image: '1️⃣', en: 'one' },
      { word: 'deux', image: '2️⃣', en: 'two' },
      { word: 'trois', image: '3️⃣', en: 'three' },
      { word: 'quatre', image: '4️⃣', en: 'four' },
      { word: 'cinq', image: '5️⃣', en: 'five' },
      { word: 'six', image: '6️⃣', en: 'six' },
      { word: 'sept', image: '7️⃣', en: 'seven' },
      { word: 'huit', image: '8️⃣', en: 'eight' },
      { word: 'neuf', image: '9️⃣', en: 'nine' },
      { word: 'dix', image: '🔟', en: 'ten' },
    ]
  },
  body: {
    name: 'Corps',
    icon: '🫴',
    words: [
      { word: 'tête', image: '🗣️', en: 'head' },
      { word: 'yeux', image: '👀', en: 'eyes' },
      { word: 'nez', image: '👃', en: 'nose' },
      { word: 'bouche', image: '👄', en: 'mouth' },
      { word: 'oreilles', image: '👂', en: 'ears' },
      { word: 'cheveux', image: '💇', en: 'hair' },
      { word: 'bras', image: '💪', en: 'arms' },
      { word: 'mains', image: '👐', en: 'hands' },
      { word: 'jambes', image: '🦵', en: 'legs' },
      { word: 'pieds', image: '🦶', en: 'feet' },
    ]
  },
  family: {
    name: 'Famille',
    icon: '👨‍👩‍👧‍👦',
    words: [
      { word: 'maman', image: '👩', en: 'mom' },
      { word: 'papa', image: '👨', en: 'dad' },
      { word: 'fille', image: '👧', en: 'daughter' },
      { word: 'garçon', image: '👦', en: 'son' },
      { word: 'grand-mère', image: '👵', en: 'grandmother' },
      { word: 'grand-père', image: '👴', en: 'grandfather' },
      { word: 'sœur', image: '👩‍👧', en: 'sister' },
      { word: 'frère', image: '👨‍👦', en: 'brother' },
      { word: 'bébé', image: '👶', en: 'baby' },
      { word: 'chien', image: '🐶', en: 'dog' }, // family pet
    ]
  },
  vehicles: {
    name: 'Véhicules',
    icon: '🚗',
    words: [
      { word: 'voiture', image: '🚗', en: 'car' },
      { word: 'camion', image: '🚚', en: 'truck' },
      { word: 'bus', image: '🚌', en: 'bus' },
      { word: 'vélo', image: '🚲', en: 'bicycle' },
      { word: 'moto', image: '🏍️', en: 'motorcycle' },
      { word: 'avion', image: '✈️', en: 'airplane' },
      { word: 'bateau', image: '🚢', en: 'boat' },
      { word: 'train', image: '🚂', en: 'train' },
      { word: 'hélicoptère', image: '🚁', en: 'helicopter' },
      { word: 'fusée', image: '🚀', en: 'rocket' },
    ]
  },
  food: {
    name: 'Nourriture',
    icon: '🍕',
    words: [
      { word: 'pain', image: '🍞', en: 'bread' },
      { word: 'fromage', image: '🧀', en: 'cheese' },
      { word: 'viande', image: '🥩', en: 'meat' },
      { word: 'poisson', image: '🐟', en: 'fish' },
      { word: 'œuf', image: '🥚', en: 'egg' },
      { word: 'riz', image: '🍚', en: 'rice' },
      { word: 'pâtes', image: '🍝', en: 'pasta' },
      { word: 'pizza', image: '🍕', en: 'pizza' },
      { word: 'hamburger', image: '🍔', en: 'hamburger' },
      { word: 'salade', image: '🥗', en: 'salad' },
    ]
  },
  clothes: {
    name: 'Vêtements',
    icon: '👕',
    words: [
      { word: 'chemise', image: '👔', en: 'shirt' },
      { word: 'pantalon', image: '👖', en: 'pants' },
      { word: 'robe', image: '👗', en: 'dress' },
      { word: 'jupe', image: '👗', en: 'skirt' },
      { word: 'chaussures', image: '👟', en: 'shoes' },
      { word: 'chapeau', image: '🎩', en: 'hat' },
      { word: 'manteau', image: '🧥', en: 'coat' },
      { word: 'gants', image: '🧤', en: 'gloves' },
      { word: 'écharpe', image: '🧣', en: 'scarf' },
      { word: 'lunettes', image: '🕶️', en: 'glasses' },
    ]
  },
  emotions: {
    name: 'Émotions',
    icon: '😊',
    words: [
      { word: 'heureux', image: '😊', en: 'happy' },
      { word: 'triste', image: '😢', en: 'sad' },
      { word: 'en colère', image: '😠', en: 'angry' },
      { word: 'surpris', image: '😮', en: 'surprised' },
      { word: 'fatigué', image: '😴', en: 'tired' },
      { word: 'effrayé', image: '😱', en: 'scared' },
      { word: 'excité', image: '🤩', en: 'excited' },
      { word: 'malade', image: '🤒', en: 'sick' },
      { word: 'amusé', image: '😂', en: 'amused' },
      { word: 'calme', image: '😌', en: 'calm' },
    ]
  },
  house: {
    name: 'Maison',
    icon: '🏠',
    words: [
      { word: 'maison', image: '🏠', en: 'house' },
      { word: 'porte', image: '🚪', en: 'door' },
      { word: 'fenêtre', image: '🪟', en: 'window' },
      { word: 'lit', image: '🛏️', en: 'bed' },
      { word: 'table', image: '🪑', en: 'table' },
      { word: 'chaise', image: '🪑', en: 'chair' },
      { word: 'cuisine', image: '🍳', en: 'kitchen' },
      { word: 'salle de bain', image: '🛁', en: 'bathroom' },
      { word: 'jardin', image: '🌳', en: 'garden' },
      { word: 'garage', image: '🏭', en: 'garage' },
    ]
  }
};

// Get all category keys
export const categoryKeys = Object.keys(categories);

// Get category by key
export const getCategory = (key) => categories[key];

// Get random category
export const getRandomCategory = () => {
  const keys = categoryKeys;
  return categories[keys[Math.floor(Math.random() * keys.length)]];
};