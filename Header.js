import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NavigationBar from 'react-native-navbar';

const styles = {
    container: {
        height: 50,
        zIndex: 999
    },
}

const titleConfig = {
    title: 'How Much?',
};

export default class Header extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            // <View style={styles.container}>
                <NavigationBar
                    style={styles.container}
                    title={titleConfig}
                    rightButton={this.props.rightButton}
                />
            // </View>
        );
    }
}

