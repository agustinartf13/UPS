import { StyleSheet, View } from "react-native";
import React, { useLayoutEffect } from "react";
import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RootStackParamList } from "../navigator/RootNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTailwind } from "tailwind-rn/dist";
import DeliveryCard from "../components/DeliveryCard";

type OrderScreenNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<RootStackParamList>,
  NativeStackNavigationProp<RootStackParamList, "DetailOrder">
>;

export type OrdersScreenRouteProp = RouteProp<
  RootStackParamList,
  "DetailOrder"
>;

const DetailOrderScreen = () => {
  const tw = useTailwind();
  const navigation = useNavigation<OrderScreenNavigationProps>();
  const {
    params: { detailOrder },
  } = useRoute<OrdersScreenRouteProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: detailOrder.trackingItems.customer.name,
      headerTintColor: "#EB6A7C",
      headerTitleStyle: { color: "black" },
      headerBackTitle: "Deliveries",
    });
  });

  return (
    <View style={tw("-mt-2")}>
      <DeliveryCard order={detailOrder} fullWidth />
    </View>
  );
};

export default DetailOrderScreen;

const styles = StyleSheet.create({});
