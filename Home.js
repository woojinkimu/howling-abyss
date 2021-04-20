import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Alert, Button, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import axios from 'axios';
import logo from './assets/lol-logo-4x.png';

const Home = (props) => {
  const nav = props.navigation;
  const API_KEY = "RGAPI-4ccee604-98df-4cdf-a1e9-c9a53717f30c";
  const [nick, setNick] = useState('');

  const handlePress = () => {
    axios.get(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${nick}?api_key=${API_KEY}`)
      .then(res => {
        let userData = res.data;
        // console.log(userData);
        axios.get(`https://kr.api.riotgames.com/lol/match/v4/matchlists/by-account/${userData.accountId}?queue=450&endIndex=20&api_key=${API_KEY}`)
          .then(res => {
            let matchListData = res.data.matches;
            let matchList = []; // api 로 받은 매치정보
            let myMatchData = []; // 가공한 정보
            let wins = 0;
            let loses = 0;
            // 내가 플레이한 정보
            matchListData.map((item) => {
              matchList.push({
                champ: item.champion,
                gameId: item.gameId,
                timestamp: item.timestamp,
              });
            });

            for (let i = 0; i < matchList.length; i++) {
              let gameId = matchList[i].gameId;
              axios.get(`https://kr.api.riotgames.com/lol/match/v4/matches/${gameId}?api_key=${API_KEY}`)
              .then(res => {
                // console.log(res.data);
                let matchData = res.data;
                let partData = matchData.participants;
                let identitiesData = matchData.participantIdentities;
                let winTeam = [];
                let loseTeam = [];
                let teamObj = {}

                for (let j = 0; j < identitiesData.length; j++) {
                  let part = partData[j];
                  let identity = identitiesData[j];
                  let obj = {
                    teamId: part.teamId,
                    championId: part.championId,
                    participantId: part.participantId,
                    win: part.stats.win,
                    kills: part.stats.kills,
                    deaths: part.stats.deaths,
                    assists: part.stats.assists,
                    summonerName: identity.player.summonerName
                  };
                  if(true === part.stats.win){
                    winTeam.push(obj);
                  }else{
                    loseTeam.push(obj);
                  };
                  if (nick === identity.player.summonerName) {
                    true === part.stats.win ? wins++ : loses++;
                    teamObj['player'] = {
                      championId: part.championId,
                      win: part.stats.win,
                      kills: part.stats.kills,
                      deaths: part.stats.deaths,
                      assists: part.stats.assists,
                      items: [
                        part.stats.item0,
                        part.stats.item1,
                        part.stats.item2,
                        part.stats.item3,
                        part.stats.item4,
                        part.stats.item5,
                      ],
                      perkPrimaryStyle: part.stats.perkPrimaryStyle,
                      perkSubStyle: part.stats.perkSubStyle,
                    };
                    console.log(part.stats);
                  }
                };

                teamObj['winTeam'] = winTeam;
                teamObj['loseTeam'] = loseTeam;;

                myMatchData.push(teamObj);

                // [
                // "player": {
                //   championId: part.championId,
                //   win: part.stats.win,
                //   kills: part.stats.kills,
                //   deaths: part.stats.deaths,
                //   assists: part.stats.assists
                // },
                //   {"lose": Array [
                //     Object {
                //       "assists": 30,
                //       "championId": 20,
                //       "deaths": 16,
                //       "kills": 17,
                //       "participantId": 1,
                //       "summonerName": "HADO",
                //       "teamId": 100,
                //       "win": false,
                //     },
                //     Object {},
                //     Object {},
                //     Object {},
                //     Object {},
                //   ],
                //   "win": Array [
                //     Object {},
                //     Object {},
                //     Object {},
                //     Object {},
                //     Object {},
                //   ],
                // }, {}, {}, {}, {}]
                nav.navigate("Dashboard", {
                  nick: userData.name,
                  level: userData.summonerLevel,
                  icon: userData.profileIconId,
                  puuid: userData.puuid,
                  accountId: userData.accountId,
                  apiKey: API_KEY,
                  myMatchData: myMatchData,
                  wins: wins,
                  loses: loses,
                });
              })
              .catch(res => { if ('undefined' === typeof res.data || res.data.status >= 400) { Alert.alert('매치 데이터2 에러' + res); console.log(res); } });
            };
          })
          .catch(res => { if ('undefined' === typeof res.data || res.data.status >= 400) { Alert.alert('매치 데이터1 에러' + res); console.log(res); } });
      })
      .catch(res => {if('undefined' === typeof res.data || res.data.status >= 400) {Alert.alert('해당아이디 데이터가 없습니다.'+res); console.log(res);}});
  }
  
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={{ ...styles.halfView }}>
        <View style={styles.logoView}>
          <Image source={logo} style={styles.logo} />
        </View>
        <TextInput style={styles.input} placeholder="소환사명" autoFocus={true} onChangeText={(text) => { setNick(text) }} />
        <View style={styles.buttonView}>
          <Button
            style={styles.button}
            styleDisabled={{ color: 'red' }}
            onPress={() => (nick !== '' && nick.replace(/(\s*)/g, "") !== '' ) ? handlePress() : Alert.alert('소환사명을 입력해주세요.')}
            title="GO" type="outline"
          />
        </View>
      </View>
      <View style={{ ...styles.halfView }}>
        <Text>* 칼바람 나락 전용 앱입니다.</Text>
      </View>
      <View style={styles.footer}>
        <Text style={{color: '#cacaca'}}>Produced by 말라골드</Text>
      </View>
    </View>
  );
}

export default Home;

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