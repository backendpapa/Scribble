import {GET_ALL_NOTE, SET_NEW_NOTE} from '../action/actions';
import Datastore from 'react-native-local-mongodb';
import AsyncStorage from '@react-native-async-storage/async-storage/src/AsyncStorage';
import {db} from '../../Config';

const initialState = {
  notes: [],
};

export const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NEW_NOTE:
      state.notes.push(action.payload);

      db.insert(action.payload, function (err, doc) {
        console.log(doc);
      });
      return state;
    case GET_ALL_NOTE:
      state.notes = action.payload;
      return state;

    default:
      return state;
  }
};
