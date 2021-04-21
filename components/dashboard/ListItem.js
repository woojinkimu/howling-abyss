import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Tooltip } from 'react-native-elements';
import SummonerItem from './SummonerItem';

const ListItem = ({ item, champIcon, itemIcon, runeData, timestamp }) => {
  const getDate = () => {
    const date = new Date(timestamp);
    return date.getFullYear() + '.' + (date.getMonth() + 1) + '.' + date.getDate();
  }

  const dynamicBgColor = (item) => {
    const isWin = item.player.win;
    if (isWin) {
      return {
        flex: 1,
        // height: 100,
        backgroundColor: '#98ddca',
        flexDirection: 'row',
        padding: '5%',
        borderBottomColor: '#cecece',
        borderBottomWidth: 1
      }
    } else {
      return {
        flex: 1,
        // height: 100,
        backgroundColor: '#ffaaa7',
        flexDirection: 'row',
        padding: '5%',
        borderBottomColor: '#cecece',
        borderBottomWidth: 1
      }
    }
  }

  return (
    <View style={dynamicBgColor(item)} key={item.player.championId + item.player.summonerName + item.player.kills}>
      {/* <Text>{getDate()}</Text> */}
      <View style={styles.iconContainer}>
        <View style={{flexDirection: 'row'}}>
          <View>
            <View styles={styles.iconView}>
              {
                ('undefined' === typeof champIcon[item.player.championId]) ?
                  <Image 
                    source={require('../../assets/images/no-user.png')}
                    style={styles.icon}
                    resizeMode="cover"
                  />
                :
                  <Image 
                    source={{ uri: `https://ddragon.leagueoflegends.com/cdn/10.6.1/img/champion/${champIcon[item.player.championId]}.png` }}
                    style={styles.icon}
                    resizeMode="cover"
                  />
              }
            </View>
          </View>
          <View>
            <View styles={styles.runeView}>
              <Image style={styles.runeIcon} source={{ uri: `https://ddragon.leagueoflegends.com/cdn/img/${runeData[item.player.perkPrimaryStyle]}` }} resizeMode="cover" />
            </View>
            <View styles={styles.runeView}>
              <Image style={styles.runeIcon} source={{ uri: `https://ddragon.leagueoflegends.com/cdn/img/${runeData[item.player.perkSubStyle]}` }} resizeMode="cover" />
            </View>
          </View>
        </View>
        <View style={styles.kda}>
          <Text style={{...styles.kdaText, ...styles.kill}}>{item.player.kills}</Text>
          <Text style={{ marginHorizontal: 5 }}>/</Text>
          <Text style={{...styles.kdaText, ...styles.asi}}>{item.player.deaths}</Text>
          <Text style={{ marginHorizontal: 5 }}>/</Text>
          <Text style={{...styles.kdaText, ...styles.death}}>{item.player.assists}</Text>
        </View>
        <View style={styles.itemList}>
          {
            item.player.items.map((items, idx) => {
              // console.log(items);
              let img = ('undefined' === typeof itemIcon[items]) ? null : itemIcon[items]['img'];
              let name = ('undefined' === typeof itemIcon[items]) ? null : itemIcon[items]['name'];
              let tooltip = ('undefined' === typeof itemIcon[items]) ? null : itemIcon[items]['tooltip'];
              return (idx <= 2) && <Tooltip
              popover={
                <View>
                  <Text style={{flex: 0.2}}>{name}</Text>
                  <Text style={{flex: 0.7}}>{tooltip}</Text>
                </View>
              }
              width={200}
              height={170}
              toggleOnPress={('undefined' === typeof itemIcon[items]) ? false : true}
              overlayColor='rgba(250, 250, 250, 0)'
              backgroundColor='#fff'
              key={item.player.championId + '' + item.player.summonerName + '' + item.player.kills + '' + item.player.assists + '' + item.player.deaths + '' + idx}>
                <Image
                  style={styles.itemIcon}
                  // source={{ uri: `http://ddragon.leagueoflegends.com/cdn/11.8.1/img/item/${img}` }}
                  source={('undefined' === typeof itemIcon[items]) ? { uri: '../../assets/images/empty-item.PNG' } : { uri: `http://ddragon.leagueoflegends.com/cdn/11.8.1/img/item/${img}` }}
                  resizeMode="cover"
                />
              </Tooltip>
            })
          }
        </View>
        <View style={styles.itemList}>
          {
            item.player.items.map((items, idx) => {
              // console.log(items);
              let img = ('undefined' === typeof itemIcon[items]) ? null : itemIcon[items]['img'];
              let name = ('undefined' === typeof itemIcon[items]) ? null : itemIcon[items]['name'];
              let tooltip = ('undefined' === typeof itemIcon[items]) ? null : itemIcon[items]['tooltip'];
              return (idx > 2) && <Tooltip
              popover={
                <View>
                  <Text style={{flex: 0.2}}>{name}</Text>
                  <Text style={{flex: 0.7}}>{tooltip}</Text>
                </View>
              }
              width={200}
              height={170}
              toggleOnPress={('undefined' === typeof itemIcon[items]) ? false : true}
              overlayColor='rgba(250, 250, 250, 0)'
              backgroundColor='#fff'
              key={item.player.championId + '' + item.player.summonerName + '' + item.player.kills + '' + item.player.assists + '' + item.player.deaths + '' + idx}>
                <Image
                  style={styles.itemIcon}
                  source={{ uri: `http://ddragon.leagueoflegends.com/cdn/11.8.1/img/item/${img}` }}
                  resizeMode="cover"
                />
              </Tooltip>
            })
          }
        </View>
      </View>

      <View style={styles.summoners}>
        <View style={styles.summonersList}>
          <View style={{paddingHorizontal: '5%', flex: 0.5}}>
            {
              item.winTeam.map((item, idx) => {
                return (
                  <SummonerItem
                    champIcon={champIcon}
                    championId={item.championId}
                    summonerName={item.summonerName}
                    key={item.championId+''+item.summonerName+''+idx}
                  />
                );
              })
            }
          </View>
          <View style={{paddingRight: '5%', flex: 0.5}}>
            {
              item.loseTeam.map((item, idx) => {
                return (
                  <SummonerItem
                    champIcon={champIcon}
                    championId={item.championId}
                    summonerName={item.summonerName}
                    key={item.championId+''+item.summonerName+''+idx}
                  />
                );
              })
            }
          </View>
        </View>
        <View style={styles.overview}>
          <Text>{item.player.gameDuration}분 게임</Text>
          <Text>평점 {((item.player.kills+item.player.assists)/item.player.deaths).toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  ListItem: {

  },
  iconContainer: {
    flex: 0.4,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // marginRight: '3%'
  },
  iconView: {
    // flex: 1,
    width: 100,
    height: 100
  },
  icon: {
    // flex: 1,
    width: 70,
    height: 70,
    borderRadius: 5,
    backgroundColor: '#fff'
  },
  runeView: {
    width: 50,
    height: 50
  },
  runeIcon: {
    // flex: 1,
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: '#fff',
    margin: 2,
    marginLeft: 10
  },
  kda: {
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
    marginVertical: 10,
  },
  kdaText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  kill: {
    color: '#0074d9'
  },
  asi: {
    color: 'red'
  },
  death: {
    color: 'green'
  },
  itemList: {
    flexDirection: 'row'
  },
  itemIcon: {
    width: 45,
    height: 45,
    // borderRadius: 5,
    backgroundColor: '#dcdcdc'
  },
  summoners: {
    flex: 0.6,
  },
  summonersList: {
    flex: 1,
    flexDirection: 'row',
    overflow: 'hidden',
    flexWrap: 'nowrap',
    // paddingLeft: '5%',
  },
  overview: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  }
});