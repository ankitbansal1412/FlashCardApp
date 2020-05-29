import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { getDeckData } from '../utils/api'
import { recieveDeck } from '../actions/deck'
import { connect } from 'react-redux'
import { View, Card, Text } from 'react-native-ui-lib';

class DeckList extends Component {

  
    state = {
        loading: true
    }

    componentDidMount() {

        getDeckData()
            .then(
                data => {
                   
                    this.setState({ loading: false })
                    this.props.dispatch(recieveDeck(data))
                }
            )
    }


    render() {

        if (this.state.loading) {
            return (
                <View>
                    <ActivityIndicator style={{ marginTop: 30 }} />
                </View>
            )
        }
        const { decks } = this.props
        return (
            <View flex padding-20 >
                <ScrollView
                    horizontal
                    height={100}
                    padding={15}
                    style={{ overflow: 'visible' }}
                    contentContainerStyle={{ padding: 5 }}
                    showsHorizontalScrollIndicator={true}
                >
                    {Object.entries(decks).map(deck => {

                        return (
                            deck[1] !== null ?
                                <View
                                    key={deck[1]} style={{ marginLeft: 0, justifyContent: 'center' }}
                                >
                                    <Card key={deck[0]}
                                        width={300}
                                        height={180}
                                        borderRadius={15}
                                        useNative
                                        activeScale={1.05}
                                        style={{ marginLeft: -5, marginRight: 15, justifyContent: 'center', alignItems: 'center' }}
                                        onPress={() => this.props.navigation.navigate(
                                            'Deck Details',
                                            { deckName: deck[0] }
                                        )}>

                                        <Text text20>
                                            {deck[0]}
                                        </Text>
                                        <Text text40 dark50>
                                            {deck[1].questions.length} Cards
                                        </Text>
                                    </Card>
                                </View>
                                : <View key={deck[0]}></View>
                        )
                    }
                    )}
                </ScrollView>
            </View>
        )
    }
}
function mapStateToProps(decks) {
    // console.log('store', decks)
    return {
        decks
    }
}

const styles = StyleSheet.create({
    red: {
        backgroundColor: 'red'
    }

})

export default connect(mapStateToProps)(DeckList)