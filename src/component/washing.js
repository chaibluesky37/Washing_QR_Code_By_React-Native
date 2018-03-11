import React, { Component } from 'react';
import { 
    Text,
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import Firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

class washing extends Component {
    profile(){
        Actions.profile();
    }
    cash(){
        Actions.cash();
    }
    signOutUser(){
        Firebase.auth().signOut();
        Actions.pop();
       
    }
    pay(){
        Actions.pay();
    }

    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.title}>
                    Welcome
                </Text>
    {/* Profile*/}
                <TouchableOpacity
                    style={styles.button}
                    onPress={this.profile}
                >
                     <Text style={styles.buttonText}>Profile</Text>  
                </TouchableOpacity>
    {/* Cash*/}    
                <TouchableOpacity
                    style = {styles.button}
                    onPress={this.cash}
                >
                     <Text style={styles.buttonText}>Cash</Text>  
                </TouchableOpacity>
    {/* Pay*/} 
                <TouchableOpacity
                    style = {styles.button}
                     onPress={this.pay}
                >
                     <Text style={styles.buttonText}>Pay</Text>  
                </TouchableOpacity>
    {/* Cash*/}    
                  <TouchableOpacity
                    style = {styles.button}
                    onPress={this.signOutUser}
                >
                     <Text style={styles.buttonText}>Logout</Text>  
                </TouchableOpacity>
            </View>
            
        );
    }



} export default washing

const styles = StyleSheet.create({
    container: {
        marginTop : 20,
        backgroundColor : '#3abeea' ,
        justifyContent : 'center', 
        alignItems : 'center',
        flex : 1,
    },
    buttonText: {
        fontSize : 20,
        fontWeight : '500',
        color : 'white',
        padding : 10,
    },
    button: {
        marginVertical : 25,
        backgroundColor : '#34eda6',
        borderRadius : 30,
        width : 220,
        height : 60,
        alignItems : 'center',
        justifyContent : 'center'
    },
    title: {
        fontSize: 24,
        //fontWeight: 'bold',
        color : '#F5FFFA',
    },
});
