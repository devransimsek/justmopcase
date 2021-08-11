import { SET_MECHANICS, SET_MECHANICS_CARD } from './types';

export const setMechanics = (data: any[]) => (dispatch: any) =>
  dispatch({
    type: SET_MECHANICS,
    payload: data,
  });

export const setMechanicsCards = (data: any[]) => (dispatch: any) =>
  dispatch({
    type: SET_MECHANICS_CARD,
    payload: data,
  });
