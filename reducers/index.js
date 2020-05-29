import { ADD_DECK, ADD_QUESTION, RECIEVE_DECK } from "../actions/deck";

export default function deck(state = {}, action) {
    switch (action.type) {
        case RECIEVE_DECK:
            return {
                ...state,
                ...action.deck
            }
        case ADD_DECK:
            return {
                ...state,
                ...action.deck
            }
        case ADD_QUESTION: {
            const newQuestions = state[action.deck].questions
            newQuestions.push(action.question)
            return {
                ...state,
                [action.deck]: {
                    ...state[action.deck],
                    questions: newQuestions
                }
            }
        }
        default:
            return state
    }
}