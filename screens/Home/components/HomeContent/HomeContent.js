import React, {useEffect, useState} from 'react';

import {View, Text, ScrollView} from 'react-native';
import {CardNote} from '../index';


function HomeContent(props) {
  const [mainNote, setmainNote] = useState(props.notes.notearray);
  const [loading, setLoading] = useState(true);
  console.log(props.notes.notearray,'props');
  useEffect(() => {

    setLoading(false);
  });


  return (
    <View>
      {loading == false ? (
        <View
          style={{height: '84%', display: 'flex', justifyContent: 'center'}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {mainNote.map((item, i) => {
              return (
                <CardNote
                  key={i}
                  label={item.label}
                  title={item.title}
                  content={item.content}
                  bg={item.bg_color}
                  date={item.data_modified}
                />
              );
            })}
          </ScrollView>
        </View>
      ) : (
        <View></View>
      )}
    </View>
  );
}

export default HomeContent;
