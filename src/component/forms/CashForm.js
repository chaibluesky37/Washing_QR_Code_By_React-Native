import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    TextInput,
} from 'react-native';
import Firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
class CashForm extends Component{
    render(){
        return(
            <View>
                <Text>
                    ยอดเงินคงเหลือ
                </Text>
                <Text>
                    เติมเงิน
                </Text>
            </View>

        );
    }
}export default CashForm