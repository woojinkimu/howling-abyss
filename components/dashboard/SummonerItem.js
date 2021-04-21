import React from 'react'
import { StyleSheet } from 'react-native'
import { Image } from 'react-native'
import { Text, View } from 'react-native'

const SummonerItem = ({ champIcon, championId, summonerName }) => {
  return (
    <View style={styles.summonerItem}>
      {
        ('undefined' === typeof champIcon[championId]) ?
          <Image 
            source={require('../../assets/images/no-user.png')}
            style={styles.icon}
            resizeMode="cover"
          />
        :
          <Image 
            source={{ uri: `https://ddragon.leagueoflegends.com/cdn/10.6.1/img/champion/${champIcon[championId]}.png` }}
            style={styles.icon}
            resizeMode="cover"
          />
      }
      <Text numberOfLines={1} >{summonerName}</Text>
    </View>
  )
}

export default SummonerItem

const styles = StyleSheet.create({
  summonerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 1,
    paddingRight: 20
  },
  icon: {
    // flex: 1,
    width: 30,
    height: 30,
    borderRadius: 5,
    backgroundColor: '#dcdcdc',
    marginRight: 3
  },
});