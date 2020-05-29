import { AsyncStorage } from 'react-native'
import { getDeckInfo, getInitialDeckInfo } from './helper'


export const DECKS_STORAGE_KEY = 'CardProject:deckinfo'



export const getDeckData = async (deckName) => {
  try {
    const value = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
    if(value === null){
      getInitialDeckInfo()
    }
    if (value !== null) {

      console.log('deckName in api: ', deckName)
      const returningValue = JSON.parse(value)

      return deckName === undefined ? returningValue : returningValue[deckName]
    }
  } catch (error) {
    console.warn('Error in getting data from Async Storage : ', error)
  }
};

export const addQuestionToAsync = async (key, value) => {
  try {
    const stringData = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
    if (stringData !== null) {
     

      const jsonData = JSON.parse(stringData)
      const data = jsonData[key]

    
      data.questions.push(value)
    

      return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
        [key]: data
      }))
    }
  }

  catch (err) { console.warn("Error in adding Question to AsyncStorage", err) }
}

export function addDeckToAsync(key, value) {

  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [key]: value
  }))

}


export const removeDeckFromAsync = async (key) => {

  try {
    const value = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
    if (value !== null) {
      const data = JSON.parse(value);
      data[key] = undefined
      delete data[key]
      return AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
    }
  } catch (error) {
    console.log("Error in getting data from Async Storage while removing deck : ", error)
  }

}