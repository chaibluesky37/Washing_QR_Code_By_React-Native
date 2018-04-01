import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    TextInput,
    Image,
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
                <Image 
                    style={{width: 200, height: 210, marginTop : 20}}
                    source={require('../../images/2.png')}
                />
                <Text style={styles.text}>
                    {this.state.cash}
                </Text>
            </View>
        );
    }
}export default CashForm
const styles = StyleSheet.create({
    text: {
        fontSize : 50,
        alignItems : 'center',
        color : '44372E',
    },
    itemp : {
        alignItems : 'center',
        flex : 1,
        marginTop : 20,
        backgroundColor : '#FBA448' ,
        
    },
    titlepf : {
        fontSize : 24,
        
    },
});