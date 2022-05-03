import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import {noteReducer} from './reducer/reducers';

const rootReducer = combineReducers({note: noteReducer});

export const Store = createStore(rootReducer, applyMiddleware(thunk));
