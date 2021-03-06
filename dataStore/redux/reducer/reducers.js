import {GET_ALL_NOTE, SET_NEW_NOTE, UPDATE_NOTE} from '../action/actions';
import Datastore from 'react-native-local-mongodb';
import AsyncStorage from '@react-native-async-storage/async-storage/src/AsyncStorage';
import {db} from '../../Config';

const initialState = {
  notes: [
    {
      title: '1',
      note: '<div>Scribble notes makes it easy for you to type your thoughts, ideas and many more writing related activities.</div><div>Some of the <b>features</b>&nbsp;like <i>italizing me</i>&nbsp;or <strike>strikethrough me o</strike>r <u>underline me </u>are important.</div>',
      bg_color: '#fff6e7',
      date_modified: '04/05/2022',
      label: 'Design | Wireframe',
      updatedAt: '',
      createdAt: '',
    },
  ],
};

export const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NEW_NOTE:
      state.notes.push(action.payload);
      console.log(state, 'state');
      return {
        ...state,
        notes: state.notes.sort((a, b) => {
          return b.updatedAt - a.updatedAt;
        }),
      };
    case GET_ALL_NOTE:
      state.notes = action.payload;
      return {
        ...state,
        notes: state.notes.sort((a, b) => {
          return b.updatedAt - a.updatedAt;
        }),
      };

    case UPDATE_NOTE:
      state.notes = action.payload;
      console.log(state, 'from reducers');
      return {
        ...state,
        notes: state.notes.sort((a, b) => {
          return b.updatedAt - a.updatedAt;
        }),
      };
    default:
      return state;
  }
};
