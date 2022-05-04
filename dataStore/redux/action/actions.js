export const SET_NEW_NOTE = 'SET_NEW_NAME';
export const GET_ALL_NOTE = 'GET_ALL_NOTE';

export const setNewNote = note => dispatch => {
  dispatch({
    type: SET_NEW_NOTE,
    payload: note,
  });
};

export const getAllNotes = notes => dispatch => {
  console.log(notes, 'note incoming');
  dispatch({
    type: GET_ALL_NOTE,
    payload: notes,
  });
};
