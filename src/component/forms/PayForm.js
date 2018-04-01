import React,{ Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    StatusBar,
    Alert,
    Image,
    } from 'react-native';
import { BarCodeScanner, Permissions, Notifications, Constants } from 'expo';
import { Actions } from 'react-native-router-flux';
import Firebase from 'firebase';
import moment from 'moment';
export default class PayForm extends React.Component {
    constructor(props) {
        super(props);
        userId = Firebase.auth().currentUser.uid;
        this.QRMC_1 = Firebase.database().ref().child('Machine/MC_1');
        this.QRMC_2 = Firebase.database().ref().child('Machine/MC_2');
        this.state = {
            MC_1 : null,
            MC_2 : null,
            hasCameraPermission: null,
            statusbar : 'Please Scan QR code',
        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.after_scanned = this.after_scanned.bind(this);
        this.washing = this.washing.bind(this);
    };

    async componentDidMount(){
        let result = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        this.QRMC_1.on('value',snap =>{
            this.setState({
                MC_1 : snap.val()
            });
        });
        this.QRMC_2.on('value',snap =>{
            this.setState({
                MC_2 : snap.val()
            });
        });
        if (Constants.isDevice && result.status === 'granted') {
            console.log('Notification permissions granted.')
          }
      
          Notifications.addListener(this._handleNotification);
        }
      
        // Private methods
      
        _handleNotification = ({ origin, data }) => {
          console.info(`Notification (${origin}) with data: ${JSON.stringify(data)}`)
    }
    
    
    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({hasCameraPermission: status === 'granted'});
    }
    after_scanned() {
        if(this.state.statusbar != 'Please Scan QR code'){
            if(this.state.statusbar == this.state.MC_1) {
                Alert.alert(
                    'Are you sure ?',
                    'You want to wash "' + this.state.MC_1 + ' " ?',
                    [
                        {text: 'OK', onPress: ()=> this.washing()},
                        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    ],
                    { cancelable: false }
                )
            }
            else if(this.state.statusbar == this.state.MC_2) {
                Alert.alert(
                    'Are you sure ?',
                    'You want to wash "' + this.state.MC_2 + ' " ?',
                    [
                        {text: 'OK', onPress: () => this.washing()},
                        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    ],
                    { cancelable: false }
                )
            }
            else {
                alert('QR code does not match database in system or have used this service.');
            }
        }
        else {
            alert('You have not scanned the QR Code.');
        }
        
    }

    washing() {
        if(this.state.statusbar == this.state.MC_1) {
            Firebase.database().ref('Customer/'+userId).update({
                Machine : 'MC_1_ON',
            });
            Firebase.database().ref('Machine').update({
                MC_1 : 'Running',
            });
        }
        else if(this.state.statusbar == this.state.MC_2) {
            Firebase.database().ref('Customer/'+userId).update({
                 Machine : 'MC_2_ON',
            });
            Firebase.database().ref('Machine').update({
                MC_2 : 'Running',
            });
        }
        const localNotification = {
            title: 'Wash Wear',
            body: 'Waching Complete',
            data: { type: 'delayed' },
            vibrate: [ 1, 500 ],
            android: {
              sound: true
            }
          }
          const schedulingOptions = {
            time: (new Date()).getTime() + 5000
          }
      
          console.log('Scheduling delayed notification:', { localNotification, schedulingOptions })
      
          Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions)
            .then(id => console.info(`Delayed notification scheduled (${id}) at ${moment(schedulingOptions.time).format()}`))
            .catch(err => console.error(err))
        Actions.reset("main");
    }
    
    render() {
        const { hasCameraPermission } = this.state;
    
        if (hasCameraPermission === null) {
            return <Text style={styles.container}>Requesting for camera permission</Text>;
        } else if (hasCameraPermission === false) {
            return <Text style={styles.container}>No access to camera</Text>;
        } else {
            return (
            <View style={styles.container}>
                {/* <StatusBar hidden/> */}
                <Image 
                    style={{width: 250, height: 85}}
                    source={require('../../images/4.png')}
                />
                <BarCodeScanner
                    onBarCodeRead={this._handleBarCodeRead}
                    type={'back'}
                    style={{width : '90%' , height : '60%'}}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.after_scanned()}
                >
                    <Text style={styles.buttonText}>{this.state.statusbar}</Text>   
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => Actions.pop()}
                >
                    <Text style={styles.title}>Cancel</Text>
                </TouchableOpacity>
            </View>
            );
        }
    }
    
    _handleBarCodeRead = ({ type, data }) => {
        this.setState({ statusbar: data })
        
        
    }
} 

const styles = StyleSheet.create({
    container: {
        marginTop : 40,
        backgroundColor : '#F26C4F' ,
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
        fontSize : 18,
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
        color : '#660000',
        fontSize : 14
    }
  });