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
import { Avatar } from 'react-native-elements';

import imageLogo from './assets/bekologo.png';
import visitIcon from './assets/visit.png';
import opportunityIcon from './assets/opportunity.png';
import incomeIcon from './assets/income.png';

import {
  Card, CardItem, Thumbnail, Content,
  Container, Header, Left, Body, Right, Icon, Title, Form, Item, Input, Label, Button as Button2, Text as Text2, Footer, Separator
} from 'native-base';

import DisplayModal from './Comment';

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
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows(dataS)
    };
  }

  eventClickListener = (viewId) => {
    this.props.navigation.navigate('Details', { itemId: viewId });
  }

  render() {
    return (
      <View style={styles.container}>
        <Button title="Go Back" onPress={() => this.props.navigation.goBack()} />
        <ListView enableEmptySections={true}
          style={styles.eventList}
          dataSource={this.state.dataSource}
          renderRow={(event) => {
            return this.RenderRow(event)
          }} />
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
    return (
      <TouchableOpacity onPress={() => this.eventClickListener(event.id)}>
        <View style={styles.eventBox}>
          <View style={styles.eventDate}>
            <Text style={styles.eventDay}>{event.day}</Text>
            <Text style={styles.eventMonth}>{event.month}</Text>
          </View>
          <View style={styles.eventContent}>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              <Avatar rounded title={event.customer.charAt(0)} />
              <Text style={styles.eventCustomer}>{event.customer}</Text>
            </View>
            <Text style={styles.eventTime}>{event.timeStart}am - {event.timeEnd} am</Text>
          </View>
        </View>
      </TouchableOpacity>);
  }
}




class DetailsScreen extends React.Component {
  state = {
    display: false,
  }
  toggleModal(visible) {
    this.setState({ display: visible });
  }
  render() {
    const { navigation } = this.props;
    var inNo = this.props.navigation.state.params.itemId;
    let url = dataS.find(obj => obj.id === inNo);
    return (
      <View style={{ flex: 1, borderRadius: 15 }}>
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
        <View style={styles.container1}>
          <View style={styles.visitDetailHeader}>
            <Text style={styles.bold}>
              {url.customer}
            </Text>
            <Text style={styles.bold}>
              {url.day + ' ' + url.month} {url.timeStart + '-' + url.timeEnd}
            </Text>
            <Text style={{ textAlign: "center" }}>
              {url.email}
            </Text>
          </View>
          <View style={styles.welcome}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', }}>
              <Text style={styles.bold}>
                Visit Notes
              </Text>
              <Button
                onPress={() => this.toggleModal(true)}
                title="Edit"
              >
              </Button>

              <DisplayModal
                data={url.id}
                display={this.state.display}
                closeDisplay={() => this.setState({ display: false })}
              />
            </View>
            <View style={{ flex: 1, flexWrap: 'wrap', marginTop: -50 }}>
              <Text>
                {global.SessionVar}
              </Text>
            </View>

          </View>
          <View style={styles.welcome}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', }}>
              <Text style={styles.bold}>
                Documents
            </Text>
            </View>
            <Text style={{ color: 'blue', margin: 5 }}
            // onPress={() => Linking.openURL('http://google.com')}
            >
              HowtoW129BEKO.pdf
            </Text>
            <Text style={{ color: 'blue', margin: 5 }}
            // onPress={() => Linking.openURL('http://google.com')}
            >
              EnergyW129BEKO.pdf
            </Text>
            <Text style={{ color: 'blue', margin: 5 }}
            // onPress={() => Linking.openURL('http://google.com')}
            >
              BarcodeW129BEKO.pdf
            </Text>
          </View>
          <View style={styles.welcome} >
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.bold}>
                Images
            </Text>
            </View>
            <View style={styles.images}>
              <Image
                style={{ width: 50, height: 50, marginRight: 10 }}
                source={{ uri: 'https://pazarlamasyon.com/wp-content/uploads/2018/08/DSC_8790.jpg' }}
              />
              <Image
                style={{ width: 50, height: 50, marginRight: 10 }}
                source={{ uri: 'https://www.schwitzke.com/sites/default/files/styles/projekt_bild/public/upload/_partner/Projekte/Media_Markt/schwitzke_media_markt_future-stores_retail-concept_design-concept_experience_architecture_0.jpg?itok=lA--yuDN' }}
              />
              <Image
                style={{ width: 50, height: 50, marginRight: 10 }}
                source={{ uri: 'https://www.beko-hausgeraete.de/shopware/media/image/bc/c4/e6/WMY91464ST_front-NUREG_1280x1280.png' }}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }

}

