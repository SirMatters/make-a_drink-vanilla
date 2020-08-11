let cocktails = {
  c1: {
    id: 'c1',
    name: 'White Russian',
    timpestamp: 1596655939489,
    author: 'u1',
    raiting: 4.2,
    steps: [],
    ingredients: [],
    tags: [],
    descrition: 'White russian description',
  },
  c2: {
    id: 'c2',
    name: 'Tequilla Sunrise',
    timestamp: 1596655939489,
    author: 'u2',
    raiting: 4.1,
    steps: [],
    ingredients: [],
    tags: [],
    descrition: 'Tequilla sunrise description',
  },
  c3: {
    id: 'c3',
    name: 'Cuba Libre',
    timestamp: 1596655939489,
    author: 'u2',
    raiting: 4.3,
    steps: [],
    ingredients: [],
    tags: [],
    description: 'Cuba libre description',
  },
};

let ingredients = {
  i1: {
    id: 'i1',
    type: 'vodka',
    brand: 'Russian Standard',
    name: 'Russian Standard Premium',
    alcohol: '40',
    tags: ['vodka'],
  },
  i2: {
    id: 'i2',
    type: 'liqueour',
    brand: 'Coffe Liqueor Brand',
    name: 'Coffe liqueor',
    alcohol: '15',
    tags: ['coffe'],
  },
  i3: {
    id: 'i3',
    type: 'cream',
    brand: '',
    name: 'Cream',
    alcohol: 0,
    tags: ['cream'],
  },
};

export const _getCocktails = () => {
  return new Promise((res, rej) => {
    setTimeout(() => res({ cocktails }), 200);
  });
};

export const _addCocktail = (cocktail) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      // TODO: take into account created cocktail for a user
      const formattedCocktail = formatCocktail(cocktail);
      res(formattedCocktail);
    }, 200);
  });
};

const formatCocktail = ({
  name,
  author,
  description,
  steps,
  ingredients,
  tags,
  image,
}) => ({
  id: generateID(),
  timestamp: Date.now(),
  name,
  author,
  raiting: null,
  tags,
  ingredients,
  steps,
  description,
  image,
});

const generateID = () => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

export const getIngredients = () => {};

export const _deleteCocktail = (id) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res();
    }, 200);
  });
};
