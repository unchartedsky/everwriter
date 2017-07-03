/**
 * Created by tywin on 13/03/2017.
 */
import { SAVING } from '../constants/actionTypes';
import objectAssign from 'object-assign';
import initialState from './initialState';

export default function evernoteSyncReducer(
  state = initialState.textSaving,
  action
) {
  switch (action.type) {
    case SAVING:
      return objectAssign({}, state, { text: action.text });

    default:
      return state;
  }
}
