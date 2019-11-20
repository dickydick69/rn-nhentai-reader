import {combineReducers} from 'redux';
import books from './BookReducer';
import history from './HistoryReducer';
import favorite from './FavoriteReducer';
import settings from './SettingsReducer';

export default combineReducers({
  books,
  history,
  favorite,
  settings,
});
