import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import useCustomerOrders from "../hooks/useCustomerOrders";
import { useTailwind } from "tailwind-rn/dist";
import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
} from "@react-navigation/native";
import { CustomerScreenNavigationProps } from "../screens/CustomersScreen";
import { Card, Icon } from "@rneui/themed";
import { RootStackParamList } from "../navigator/RootNavigator";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type Props = {
  userId: string;
  name: string;
  email: string;
};

type ModalScreenNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<RootStackParamList>,
  NativeStackNavigationProp<RootStackParamList, "MyModal">
>;

export type ModalScreenRouteProp = RouteProp<RootStackParamList, "MyModal">;

const CustomerCard = ({ email, name, userId }: Props) => {
  const { loading, error, orders } = useCustomerOrders(userId);
  const tw = useTailwind();
  const navigation = useNavigation<ModalScreenNavigationProps>();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("MyModal", { name: name, userId: userId })
      }
    >
      <Card containerStyle={tw("p-5 rounded-lg")}>
        <View>
          <View style={tw("flex-row justify-between")}>
            <View>
              <Text style={tw("text-2xl font-bold")}>{name}</Text>
              <Text style={[tw("text-sm"), { color: "#59C1CC" }]}>
                ID: {userId}
              </Text>
            </View>
            <View style={tw("flex-row items-center justify-end")}>
              <Text style={{ color: "#59C1CC" }}>
                {loading ? "loading..." : `${orders.length} x`}
              </Text>
              <Icon
                style={tw("mb-5 ml-auto")}
                name="box"
                type="entypo"
                color="#59C1CC"
                size={50}
              />
            </View>
          </View>
        </View>
        <Card.Divider />
        <Text>{email}</Text>
      </Card>
    </TouchableOpacity>
  );
};

export default CustomerCard;

const styles = StyleSheet.create({});
