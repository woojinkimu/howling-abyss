import React, { useEffect, useState } from 'react';
import { StatusBar, Text, View, StyleSheet, Image, Alert, ScrollView } from 'react-native';
import axios from 'axios';
import ListItem from './components/dashboard/ListItem';

const Dashboard = ({ route }) => {
  const { nick, level, icon, puuid, accountId, apiKey, myMatchData, wins, loses } = route.params;
  const [champIcon, setChampIcon] = useState({});
  const [itemIcon, setItemIcon] = useState({});

  useEffect(() => {
    axios.get(`http://ddragon.leagueoflegends.com/cdn/6.24.1/data/ko_KR/champion.json?api_key=${apiKey}`)
      .then(res => {
        let data = res.data.data;
        // console.log(data);
        let obj = {};
        let keys = Object.keys(data);
        Object.keys(data).map((item, idx) => {
          obj[data[keys[idx]].key] = data[keys[idx]].id;
          // console.log(item);
        });
        setChampIcon(obj);
        // console.log(obj);
      })
      .catch(res => { if ('undefined' === typeof res.data || res.data.status >= 400) { Alert.alert('챔프 아이콘 데이터 에러' + res); console.log('챔프 아이콘 데이터 에러' + res); } });

    axios.get(`http://ddragon.leagueoflegends.com/cdn/11.8.1/data/ko_KR/item.json?api_key=${apiKey}`)
      .then(res => {
        let data = res.data.data;
        // console.log(data);
        let obj = {};
        let keys = Object.keys(data);
        Object.keys(data).map((item, idx) => {
          obj[keys[idx]] = data[keys[idx]].image.full;
          // console.log(item);
        });
        setItemIcon(obj);
        // console.log(obj);
      })
      .catch(res => { if ('undefined' === typeof res.data || res.data.status >= 400) { Alert.alert('챔프 아이콘 데이터 에러' + res); console.log('챔프 아이콘 데이터 에러' + res); } });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.profile}>
        <View style={styles.iconView}>
          <Image style={styles.icon} source={{ uri: `http://ddragon.leagueoflegends.com/cdn/11.8.1/img/profileicon/${icon}.png` }} resizeMode="contain" />
        </View>
        <View style={styles.profileInfo}>
          <View style={{ flexDirection: 'row', marginBottom: '10%' }}>
            <Text style={{ marginRight: '10%' }}>Lv. {level}</Text>
            <Text>{nick}</Text>
          </View>
          <View>
            <Text>{wins} 승 {loses} 패 승률 {Math.round((wins / (wins + loses)) * 100)}%</Text>
          </View>
        </View>
      </View>
      <View style={styles.goodChamp}>
        <View>
          <Text>최근 좋은 승률 </Text><Text> 챔피언</Text>
        </View>
        <View style={{...styles.iconView, ...styles.noMargin}}>
          <Image style={styles.icon} source={{ uri: `http://ddragon.leagueoflegends.com/cdn/11.8.1/img/profileicon/${icon}.png` }} resizeMode="contain" />
          <Text style={{textAlign: 'center'}}>nn%</Text>
        </View>
        <View style={{...styles.iconView, ...styles.noMargin}}>
          <Image style={styles.icon} source={{ uri: `http://ddragon.leagueoflegends.com/cdn/11.8.1/img/profileicon/${icon}.png` }} resizeMode="contain" />
          <Text style={{textAlign: 'center'}}>nn%</Text>
        </View>
        <View style={{...styles.iconView, ...styles.noMargin}}>
          <Image style={styles.icon} source={{ uri: `http://ddragon.leagueoflegends.com/cdn/11.8.1/img/profileicon/${icon}.png` }} resizeMode="contain" />
          <Text style={{textAlign: 'center'}}>nn%</Text>
        </View>
      </View>
      <View style={styles.matchList}>
        {
          myMatchData.map((item) => {
            // console.log(item);
            return <ListItem item={item} champIcon={champIcon} itemIcon={itemIcon} />
          })
        }
      </View>
    </ScrollView>
  );
}

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '5%',
    paddingTop: 0,
    backgroundColor: '#fff',
  },
  profile: {
    flex: 0.2,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#cecece'
  },
  icon: {
    flex: 1,
    borderRadius: 10
  },
  iconView: {
    width: 80,
    height: 100,
    marginRight: '10%',
  },
  goodChamp: {
    flex: 0.2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '5%',
    paddingBottom: '5%',
    borderBottomWidth: 1,
    borderBottomColor: '#cecece'
  },
  noMargin: {
    marginRight: '0%'
  }
});