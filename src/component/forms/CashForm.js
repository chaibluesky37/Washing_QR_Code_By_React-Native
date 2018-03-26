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
    constructor(props) {
        super(props);
        userId = Firebase.auth().currentUser.uid;
        this.cash = Firebase.database().ref().child('Customer/'+userId+'/Cash');
        this.state = {
            cash : null,
        };
        this.componentDidMount = this.componentDidMount.bind(this);

    }
    componentDidMount(){
        this.cash.on('value',snap =>{
            this.setState({
                cash : snap.val()
                
            });
        });
    }
    render(){
        return(
            <View  style={styles.itemp}>
                <Text style={styles.titlepf}> 
                    ยอดเงินคงเหลือ
                </Text>
                <Text style={styles.text}>
                    {this.state.cash}
                </Text>
            </View>
        );
    }
}export default CashForm
const styles = StyleSheet.create({
    text: {
        fontSize : 20,
        alignItems : 'center',
    },
    itemp : {
        alignItems : 'center',
        
    },
    titlepf : {
        fontSize : 24,
        
    },
});