import Datastore from 'react-native-local-mongodb';
import AsyncStorage from '@react-native-async-storage/async-storage/src/AsyncStorage';

export const db = new Datastore({
  filename: 'Testing1',
  storage: AsyncStorage,
  autoload: true,
});
