import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Alert, Button, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import axios from 'axios';
import logo from './assets/lol-logo-4x.png';

const API_KEY = "RGAPI-572a0939-2c98-4c1d-91f0-859c7aab6b3e";

export default class extends React.Component {
  state = {
    nick: ''
  }

  handlePress = () => {
    let name = '';
    axios.get(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${this.state.nick}?api_key=${API_KEY}`)
      .then(res => {name = res.data.name; Alert.alert(res.data.name+' lv.'+res.data.summonerLevel);})
      .catch(Alert.alert('해당아이디 데이터가 없습니다.'));
  }

  render() {
    const { nick } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={{ ...styles.halfView }}>
          <View style={styles.logoView}>
            <Image source={logo} style={styles.logo} />
          </View>
          <TextInput style={styles.input} placeholder="소환사명" autoFocus={true} onChangeText={(text) => { this.setState({ nick: text }) }} />
          <View style={styles.buttonView}>
            <Button
              style={styles.button}
              styleDisabled={{ color: 'red' }}
              onPress={() => (nick !== '' && nick.replace(/(\s*)/g, "") !== '' ) ? this.handlePress() : Alert.alert('소환사명을 입력해주세요.')}
              title="GO" type="outline"
            />
          </View>
        </View>
        <View style={{ ...styles.halfView }}>
          <Text>* 칼바람 나락 전용 앱입니다.</Text>
          <Text>* 칼바람 나락 전용 앱입니다.</Text>
          <Text>* 칼바람 나락 전용 앱입니다.</Text>
        </View>
        <View style={styles.footer}>
          <Text style={{color: '#cacaca'}}>Produced by 말라골드</Text>
        </View>
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
    paddingTop: 100,
  },
  halfView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoView: {
    width: 200,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50
  },
  logo: {
    flex: 1,
    resizeMode: 'contain'
  },
  input: {
    width: 300,
    fontSize: 20,
    lineHeight: 50,
    padding: 10,
    borderWidth: 1,
    borderColor: '#cecece',
    marginBottom: 15
  },
  buttonView: {
    width: 300,
  },
  button: {},
  footer: {
    paddingVertical: 20,
    
  }
});
