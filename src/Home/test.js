import * as React from "react";
import { Pressable, Image, StyleSheet, View, Text } from "react-native";
import { Color, FontSize, FontFamily, Border } from "../GlobalStyles";

const Screen1 = () => {
  return (
    <Pressable style={styles.pressable}>
      <View style={[styles.adLayout, styles.adPosition]}>
        <Image
          style={[styles.maskGroup81, styles.adLayout, styles.adPosition]}
          resizeMode="cover"
          source={require("../assets/mask-group-8-1.png")}
        />
        <View style={[styles.adChild, styles.adLayout]} />
        <View style={[styles.getStarted, styles.getLayout]}>
          <View style={[styles.getStartedChild, styles.getLayout]} />
          <Text style={[styles.getStarted1, styles.messageTypo]}>
            Get Started
          </Text>
        </View>
        <Text style={styles.text}>أمينة على أطفالك</Text>
      </View>
      <View style={styles.topPosition}>
        <View style={[styles.topChild, styles.topPosition]} />
        <Image
          style={[styles.menuIcon, styles.topItemLayout]}
          resizeMode="cover"
          source={require("../assets/menu.png")}
        />
        <View style={styles.statusBarIphoneXOrNewe}>
          <Image
            style={[styles.notchIcon, styles.iconLayout]}
            resizeMode="cover"
            source={require("../assets/notch.png")}
          />
          <Image
            style={[styles.rightSideIcon, styles.rightSideIconPosition]}
            resizeMode="cover"
            source={require("../assets/right-side.png")}
          />
          <View style={styles.leftSide}>
            <View style={styles.time}>
              <Text style={[styles.text1, styles.textTypo4]}>9:41</Text>
            </View>
          </View>
        </View>
        <Text style={[styles.text2, styles.textTypo4]}>الصفحة الرئيسية</Text>
        <Image
          style={[styles.notiIcon, styles.iconLayout]}
          resizeMode="cover"
          source={require("../assets/noti.png")}
        />
        <Image
          style={[styles.topItem, styles.topItemLayout]}
          resizeMode="cover"
          source={require("../assets/frame-33389.png")}
        />
      </View>
      <View style={[styles.searchBarParent, styles.searchLayout]}>
        <View style={[styles.searchBar, styles.searchLayout]}>
          <View style={[styles.searchBarChild, styles.searchLayout]} />
        </View>
        <Image
          style={[styles.path215Icon, styles.iconLayout]}
          resizeMode="cover"
          source={require("../assets/path-215.png")}
        />
        <Image
          style={[styles.path216Icon, styles.iconLayout]}
          resizeMode="cover"
          source={require("../assets/path-216.png")}
        />
        <Text style={styles.text3}>ابحثي عن حاضنة</Text>
      </View>
      <View style={[styles.parent, styles.parentLayout1]}>
        <View style={styles.viewPosition}>
          <View style={styles.viewPosition}>
            <View style={styles.viewPosition}>
              <View style={[styles.groupChild, styles.viewPosition]} />
            </View>
          </View>
          <Image
            style={[styles.icons8BabysRoom1, styles.rightSideIconPosition]}
            resizeMode="cover"
            source={require("../assets/icons8babysroom-1.png")}
          />
        </View>
        <View style={[styles.group, styles.groupPosition]}>
          <Text style={[styles.text4, styles.textClr, styles.textTypo3]}>
            جليسة أطفال
          </Text>
          <Text style={[styles.text5, styles.textTypo1, styles.textTypo2]}>
            في منزل الأسرة
          </Text>
        </View>
      </View>
      <View style={[styles.containerPosition, styles.parentLayout1]}>
        <View style={styles.viewPosition}>
          <View style={styles.viewPosition}>
            <View style={styles.viewPosition}>
              <View style={[styles.groupChild, styles.viewPosition]} />
              <Image
                style={[styles.vectorIcon, styles.iconLayout]}
                resizeMode="cover"
                source={require("../assets/vector.png")}
              />
            </View>
          </View>
        </View>
        <View style={[styles.groupView, styles.groupPosition]}>
          <Text style={[styles.text4, styles.textClr, styles.textTypo3]}>
            حضانة منزلية
          </Text>
          <Text style={[styles.text7, styles.textTypo1, styles.textTypo2]}>
            في منزل الحاضنة
          </Text>
        </View>
      </View>
      <Image
        style={[
          styles.arabsstockP52761LargeRemoveIcon,
          styles.containerPosition,
        ]}
        resizeMode="cover"
        source={require("../assets/arabsstock-p52761-largeremovebgpreview-1.png")}
      />
      <View style={[styles.card2, styles.cardPosition]}>
        <View style={[styles.card2Child, styles.card2ChildPosition]} />
        <Image
          style={[styles.imageIcon, styles.iconLayout]}
          resizeMode="cover"
          source={require("../assets/image.png")}
        />
        <View
          style={[styles.detail, styles.detailPosition, styles.detailPosition1]}
        >
          <View style={styles.card2ChildPosition}>
            <View style={styles.card2ChildPosition}>
              <View style={[styles.priceChild, styles.childPosition]} />
            </View>
          </View>
          <Text style={[styles.text8, styles.textTypo1, styles.textClr]}>
            احجزي الان
          </Text>
          <Image
            style={[styles.whatsappImage20230122At1, styles.whatsappLayout]}
            resizeMode="cover"
            source={require("../assets/whatsapp-image-20230122-at-1141-1.png")}
          />
        </View>
        <Text style={[styles.text9, styles.textPosition1]}>مريم أحمد</Text>
        <Text style={[styles.text10, styles.textTypo]}>جليسة أطفال</Text>
        <View style={[styles.price1, styles.detailPosition]}>
          <View style={[styles.priceChild, styles.childPosition]} />
          <Text style={[styles.text11, styles.textTypo1, styles.textClr]}>
            ١٠٠ ر.س / ساعة
          </Text>
          <Text style={[styles.text11, styles.textTypo1, styles.textClr]}>
            ١٠٠ ر.س / ساعة
          </Text>
        </View>
        <View
          style={[styles.rating, styles.detailPosition, styles.detailPosition1]}
        >
          <View style={[styles.ratingChild, styles.childPosition]} />
          <View style={styles.parent1}>
            <Text style={styles.text13}>4.1</Text>
            <Image
              style={[styles.starFillIcon, styles.iconLayout]}
              resizeMode="cover"
              source={require("../assets/starfill.png")}
            />
          </View>
        </View>
        <View style={[styles.card2Item, styles.itemPosition]} />
        <Image
          style={[styles.whatsappImage20230122At1Icon, styles.whatsappLayout]}
          resizeMode="cover"
          source={require("../assets/whatsapp-image-20230122-at-1141-11.png")}
        />
        <Text style={[styles.text14, styles.textPosition]}>١٠٠ ساعة عمل</Text>
        <Image
          style={[styles.saveIcon, styles.iconLayout]}
          resizeMode="cover"
          source={require("../assets/save.png")}
        />
        <Text style={[styles.text15, styles.textTypo1, styles.textTypo5]}>
          حفظ
        </Text>
      </View>
      <View style={[styles.card3, styles.cardPosition]}>
        <View style={[styles.card2Child, styles.card2ChildPosition]} />
        <Text style={[styles.text16, styles.textPosition]}>١٠٠ ساعة عمل</Text>
        <View style={[styles.card3Item, styles.itemPosition]} />
        <View
          style={[styles.detail, styles.detailPosition, styles.detailPosition1]}
        >
          <View style={styles.card2ChildPosition}>
            <View style={styles.card2ChildPosition}>
              <View style={[styles.priceChild, styles.childPosition]} />
            </View>
          </View>
          <Text style={[styles.text8, styles.textTypo1, styles.textClr]}>
            احجزي الان
          </Text>
        </View>
        <Text style={[styles.text18, styles.textPosition1]}>حضانة فرح</Text>
        <Text style={[styles.text19, styles.textTypo]}>حضانة منزلية</Text>
        <View style={[styles.price1, styles.detailPosition]}>
          <View style={[styles.priceChild, styles.childPosition]} />
          <Text style={[styles.text11, styles.textTypo1, styles.textClr]}>
            ١٠٠ ر.س / ساعة
          </Text>
          <Text style={[styles.text11, styles.textTypo1, styles.textClr]}>
            ١٠٠ ر.س / ساعة
          </Text>
        </View>
        <View
          style={[styles.rating, styles.detailPosition, styles.detailPosition1]}
        >
          <View style={[styles.ratingChild, styles.childPosition]} />
          <View style={styles.parent1}>
            <Text style={styles.text13}>4.1</Text>
            <Image
              style={[styles.starFillIcon, styles.iconLayout]}
              resizeMode="cover"
              source={require("../assets/starfill.png")}
            />
          </View>
        </View>
        <Image
          style={styles.itemPosition}
          resizeMode="cover"
          source={require("../assets/whatsapp-image-20230122-at-1139-1.png")}
        />
        <Image
          style={[styles.saveIcon, styles.iconLayout]}
          resizeMode="cover"
          source={require("../assets/save.png")}
        />
        <Text style={[styles.text15, styles.textTypo1, styles.textTypo5]}>
          حفظ
        </Text>
      </View>
      <Text style={[styles.text24, styles.textClr, styles.textTypo3]}>
        الأفضل لك
      </Text>
      <View style={styles.view2}>
        <View style={[styles.child, styles.childPosition]} />
        <View
          style={[
            styles.vectorParent,
            styles.parentPosition,
            styles.parentPosition1,
            styles.parentLayout,
          ]}
        >
          <Image
            style={[styles.vectorIcon1, styles.vectorIconPosition]}
            resizeMode="cover"
            source={require("../assets/vector1.png")}
          />
          <Text style={[styles.text25, styles.textTypo5, styles.textTypo6]}>
            حسابي
          </Text>
        </View>
        <View
          style={[
            styles.vectorGroup,
            styles.parentPosition,
            styles.parentPosition1,
          ]}
        >
          <Image
            style={[styles.vectorIcon2, styles.vectorIconPosition]}
            resizeMode="cover"
            source={require("../assets/vector2.png")}
          />
          <Text style={[styles.text25, styles.textTypo5, styles.textTypo6]}>
            المساعدة
          </Text>
        </View>
        <View style={styles.bookmarkParent}>
          <Image
            style={[styles.bookmarkIcon, styles.iconLayout]}
            resizeMode="cover"
            source={require("../assets/bookmark.png")}
          />
          <Text style={[styles.text27, styles.textTypo5, styles.textTypo6]}>
            المفضلة
          </Text>
        </View>
        <View style={[styles.messageParent, styles.parentPosition]}>
          <Text style={[styles.message, styles.messageTypo]}>الرئيسية</Text>
          <Image
            style={[styles.homeIcon, styles.iconLayout]}
            resizeMode="cover"
            source={require("../assets/home.png")}
          />
        </View>
        <View
          style={[
            styles.parent3,
            styles.parentPosition,
            styles.parentPosition1,
            styles.parentLayout,
          ]}
        >
          <Text style={[styles.text25, styles.textTypo5, styles.textTypo6]}>
            طلباتي
          </Text>
          <Image
            style={[styles.vectorIcon3, styles.iconLayout]}
            resizeMode="cover"
            source={require("../assets/vector3.png")}
          />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  adPosition: {
    left: 21,
    top: 188,
    width: 388,
  },
  adLayout: {
    height: 161,
    width: 388,
    position: "absolute",
  },
  getLayout: {
    height: 38,
    width: 101,
    position: "absolute",
  },
  messageTypo: {
    color: Color.color1,
    fontWeight: "500",
    fontSize: FontSize.size_lg,
    position: "absolute",
  },
  topPosition: {
    height: 105,
    width: 428,
    left: 0,
    top: 0,
    position: "absolute",
  },
  topItemLayout: {
    height: 24,
    width: 24,
    position: "absolute",
    overflow: "hidden",
  },
  iconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  rightSideIconPosition: {
    top: 17,
    position: "absolute",
  },
  textTypo4: {
    fontWeight: "600",
    letterSpacing: 0,
    textAlign: "center",
    position: "absolute",
  },
  searchLayout: {
    height: 50,
    width: 388,
    position: "absolute",
  },
  parentLayout1: {
    height: 70,
    width: 170,
    top: 393,
  },
  viewPosition: {
    width: 70,
    height: 70,
    left: 0,
    top: 0,
    position: "absolute",
  },
  groupPosition: {
    bottom: "17.14%",
    right: "0%",
    top: "15.71%",
    height: "67.14%",
    position: "absolute",
  },
  textClr: {
    color: Color.black,
    textAlign: "left",
  },
  textTypo3: {
    lineHeight: 24,
    fontSize: FontSize.size_3xl,
    color: Color.black,
    fontFamily: FontFamily.cairo,
    position: "absolute",
  },
  textTypo1: {
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.cairo,
    position: "absolute",
  },
  textTypo2: {
    top: "48.94%",
    fontSize: FontSize.size_base,
    color: Color.black,
    lineHeight: 24,
    fontWeight: "300",
    textAlign: "left",
  },
  containerPosition: {
    left: 25,
    position: "absolute",
  },
  cardPosition: {
    left: "5.63%",
    right: "6.98%",
    width: "87.39%",
    height: "13.69%",
    position: "absolute",
  },
  card2ChildPosition: {
    bottom: "0%",
    height: "100%",
    left: "0%",
    top: "0%",
    right: "0%",
    position: "absolute",
    width: "100%",
  },
  detailPosition: {
    bottom: "15.5%",
    position: "absolute",
  },
  detailPosition1: {
    top: "54.26%",
    height: "30.23%",
    bottom: "15.5%",
  },
  childPosition: {
    borderRadius: Border.br_sm,
    bottom: "0%",
    height: "100%",
    left: "0%",
    top: "0%",
    right: "0%",
    position: "absolute",
    width: "100%",
  },
  whatsappLayout: {
    height: 109,
    width: 109,
    position: "absolute",
  },
  textPosition1: {
    top: 14,
    color: Color.black,
    fontSize: FontSize.size_3xl,
    fontFamily: FontFamily.cairo,
    position: "absolute",
  },
  textTypo: {
    opacity: 0.8,
    color: Color.tomato,
    top: 14,
    fontSize: FontSize.size_3xl,
    textAlign: "right",
    fontFamily: FontFamily.cairo,
    position: "absolute",
  },
  itemPosition: {
    left: 269,
    height: 109,
    width: 109,
    top: 10,
    borderRadius: Border.br_md,
    position: "absolute",
  },
  textPosition: {
    top: 44,
    fontSize: FontSize.size_base,
    color: Color.black,
    fontFamily: FontFamily.cairo,
    position: "absolute",
  },
  textTypo5: {
    color: Color.blackAndWhiteB7B7B7,
    fontWeight: "500",
    textAlign: "center",
  },
  parentPosition: {
    bottom: "21.25%",
    position: "absolute",
  },
  parentPosition1: {
    top: "22.5%",
    height: "56.25%",
    bottom: "21.25%",
  },
  parentLayout: {
    width: "8.18%",
    top: "22.5%",
    height: "56.25%",
  },
  vectorIconPosition: {
    bottom: "55.56%",
    height: "44.44%",
    top: "0%",
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  textTypo6: {
    fontSize: FontSize.size_lg,
    left: "0%",
    color: Color.blackAndWhiteB7B7B7,
    fontFamily: FontFamily.cairo,
    fontWeight: "500",
    position: "absolute",
  },
  maskGroup81: {
    display: "none",
    borderRadius: Border.br_lg,
  },
  adChild: {
    backgroundColor: Color.color1,
    left: 0,
    top: 0,
    borderRadius: Border.br_lg,
  },
  getStartedChild: {
    backgroundColor: Color.blackAndWhiteWhite,
    borderRadius: Border.br_md,
    left: 0,
    top: 0,
  },
  getStarted1: {
    left: 16,
    textAlign: "left",
    fontFamily: FontFamily.poppins,
    color: Color.color1,
    top: 10,
  },
  getStarted: {
    top: 103,
    left: 230,
    display: "none",
  },
  text: {
    top: 66,
    left: 192,
    fontSize: 24,
    lineHeight: 30,
    color: "#f5f5f5",
    fontFamily: FontFamily.cairo,
    textAlign: "left",
    position: "absolute",
  },
  topChild: {
    borderColor: "#00abb9",
    borderWidth: 1,
    backgroundColor: Color.color,
    borderStyle: "solid",
    height: 105,
    width: 428,
  },
  menuIcon: {
    top: 61,
    left: 385,
  },
  notchIcon: {
    top: -2,
    right: 81,
    bottom: 16,
    left: 81,
    display: "none",
  },
  rightSideIcon: {
    right: 15,
    width: 67,
    height: 11,
  },
  text1: {
    top: 1,
    fontSize: FontSize.defaultBoldSubheadline_size,
    lineHeight: 20,
    fontFamily: FontFamily.defaultBoldSubheadline,
    color: Color.snow,
    height: 20,
    textAlign: "center",
    width: 54,
    left: 0,
  },
  time: {
    borderRadius: 24,
    height: 21,
    width: 54,
    left: 0,
    top: 0,
    position: "absolute",
  },
  leftSide: {
    left: 24,
    height: 21,
    width: 54,
    top: 12,
    position: "absolute",
  },
  statusBarIphoneXOrNewe: {
    width: 381,
    height: 44,
    left: 20,
    top: 0,
    position: "absolute",
    overflow: "hidden",
  },
  text2: {
    top: 62,
    left: 249,
    fontSize: 18,
    lineHeight: 22,
    color: Color.blackAndWhiteWhite,
    textAlign: "center",
    fontFamily: FontFamily.cairo,
  },
  notiIcon: {
    height: "22.86%",
    width: "5.61%",
    top: "57.14%",
    right: "87.15%",
    bottom: "20%",
    left: "7.24%",
  },
  topItem: {
    top: 60,
    left: 67,
  },
  searchBarChild: {
    borderRadius: 15,
    shadowColor: "rgba(183, 183, 183, 0.1)",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 10,
    elevation: 10,
    shadowOpacity: 1,
    backgroundColor: Color.blackAndWhiteWhite,
    left: 0,
    top: 0,
  },
  searchBar: {
    left: 0,
    top: 0,
  },
  path215Icon: {
    height: "21.71%",
    width: "2.75%",
    top: "38%",
    right: "5.5%",
    bottom: "40.29%",
    left: "91.75%",
  },
  path216Icon: {
    height: "7.13%",
    width: "0.9%",
    top: "54.88%",
    right: "5.15%",
    bottom: "37.99%",
    left: "93.94%",
  },
  text3: {
    left: 259,
    textAlign: "right",
    color: Color.blackAndWhiteB7B7B7,
    fontWeight: "300",
    fontSize: FontSize.size_xl,
    top: 12,
    fontFamily: FontFamily.cairo,
    position: "absolute",
  },
  searchBarParent: {
    top: 120,
    left: 20,
  },
  groupChild: {
    backgroundColor: Color.color,
    borderRadius: Border.br_lg,
  },
  icons8BabysRoom1: {
    left: 18,
    width: 34,
    height: 34,
    overflow: "hidden",
  },
  text4: {
    left: "0%",
    top: "0%",
  },
  text5: {
    left: "14.94%",
  },
  group: {
    width: "51.18%",
    left: "48.82%",
  },
  parent: {
    left: 234,
    position: "absolute",
  },
  vectorIcon: {
    height: "47.14%",
    width: "50%",
    top: "27.14%",
    right: "25.71%",
    bottom: "25.71%",
    left: "24.29%",
  },
  text7: {
    left: "9.64%",
  },
  groupView: {
    width: "48.82%",
    left: "51.18%",
  },
  arabsstockP52761LargeRemoveIcon: {
    top: 185,
    width: 171,
    height: 163,
  },
  card2Child: {
    backgroundColor: Color.blackAndWhiteWhite,
    borderRadius: Border.br_md,
  },
  imageIcon: {
    height: "84.5%",
    width: "28.09%",
    top: "7.75%",
    right: "2.58%",
    bottom: "7.75%",
    left: "69.33%",
    borderRadius: Border.br_md,
  },
  priceChild: {
    backgroundColor: Color.purpleEFEEFF,
  },
  text8: {
    top: 8,
    left: 12,
    width: 45,
    height: 21,
  },
  whatsappImage20230122At1: {
    top: 689,
    left: 294,
    borderRadius: Border.br_md,
    display: "none",
  },
  detail: {
    right: "76.29%",
    left: "6.19%",
    width: "17.53%",
  },
  text9: {
    left: 168,
    textAlign: "left",
  },
  text10: {
    left: 75,
  },
  text11: {
    top: 7,
    left: 5,
  },
  price1: {
    height: "27.91%",
    top: "56.59%",
    right: "39.69%",
    left: "42.78%",
    width: "17.53%",
  },
  ratingChild: {
    backgroundColor: Color.orangeFFF8E5,
  },
  text13: {
    width: "53.72%",
    left: "46.28%",
    height: "100%",
    color: Color.black,
    top: "0%",
    fontSize: FontSize.size_xl,
    textAlign: "left",
    fontFamily: FontFamily.poppins,
    position: "absolute",
  },
  starFillIcon: {
    height: "41.42%",
    width: "29.35%",
    top: "23.82%",
    right: "70.65%",
    bottom: "34.76%",
    left: "0%",
  },
  parent1: {
    height: "58.33%",
    width: "58.6%",
    top: "22.22%",
    right: "21.03%",
    bottom: "19.44%",
    left: "20.37%",
    position: "absolute",
  },
  rating: {
    width: "13.92%",
    right: "59.79%",
    left: "26.29%",
  },
  card2Item: {
    backgroundColor: "#ffe1df",
  },
  whatsappImage20230122At1Icon: {
    left: 274,
    top: 10,
    height: 109,
    width: 109,
  },
  text14: {
    left: 178,
    textAlign: "right",
  },
  saveIcon: {
    height: "18.6%",
    width: "6.19%",
    top: "12.4%",
    right: "86.34%",
    bottom: "68.99%",
    left: "7.47%",
  },
  text15: {
    top: 40,
    left: 31,
    color: Color.blackAndWhiteB7B7B7,
    textAlign: "center",
  },
  card2: {
    top: "72.08%",
    bottom: "14.23%",
  },
  text16: {
    left: 175,
    textAlign: "left",
  },
  card3Item: {
    backgroundColor: "#c7f2df",
  },
  text18: {
    left: 165,
    textAlign: "right",
  },
  text19: {
    left: 79,
  },
  card3: {
    top: "56.16%",
    bottom: "30.15%",
  },
  text24: {
    top: 484,
    left: 342,
  },
  child: {
    backgroundColor: Color.blackAndWhiteWhite,
  },
  vectorIcon1: {
    width: "54.29%",
    right: "22.86%",
    left: "22.86%",
  },
  text25: {
    top: "51.11%",
    left: "0%",
    color: Color.blackAndWhiteB7B7B7,
    textAlign: "center",
    fontFamily: FontFamily.cairo,
  },
  vectorParent: {
    right: "60.75%",
    left: "31.07%",
  },
  vectorIcon2: {
    width: "44%",
    right: "28%",
    left: "28%",
  },
  vectorGroup: {
    width: "11.68%",
    right: "75.7%",
    left: "12.62%",
    top: "22.5%",
    height: "56.25%",
  },
  bookmarkIcon: {
    height: "49.1%",
    width: "39.76%",
    top: "-2.31%",
    right: "30.69%",
    bottom: "53.21%",
    left: "29.55%",
  },
  text27: {
    top: "49.1%",
    left: "0%",
    color: Color.blackAndWhiteB7B7B7,
    textAlign: "center",
    fontFamily: FontFamily.cairo,
  },
  bookmarkParent: {
    height: "54.03%",
    width: "10.28%",
    top: "25%",
    right: "28.74%",
    bottom: "20.97%",
    left: "60.98%",
    position: "absolute",
  },
  message: {
    top: "47.62%",
    left: "0%",
    textAlign: "center",
    fontFamily: FontFamily.cairo,
  },
  homeIcon: {
    height: "52.38%",
    width: "53.85%",
    top: "-2.38%",
    right: "23.08%",
    bottom: "50%",
    left: "23.08%",
  },
  messageParent: {
    height: "52.5%",
    width: "9.11%",
    top: "26.25%",
    right: "12.85%",
    left: "78.04%",
  },
  vectorIcon3: {
    height: "44.98%",
    width: "47.77%",
    right: "26.51%",
    bottom: "55.02%",
    left: "25.71%",
    top: "0%",
  },
  parent3: {
    right: "45.79%",
    left: "46.03%",
  },
  view2: {
    height: "8.49%",
    width: "96.4%",
    top: "89.81%",
    right: "3.6%",
    bottom: "1.7%",
    left: "0%",
    position: "absolute",
  },
  pressable: {
    borderRadius: 32,
    backgroundColor: Color.snow,
    borderColor: "#2e2e2e",
    borderWidth: 8,
    flex: 1,
    height: 942,
    overflow: "hidden",
    width: "100%",
    borderStyle: "solid",
  },
});

export default Screen1;
