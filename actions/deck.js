export const RECIEVE_DECK = 'RECIEVE_DECK';
export const ADD_DECK = 'ADD_DECK';
export const ADD_QUESTION = 'ADD_QUESTION';


export function recieveDeck(deck){
    return({
        type:RECIEVE_DECK,
        deck
    })
}

export function addDeck(deck){
    return({
        type:ADD_DECK,
        deck
    })
}

export function addQuestion(question, deck){
    return({
        type:ADD_QUESTION,
        question,
        deck
    })
}


