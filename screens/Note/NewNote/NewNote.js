import {CheckBox, Icon} from '@rneui/base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useRef, useCallback} from 'react';
import uuid from 'react-native-uuid'
import AwesomeAlert from 'react-native-awesome-alerts';
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

import JSON5 from 'json5'
import {colors, fonts, sizes} from '../../../constant';
import {useNavigation} from '@react-navigation/core';

let labels = ['Design', 'Wireframe', 'UX'];

function NewNote() {
  const [richtext, setRichtext] = React.useState('');
  const [note, setNote] = React.useState('');
  const [title, setTitle] = React.useState('hELLO');
  const editorRef = useRef(null);
  const [showAlert, setShowAlert] = React.useState(false);
  const theme = useColorScheme();
  const navigation = useNavigation();

  const style = styles;

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

  let saveNote = async () => {
    if (title.length > 0) {
      console.log(note);
      console.log(title);
      let keygen=uuid.v4()

      try {
        const jsonValue = JSON5.stringify({title,note})
        await AsyncStorage.setItem(keygen, jsonValue)
      } catch (e) {
        // saving error
      }

      console.log(await AsyncStorage.getItem(keygen), 'result');
      await navigation.navigate('Home');
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
              disabled={false}
              useContainer={false}
              onChange={handleChange}
              onPaste={handlePaste}
              onKeyUp={handleKeyUp}
              onKeyDown={handleKeyDown}
              onInput={handleInput}
              onMessage={handleMessage}
              onFocus={handleFocus}
              onBlur={handleBlur}
              initialContentHTML={note}
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
