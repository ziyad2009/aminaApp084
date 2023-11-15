import React, { memo, useCallback, useState } from 'react'
import { Text } from 'react-native'
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown'
import setItem from '../services/storage'
import api from '../services/api'
import { URL_ws,URL } from "../services/links";
import { Colors, Metrics } from '../assets/Themes/'
import styles from '../SearchScreen/style'
import { useNavigation } from '@react-navigation/native';


export const RemoteDataSetExample = memo((props) => {
  const [loading, setLoading] = useState(false)
  const [remoteDataSet, setRemoteDataSet] = useState(null)
  const [selectedItem, setSelectedItem] = useState([])
  const navigation = useNavigation();

  const getSuggestions = useCallback(async q => {
    const filterToken = q.toLowerCase()
    console.log('getSuggestions', filterToken)
    if (typeof q !== 'string' || q.length < 3) {
      setRemoteDataSet(null)
      return
    }
    setLoading(true)
    const token = await setItem.getItem('BS:Token');
    api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    const response=await  api.post(`${URL}/setterbyname`,{
        name:q
      }).then( (result)=>{
        console.log("test  data serch",result.data)
        new Promise(res => {
                  setTimeout(() => res(result.data), 2000) // imitate of a long response
         })
        return result.data
      })
        
    

    // const response = await fetch('https://jsonplaceholder.typicode.com/posts').then(
    //   data =>
    //     new Promise(res => {
    //       setTimeout(() => res(data), 2000) // imitate of a long response
    //     })
    // )
    const items = await response

    const suggestions = items 
       
      .map(item => ({
        id: item._id,
        title: item.name
      }))

    setRemoteDataSet(suggestions)
    setLoading(false)
  }, [])

  return (
    <>
      <AutocompleteDropdown
        dataSet={remoteDataSet}
        closeOnBlur={false}
        useFilter={false}
        clearOnFocus={false}
        textInputProps={{
          placeholder: 'ابحثي عن حاضنة...',
          style: {
            borderRadius:22,
            color: "rgba(239, 239, 239, 1)",
            paddingRight: 18,
            textAlign:'right'
          }
        }}
        debounce={600}
        inputContainerStyle={{
          backgroundColor: "rgba(239, 239, 239, 1)",
          borderRadius: 18,
          borderColor:"rgba(239, 239, 239, 1)",
          borderWidth:0.5,
          width:Metrics.WIDTH*0.9223361
         
        }}
        
        onSubmit={(val)=>console.log("text",val)}
        onSelectItem={selectedItem?(val)=> navigation.navigate('SearchScreen', { text:val===null?"":  val.title }):console.log("no result")}
        loading={loading}
        onChangeText={getSuggestions}
        suggestionsListTextStyle={{
          color:Colors.newTextClr
        }}
        EmptyResultComponent={<Text style={{ padding: 10, fontSize: 15 }}>لاتوجد نتائج </Text>}
      />
      {selectedItem && selectedItem.map((item)=>{
        <Text style={{ color: '#668', fontSize: 13 }}>`Selected item:  {item._id}`</Text>
      })}
      
    </>
  )
})