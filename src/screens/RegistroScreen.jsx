import { View ,ImageBackground} from "react-native";
import { Button, Text, TextInput, RadioButton  } from "react-native-paper";
import { useState } from "react";
import styles from "../config/styles";
import { Image } from "expo-image";
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth, { db } from "../config/firebase";
import { setDoc, doc } from "firebase/firestore";

export default function RegistroScreen({ navigation }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [tipo, setTipo] = useState("cliente");

  const cadastrarUsuario = async () => {
    try {
      const usuario = await createUserWithEmailAndPassword(auth, email, senha);
      console.log(usuario);
      const uid = await usuario.user.uid;
      try {
        await setDoc(doc(db, "usuarios", uid), {
          nome: nome,
          email: email,
          tipo: tipo,
        });
      } catch (error) {
        console.error("Erro ao salvar usuário:", error);
      }

      navigation.navigate("LoginScreen");
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
        
        <View style={{ backgroundColor: '#FFFFFF', borderRadius: 10 }}>
 
        <Text variant="headlineLarge" style={{...styles.selfCenter}}>
          Faça seu Cadastro
        </Text>
        <Text variant="bodySmall" style={{...styles.selfCenter}}>
          Utilize seus dados pessoais
        </Text>

        <TextInput
          label="Nome"
          mode="outlined"
          value={nome}
          onChangeText={setNome}
        />

        <TextInput
          label="Email"
          mode="outlined"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          label="Senha"
          mode="outlined"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />
        <RadioButton.Group onValueChange={newValue => setTipo(newValue)} value={tipo}>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text>Cliente</Text>
              <RadioButton value="cliente" />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text>Loja</Text>
              <RadioButton value="loja" />
            </View>
          </View>
        </RadioButton.Group>
       
        </View>
        <Button
        mode="contained"
        style={{
          marginTop: 10,
          maxWidth: 260,
          alignSelf: "flex-end",
        }}
        labelStyle={{ color: '#FFFFFF' }}
          onPress={cadastrarUsuario}
        >
          Cadastrar
        </Button>
      </View>
    </View>
    
</ImageBackground>
  );
}
