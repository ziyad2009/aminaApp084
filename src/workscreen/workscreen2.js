<Modal isOpen={showModal} onClose={() => setShowModal(false)}
borderColor={Colors.white}
avoidKeyboard justifyContent="flex-end" bottom="2">
<Modal.Content width={Metrics.WIDTH } h={Metrics.HEIGHT*0.522}>
<Modal.CloseButton />
<Modal.Header alignItems={'center'}>
<AntDesign name='checkcircleo' size={33} color={Colors.loginGreen} style={{ marginBottom:10}} />
     <Text fontFamily={Platform.OS==='android'?Fonts.type.medium:Fonts.type.base} fontSize='lg'  textAlign={'center'} >  تم طلب وقت اضافي للحاضنه</Text>
     <Text fontFamily={Platform.OS==='android'?Fonts.type.medium:Fonts.type.base} fontSize='lg'  textAlign={'center'} > سعر الساعه الواحد بـ{babysetter.price}</Text>
</Modal.Header>
<Modal.Body alignItems={'center'} borderColor={Colors.AminaButtonNew} >
          <Stack    direction={{ base: "column",md: "row"}} space='4'   >
                            <Radio.Group name="myRadioGroup" accessibilityLabel="favorite number" value={hoursopt} 
                              onChange={nextValue => {setHoursopt(nextValue)  }} >
                                <Radio value="one" my={1} >
                                  ساعه
                                </Radio>
                                <Radio value="tow" my={1}>
                                  ساعتين
                                </Radio>
                                <Radio value="three" my={1}>
                                  ثلاث ساعات
                                </Radio>
                                <Radio value="foure" my={1  }>
                                  اربع ساعات
                                </Radio>
                                
                            
                            </Radio.Group>
                </Stack>
     
</Modal.Body>
 
<Modal.Footer alignItems={'center'} justifyContent='center'>
  <Box alignItems={'center'}   w={"90%"} p='2'> 
    {totallhours>=1&&
      <Text fontFamily={Platform.OS==='android'?Fonts.type.medium:Fonts.type.base} fontSize='lg' textAlign={'center'} mb={2}>السعر الاجمالي لـ{totallhours} = {totallprice===NaN?"0":totallprice} </Text>
    }
  </Box>
   
    <Box alignItems={'center'}  w={Metrics.WIDTH*0.461} ml='3' mr='4'   >
                     {/* <Button bgColor={Colors.AminaButtonNew} size={'lg'} mb='1.5' w='full'
                        onPress={() =>   setShowModal(true) }> تمديد</Button> */}
                         <CustomButton
                          buttonColor={Colors.AminaButtonNew}
                          title="ادفع"
                          buttonStyle={{width: '88%', alignSelf: 'center'}}
                          textStyle={{fontSize: 15}}
                          onPress={() =>  paymentScreen(true)  }
                            />


      </Box>
   
   
</Modal.Footer>
</Modal.Content>
</Modal>