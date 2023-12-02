import {combineReducers} from 'redux';
import todos from './todos';
import debitur from './debitur';
import profile from './profile';
import pinjamandebitur from './pinjamandebitur';
export default combineReducers({
  todos,
  debitur,
  profile,
  pinjamandebitur,
});
