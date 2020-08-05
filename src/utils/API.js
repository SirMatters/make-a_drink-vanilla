import axios from 'axios';

export const _getCocktails = () => {
  return axios.get('http://localhost:3000/cocktails');
};
