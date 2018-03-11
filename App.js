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
            apiKey: "AIzaSyDwj2DN9HBan5nUkdGJihorBG2eMZW-Kvc",
            authDomain: "kmutnbpj3700.firebaseapp.com",
            databaseURL: "https://kmutnbpj3700.firebaseio.com",
             projectId: "kmutnbpj3700",
            storageBucket: "kmutnbpj3700.appspot.com",
            messagingSenderId: "298972134522"
        })
    }
    render() {
        return (
            <Routes/>
        );
    }
}


