import React from 'react';
import { memo } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const ListItem = memo(({ item, champIcon, itemIcon, timestamp }) => {

  const getDate = () => {
    const date = new Date(timestamp);
    return date.getFullYear()+'.'+(date.getMonth()+1)+'.'+date.getDate();
  }

  const dynamicBgColor = (item) => {
    const isWin = item.player.win;
    if(isWin){
      return {
        flex: 1,
        // height: 100,
        backgroundColor: '#98ddca',
        flexDirection: 'row',
        padding: '5%',
        borderBottomColor: '#cecece',
        borderBottomWidth: 1
      }
    }else{
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
    <View style={dynamicBgColor(item)} key={item.player.championId+item.player.summonerName+item.player.kills}>
      {/* <Text>{getDate()}</Text> */}
      <View style={styles.iconContainer}>
        <View styles={styles.iconView}>
          <Image style={styles.icon} source={{ uri: `https://ddragon.leagueoflegends.com/cdn/10.6.1/img/champion/${champIcon[item.player.championId]}.png` }} resizeMode="cover" />
        </View>
        <View style={styles.kda}>
          <Text>{item.player.kills}</Text>
          <Text style={{marginHorizontal: 5}}>/</Text>
          <Text>{item.player.deaths}</Text>
          <Text style={{marginHorizontal: 5}}>/</Text>
          <Text>{item.player.assists}</Text>
        </View>
        <View>
          {
            item.player.items.map((items) => {
              return <Image 
                style={styles.icon}
                source={{ uri: `http://ddragon.leagueoflegends.com/cdn/11.8.1/img/item/${itemIcon[items]}` }}
                resizeMode="cover"
                key={item.player.championId+''+item.player.summonerName+''+item.player.kills+''+item.player.assists+''+item.player.deaths}
              />
            })
          }
        </View>
      </View>
      
      <View style={styles.summoners}>
        <View>
          {
            item.winTeam.map((item) => {
              return <Text key={item.championId+''+item.summonerName+''+item.kills}>{item.summonerName}</Text>
            })
          }
        </View>
        <View>
          {
            item.loseTeam.map((item) => {
              return <Text key={item.championId+''+item.summonerName+''+item.kills}>{item.summonerName}</Text>
            })
          }
        </View>
      </View>
    </View>
  );
});

export default ListItem;

const styles = StyleSheet.create({
  ListItem: {
    
  },
  iconContainer: {
    flex: 0.3,
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
    borderRadius: 5
  },
  kda: {
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center'
  },
  summoners: {
    flexDirection: 'row',
    flex: 0.7,
    overflow: 'hidden',
    flexWrap: 'nowrap',
    paddingLeft: '5%'
  }
});