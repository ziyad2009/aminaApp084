<Center>
         
<Modal  isOpen={showModal} onClose={() => setShowModal(false)}
   
        borderColor={Colors.white} backgroundColor={Colors.transparent}
        avoidKeyboard justifyContent="flex-end" bottom="4">
    <Modal.Content width={Metrics.WIDTH }  height={heightPixel(540)} backgroundColor={Colors.AminabackgroundColor} >
    <Modal.CloseButton />
    <Modal.Body flexDirection={'column'}  height={heightPixel(400)} >
        <View style={{justifyContent:'space-around',marginLeft:1 ,marginTop:10 }}>
            <Box flexDirection={'row'}  mt={'4'}  >
                <Stack  backgroundColor={Colors.textZahry}  w={Platform.OS==='android'? widthPixel(190):widthPixel(190)}
                    borderRadius={'md'}    h={heightPixel(65)} alignItems='center'   mr={19} flexDirection='row'  justifyContent={'center'} >
                    <Image source={images.yellowpin} resizeMode='contain' style={{width:widthPixel(16),height:heightPixel(16),marginRight:7}}  />
                    {/* {datePicker ? (
                    <DateTimePicker
                        value={date}
                        mode={'date'}
                        display={Platform.OS === 'ios' ? 'compact' : 'default'}
                        is24Hour={false}
                        dateFormat={"day month year"}
                        onChange={onDateSelected}
                        style={styles.datePicker}
                    />):(
                        <TouchableOpacity onPress={ ()=>setDatePicker(!datePicker)}>
                            <Text fontFamily={Platform.OS==='android'?Fonts.type.medium: Fonts.type.medium} color={Colors.goldText} >
                                {moment(date).format("dddd")}  {moment(date).format(" LL")}</Text>
                        </TouchableOpacity>
                    )} */}
                    <TouchableOpacity onPress={ ()=>setDatePicker(!datePicker)}>
                            <Text fontFamily={Platform.OS==='android'?Fonts.type.medium: Fonts.type.medium} color={Colors.goldText} >
                                {moment(date).format("dddd")}  {moment(date).format(" LL")}</Text>
                        </TouchableOpacity>
                </Stack>
                
                <Stack backgroundColor={Colors.textZahry} flexDirection={'row'} ml={Platform.OS==='android'?1:1}  w={Platform.OS==='android'? widthPixel(130):widthPixel(150)}
                    borderRadius={15}     h={heightPixel(65)} alignItems='center'  justifyContent={'center'}   >
                    <TouchableOpacity  onPress={()=>setOpen(true)} style={{width:Platform.OS==='android'? widthPixel(130):widthPixel(89) ,height:heightPixel(30),justifyContent:Platform.OS==='android'?'center':'center',alignItems:'center', flexDirection:'row'  }}   >
                        <Image source={images.yellowpin} style={{width:widthPixel(16),height:heightPixel(16),marginRight:7}}  />
                        <Text fontFamily={Platform.OS==='android'?Fonts.type.medium: Fonts.type.medium} color={Colors.goldText}
                                textAlign={'center'} fontSize={fontPixel(16)} backgroundColor='warning.700' >
                                {moment(time).format("LT A")} </Text>
                        {/* <DatePicker
                        mode='datetime'
                        modal
                        
                        theme='light'
                        minuteInterval={30}
                        open={open}
                        date={time}
                        
                        onConfirm={(date) => {setTime(date) 
                                    setDate(date)
                                    setOpen(false) 
                                    setresevButton(false)}}
                        onCancel={() => {setOpen(false)}}
                        /> */}
                        </TouchableOpacity>
                </Stack>
                 
            </Box>
        </View>

        <View style={{marginTop:Platform.OS==='android'?16:pixelSizeVertical(30) ,width:widthPixel(370),height:heightPixel(113),backgroundColor:Colors.AminabackgroundColor}}>
            <Box flexDirection={'column'}  >
                <Stack   alignItems={'flex-start'} width={widthPixel(370)}>
                    <Text fontFamily={Platform.OS==='android'?Fonts.type.medium:Fonts.type.medium} fontSize={fontPixel(16)}
                        textAlign='right' >
                        عدد ساعات الخدمة
                    </Text>
                </Stack>
                <Stack  flexDirection={'row'}   alignItems='center'  justifyContent={'space-around'} mr={Platform.OS==='android'?'2':'1'} >
                        {timeslots.map((slot,index)=>{
                        return(
                            <TouchableOpacity  key={slot.id} style={{width:widthPixel(55),height:heightPixel(55),justifyContent:'center',alignItems:'center',marginTop:10,backgroundColor:Colors.transparent,
                                                    borderRadius:100,borderColor:slctslots===index? "#F38193":Colors.greys ,borderWidth:1 }}   
                                    onPress={()=>extraTime(time,slot.time,index) } >
                                    <Box  key={slot.id}   borderRadius='lg'  alignItems={'center'} justifyContent='center' borderColor={'black'}
                                        w={widthPixel(10)} height={heightPixel(40)}
                                    ml={Platform.OS==='android'?'1': pixelSizeVertical(2)} mr={'2'}   >
                                        <Text alignSelf={'center'} fontSize={ slctslots===index?  fontPixel(22): fontPixel(15)} 
                                            fontFamily={Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base}
                                            color={"#000000"}>{slot.time}
                                        </Text>
                                    </Box>
                                
                            </TouchableOpacity>
                            
                                // <TouchableOpacity  key={slot.id} style={{width:widthPixel(33),height:heightPixel(36),justifyContent:'center',alignItems:'center',marginTop:10,backgroundColor:Colors.transparent }}   
                                //         onPress={()=>extraTime(time,slot.time,index) } >
                                //     <Box  key={slot.id} backgroundColor={slctslots===index? "#F38193":Colors.white} borderRadius='md'  alignItems={'center'} justifyContent='center'
                                //     w={widthPixel(10)} height={heightPixel(40)} ml={Platform.OS==='android'?'1': pixelSizeVertical(2)} mr={'2'}   >
                                //     <Text alignSelf={'center'} fontSize={fontPixel(15)} 
                                //         fontFamily={Platform.OS==='android'?Fonts.type.medium:Fonts.type.medium}
                                //         color={"#000000"}>{slot.time}
                                //     </Text>
                                //     </Box>
                                    
                                // </TouchableOpacity>
                                
                          
                       
                        )
                    })}
                        {/* {timeslots.map((slot,index)=>{
                            return(
                        <TouchableOpacity onPress={()=>extraTime(time,slot.time,index) }
                                style={{flexDirection:"column", backgroundColor:Colors.amin1Button1,alignItems:'center',padding:2,
                                borderTopEndRadius:10,borderBottomStartRadius:20,width:Metrics.WIDTH*0.1192,height:Metrics.HEIGHT*0.0732,marginLeft:10}}    key={slot.id}>
                            <Text fontFamily={Fonts.type.aminafonts} fontSize={18} color={numcolor===index? Colors.bloodOrange:Colors.white} fontWeight='400' textAlign={'center'}  backgroundColor={Colors.banner} >{slot.time} </Text>
                            <Text fontFamily={Fonts.type.aminafonts} fontSize={14} color={numcolor===index? Colors.bloodOrange:Colors.white} fontWeight='400' textAlign={'center'}>
                            {slot.time.toString() === "2" ? "ساعة ":"ساعات"}</Text>
                        </TouchableOpacity>
                        )
            })} */}
           </Stack>
        </Box>
        </View>
        {visible?<Stack > 
                    <TouchableOpacity>
                        <AnimatedLoader
                            visible={visible}
                            overlayColor="rgba(255,255,255,0.75)"
                            source={require("./calender.json")}
                            animationStyle={styles.lottie}
                            speed={1}
                        /> 
                    </TouchableOpacity>
                
                </Stack>:<Stack/>}
    </Modal.Body>
    
    <Modal.Footer alignItems={'center'} justifyContent='space-around'  backgroundColor={Colors.AminabackgroundColor} height={Metrics.HEIGHT*0.281}>
        <Box  flexDirection={'column'} marginBottom={3} alignItems={'center'}>
            <Stack alignItems={'center'}>
                <Text fontFamily={Platform.OS==='android'? Fonts.type.medium:Fonts.type.medium} alignItems={'center'} color={Colors.newTextClr}
                    textAlign='center'>
                    تفاصيل  الخدمة </Text>
            </Stack> 
            <Box flexDirection={'row'} justifyContent='space-around' width={widthPixel(388)} mt={7}>
                <Stack flexDirection={"row"} >
                    <Image source={images.clenderblack} resizeMode='contain' style={{width:widthPixel(16),height:heightPixel(16),marginRight:8}}  />
                    <Text fontFamily={Platform.OS==='android'? Fonts.type.aminafonts:Fonts.type.base} color={Colors.newTextClr} alignItems={'flex-end'}>
                        {moment(date).format('dddd')}</Text>
                    <Text fontFamily={Platform.OS==='android'? Fonts.type.aminafonts:Fonts.type.base} color={Colors.newTextClr} alignItems={'flex-end'}>
                        {moment(date).format('LL')}</Text>
                </Stack>
                <Stack flexDirection={'row'} >
                    <Stack flexDirection={'row'}>
                        <Image source={images.clock} resizeMode='contain' style={{width:widthPixel(16),height:heightPixel(16),marginRight:8}}  />
                        <Text fontFamily={Platform.OS==='android'? Fonts.type.medium:Fonts.type.medium} color={Colors.newTextClr} alignItems={'flex-end'}>
                            {moment(time).format('hh:mm a')}</Text>
                    </Stack>
                    <Stack flexDirection={'row'}   >
                        <Image source={images.clockred} resizeMode='contain' style={{width:widthPixel(16),height:heightPixel(16),marginLeft:8}}  />
                        <Text fontFamily={Platform.OS==='android'? Fonts.type.medium:Fonts.type.medium} color={Colors.newTextClr} marginLeft={2}> 
                        {moment(time2).format('hh:mm a')}</Text>
                    </Stack>
                </Stack>
            </Box>
        </Box>
    
        <Box width={widthPixel(388)} alignItems={'center'} mt={20}>
           
             {resevButton?<CustomButton
                buttonColor={Colors.textZahry}
                title="تاكيد الطلب"
                buttonStyle={{width: '90%', alignSelf: 'center',borderRadius:15 }}
                textStyle={{fontSize: 20}}
                onPress={() =>confirmReservisionTime()}
            />:
            <Box width={"80%"} height={'24%'} alignItems='center' mt={3} flexDirection={'row'} backgroundColor={Colors.transparent}>
                <EvilIcons name='exclamation' color={Colors.blacktxt} size={26} style={{marginRight:10,marginLeft:10}}/>
                <Text  color={Colors.textZahry}  >لاكمال الحجز حددي ساعات الخدمة</Text>
            </Box>}
             
        </Box>
    </Modal.Footer>
  </Modal.Content>
</Modal>
 
</Center>

