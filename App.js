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
            apiKey: "your firebase",
            authDomain: "your firebase",
            databaseURL: "your firebase",
             projectId: "your firebase",
            storageBucket: "your firebase",
            messagingSenderId: "your firebase"
        })
    }
    render() {
        return (
            <Routes/>
        );
    }
}


