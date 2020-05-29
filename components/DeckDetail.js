import React, { Component } from 'react';
import { View, Text,  StyleSheet, } from 'react-native';
import {  removeDeckFromAsync  } from "../utils/api";
import AddCard from './AddCard'
import Quiz from './Quiz'
import { connect } from 'react-redux'
import { addDeck } from '../actions/deck'
import {  Button, } from 'react-native-ui-lib'; //eslint-disable-line
import { TextButton } from "./TextButton";


class DeckDetail extends Component {

    state = {

        title: null,
        noOfCards: null
    }

    deleteDeck = () => {
        console.log(this.props.decks)
        const { goBack, removeDeck } = this.props
        removeDeck();
        removeDeckFromAsync(this.props.title)
        goBack();

    }

    render() {
        const { title, noOfCards } = this.props
        
        return (
            title!==null?
            <View >
                <View style={styles.cardDetails}>
                    <Text style={{ fontSize: 50 }}>
                        {title}
                    </Text>
                    <Text style={{ fontSize: 20, color: 'gray' }} >
                        {noOfCards} Cards
                    </Text>
                </View>
                <View style={{ justifyContent: "center", alignItems: "center" }}>

                    <Button
                        backgroundColor="#FB3C62"
                        label="New Question"
                        enableShadow
                        borderRadius={7}
                        style={{ height: 45, marginBottom: 10 }}
                        onPress={() => this.props.navigation.navigate('AddCard', { deckName: title })}
                    />
                    <Button
                        backgroundColor="#FB3C62"
                        label="Start Quiz"
                        borderRadius={7}
                        enableShadow
                        style={{ height: 45, marginBottom: 10 }}
                        onPress={() => this.props.navigation.navigate('Quiz', { deckName: title })}
                    />
                    <Button
                        backgroundColor="#FB3C62"
                        label="Delete Deck"
                        borderRadius={7}
                        enableShadow
                        style={{ height: 45, marginBottom: 10 }}
                        onPress={this.deleteDeck}
                    />
                </View>
            </View>
            :null
        )
    }
}

const styles = StyleSheet.create({
    cardDetails: {
        marginTop: 100, 
        marginBottom: 70, 
        justifyContent: "center", 
        alignItems: "center"
    }

})

function mapStateToProps(decks, props) {
    const deckName = props.route.params.deckName
    console.log('redux store : ', decks)
    const deck = decks[deckName]

    return {

        title: deck !== null ? deck.title : null,
        noOfCards: deck !== null ? deck.questions.length : null,
    }
}

function mapDispatchToProps(dispatch, props) {
    console.log(props)
    const deckName = props.route.params.deckName
    console.log(deckName)

    return {
        goBack: () => {
            props.navigation.goBack();
        },
        removeDeck: () => {
            dispatch(addDeck({
                [deckName]: null
            }))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckDetail)

