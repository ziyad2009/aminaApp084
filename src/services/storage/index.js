import React,{useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default  {
  setItem: async (key, value) => {

    try {
      value = JSON.stringify(value);
      if (value) {
        await AsyncStorage.setItem(key, value);
        // console.error('AsyncStorage test set : ' + value ,"and ke ",key);
      } else {
        //console.log('not set, stringify failed:', key, value);
      }
    } catch (error) {
      //console.error('AsyncStorage error: ' + error.message);
    }
  },
  
  getItem: async (key) => {
    try {
      const item = await AsyncStorage.getItem(key);
      //console.error('AsyncStorage test get: ' + item);
      return JSON.parse(item);
    } catch (error) {
      //console.error('AsyncStorage error: ' + error.message);
    }
  },
  removeItem: async (key) => {
    try {
      await AsyncStorage.removeItem(key);
       console.log("remove frome storage", key)
    } catch (error) {
      console.error('AsyncStorage error: ' + error.message);
    }
  },

  clear : async () => {
    try {
        await  AsyncStorage.clear();
       // console.log('storage cleared');
    } catch (e) {
       // console.error('AsyncStorage error: ' + e.message);
    }
  },
  getItemmult: async (key) => {
    try {
      const item = await AsyncStorage.getItem(key);
      //console.error('AsyncStorage test get: ' + item);
      return JSON.parse(item);
    } catch (error) {
      //console.error('AsyncStorage error: ' + error.message);
    }
  },
  setItemall: async (key, value) => {

    try {
      const item = await AsyncStorage.getItem(key);
       const valuelike =   JSON.parse(item);
      if (valuelike) {
        await AsyncStorage.setItem(key, [...valuelike,value]);
        // console.error('AsyncStorage test set : ' + value ,"and ke ",key);
      } else {
        //console.log('not set, stringify failed:', key, value);
      }
    } catch (error) {
      //console.error('AsyncStorage error: ' + error.message);
    }
  },
  setItemFav: async (key, value) => {
    let newData=[]
    try {
      const item = await AsyncStorage.getItem(key);
      //console.error('AsyncStorage test get: ' + item);
      let data= JSON.parse(item);
      newData.concat(...data,value)
      console.error('AsyncStorage test get: ' + newData);
      value = JSON.stringify(newData);
      if (value) {
        await AsyncStorage.setItem(key, value);
        console.error('AsyncStorage test set : ' + value ,"and ke ",key);
      } else {
        //console.log('not set, stringify failed:', key, value);
      }

    } catch (error) {
      //console.error('AsyncStorage error: ' + error.message);
    }

    try {
      value = JSON.stringify(value);
      if (value) {
        await AsyncStorage.setItem(key, value);
        // console.error('AsyncStorage test set : ' + value ,"and ke ",key);
      } else {
        //console.log('not set, stringify failed:', key, value);
      }
    } catch (error) {
      //console.error('AsyncStorage error: ' + error.message);
    }
  },
  
};
