import {
  ADD_HISTORY,
  DELETE_HISTORY,
  ADD_KEYWORD,
  DELETE_KEYWORD,
} from '../actions/historyAction';
const initialState = {
  books: [],
  keywords: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_HISTORY: {
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
    }
    case DELETE_HISTORY: {
      return {
        ...state,
        books: state.books.filter(book => book.id !== action.payload),
      };
    }
    case ADD_KEYWORD: {
      const keywords = state.keywords;
      const isExists = keywords.find(word => word === action.payload);
      if (isExists) {
        return state;
      } else {
        return {
          ...state,
          keywords: [...state.keywords, action.payload],
        };
      }
    }
    case DELETE_KEYWORD: {
      return {
        ...state,
        keywords: state.keywords.filter(word => word !== action.payload),
      };
    }
    default:
      return state;
  }
}
