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
class StatusForm extends Component{
    constructor(props) {
        super(props);
        // userId = Firebase.auth().currentUser.uid;
        this.stts1 = Firebase.database().ref().child('Machine/MC_1');
        this.stts2 = Firebase.database().ref().child('Machine/MC_2');
        this.state = {
            status1 : '',
            status2 : '',
            ifoff1 : null,
            ifoff2 : null,
        };
        this.componentDidMount = this.componentDidMount.bind(this);

    }
    componentDidMount(){
        this.stts1.on('value',snap =>{
            this.setState({
                status1 : snap.val()
                
            });
            // console.log(this.state.name);
        });
        this.stts2.on('value',snap =>{
            this.setState({
                status2 : snap.val()
                
            });
        });
    }
    render() {
        
        return(
            <View  style={styles.itemp}>
                <Text style={styles.titlepf}> 
                    Profile
                </Text>
                <Text style={styles.text}>
                    Machine 1 : {this.state.status1}
                </Text>
                
                <Text style={styles.text}>
                    Machine 2 : {this.state.status2}
                </Text>
            </View>
        );
    }
}export default StatusForm
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