
import { TailwindProvider } from "tailwind-rn";
import utilities from "./tailwind.json";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./navigator/RootNavigator";
import { ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://public6811b14a84beb446.stepzen.net/api/oily-ladybird/__graphql',
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <TailwindProvider utilities={utilities}>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </ApolloProvider>
    </TailwindProvider>
  );
}