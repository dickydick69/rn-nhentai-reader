import {ADD_FAVORITE, DELETE_FAVORITE} from '../actions/favoriteAction';
const initialState = {
  books: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_FAVORITE:
      const books = state.books;
      const isExists = books.find(book => book.id === action.payload.id);
      if (isExists) {
        return state;
      } else {
        return {
          ...state,
          books: [...state.books, action.payload],
        };
      }
    case DELETE_FAVORITE:
      return {
        ...state,
        books: state.books.filter(book => book.id !== action.payload),
      };
    default:
      return state;
  }
}
