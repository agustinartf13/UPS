import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";

import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
} from "@react-navigation/native";
import { RootStackParamList } from "../navigator/RootNavigator";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTailwind } from "tailwind-rn/dist";
import useOrders from "../hooks/useOrders";
import { Button, Image } from "@rneui/themed";
import OrderCard from "../components/OrderCard";

type OrderScreenNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<RootStackParamList>,
  NativeStackNavigationProp<RootStackParamList, "Order">
>;

const Orders = () => {
  const tw = useTailwind();
  const navigation = useNavigation<OrderScreenNavigationProps>();
  const { loading, error, orders } = useOrders();
  const [ascending, setAscending] = useState<boolean>(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <ScrollView contentContainerStyle={{ backgroundColor: "#EB6A7C", flex: 1 }}>
      <Image
        source={{ uri: "https://links.papareact.com/m51" }}
        containerStyle={tw("w-full h-64")}
        PlaceholderContent={<ActivityIndicator />}
      />
      <View>
        <View style={tw("py-2 px-4")}>
          <Button
            color="pink"
            titleStyle={{ color: "gray", fontWeight: "400" }}
            onPress={() => setAscending(!ascending)}
          >
            {ascending ? "Showing: Oldest First" : "Showing: Most Recent First"}
          </Button>
        </View>

        {orders
          ?.sort((a, b) => {
            if (ascending) {
              return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
            } else {
              return new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1;
            }
          })
          .map((order) => (
            <OrderCard key={order.trackingId} item={order} />
          ))}
      </View>
    </ScrollView>
  );
};

export default Orders;

const styles = StyleSheet.create({});
