import {Platform, StyleSheet} from 'react-native'
import  {Colors,Fonts,heightPixel,Metrics} from '../assets/Themes/'
export default StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  outerContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.white,
  },
  innerContainer: {
    width: '100%',
    height: '100%',
  },
  topContainer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 8,
    paddingTop:Platform.OS==='android'? 55:10,
    backgroundColor: Colors.AminaButtonNew,
  },
  textTopContainer: {
    color: 'rgba(255, 255, 255, 1)',
  },
  headingTopContainer: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 22,
    fontWeight: '700',
  },
  membersOnlineContainer: {
    width: '100%',
    flexDirection: 'row',
  },
  member: {
    paddingHorizontal: 4,
    paddingVertical: 4,
    fontFamily:Fonts.type.base,
    color: 'rgba(255, 255, 255, 1)',
  },
  friendlyNameEdit: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    //height: 100
  },
  messageScrollContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Colors.AminabackgroundColor,
  },
  messageContainerThem: {
    flexDirection: 'row',
    marginTop: 12,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#FEEBEB',
    padding: 8,
    paddingLeft: 16,
    paddingRight: 16,
    borderBottomRightRadius: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  messageContainerMe: {
    flexDirection: 'row',
    marginTop: 12,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#00ABB9',
    padding: 8,
    paddingLeft: 16,
    paddingRight: 16,
    borderBottomLeftRadius: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  messageContent: {
    flex: 1,
  },
  messageSender: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 1)',
  },
  messageText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.black,
    fontFamily:Fonts.type.regular,
    margin:8
  },
  messageTimetoken: {
    fontSize: 10,
    color: 'rgba(0, 0, 0, 1)',
  },
  timetokenContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  avatarThem: {
    width: 38,
    height: 38,
    borderRadius: 50,
    overflow: 'hidden',
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:Colors.transparent,
  },
  avatarMe: {
    width: 38,
    height: 38,
    borderRadius: 50,
    overflow: 'hidden',
    marginLeft: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.transparent,
  },
  avatarNone: {
    display: 'none',
  },
  bottomContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    height: 80,
    backgroundColor:Colors.white,
  },
  textInput: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    color: 'rgba(0, 0, 0, 1)',
    borderRadius: 4,
    padding: 6,
    height:heightPixel(48),
    elevation: 2,
  },
  textInputFriendlyName: {
    flex: 1,
    backgroundColor: '#fff',
    color: 'rgba(0, 0, 0, 1)',
    borderRadius: 8,
    padding: 8,
    elevation: 2,
  },
  saveFriendlyName: {
   alignSelf:'flex-end'
  },
  submitButton: {
   // position: 'absolute',
    //right: 10,
    width:Metrics.WIDTH*0.1042,
    height:Metrics.HEIGHT*0.05022,
    backgroundColor:Colors.transparent
  },
  logo: {
    width: '50%',
    height: undefined,
    aspectRatio: 0.9,
  },
})