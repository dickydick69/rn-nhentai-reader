import {SET_SFW} from '../actions/settingsAction';

const initialState = {
  sfw: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_SFW: {
      return {
        ...state,
        sfw: !state.sfw,
      };
    }
    default:
      return state;
  }
}
