import React,{ Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    } from 'react-native';
//import { SocialIcon } from 'react-native-elements';
import Validator from 'validator';
import { Actions } from 'react-native-router-flux';
import Firebase from 'firebase';


class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: 'dota2@gmail.com' ,
            password: '123456789',
            errors: {
                email: '',
                password: '',
            },
        };
        this.checkEmail = this.checkEmail.bind(this);
        this.checkPassword = this.checkPassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }
   
    register() {
        Actions.register();
    }
    onSubmit() {
        const { email ,password } = this.state;
        //Login Firebase
        Firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => { 
                this.setState({ error: ''}); 
                Actions.main();
            })
            .catch(() => {
                alert("Email or Password are invalid. \n Please re-enter");
            });
    }
    checkEmail(){
        if(!Validator.isEmail(this.state.email)) {
            this.setState({ errors: {...this.state.errors, email: 'Not email format' } });
        }
        else { 
            this.setState({ errors: {...this.state.errors, email: '' } });
        }
    }
    checkPassword(){
        if (this.state.password.length < 7 ) {
            this.setState({ errors: {...this.state.errors, password: 'More than 8 charactor' } });
        } 
        else {
            this.setState({ errors: {...this.state.errors, password: '' } });
        }
    //console.log(this.state);
    }

    render() {
        return(
            <View style={styles.container}>
                <View style={{alignItems : 'center',justifyContent: 'center'}}> 
                    <Text style={styles.title}>
                        QR Washing
                    </Text>
                    <Text style={{marginVertical : 15, color:'#778899'}}>
                        Welcome to QR Code Washing
                    </Text>
                </View>
                {/* <SocialIcon  */}
                    {/* title='Sign In With Facebook'  */}
                    {/* button type='facebook' */}
                    {/* onPress={this.loginWithFacebook} */}
                {/* /> */}
                <TextInput
                    style={styles.textInput}
                    placeholder='Admin@email.com'
                    onChangeText={(email) => this.setState({email: email.toLowerCase()})}
                    value={this.state.email}
                    onBlur = {this.checkEmail}
                />
                <Text style={styles.alertText}>{this.state.errors.email}</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder='Password'
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                    onKeyPress={this.checkPassword}
                />
                <Text style={styles.alertText}>{this.state.errors.password}</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={this.onSubmit}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <View style={{alignItems : 'center'}}>
                    <Text style={{color:'#778899',marginVertical : 15}}>
                        Don't have an account yet?
                    </Text>
                    <TouchableOpacity
                        onPress={this.register}
                    >
                        <Text style={{color:'#FFFFFF'}}>
                            Register
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
export default LoginForm;

const styles = StyleSheet.create({
    container: {
        marginTop : 20,
        backgroundColor : '#3abeea' ,
        justifyContent : 'center', 
        alignItems : 'center',
        flex : 1,
    },
    title: {
        fontSize: 28,
        //fontWeight: 'bold',
        color : '#F5FFFA',
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
    buttonText: {
        fontSize : 22,
        fontWeight : '500',
        color : 'white',
        padding : 10,
    },
    button: {
        marginVertical : 25,
        backgroundColor : '#4682B4',
        borderRadius : 30,
        width : 220,
        height : 50,
        alignItems : 'center',
        justifyContent : 'center'
    },
    alertText: {
        color : 'red',
        fontSize : 14
    }
  });