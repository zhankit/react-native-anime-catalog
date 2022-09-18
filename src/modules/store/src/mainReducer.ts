import {combineReducers} from 'redux';
import anime from '../../anime/src/animeReducers';

const mainReducer = {
	anime,
};

export default combineReducers(mainReducer);
