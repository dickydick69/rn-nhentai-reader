export const SET_SFW = 'SET_SETTINGS';

export const setSfw = value => {
  return {
    type: SET_SFW,
    payload: value,
  };
};
