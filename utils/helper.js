import { DECKS_STORAGE_KEY } from './api'
import { AsyncStorage } from 'react-native'
import { Notifications} from 'expo'
import * as Permissions from 'expo-permissions'

const NOTIFICATION_KEY='CardProject:notification'

export function getInitialDeckInfo(deckName) {
    const info = {
        React: {
            title: 'React',
            questions: [
                {
                    question: 'What is React?',
                    answer: 'A library for managing user interfaces'
                },
                {
                    question: 'Where do you make Ajax requests in React?',
                    answer: 'The componentDidMount lifecycle event'
                },
                {
                    question: 'Where do you make Ajax requests in React?',
                    answer: 'The componentDidMount lifecycle event'
                }
            ]
        },
        JavaScript: {
            title: 'JavaScript',
            questions: [
                {
                    question: 'What is a closure?',
                    answer: 'The combination of a function and the lexical environment within which that function was declared.'
                }
            ]
        }
    }
    console.log('insidehelper :', JSON.stringify(info))

    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(info))

    return deckName === undefined ? info : info[deckName]
}


export function createNotification() {
    return {
        title: 'Quiz Today',
        body: 'Dont forget to take quiz today',
        ios: {
            sound: true
        },
        android: {
            sound: true,
            vibration: true,
            priority: 'high',
            sticky: false
        }

    }
}

export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({ status }) => {
                        if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync();

                            let tommorow = new Date();
                            tommorow.setDate(tommorow.getDate() + 1)
                            tommorow.setHours(20)
                            tommorow.setMinutes(0)

                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    time: tommorow,
                                    repeat: 'day'
                                }
                            )
                            console.warn(tommorow)
                            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                        }
                    })
            }
        })
}

export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}



