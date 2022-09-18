import {all} from 'redux-saga/effects';
import animeRuntime from '../../anime/src/animeSagas';

// rootSaga
export default function* rootSaga() {
	yield all([animeRuntime()]);
}
