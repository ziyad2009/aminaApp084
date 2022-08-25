
import React,{useEffect,useState,useRef,} from 'react';
import {View,Image, TouchableOpacity, Alert} from 'react-native'
import {Actionsheet,Box,Avatar,Text,VStack,HStack,Spacer, Button,Spinner,Modal,Center} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign'

const  ActionsheetScreen=()=> {
    const {
      isOpen,
      onOpen,
      onClose
    } = useDisclose();
    return (
    <Center>
        <Button onPress={onOpen}>Actionsheet</Button>
        <Actionsheet isOpen={isOpen} onClose={onClose}>
          <Actionsheet.Content _dragIndicator={{
          bg: 'blue.500'
        }}>
            <Box w="100%" h={60} px={4} justifyContent="center">
              <Text fontSize="16" color="gray.500" _dark={{
              color: 'gray.300'
            }}>
                Albums
              </Text>
            </Box>
            <Actionsheet.Item>Delete</Actionsheet.Item>
            <Actionsheet.Item>Share</Actionsheet.Item>
            <Actionsheet.Item>Play</Actionsheet.Item>
            <Actionsheet.Item>Favourite</Actionsheet.Item>
            <Actionsheet.Item>Cancel</Actionsheet.Item>
          </Actionsheet.Content>
        </Actionsheet>
      </Center>
    )
  }
  export default ActionsheetScreen;