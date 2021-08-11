import { SET_MECHANICS, SET_MECHANICS_CARD } from '../actions/types';

const initialState = {
  mechanics: [],
  mechanicsCards: [],
};

export default function profileReducer(state = initialState, action: any) {
  switch (action.type) {
    case SET_MECHANICS:
      return {
        ...state,
        mechanics: action.payload,
      };

    case SET_MECHANICS_CARD:
      return {
        ...state,
        mechanicsCards: action.payload,
      };
    default:
      return state;
  }
}
