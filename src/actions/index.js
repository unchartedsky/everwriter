/**
 * Created by tywin on 13/03/2017.
 */
import * as types from '../constants/actionTypes';

export function saving(text) {
  // return function (dispatch) {
  //     return dispatch({
  //         type: types.SAVING,
  //         text
  //     });
  // }

  return {
    type: types.SAVING,
    text
  };
}
