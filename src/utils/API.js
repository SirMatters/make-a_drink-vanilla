let cocktails = {
  c1: {
    id: 'c1',
    name: 'White Russian',
    timpestamp: 1596655939489,
    author: 'u1',
    raiting: 4.2,
    steps: {
      1: 'WR step 1',
      2: 'WR step 2',
      3: 'WR step 3',
    },
    ingredients: [],
    tags: [],
    description: 'White russian description',
    comments: [],
    image:
      'https://tipsybartender.com/wp-content/uploads/2018/02/Chocolate-White-Russian.jpg',
  },
  c2: {
    id: 'c2',
    name: 'Tequilla Sunrise',
    timestamp: 1596655939489,
    author: 'u2',
    raiting: 4.1,
    steps: {
      1: 'TS step 1',
      2: 'TS step 2',
      3: 'TS step 3',
    },
    ingredients: [],
    tags: [],
    description: 'Tequilla sunrise description',
    comments: [],
    image:
      'https://tse3.mm.bing.net/th?id=OIP.16ojvtvUooNafhwvBRwL6gHaLH&pid=Api',
  },
  c3: {
    id: 'c3',
    name: 'Cuba Libre',
    timestamp: 1596655939489,
    author: 'u2',
    raiting: 4.3,
    steps: {
      1: 'CL step 1',
      2: 'CL step 2',
      3: 'CL step 3',
    },
    ingredients: [],
    tags: [],
    description: 'Cuba libre description',
    comments: [],
    image:
      'https://craftybartending.com/wp-content/uploads/2018/04/Cuba-Libre-cocktail.jpg',
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
    setTimeout(() => res(cocktails), 500);
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
  comments: [],
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

export const _getInitialData = () => {
  return Promise.all([_getCocktails()]).then(([cocktails]) => ({
    cocktails,
  }));
};

export const _editCocktail = (cocktail) => {
  return new Promise((res, rej) => {
    setTimeout(() => res(cocktail), 200);
  });
};
