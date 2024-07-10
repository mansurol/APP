import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Details from "../Src/Component/Details";
import Notices from "../Src/Component/Notices";

const Stack = createNativeStackNavigator();

const StackNav = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Notices"
      component={Notices}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Details"
      component={Details}
      options={{ headerTitle: "" }}
    />
  </Stack.Navigator>
);

export default StackNav;
