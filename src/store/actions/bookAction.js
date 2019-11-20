import NHentaiGrabber from '../../libraries/NHentaiGrabber';
import {addHistory} from './historyAction';
export const ADD_BOOK = 'ADD_BOOK';
export const SEARCH_ID = 'SEARCH_ID';

export const emptyBook = () => {
  return {
    type: SEARCH_ID,
    payload: {},
  };
};

export const searchID = id => async dispatch => {
  emptyBook();
  try {
    const grabber = new NHentaiGrabber();
    const data = await grabber.g(id);
    dispatch({
      type: SEARCH_ID,
      payload: data,
    });
    dispatch(addHistory(data));
  } catch (e) {
    throw e;
  }
};

export const addBook = id => async dispatch => {
  try {
    const grabber = new NHentaiGrabber();
    const data = await grabber.g(id);
    dispatch({
      type: ADD_BOOK,
      payload: data,
    });
  } catch (e) {
    console.log(e);
  }
};
