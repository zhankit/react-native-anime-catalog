import {all, call} from 'redux-saga/effects';
import animeRuntime from '../../anime/src/animeSagas';

// rootSaga
export default function* rootSaga() {
	const runtime = [animeRuntime()];

	yield all(runtime);
}
