import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Friends from "../screens/friends";
import FriendDetail from "../screens/friends/stack/friendDetail";
import Tabs from "../tabs";
import Chat from "../screens/chat";
import ChatRoom from "../screens/chat/stack/chatRoom";
import OpenChat from "../screens/openChat";
import OpenChatRoom from "../screens/openChat/stack/openchatRoom";
import Settings from "../screens/settings";
import SettingDetail from "../screens/settings/stack/settingDetail";
import AddFriend from "../screens/friends/stack/addFriend";

const FriendStackScreen = () => {
  const FriendStack = createStackNavigator();

  return (
    <FriendStack.Navigator screenOptions={{ headerShown: false }}>
      <FriendStack.Screen name="Friends" component={Friends} />
      <FriendStack.Screen name="AddFriend" component={AddFriend} />
      <FriendStack.Screen name="FriendDetail" component={FriendDetail} />
    </FriendStack.Navigator>
  );
};

const ChatStackScreen = () => {
  const FriendStack = createStackNavigator();

  return (
    <FriendStack.Navigator screenOptions={{ headerShown: false }}>
      <FriendStack.Screen name="Chat" component={Chat} />
      <FriendStack.Screen name="ChatRoom" component={ChatRoom} />
    </FriendStack.Navigator>
  );
};

const OpenChatStackScreen = () => {
  const FriendStack = createStackNavigator();

  return (
    <FriendStack.Navigator screenOptions={{ headerShown: false }}>
      <FriendStack.Screen name="OpenChat" component={OpenChat} />
      <FriendStack.Screen name="OpenChatRoom" component={OpenChatRoom} />
    </FriendStack.Navigator>
  );
};

const SettingStackScreen = () => {
  const FriendStack = createStackNavigator();

  return (
    <FriendStack.Navigator screenOptions={{ headerShown: false }}>
      <FriendStack.Screen name="Settings" component={Settings} />
      <FriendStack.Screen name="SettingDetail" component={SettingDetail} />
    </FriendStack.Navigator>
  );
};

const Router = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarStyle: { display: "none" } }}
      tabBar={(props) => <Tabs {...props} />}
    >
      <Tab.Screen name="FriendsScreen" component={FriendStackScreen} />
      <Tab.Screen name="ChatScreen" component={ChatStackScreen} />
      <Tab.Screen name="OpenChatScreen" component={OpenChatStackScreen} />
      <Tab.Screen name="SettingScreen" component={SettingStackScreen} />
    </Tab.Navigator>
  );
};

export default Router;
