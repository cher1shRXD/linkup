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
import Intro from "../auth/intro";
import { NavigationProp, useFocusEffect, useNavigation } from "@react-navigation/native";
import tokenStore from "../../store/auth/tokenStore";
import Login from "../auth/login";
import Email from "../auth/email";
import Password from "../auth/password";
import Name from "../auth/name";
import Nickname from "../auth/nickname";
import Phone from "../auth/phone";
import Personal from "../auth/personal";

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

const TabScreen = () => {
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
}

const AuthStackScreen = () => {
  const AuthStack = createStackNavigator();

  return (
    <AuthStack.Navigator
      screenOptions={{ gestureEnabled: false, headerShown: false }}
    >
      <AuthStack.Screen name="AuthIntro" component={Intro} />
      <AuthStack.Screen name="LoginScreen" component={Login} />
      <AuthStack.Screen name="EmailScreen" component={Email} />
      <AuthStack.Screen name="PasswordScreen" component={Password} />
      <AuthStack.Screen name="NameScreen" component={Name} />
      <AuthStack.Screen name="PhoneScreen" component={Phone} />
      <AuthStack.Screen name="NicknameScreen" component={Nickname} />
      <AuthStack.Screen name="PersonalScreen" component={Personal} />
    </AuthStack.Navigator>
  );
}

const Router = () => {
  const MainStack = createStackNavigator();
  const ACCESS_TOKEN = tokenStore((state) => state.accessToken);
  const navigation = useNavigation<NavigationProp<any>>();

  useFocusEffect(() => {
    if (!ACCESS_TOKEN) {
      navigation.navigate("AuthScreen");
    }else{
      navigation.navigate("TabScreen");
    }
  });

  return (
    <MainStack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: false }}
    >
      <MainStack.Screen name="TabScreen" component={TabScreen} />
      <MainStack.Screen name="AuthScreen" component={AuthStackScreen} options={{presentation:'transparentModal'}}/>
    </MainStack.Navigator>
  );
};

export default Router;
