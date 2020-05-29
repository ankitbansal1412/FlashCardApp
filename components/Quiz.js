import React, { Component } from 'react';
import { View, Text,  StyleSheet } from 'react-native';
import QuizQuestion from './QuizQuestion';
import { connect } from 'react-redux'
import { Button, } from 'react-native-ui-lib'; //eslint-disable-line
import { clearLocalNotification, setLocalNotification } from '../utils/helper'


class Quiz extends Component {
 
  state = {
    questions: [],
    index: 0,
    correct: 0,
    incorrect: 0,
  }
  componentDidMount() {

    const deckName = this.props.route.params.deckName;

    const { questions, index } = this.props

    this.setState({
      questions
    })
   }

  nextQuestion = () => {
    const { questions, index } = this.state;
    if (index <= questions.length) {
      this.setState({
        index: index + 1
      })
    }

    if (questions.length - 1 === index) {
      // console.log('clear  notification')
      clearLocalNotification()
        .then(setLocalNotification)
    }
  }

  updateCorrect = () => {
    const { correct } = this.state
    this.setState({
      correct: correct + 1
    })

  }

  restart = () => {
    this.setState({
      index:0,
      correct:0,
      incorrect:0
    })
    
  }

  updateInCorrect = () => {
    const { incorrect } = this.state

    this.setState({
      incorrect: incorrect + 1
    })
  }

  render() {
    const { questions, index, correct, incorrect } = this.state
    const totalQuestions = questions.length
    const question = questions[index]
    if (totalQuestions === 0) {
      return (
        <View style={{ flex: 1, justifyContent: "center", margin: 10 }}>
          <Text style={{ fontSize: 30 }}>Sorry You Cannot Take The Quiz Because There Is No Card In The Deck</Text>
        </View>
      )
    }

    return (
      <View>
        {index < questions.length
          ? <View>
              <QuizQuestion
                index={index}
                question={question}
                totalQuestions={totalQuestions}
                nextQuestion={this.nextQuestion}
                updateCorrect={this.updateCorrect}
                updateInCorrect={this.updateInCorrect} />
            </View>
          : <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={styles.bigText}>Score</Text>
              <View style={styles.scores}>
                <Text>correct:{correct}</Text>
                <Text>Incorrect:{incorrect}</Text>
              </View>
              <View style={styles.scores}>
                <Text>Percentage correct : {Math.round((correct * 100) / totalQuestions * 100) / 100}</Text>
                <Text> Percentage Incorrect : {Math.round((incorrect * 100) / totalQuestions * 100) / 100}</Text>
              </View>

              <Button
                backgroundColor="#FB3C62"
                label="Restart Quiz"
                enableShadow
                borderRadius={7}
                style={{ height: 45, margin: 10 }}
                onPress={this.restart}
              />
              <Button
                backgroundColor="#FB3C62"
                label="Back To Deck"
                enableShadow
                borderRadius={7}
                style={{ height: 45, }}
                onPress={() => this.props.navigation.goBack()}

            />
          </View>
        }

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
  },

  scores: {
    borderColor: 'black',
    borderWidth: 2,
    padding: 30,
    margin: 30,
  }

})



function mapStateToProps(deck, props) {
  const deckName = props.route.params.deckName;

  const questions = deck[deckName].questions
  return {
    deckName,
    questions
  }
}


export default connect(mapStateToProps)(Quiz)

