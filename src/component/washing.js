import React, { Component } from 'react';
import { 
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
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
    statusck(){
        Actions.status();
    }

    render() {
        return(
            <View style={styles.container}>
                 <Image 
                    style={{width: 100, height: 100}}
                    source={require('../images/LoginLogo.png')}
                />
    {/* Profile*/}
                <TouchableOpacity
                    style={styles.button}
                    onPress={this.profile}
                >
                     <Image 
                        style={{width: 250, height: 85}}
                        source={require('../images/profile.png')}
                    />
                </TouchableOpacity>
    {/* Cash*/}    
                <TouchableOpacity
                    style = {styles.button}
                    onPress={this.cash}
                >
                     <Image 
                        style={{width: 250, height: 85}}
                        source={require('../images/cash.png')}
                    />  
                </TouchableOpacity>
    {/* status*/}    
    <TouchableOpacity
                    style = {styles.button}
                    onPress={this.statusck}
                >
                     <Image 
                        style={{width: 250, height: 85}}
                        source={require('../images/status.png')}
                    />   
                </TouchableOpacity>
    {/* Pay*/} 
                <TouchableOpacity
                    style = {styles.button}
                     onPress={this.pay}
                >
                     <Image 
                        style={{width: 250, height: 85}}
                        source={require('../images/pay.png')}
                    />  
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
        backgroundColor : '#44372E' ,
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
        marginVertical : 3,
        borderRadius : 30,
        alignItems : 'center',
        justifyContent : 'center'
    },
    title: {
        fontSize: 24,
        //fontWeight: 'bold',
        color : '#F5FFFA',
    },
});
