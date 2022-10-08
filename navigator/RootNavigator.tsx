import { StyleSheet } from "react-native";
import React, { useLayoutEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import { useNavigation } from "@react-navigation/native";
import ModalScreen from "../screens/ModalScreen";
import OrderScreen from "../screens/OrdersScreen";
import DetailOrderScreen from "../screens/DetailOrderScreen";

export type RootStackParamList = {
  Main: undefined;
  MyModal: { userId: string; name: string };
  Order: { order: Order };
  DetailOrder: { detailOrder: Order };
};

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen name="Main" component={TabNavigator} />
      </Stack.Group>

      <Stack.Group screenOptions={{ presentation: "transparentModal" }}>
        <Stack.Screen
          name="MyModal"
          component={ModalScreen}
          options={{ headerShown: false }}
        />
      </Stack.Group>

      <Stack.Group>
        <Stack.Screen name="DetailOrder" component={DetailOrderScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default RootNavigator;

const styles = StyleSheet.create({});
