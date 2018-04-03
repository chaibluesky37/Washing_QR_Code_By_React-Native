import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    TextInput,
    Image,
    Alert,
} from 'react-native';
import Firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
class PrepaidForm extends Component{
    constructor(props) {
        super(props);
        userId = Firebase.auth().currentUser.uid;
        this.cash = Firebase.database().ref().child('Customer/'+userId+'/Cash');
        
        this.state = {
            cash : null,
            cashPSH : null,
            cashID : null,
            Ccode : null,
            CcodeRD : null,
        };
        
        this.componentDidMount = this.componentDidMount.bind(this);
        this.Prepaid = this.Prepaid.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }
    componentDidMount(){
        this.cash.on('value',snap =>{
            this.setState({
                cash : snap.val()
                
            });
        });
        
    }
   Prepaid(){
        if(this.state.Ccode == this.state.CcodeRD){
            this.setState({
                cashPSH : this.state.cash+100
                
            });
            console.log(this.state.CcodeRD);
            console.log(this.state.cash);
            console.log(this.state.cashPSH);
            Firebase.database().ref('Customer/'+userId).update({
                Cash : this.state.cashPSH,
            });
            Firebase.database().ref('CodeCash/'+this.state.cashID).remove()
            Actions.reset("main");

        }else{
            alert('Error');
            console.log(this.state.CcodeRD);
        }

    }

    onSubmit(){
        this.CcodeRD = Firebase.database().ref().child('CodeCash/'+this.state.cashID);
        console.log(this.state.cashID);
        this.CcodeRD.on('value',snap =>{
            this.setState({
                CcodeRD : snap.val()
                
            });
        });
        console.log(this.state.CcodeRD);
        Alert.alert(
            'Are you sure ?',
            'prepaid',
            [
                {text: 'OK', onPress: () => this.Prepaid()},
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            ],
            { cancelable: false }
        )
        
    }
    render(){
        return(
            <View  style={styles.itemp}>
                <Image 
                    style={{width: 200, height: 210, marginTop : 20}}
                    source={require('../../images/5.png')}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder='Code ID'
                    onChangeText={(cashID) => this.setState({cashID})}
                    value={this.state.cashID}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder='xxxxxxxxxx'
                    onChangeText={(Ccode) => this.setState({Ccode})}
                    value={this.state.Ccode}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={this.onSubmit}
                >
                    <Text style={styles.buttonText}>ยืนยัน</Text>
                </TouchableOpacity>
            </View>
        );
    }
}export default PrepaidForm
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
    button: {
        marginVertical : 25,
        backgroundColor : '#E75D3F',
        borderRadius : 30,
        width : 220,
        height : 50,
        alignItems : 'center',
        justifyContent : 'center'
    },
    textInput: {
        height : 42 ,
        width : 300,
        backgroundColor : '#F8F8FF',
        borderRadius : 20,
        marginVertical : 3,
        paddingLeft : 15,
        fontSize : 17,
    },
    titlepf : {
        fontSize : 24,
        
    },
});