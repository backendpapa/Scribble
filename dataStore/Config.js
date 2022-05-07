import Datastore from 'react-native-local-mongodb';
import AsyncStorage from '@react-native-async-storage/async-storage/src/AsyncStorage';

export const db = new Datastore({
  filename: 'Uat5',
  storage: AsyncStorage,
  autoload: true,
  timestampData:true
});
