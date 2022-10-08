import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Customers from "../screens/CustomersScreen";
import Orders from "../screens/OrdersScreen";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";

export type TabStackParamList = {
  Customers: undefined;
  Orders: undefined;
};

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor:
          (route.name === "Customers" && "#59c1cc") ||
          (route.name === "Orders" && "#eb6a7c"),
        tabBarInactiveTintColor: "gray",
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Customers") {
            return (
              <Icon
                name="users"
                type="entypo"
                color={focused ? "#59c1cc" : "grey"}
              />
            );
          } else if (route.name === "Orders") {
            return (
              <Icon
                name="box"
                type="entypo"
                color={focused ? "#eb6a7c" : "grey"}
              />
            );
          }
        },
      })}
    >
      <Tab.Screen
        name="Customers"
        component={Customers}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Orders"
        component={Orders}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({});
