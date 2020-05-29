import React, { Component } from 'react';
import { View, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native';
import { addQuestionToAsync } from '../utils/api'
import { addQuestion } from '../actions/deck'
import { connect } from 'react-redux'
import { Button, } from 'react-native-ui-lib'; //eslint-disable-line


class AddCard extends Component {

    state = {
        question: '',
        answer: ''
    }


    handleSubmit = () => {
        const deck = this.props.route.params.deckName;
        this.props.goBack();
        
        this.props.addCard(this.state, deck)
        
        addQuestionToAsync(deck, this.state)

    }
    handleQuestion = (text) => {
        this.setState({
            question: text
        })

    }

    handleAnswer = (text) => {
        this.setState({
            answer: text
        })
    }

    render() {
        const { question, answer } = this.state;
        return (
            <View>
                <View style={{marginTop:60, alignItems:"center"}}>
                    <KeyboardAvoidingView>
                        <TextInput
                            onChangeText={this.handleQuestion}
                            placeholder='Enter The Question'
                            style={styles.inputBox}
                        />

                        <TextInput
                            onChangeText={this.handleAnswer}
                            placeholder='Enter The Answer'
                            style={styles.inputBox}

                        />
                    </KeyboardAvoidingView>

                    <Button
                        backgroundColor="#FB3C62"
                        label="Submit"
                        disabled={question === '' || answer === ''}
                        enableShadow
                        borderRadius={7}
                        style={{ width: 100, height: 45, }}
                        onPress={this.handleSubmit}
                    />
                </View>
            </View>
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
        margin: 10
    },

})

function mapStateToProps(deck) {
    return {
        deck
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        addCard: (title, deck) => {
            dispatch(addQuestion(title, deck))
        },
        goBack: () => {
            props.navigation.goBack();
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCard)

