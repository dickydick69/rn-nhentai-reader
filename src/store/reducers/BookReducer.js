import {ADD_BOOK, SEARCH_ID} from '../actions/bookAction';
const initialState = {
  books: [],
  book: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_BOOK: {
      return {
        ...state,
        books: [...state.books, action.payload],
      };
    }
    case SEARCH_ID: {
      return {
        ...state,
        book: action.payload,
      };
    }
    default:
      return state;
  }
}
