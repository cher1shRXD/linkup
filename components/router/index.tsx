import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Friends from "../screens/friends";
import FriendDetail from "../stacks/friendDetail";
import Tabs from "../tabs";
import Chat from "../screens/chat";
import ChatRoom from "../stacks/chatRoom";
import OpenChat from "../screens/openChat";
import OpenChatRoom from "../stacks/openchatRoom";
import Settings from "../screens/settings";
import EditProfile from "../stacks/editProfile";
import AddFriend from "../stacks/addFriend";
import Intro from "../auth/intro";
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import tokenStore from "../../store/auth/tokenStore";
import Login from "../auth/login";
import Email from "../auth/email";
import Password from "../auth/password";
import Nickname from "../auth/nickname";
import UserId from "../auth/userId";
import Phone from "../auth/phone";
import Personal from "../auth/personal";
import Notification from "../notification";

const FriendStackScreen = () => {
  const FriendStack = createStackNavigator();

  return (
    <FriendStack.Navigator screenOptions={{ headerShown: false }}>
      <FriendStack.Screen name="Friends" component={Friends} />
      <FriendStack.Screen name="AddFriend" component={AddFriend} />
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
      <FriendStack.Screen name="EditProfileScreen" component={EditProfile} />
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
};

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
      <AuthStack.Screen name="NicknameScreen" component={Nickname} />
      <AuthStack.Screen name="PhoneScreen" component={Phone} />
      <AuthStack.Screen name="LinkupIdScreen" component={UserId} />
      <AuthStack.Screen name="PersonalScreen" component={Personal} />
    </AuthStack.Navigator>
  );
};

const Router = () => {
  const MainStack = createStackNavigator();
  const ACCESS_TOKEN = tokenStore((state) => state.accessToken);
  const navigation = useNavigation<NavigationProp<any>>();

  useFocusEffect(() => {
    if (!ACCESS_TOKEN) {
      navigation.navigate("AuthScreen");
    } else {
      navigation.navigate("TabScreen");
    }
  });

  return (
    <MainStack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: true }}
    >
      <MainStack.Screen name="TabScreen" component={TabScreen} />
      <MainStack.Screen
        name="AuthScreen"
        component={AuthStackScreen}
        options={{ presentation: "transparentModal" }}
      />
      <MainStack.Screen name="NotiScreen" component={Notification} />
      <MainStack.Screen name="FriendDetail" component={FriendDetail} />
    </MainStack.Navigator>
  );
};

export default Router;
