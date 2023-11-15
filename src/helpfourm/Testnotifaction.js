import React,{useEffect,useState,useRef} from 'react';
import { View,AppState } from 'react-native';
import{Box,Select,CheckIcon,Text} from 'native-base'
import { Metrics,Colors,Fonts } from '../assets/Themes';
  
const HoldNottifaction=(props)=>{
    const appState = useRef(AppState.currentState);
    const [appStateVisible, setVisible] = useState(appState.current);
    const[gender,setgender]=useState('0')


    useEffect(() => {
        const subscription = AppState.addEventListener('change', nextAppState => {
          if (
            appState.current.match(/inactive|background/) &&
            nextAppState === 'active'
          ) {
            console.log('App has come to the foreground!');
          }
    
          appState.current = nextAppState;
          setAppStateVisible(appState.current);
          console.log('AppState', appState.current);
          if(appState.current==='background'){
            console.log('now ii am background',gender);
          }

        });
    
        return () => {
          subscription.remove();
        };
      }, []);

      useEffect(()=>{
        console.log("test value is ",gender)
      },[gender])

    return(
        <View>
            <Box alignItems={'flex-start'} w={Metrics.WIDTH * 0.324}  backgroundColor='amber.200'  mt={'10'} mr={'3'} >
                <Text style={{
                    alignItems: "center", fontSize: 15, fontFamily: Platform.OS === 'android' ? Fonts.type.aminafonts : Fonts.type.base,
                    fontWeight: '400', marginLeft: 1
                }}>الجنس</Text>
                <Select selectedValue={gender === null ? "" : null}  accessibilityLabel="الجنس" placeholder="الجنس" defaultValue={gender}
                    _selectedItem={{
                        bg: "gray.200", endIcon: <CheckIcon size="5" />
                    }}
                    w={Metrics.WIDTH * 0.246}
                    borderColor='#00ABB9' borderWidth='1'
                    variant='outline' fontSize={18}
                    
                    onValueChange={itemValue => setgender(itemValue)} textAlign={"center"}
                >
                    <Select.Item label="10 sec" value="10" />
                    <Select.Item label="20 sec" value="20" />
                </Select>
            </Box>
        </View>
    )
}


export default HoldNottifaction ;