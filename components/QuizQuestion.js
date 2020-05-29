import React, { Component } from 'react';
import { View, Text,  StyleSheet } from 'react-native';
import TextButton from './TextButton'
import { Button, } from 'react-native-ui-lib'; //eslint-disable-line


class QuizQuestion extends Component {
    state = {
        isQuestion: true
    }

    handleCorrect = () => {
        this.props.updateCorrect();
        this.props.nextQuestion();
    }

    handleIncorrect = () => {
        this.props.updateInCorrect();
        this.props.nextQuestion();
    }

    toggle = () => {
        this.setState((state) => ({
            isQuestion: !state.isQuestion
        }));
    }

    render() {
        const { index, question, totalQuestions } = this.props
        const { isQuestion } = this.state

        return (
            <View >
                <View style={styles.smallText}>
                    <Text >{index + 1}/{totalQuestions}</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: "center" }}>
                    {isQuestion
                        ? <View>
                            <Text style={styles.bigText}>{question && question.question}?</Text>
                        </View>
                        : <TextButton styles={styles.active} onPress={this.toggle}>Question</TextButton>}
                    {!isQuestion
                        ? <View>
                            <Text style={styles.bigText}>{question && question.answer}</Text>
                        </View>
                        : <TextButton styles={styles.active} onPress={this.toggle}>Answer</TextButton>}
                    <View style={{marginTop:80}}>
                       
                        <Button
                            backgroundColor="#FB3C62"
                            label="Correct"
                            enableShadow
                            borderRadius={7}
                            style={{ height: 45, margin:20 }}
                            onPress={this.handleCorrect}
                        />
                        <Button
                            backgroundColor="#FB3C62"
                            label="Incorrect"
                            enableShadow
                            borderRadius={7}
                            style={{ height: 45, }}
                            onPress={this.handleIncorrect}
                        />
                    </View>
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    smallText: {
        fontSize: 25,
        margin: 10
    },
    bigText: {
        fontSize: 35,
    },
    active: {
        color: 'red',
        margin: 20,
        fontSize: 20
    }

})

export default QuizQuestion

