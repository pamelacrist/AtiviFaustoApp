import { useEffect, useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { View, Text, Image, Button, TouchableOpacity } from "react-native";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import ParallaxHeader from "react-native-parallax-header";
const ProdutoScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { productId } = route.params;
  const [produto, setProduto] = useState(null);
  const [quantidade, setQuantidade] = useState(1); // Mova esta linha para aqui

  useEffect(() => {
    const fetchProduto = async () => {
      const produtoDocument = await getDoc(doc(db, "produtos", productId));
      const produto = produtoDocument.data();
      setProduto(produto);
    };

    fetchProduto();
  }, [productId]);

  if (!produto) {
    return <Text>Carregando...</Text>;
  }

  const content = (
    <View style={{ height: 300 }}>
      <Text style={{ fontWeight: "bold" }}>{produto.nome}</Text>
      <Text>{produto.descricao}</Text>
      <Text>R$ {parseFloat(produto.valor).toFixed(2)}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <ParallaxHeader
        headerMinHeight={60}
        headerMaxHeight={200}
        extraScrollHeight={20}
        navbarColor="transparent"
        backgroundImage={{ uri: produto.fotos[0] }}
        backgroundImageScale={1.2}
        renderNavBar={() => <Text />}
        renderContent={() => content}
      />
      <View
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
          backgroundColor: "#fff",
          borderTopWidth: 1, // Adiciona a linha horizontal
          borderTopColor: "#000", // Define a cor da linha
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => setQuantidade(Math.max(1, quantidade - 1))}
          >
            <Text>-</Text>
          </TouchableOpacity>
          <Text> {quantidade} </Text>
          <TouchableOpacity onPress={() => setQuantidade(quantidade + 1)}>
            <Text>+</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Button
            title={`Adicionar  R$ ${(
              parseFloat(produto.valor) * quantidade
            ).toFixed(2)}`}
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>
    </View>
  );
};

export default ProdutoScreen;
