let cocktails = {
  c1: {
    id: 'c1',
    name: 'White Russian',
    timpestamp: 1596655939489,
    author: 'u1',
  },
  c2: {
    id: 'c2',
    name: 'Tequilla Sunrise',
    timestamp: 1596655939489,
    author: 'u2',
  },
  c3: {
    id: 'c3',
    name: 'Cuba Libre',
    timestamp: 1596655939489,
    author: 'u2',
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

const formatCocktail = ({ name, author }) => ({
  id: generateID(),
  timestamp: Date.now(),
  name,
  author,
});

const generateID = () => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

export const _deleteCocktail = (id) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res();
    }, 200);
  });
};
