let cocktails = {
  c1: {
    id: 'c1',
    name: 'White Russian',
    timpestamp: 1596655939489,
    author: 'u1',
    rating: 2,
    votes: 1,
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
    rating: 4.1,
    votes: 330,
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
    rating: 3.3,
    votes: 69,
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

let users = {
  u1: {
    id: 'u1',
    handle: '@kperov',
    firstName: 'Kirill',
    lastName: 'Perov',
    votes: {
      c2: 5,
    },
  },
  u2: {
    id: 'u2',
    handle: '@insoul',
    firstName: 'Evgenii',
    lastName: 'Belan',
    votes: {},
  },
};

let comments = {
  com1: {
    id: 'com1',
    author: 'u1',
    timestamp: Date.now(),
    edited: null,
    text: 'Sample comment text. Lorem-blarem',
    likes: [],
    parent: null,
    cocktailId: 'c1',
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
  rating: null,
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
  return Promise.all([_getCocktails(), _getUsers()]).then(
    ([cocktails, users]) => ({
      cocktails,
      users,
    })
  );
};

export const _editCocktail = (cocktail) => {
  return new Promise((res, rej) => {
    setTimeout(() => res(cocktail), 200);
  });
};

export const _getRatingVote = () => {
  return new Promise((res, rej) => {
    setTimeout(() => res(), 200);
  });
};

export const _getUsers = () => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(users);
    }, 200);
  });
};

export const _getUsersByIds = (idArr) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const result = [];
      for (let id in idArr) {
        const user = users[id];
        if (user) {
          result.push(user);
        }
      }
      res(result);
    }, 200);
  });
};

export const _updateUser = (userData) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const user = users[userData.id];
      const { id, ...updatedFields } = userData;
      if (user) {
        res({ ...user, ...updatedFields });
        console.log('API updated user positively');
      } else {
        rej();
      }
    }, 200);
  });
};

export const _getUserDataById = (userId) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const user = users[userId];
      if (user) {
        res(user);
      } else {
        console.log('no user');
        rej();
      }
    }, 200);
  });
};
