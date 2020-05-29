import React, { Component } from 'react';
import { View, Text,  Alert, StyleSheet, KeyboardAvoidingView, TextInput } from 'react-native';
import { addDeckToAsync } from '../utils/api';
import { addDeck } from '../actions/deck'
import { connect } from 'react-redux'
import { Button } from 'react-native-ui-lib';

class NewDeck extends Component {
    state = {
        deck: {
            title: '',
            questions: []
        }
    }

    handleChange = (text) => {
        this.setState({
            deck: {
                title: text,
                questions: []
            }
        })
    }

    render() {

        const handleSubmit = () => {
            const { deck } = this.state
            const key = deck.title
            if (this.props.decks[deck.title]) {
                Alert.alert('A deck with this Name Already exists')
            }
            else {
                this.props.dispatch(addDeck({
                    [key]: deck
                }))
                this.setState({
                    deck: {
                        title: '',
                        questions: []
                    }
                })
                addDeckToAsync(key, deck)

                this.props.navigation.navigate('Deck Details', { deckName: key })
            }
        }


        return (
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ justifyContent: "center", margin: 20 }}>
                    <View>
                        <Text style={{ marginBottom: 30, fontSize: 40, }}>What Is The Title of Your New Deck?</Text>
                    </View>
                    <KeyboardAvoidingView>
                        <TextInput
                            style={styles.inputBox}
                            onChangeText={this.handleChange}
                            placeholder='Deck Title'
                            value={this.state.deck.title}
                        />
                    </KeyboardAvoidingView>
                    <View>

                        <Button
                            backgroundColor="#30B650"
                            label="Create Deck"
                            style={{ marginTop: 20, width: 200 }}
                            enableShadow
                            disabled={this.state.deck.title === ''}
                            onPress={handleSubmit}
                        />
                    </View>
                </View ></View>
        )
    }
}

const styles = StyleSheet.create({
    inputBox: {
        height: 60,
        width: 300,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        fontSize: 25,
    },
})

function mapStateToProps(decks) {
    return {
        decks
    }
}

export default connect(mapStateToProps)(NewDeck)

