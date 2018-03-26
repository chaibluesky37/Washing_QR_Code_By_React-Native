import React , { Component } from 'react';
import { 
    Text,
    StyleSheet, 
} from 'react-native';

import Routes from './src/component/Routes';
import Firebase from 'firebase';
//import Config from 'react-native-config';

export default class App extends Component {
    componentWillMount() {
        Firebase.initializeApp({
            apiKey: "xxxx",
            authDomain: "xxxx",
            databaseURL: "xxxx",
             projectId: "xxxx",
            storageBucket: "xxxx",
            messagingSenderId: "xxxx"

        })
    }
    render() {
        return (
            <Routes/>
        );
    }
}