class LoginScreen extends React.Component {
  handleLoginPress = () => {
    console.log("Login button pressed"); this.props.navigation.navigate('Dashboard');
  };
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <Container style={styles.containerLogin}>
        <Image source={imageLogo} style={styles.logo} />
        <Form style={styles.form}>
          <Item rounded style={styles.textInput}>
            <Input placeholder='User name' returnKeyType='next' />
          </Item>
          <Item rounded style={styles.textInput}>
            <Input placeholder='Password' returnKeyType='done' secureTextEntry />
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


class DashboardScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: 'column2d',
      width: '100%',
      height: '100%',
      dataFormat: 'json',
      dataSource: {
        "chart": {
          "caption": "Harry's SuperMart",
          "subCaption": "Top 5 stores in last month by revenue",
          "numberprefix": "$",
          "theme": "fint"
        },
        "data": [
          {
            "label": "Bakersfield Central",
            "value": "880000"
          },
          {
            "label": "Garden Groove harbour",
            "value": "730000"
          },
          {
            "label": "Los Angeles Topanga",
            "value": "590000"
          },
          {
            "label": "Compton-Rancho Dom",
            "value": "520000"
          },
          {
            "label": "Daly City Serramonte",
            "value": "330000"
          }
        ]
      }
    };

    this.libraryPath = './assets/fusioncharts.html';
  }
  eventClickListener = (viewId) => {
    this.props.navigation.navigate('Home', { itemId: viewId });
  }
  render() {
    return (
      <Container>
        <Header />
        <Content style={styles.cardStyle}>
          <Card>
          <TouchableOpacity onPress={() => this.eventClickListener(5)}>
            <CardItem>
              <Body style={styles.levo}>
                <Thumbnail style={styles.levo} source={visitIcon} />
                <Text2 style={styles.levo}>Total Visits</Text2>
                <Text2 style={styles.levo}>15</Text2>
              </Body>
            </CardItem>
            </TouchableOpacity>
            <CardItem>
              <Body
                style={{
                  borderBottomColor: '#ccc',
                  borderBottomWidth: 1,
                }}
              >
              </Body>
            </CardItem>
            <CardItem style={styles.cardItemPadding}>
              <Left>
                <Text>Completed Plans</Text>
              </Left>
              <Right>
                <Text>6</Text>
              </Right>
            </CardItem>
            <CardItem style={styles.cardItemPadding}>
              <Left>
                <Text>Incompleted Plans</Text>
              </Left>
              <Right>
                <Text>9</Text>
              </Right>
            </CardItem>
            <CardItem style={styles.cardItemPaddingLast}>
              <Left>
                <Text>Average Visits Per Day</Text>
              </Left>
              <Right>
                <Text>2</Text>
              </Right>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Body style={styles.levo}>
                <Thumbnail style={styles.levo} source={opportunityIcon} />
                <Text2 style={styles.levo}>Total Opportunity</Text2>
                <Text2 style={styles.levo}>$ 1.500.000</Text2>
              </Body>
            </CardItem>
            <CardItem>
              <Body
                style={{
                  borderBottomColor: '#ccc',
                  borderBottomWidth: 1,
                }}
              >
              </Body>
            </CardItem>
            <CardItem style={styles.cardItemPadding}>
              <Left>
                <Text>Total Number of Clients</Text>
              </Left>
              <Right>
                <Text>85</Text>
              </Right>
            </CardItem>
            <CardItem style={styles.cardItemPadding}>
              <Left>
                <Text>Active Clients</Text>
              </Left>
              <Right>
                <Text>$ 500.000</Text>
              </Right>
            </CardItem>
            <CardItem style={styles.cardItemPaddingLast}>
              <Left>
                <Text>Potential Clients</Text>
              </Left>
              <Right>
                <Text>$ 1.000.000</Text>
              </Right>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Body style={styles.levo}>
                <Thumbnail style={styles.levo} source={incomeIcon} />
                <Text2 style={styles.levo}>Total Net Sales</Text2>
                <Text2 style={styles.levo}>$ 800.000</Text2>
              </Body>
            </CardItem>
            <CardItem>
              <Body
                style={{
                  borderBottomColor: '#ccc',
                  borderBottomWidth: 1,
                }}
              >
              </Body>
            </CardItem>
            <CardItem style={styles.cardItemPadding}>
              <Left>
                <Text>Total Number of Orders</Text>
              </Left>
              <Right>
                <Text>200</Text>
              </Right>
            </CardItem>
            <CardItem style={styles.cardItemPadding}>
              <Left>
                <Text>Price Per Order</Text>
              </Left>
              <Right>
                <Text>$ 400</Text>
              </Right>
            </CardItem>
            <CardItem style={styles.cardItemPaddingLast}>
              <Left>
                <Text>Number of Unique Products</Text>
              </Left>
              <Right>
                <Text>12</Text>
              </Right>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Login: LoginScreen,
    Home: HomeScreen,
    Dashboard: DashboardScreen,
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
      headerLeft: (
        <LogoTitle />
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
  constructor() {
    super();
    global.SessionVar = 'Attach any file type you like – Zurili even has special handling for jpg, png, pdf and dicom giving you instant preview of these file types, no matter how large the original. They are easily and instantly.';
  }

  render() {
    return <AppContainer />;
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f2f4f5",
  },
  eventList: {
    marginTop: 20,
  },
  eventBox: {
    padding: 10,
    marginTop: 5,
    marginBottom: 5,
    flexDirection: 'row',
  },
  eventDate: {
    flexDirection: 'column',
  },
  eventDay: {
    fontSize: 50,
    color: "#0099FF",
    fontWeight: "600",
  },
  eventTime: {
    marginTop: 5
  },
  eventMonth: {
    fontSize: 16,
    color: "#0099FF",
    fontWeight: "600",
  },
  eventContent: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: 10,
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 10
  },
  description: {
    fontSize: 15,
    color: "#646464",
  },
  eventCustomer: {
    fontSize: 18,
    color: "#151515",
    marginTop: 5,
  },
  userName: {
    fontSize: 16,
    color: "#151515",
  },
  cardBodyText: {
    marginLeft: -12,
  },
  levo: {
    alignSelf: "center"
  },
  cardStyle: {
    padding: 10
  },
  cardItemPadding: {
    paddingBottom: 2,
    paddingTop: 2,
    fontSize: 7
  },
  cardItemPaddingLast: {
    paddingBottom: 20,
    paddingTop: 2
  },
  heading: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10
  },
  chartContainer: {
    height: 200
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
    marginTop: 100
  },
  form: {
    flex: 6,
    justifyContent: "center",
    width: "80%"
  },
  background: {
    backgroundColor: '#8da2a8',
  },
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  container1: {
    flex: 1,
    marginTop: 10,
    backgroundColor: '#f2f4f5',
  },
  welcome: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 10,
    textAlign: 'center',
    fontSize: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderWidth: 2,
    borderColor: 'white',
  },
  visitNotes: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#d1dcf0',
    margin: 10,
    textAlign: 'center',
    fontSize: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  images: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    margin: 10,
    marginTop: 0,
  },
  visitDetailHeader: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 10,
    textAlign: 'center',
    fontSize: 20,
    paddingTop: 30,
    borderWidth: 2,
    borderColor: 'white',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  bold: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: "center",
  },
  textInput: {
    height: 40,
    borderColor: '#BEBEBE',
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    marginBottom: 20
  }
});