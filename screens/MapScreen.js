import React from 'react';
import { StyleSheet, View, Button } from 'react-native';

import FetchLocation from '../components/FetchLocation';
import UsersMap from '../components/UsersMap';

class MapScreen extends React.Component {

  state = {
    userLocation: null,
    usersPlaces: []
  }

  getUserLocationHandler = () => {
    navigator.geolocation.getCurrentPosition(
        position => {
          this.setState({
            userLocation: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.0622,
              longitudeDelta: 0.0421
            }
          });
          fetch('https://share-places-1558986167480.firebaseio.com/places.json', {
            method: 'POST',
            body: JSON.stringify({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            })
          })
          .then(res => console.log(res))
          .catch(err => console.log(err));
        },
        err => {
          console.log(err);
        }  
      );
  }

  getUserPlacesHandler = () => {
    fetch('https://share-places-1558986167480.firebaseio.com/places.json')
          .then(res => res.json())
          .then(parsedResp => {
            const placesArray = [];
            for (const key in parsedResp){
              placesArray.push({
                latitude: parsedResp[key].latitude,
                longitude: parsedResp[key].longitude,
                id: key
              });
            }
            this.setState({
              usersPlaces: placesArray
            });
          })
          .catch(err => console.log(err));
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{marginBottom: 20}}>
          <Button title='Get user places' onPress={this.getUserPlacesHandler}/>
        </View>
        <FetchLocation onGetLocation={this.getUserLocationHandler} />
        <UsersMap userLocation={this.state.userLocation} usersPlaces={this.state.usersPlaces}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MapScreen;