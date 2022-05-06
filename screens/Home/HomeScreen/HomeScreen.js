import {useNavigation} from '@react-navigation/core';
import {Icon} from '@rneui/base';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  useColorScheme,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useIsFocused, useRoute} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {
  getAllNotes,
  SET_NEW_NOTE,
} from '../../../dataStore/redux/action/actions';
import {db} from '../../../dataStore/Config';
import {HomeHeader, HomeTab, HomeContent, CardNote} from '../components/index';
import {colors, fonts, sizes} from '../../../constant';

function Home() {
  const theme = useColorScheme();
  const navigation = useNavigation();
  const routes = useRoute();
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(true);
  const style = styles;
  const {note} = useSelector(state => state);
  const dispatch = useDispatch();
  const [notearray, setNoteArray] = useState(note.notes);

  useEffect(() => {
    if (loading == true && notearray.length == 1) {
      db.find({})
        .sort({updatedAt: -1})
        .exec(function (err, res) {
          dispatch(getAllNotes(res));

          setNoteArray(oldn => [...res]);
          setLoading(false);
        });
    } else {
      console.log('coming from notes');



      console.log('sorting');
      setNoteArray(note.notes.sort((a,b)=>{return b.updatedAt - a.updatedAt}));
      console.log(notearray,"noteing");
      console.log('sorted');
      setLoading(false);
    }
  });

  return (
    <View>
      <StatusBar
        backgroundColor={theme == 'dark' ? colors.tertiary : colors.mega}
        barStyle={theme == 'dark' ? 'light-content' : 'dark-content'}
      />
      <View
        style={[
          {backgroundColor: theme == 'dark' ? colors.tertiary : colors.mega},
          style.container,
        ]}>
        <HomeHeader />
        <View style={{marginTop: 50}}>
          <HomeTab />
        </View>
        <View style={{marginTop: 10, height: '100%'}}>
          {loading == false ? <HomeContent notes={{notearray}} /> : <View />}
        </View>
      </View>
      <View style={{position: 'absolute', right: 20, bottom: 90}}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('NewNote', {
              existing: false,
              Mnote: {},
            });
          }}
          style={[
            style.new_note_button,
            {
              backgroundColor:
                theme == 'dark' ? colors.primary : colors.tertiary,
            },
          ]}
          activeOpacity={0.8}>
          <Icon
            size={50}
            color={theme == 'dark' ? colors.secondary : colors.primary}
            name="add"
            type="ionicons"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
    padding: 25,
    paddingBottom: 105,
  },
  new_note_button: {
    borderRadius: 50,
    height: 60,
    width: 60,
    backgroundColor: colors.tertiary,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});
