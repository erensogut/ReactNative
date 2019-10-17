import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Alert,
  Image,
  ListView,
  TouchableOpacity
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import dataS from './CustomerList';
import  { Avatar } from 'react-native-elements';

import imageLogo from './assets/bekologo.png';

import {
  Container, Header, Left, Body, Right, Icon, Title , Form, Item, Input, Label ,Button as Button2, Text as Text2
} from 'native-base'

class LogoTitle extends React.Component {
  render() {
    return (
      <Image
        source={require('./logo.png')}
        style={{ width: 60, height: 40 }}
      />
      
    );
  }
}

class HomeScreen extends React.Component {
  
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows( dataS) 
     };
   }
   
    eventClickListener = (viewId)=>{ 
      this.props.navigation.navigate('Details',{itemId : viewId});
    }

  render() {
    return (
        <View style={styles.container}>
          <ListView enableEmptySections={true}
            style={styles.eventList}
            dataSource={this.state.dataSource}
            renderRow={(event) => {
              return this.RenderRow(event)
            }}/>
        </View>
    
      // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      //   <Text>Home Screen</Text>
      //   <Button
      //     title="Go to Details"
      //     onPress={() => this.props.navigation.navigate('Details')}
      //   /> 
      // </View>
    );
  }

  RenderRow(event) {
    return (<TouchableOpacity onPress={() => this.eventClickListener(event.id)}>
      <View style={styles.eventBox}>
        <View style={styles.eventDate}>
          <Text style={styles.eventDay}>{event.day}</Text>
          <Text style={styles.eventMonth}>{event.month}</Text>
        </View>
        <View style={styles.eventContent}>
        <View style={{flexDirection:'row', flexWrap:'wrap'}}>
          <Avatar rounded title={event.customer.charAt(0)}/>
          <Text style={styles.eventCustomer}>{event.customer}</Text>       
        </View> 
        <Text style={styles.eventTime}>{event.timeStart}am - {event.timeEnd} am</Text>
        </View>
      </View>
    </TouchableOpacity>);
  }
}


class DetailsScreen extends React.Component {
  render() {
    const { navigation } = this.props;
    var inNo = this.props.navigation.state.params.itemId;
    let url = dataS.find(obj => obj.id === inNo);
    return (
      
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
        <Text>Details Screen</Text>
        <Text>
          Customer = {url.customer};         
        </Text>
        <Text>
          E-mail = {url.email};
        </Text>
        <Text>
          Visit Date = {url.day + url.month};
        </Text>
      </View>
    );
  }
}

class LoginScreen extends React.Component{

  handleLoginPress = () => {
    console.log("Login button pressed"); this.props.navigation.navigate('Home');
  };
  static navigationOptions = {
    header: null
};
  render(){
    return(
    <Container style={styles.containerLogin}>
        <Image source={imageLogo} style={styles.logo}/>
        <Form style={styles.form}>
        <Item rounded style={styles.textInput}>
            <Input placeholder='User name' returnKeyType='next'/>
          </Item>
          <Item rounded style={styles.textInput}>
            <Input placeholder='Password' returnKeyType='done' secureTextEntry/>
          </Item>
          <Button
          title="Log In"
          onPress={this.handleLoginPress}
        />
          </Form>
         
      </Container>
    );
  }
}


const RootStack = createStackNavigator(
  {
    Login : LoginScreen,
    Home: HomeScreen,
    Details: DetailsScreen,
  },
  {
    initialRouteName: 'Login',
  
  defaultNavigationOptions:
    {
      headerStyle: {
        backgroundColor: '#a5a0a0',
        headerTintColor: '#fff',
      },
      headerLeft:(
        <LogoTitle/>
      ),
      headerRight: (
        <Button
          //onPress={() => alert('This is a button!')}
          title="Mehmet Eren Sögüt"
        />
      ),
    },
    
  },
  
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}


const styles = StyleSheet.create({
  container:{
    backgroundColor: "#DCDCDC",
  },
  eventList:{
    marginTop:20,
  },
  eventBox: {
    padding:10,
    marginTop:5,
    marginBottom:5,
    flexDirection: 'row',
  },
  eventDate:{
    flexDirection: 'column',
  },
  eventDay:{
    fontSize:50,
    color: "#0099FF",
    fontWeight: "600",
  },
  eventTime:{
    marginTop:5
  },
  eventMonth:{
    fontSize:16,
    color: "#0099FF",
    fontWeight: "600",
  },
  eventContent: {
    flex:1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft:10,
    backgroundColor: '#FFFFFF',
    padding:10,
    borderRadius:10
  },
  description:{
    fontSize:15,
    color: "#646464",
  },
  eventCustomer:{
    fontSize:18,
    color:"#151515",
    marginTop:5,
  },
  userName:{
    fontSize:16,
    color:"#151515",
  },
  containerLogin: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: "center",
    justifyContent: "space-between"
  },
  logo: {
    flex: 1,
    width: "30%",
    resizeMode: "contain",
    marginTop:100
  },
  form: {
    flex: 6,
    justifyContent: "center",
    width: "80%"
  },
  textInput: {
    height: 40,
    borderColor: '#BEBEBE',
    borderBottomWidth: 2,
    borderTopWidth:2,
    borderLeftWidth:2,
    borderRightWidth:2,
    borderTopLeftRadius:15,
    borderTopRightRadius:15,
    borderBottomLeftRadius:15,
    borderBottomRightRadius:15,
    marginBottom: 20
  }
});