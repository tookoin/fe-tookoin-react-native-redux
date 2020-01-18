import React, { Component } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Icon } from 'react-native-elements';
import IconFA from 'react-native-vector-icons/FontAwesome';


import {
  Home,
  HomeBuyer,
  MyOrder,
  Cart,
  Login,
  Register,
  Profile,
  InboxBuyer,
  DetailProdukBuyer,
  DaftarAlamatBuyer,
  ProductCategory,
  InboxSeller,
  HomeSeller,
  AddProduct,
  Etalase,
  EditProfile
} from '../screens/index';

const StackAuth = createStackNavigator(
  {
    Login,
    Register,
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
  },
);

const StackProfile = createStackNavigator(
  {
    Profile,
    DaftarAlamatBuyer,
  },
  {
    initialRouteName: 'Profile',
    headerMode: 'none',
  },
);

const StackAuthAndProfile = createSwitchNavigator(
  {
    StackAuth,
    StackProfile,
  },
  {
    initialRouteName: 'StackAuth',
    headerMode: 'none',
  },
);

const StackHomeBuyer = createStackNavigator(
  {
    HomeBuyer,
    InboxBuyer,
    MyOrder,
    Cart,
    DetailProdukBuyer,
    ProductCategory,
  },
  {
    initialRouteName: 'HomeBuyer',
    // initialRouteName: 'Profile',
    // initialRouteName: 'InboxBuyer',
    // initialRouteName: 'DetailProdukBuyer',
    // initialRouteName: 'DaftarAlamatBuyer',
    // initialRouteName: 'ProductCategory',
    headerMode: 'none',
  },
);

StackHomeBuyer.navigationOptions = ({ navigation }) => {
  let tabBarVisible;
  if (navigation.state.routes.length > 1) {
    navigation.state.routes.map(route => {
      if (route.routeName === 'DetailProdukBuyer') {
        tabBarVisible = false;
      } else {
        tabBarVisible = true;
      }
    });
  }
  return {
    tabBarVisible,
  };
};

// const StackHome = createStackNavigator(
//   {
//     HomeBuyer,
//     InboxBuyer,
//     Profile,
//     MyOrder,
//     DetailProdukBuyer,
//   },
//   {
//     // initialRouteName: 'HomeBuyer',
//     // initialRouteName: 'Profile',
//     // initialRouteName: 'InboxBuyer',
//     initialRouteName: 'HomeBuyer',
//     headerMode: 'none',
//   },
// );

const StackHomeSeller = createStackNavigator(
  {
    HomeSeller,
    Home,
    AddProduct,
    EditProfile,
  },
  {
    initialRouteName: "EditProfile",
    //initialRouteName: "AddProduct",
    // initialRouteName: 'ProfileSeller',
    InboxSeller,
    Home,
    Etalase,
    headerMode: 'none',
  },
  {
    initialRouteName: 'HomeSeller',
    // initialRouteName: 'Profile',
    // initialRouteName: 'InboxBuyer',
    // initialRouteName: 'DetailProdukBuyer',
    // initialRouteName: 'DaftarAlamatBuyer',
    // initialRouteName: 'ProductCategory',
    headerMode: 'none',
  },
);

const RouteTab = createBottomTabNavigator(
  {
    HomeBuyer: {
      screen: StackHomeBuyer,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <IconFA name="shopping-bag" size={22} color={tintColor} />
        ),
        tabBarLabel: 'Shop',
      },
    },
    MyOrder: {
      screen: MyOrder,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="receipt" size={24} color={tintColor} />
        ),
        tabBarLabel: 'My Order',
      },
    },
    Cart: {
      screen: Cart,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name="shopping-cart"
            type="font-awesome"
            size={26}
            color={tintColor}
          />
        ),
        tabBarLabel: 'Cart',
      },
    },
    Notification: {
      screen: InboxBuyer,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name="notifications"
            type="material"
            size={26}
            color={tintColor}
          />
        ),
        tabBarLabel: 'Notifications',
      },
    },

    Profile: {
      screen: StackAuthAndProfile,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="user" type="font-awesome" size={24} color={tintColor} />
        ),
      },
    },
  },
  {
    initialRouteName: 'HomeBuyer',
    tabBarOptions: {
      activeTintColor: '#00B444',
    },
  },
);

const RouteTab2 = createBottomTabNavigator(
  {
    HomeSeller: {
      screen: Etalase,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <IconFA name="shopping-bag" size={22} color={tintColor} />
        ),
        tabBarLabel: 'My Store',
      },
    },
    InboxSeller: {
      screen: InboxSeller,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="receipt" size={24} color={tintColor} />
        ),
        tabBarLabel: 'Transaction',
      },
    },
    ProfileSeller: {
      screen: HomeSeller,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="user" type="font-awesome" size={24} color={tintColor} />
        ),
        tabBarLabel: 'Profile',
      },
    },
  },
  {
    initialRouteName: 'HomeSeller',
    tabBarOptions: {
      activeTintColor: '#00B444',
    },
  },
);

const Router = createSwitchNavigator(
  {
    // StackAuth,
    // StackHome,
    StackHomeSeller,
    RouteTab,
    RouteTab2,
  },
  {
    initialRouteName: 'StackHomeSeller',
    //initialRouteName: 'RouteTab2',
    headerMode: 'none',
  },
);

export default createAppContainer(Router);
