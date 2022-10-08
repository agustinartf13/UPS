import { ActivityIndicator, ScrollView, StyleSheet, Text } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useTailwind } from "tailwind-rn/dist";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { TabStackParamList } from "../navigator/TabNavigator";
import { Image, Input } from "@rneui/themed";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { GET_CUSTOMERS, GET_ORDERS } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import CustomerCard from "../components/CustomerCard";

export type CustomerScreenNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, "Customers">,
  NativeStackNavigationProp<TabStackParamList>
>;

const Customers = () => {
  const tw = useTailwind();
  const navigation = useNavigation<CustomerScreenNavigationProps>();
  const [input, setInput] = useState<string>("");

  const { loading, error, data } = useQuery(GET_CUSTOMERS);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <ScrollView style={{ backgroundColor: "#59c1cc", flex: 1 }}>
      <Image
        source={{ uri: "https://links.papareact.com/3jc" }}
        style={tw("w-full h-64")}
        PlaceholderContent={<ActivityIndicator />}
      />

      <Input
        placeholder="Search by Customer"
        value={input}
        onChangeText={setInput}
        containerStyle={tw("bg-white pt-5 pb-0 px-10")}
      />

      {data?.getCustomers
        ?.filter((customer: CustomerList) =>
          customer.value.name.includes(input)
        )
        .map(({ name: ID, value: { email, name } }: CustomerResponse) => (
          <CustomerCard key={ID} email={email} name={name} userId={ID} />
        ))}
    </ScrollView>
  );
};

export default Customers;

const styles = StyleSheet.create({});
