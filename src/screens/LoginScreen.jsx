import { View, ImageBackground } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useState } from "react";
import styles from "../config/styles";
import { Image } from "expo-image";
import { signInWithEmailAndPassword } from "firebase/auth";
import auth , { db } from "../config/firebase";
import { getDoc, doc } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const fazerLogin = async () => {
    // console.log(email, senha);
    try {
      const usuario = await signInWithEmailAndPassword(auth, email, senha);
      // Buscar o usuário do Firestore
      const docRef = doc(db, "usuarios", usuario.user.uid);
      const docSnap = await getDoc(docRef);
      // Verificar se o documento existe
      if (docSnap.exists) {
        // Salvar o usuário no AsyncStorage
        await AsyncStorage.setItem('usuario', JSON.stringify(docSnap.data()));
      } else {
        console.log('Nenhum usuário encontrado!');
      }
      navigation.navigate("TabNavigator");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ImageBackground 
  source={require("../../assets/imagem.png")} 
  style={{ flex: 1, width: '100%', height: '100%' }}
>
  <View style={styles.container}>
    <View style={styles.innerContainer}>
      <Image
        source={require("../../assets/logo.png")}
        style={{ width: 200, height: 200, alignSelf: "center" }}
      />
     <Text variant="headlineLarge" style={{...styles.selfCenter, color: '#FFFFFF'}}>
        Faça seu login
    </Text>
      
      <TextInput
        placeholder="Email"
        mode="outlined"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        style={{ marginBottom: 10 }} // Adiciona espaço abaixo deste TextInput
      />
      <TextInput
        placeholder="Senha"
        mode="outlined"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />
      <Button onPress={() => navigation.navigate("RegistroScreen")}>
        <Text style={{color: '#FFFFFF'}}>Registre-se</Text>
      </Button>
      <Button
        mode="contained"
        style={{
          marginTop: 10,
          maxWidth: 260,
          alignSelf: "flex-end",
        }}
        labelStyle={{ color: '#FFFFFF' }}
        onPress={fazerLogin}
>
        Entrar
      </Button>
    </View>
  </View>
</ImageBackground>
  );
}