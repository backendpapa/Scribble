import {GET_ALL_NOTE, SET_NEW_NOTE} from '../action/actions';
import Datastore from 'react-native-local-mongodb';
import AsyncStorage from '@react-native-async-storage/async-storage/src/AsyncStorage';

let db = new Datastore({
  filename: 'Testing1',
  storage: AsyncStorage,
  autoload: true,
});

const initialState = {
  notes: [
    // {
    //   title: 'How To Draw A Professional Wireframe?',
    //   note: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic, quod. Inventore omnis voluptatem eaque error repudiandae voluptate odit est veritatis, sequi quo, facilis natus fugit blanditiis.',
    //   label: 'Design | Wireframe',
    //   data_modified: '2022/04/30',
    //   bg_color: '#eff5fb',
    // },
  ],
  age: 10,
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
      console.log(state, 'new state');
      return state;

    default:
      // console.log(state, 'state');

      return state;
  }
};

// {"_U": 0, "_V": 1, "_W": {"age": 10, "notes": []}, "_X": null, "note": [{"_id": "1iiiJ4bZqg3SgdI5", "note": "<div>jdjdjjdjdjdjdjjdjdj</div>", "title": "I love biscuit"}]}
