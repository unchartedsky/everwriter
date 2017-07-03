/**
 * Created by tywin on 13/03/2017.
 */
import { combineReducers } from 'redux';
import evernoteSyncReducer from './evernoteSyncReducer';
import { reducer as notificationsReducer } from 'reapop';

const rootReducer = combineReducers({
  evernoteSync: evernoteSyncReducer,
  notifications: notificationsReducer()
});

export default rootReducer;
