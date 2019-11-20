export const ADD_HISTORY = 'ADD_HISTORY';
export const DELETE_HISTORY = 'DELETE_HISTORY';
export const ADD_KEYWORD = 'ADD_KEYWORD';
export const DELETE_KEYWORD = 'DELETE_KEYWORD';

export const addHistory = data => async dispatch => {
  try {
    dispatch({
      type: ADD_HISTORY,
      payload: data,
    });
  } catch (e) {
    console.log(e);
  }
};

export const deleteHistory = id => {
  return {
    type: DELETE_HISTORY,
    payload: id,
  };
};

export const addKeyword = keyword => ({
  type: ADD_KEYWORD,
  payload: keyword,
});

export const deleteKeyword = keyword => ({
  type: DELETE_KEYWORD,
  payload: keyword,
});
