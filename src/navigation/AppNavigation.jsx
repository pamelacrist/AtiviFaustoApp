import * as React from "react";
import  { useEffect } from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import ProdutosScreen from "../screens/ProdutosScreen";
import CadastroItemScreen from "../screens/CadastroItemScreen";
import LoginScreen from "../screens/LoginScreen";
import RegistroScreen from "../screens/RegistroScreen";
import AsyncStorage  from '@react-native-async-storage/async-storage';
import ProdutoScreen from "../screens/ProdutoScreen";
import Icon from 'react-native-vector-icons/Ionicons';


const Stack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

function TabNavigator() {
  const [initialRoute, setInitialRoute] = React.useState("HomeScreen");
  const [isLoja, setIsLoja] = React.useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await AsyncStorage.getItem('usuario');
      if (user !== null) {
        // O usuário existe, verificar o tipo
        const { tipo } = JSON.parse(user);
        if (tipo === 'loja') {
          // Se o tipo do usuário for 'loja', definir a rota inicial para 'ProdutosScreen'
          setInitialRoute('ProdutosScreen');
          setIsLoja(true);
        }
      }
      
    };

    fetchUser();
  }, []);

  return (
    <Tab.Navigator initialRouteName={initialRoute}>
      <Tab.Screen
       name="HomeScreen"
       component={HomeScreen}
       options={{
         title: "Página Inicial",
         tabBarIcon: ({ color, size }) => (
           <Icon name="home" color={color} size={size} /> // Adicione o ícone
         ),
         headerShown: false,
       }}
      />
      {isLoja && (
        <Tab.Screen
        name="ProdutosScreen"
        component={ProdutosScreen}
        options={{
          title: "Produtos",
          tabBarIcon: ({ color, size }) => (
            <Icon name="cube" color={color} size={size} /> // Altere o ícone para uma caixa
          ),
          headerShown: true,
        }}
      />
      )}
    </Tab.Navigator>
  );
}
export default function AppNavigation() {
  return (
    
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{
              title: "Login",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="RegistroScreen"
            component={RegistroScreen}
            options={{
              title: "Registrar-se",
              // headerShown: false,
            }}
          />
          <Stack.Screen
            name="ProdutoScreen"
            component={ProdutoScreen}
            options={{
              title: "Produto",
              headerShown: true,
            }}
          />
           <Stack.Screen
            name="CadastroItemScreen"
            component={CadastroItemScreen}
            options={{
              title: "Cadastrar Item",
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="EditarItemScreen"
            component={CadastroItemScreen}
            options={{
              title: "Editar Item",
              headerShown: true,
            }}
          />
           <Stack.Screen
            name="TabNavigator" // como se fosse um id da tela
            component={TabNavigator}
            options={{
              title: "Início",
              headerShown: false,
            }}
          />
   
        </Stack.Navigator>
    </NavigationContainer>
  );
}