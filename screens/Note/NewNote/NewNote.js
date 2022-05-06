import {CheckBox, Icon} from '@rneui/base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useRef, useCallback, useEffect} from 'react';
import uuid from 'react-native-uuid';
import AwesomeAlert from 'react-native-awesome-alerts';
import {db} from '../../../dataStore/Config';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  Alert,
} from 'react-native';
import {
  RichEditor,
  RichToolbar,
  actions,
  getContentCSS,
} from 'react-native-pell-rich-editor';

import JSON5 from 'json5';
import {colors, fonts, sizes} from '../../../constant';
import {useNavigation} from '@react-navigation/core';
import Datastore from 'react-native-local-mongodb';
import {useDispatch, useSelector} from 'react-redux';
import {setNewNote} from '../../../dataStore/redux/action/actions';
import {useRoute} from '@react-navigation/native';
import {setDisabled} from 'react-native/Libraries/LogBox/Data/LogBoxData';

let labels = ['Design', 'Wireframe', 'UX'];
const bg_colors = ['#fff6e7', '#eff5fb', '#e4ffe6'];

function NewNote() {
  let mainColor = Math.floor(Math.random() * bg_colors.length);

  //Date settings

  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }

  const todayDate = dd + '/' + mm + '/' + yyyy;

  //Date settings end

  const [richtext, setRichtext] = React.useState('');
  const [noteContent, setNote] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [idisable, setDisable] = React.useState(false);
  const editorRef = useRef(null);
  const [showAlert, setShowAlert] = React.useState(false);
  const theme = useColorScheme();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {note} = useSelector(state => state);
  const {Mnote, existing} = useRoute().params;
  const style = styles;
  useEffect(() => {
    console.log(Mnote);
    if (existing == true) {
      console.log(Mnote);
      setTitle(Mnote.title);
      setNote(Mnote.note);
      setDisable(true);
    }
  }, []);

  const alertContent = () => {
    return (
      <View>
        <View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            {labels.map((item, i) => {
              return (
                <View
                  key={i}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <CheckBox
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checked={true}
                    size={20}
                  />
                  <Text style={{marginLeft: -15}}> {item}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </View>
    );
  };

  let saveNote = () => {
    if (title.length > 0) {
      try {
        db.insert(
          {
            note: noteContent,
            title: title,
            label: 'Design | Wireframe',
            data_modified: todayDate,
            bg_color: bg_colors[mainColor],
          },
          function (err, res) {
            console.log('pushed');
          },
        );

        db.findOne({title: title}, function (err, doc) {
          console.log(doc, 'doc in new note');
          dispatch(setNewNote(doc));
          console.log('moving')
          navigation.navigate('Home');
        });


      } catch (e) {
        // saving error
        alert.alert('', 'You note was not saved!');
      }
    } else {
      Alert.alert('', 'You cannot save a note without a title');
    }
  };
  let handleChange = useCallback(html => {
    // save html to content ref;
    // contentRef.current = html;
    setNote(html);
  }, []);

  let handlePaste = useCallback(data => {
    console.log('Paste:', data);
  }, []);

  // @deprecated Android keyCode 229
  let handleKeyUp = useCallback(data => {
    // console.log('KeyUp:', data);
  }, []);

  // @deprecated Android keyCode 229
  let handleKeyDown = useCallback(data => {
    // console.log('KeyDown:', data);
  }, []);

  let handleInput = useCallback(({data, inputType}) => {
    // console.log(inputType, data)
  }, []);

  let handleMessage = useCallback(({type, id, data}) => {
    console.log('onMessage');
  }, []);

  let handleFocus = useCallback(() => {
    console.log('editor focus');
  }, []);

  let handleBlur = useCallback(() => {
    console.log('editor blur');
  }, []);

  return (
    <View style={{position: 'relative'}}>
      <View
        style={[
          style.mainContainer,
          {backgroundColor: theme == 'dark' ? colors.tertiary : colors.mega},
        ]}>
        <View
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Home');
            }}
            activeOpacity={0.8}>
            <Icon
              color={theme == 'dark' ? colors.mega : colors.tertiary}
              name="close-circle-outline"
              type="ionicon"
            />
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: fonts.DmSans_Bold,
              fontSize: sizes.h15,
              color: theme == 'dark' ? colors.mega : colors.tertiary,
            }}>
            Edit Note
          </Text>
          <TouchableOpacity onPress={saveNote} activeOpacity={0.8}>
            <Icon
              color={theme == 'dark' ? colors.mega : colors.tertiary}
              name="md-checkmark-circle-outline"
              type="ionicon"
            />
          </TouchableOpacity>
        </View>
        <TextInput
          style={{
            height: 60,
            backgroundColor: 'transparent',
            fontFamily: fonts.DmSans_Bold,
            fontSize: sizes.h18,
            color: theme == 'dark' ? colors.mega : colors.tertiary,
          }}
          onChangeText={setTitle}
          value={title}
          placeholderTextColor={theme == 'dark' ? colors.secondary : colors.mis}
          placeholder={'Title...'}
        />

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10,
            alignItems: 'center',
          }}>
          <View>
            {/*  View for lables*/}
            <Text
              style={{
                color: theme == 'dark' ? colors.secondary : colors.mis,
                fontFamily: fonts.DmSans_Regular,
                fontSize: sizes.h13,
              }}>
              Design | Wireframe{' '}
            </Text>
          </View>
          <View>
            {/*  View to edit labels*/}
            <TouchableOpacity
              onPress={() => {
                setShowAlert(true);
              }}
              activeOpacity={0.8}>
              <Text
                style={{
                  color: theme == 'dark' ? colors.primary : colors.tertiary,
                  fontFamily: fonts.DmSans_Bold,
                }}>
                Edit Label
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <AwesomeAlert
          show={showAlert}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          onCancelPressed={() => {
            setShowAlert(false);
          }}
          onConfirmPressed={() => {
            setShowAlert(false);
          }}
          customView={alertContent()}
        />

        <ScrollView
          showsHorizontalScrollIndicator={false}
          style={{height: '100%'}}>
          <View style={style.container}>
            <RichEditor
              ref={editorRef}
              typ
              editorStyle={{
                backgroundColor: 'transparent',
                caretColor: colors.tertiary,
                color: theme == 'dark' ? colors.mega : colors.tertiary,
              }}
              disabled={idisable}
              useContainer={false}
              onChange={handleChange}
              onPaste={handlePaste}
              onKeyUp={handleKeyUp}
              onKeyDown={handleKeyDown}
              onInput={handleInput}
              onMessage={handleMessage}
              onFocus={handleFocus}
              onBlur={handleBlur}
              initialContentHTML={noteContent}
            />
          </View>
        </ScrollView>
      </View>
      <View style={{position: 'absolute', bottom: 10, width: '100%'}}>
        <RichToolbar
          selectedIconTint={'#2095F2'}
          actions={[
            actions.keyboard,
            actions.setBold,
            actions.setItalic,
            actions.setStrikethrough,
            actions.setUnderline,
            actions.insertBulletsList,
            actions.insertOrderedList,
            actions.checkboxList,
            actions.insertImage,
            actions.redo,
            actions.undo,
            actions.insertVideo,
            actions.insertLink,
            'customAction',
          ]}
          style={{
            height: 70,
            margin: 25,
            borderRadius: 20,
            backgroundColor: theme == 'dark' ? colors.mega : colors.tertiary,
          }}
          editor={editorRef}
        />
      </View>
    </View>
  );
}

export default NewNote;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 900,
  },
  mainContainer: {
    padding: 25,

    height: '100%',
  },
});
