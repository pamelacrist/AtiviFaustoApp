import React, { useState, useEffect, useCallback } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  ImageBackground,
  Dimensions,
  Button,
} from "react-native";
import { Card } from "react-native-elements";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import {
  collection,
  query,
  getDocs,
  orderBy,
  startAfter,
  limit,
} from "firebase/firestore";
import { db } from "../config/firebase";

const ProdutosScreen = () => {
  const [produtos, setProdutos] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const navigation = useNavigation();
  const windowWidth = Dimensions.get("window").width;
  const fetchProdutos = async (afterDoc) => {
    console.log("Buscando produtos...");
    let produtosQuery = query(
      collection(db, "produtos"),
      orderBy("nome"),
      limit(30)
    );
    if (afterDoc) {
      produtosQuery = query(
        collection(db, "produtos"),
        orderBy("nome"),
        startAfter(afterDoc),
        limit(30)
      );
    }
    const produtosSnapshot = await getDocs(produtosQuery);
    const lastVisible = produtosSnapshot.docs[produtosSnapshot.docs.length - 1];
    if (lastVisible !== undefined) {
      const produtosSalvos = produtosSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log("Produtos encontrados:", produtosSalvos);
      console.log("Last visible:", lastVisible);
      setProdutos((prevProdutos) => [...prevProdutos, ...produtosSalvos]);
    }
    setLastDoc(lastVisible);
  };
  useFocusEffect(
    useCallback(() => {
      setProdutos([]);
      setLastDoc(null);
      fetchProdutos();
    }, [])
  );

  const handleLoadMore = () => {
    fetchProdutos(lastDoc);
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={{ marginTop: 10 }}
        data={produtos}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2} // Adicione esta linha
        renderItem={({ item: produto, index }) => (
          <TouchableOpacity
            style={{ width: "45%", height: 200, margin: 5 }} // Ajuste a largura e a margem para acomodar duas colunas
            onPress={() =>
              navigation.navigate("CadastroItemScreen", {
                productId: produto.id,
              })
            }
          >
            {produto.fotos && produto.fotos.length > 0 && (
              <View>
                <Image
                  source={{ uri: produto.fotos[0] }}
                  style={{ width: "100%", height: "300%", borderRadius: 10 }}
                />
                <View
                  style={{
                    width: "100%",
                    padding: 10,
                  }}
                >
                  <Text style={{ fontWeight: "bold" }}>
                    {" "}
                    {produto.nome} - {`R$ ${produto.valor}`}
                  </Text>
                </View>
              </View>
            )}
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={{
          position: "absolute", // Posiciona o botão absolutamente
          bottom: 20, // 20 pixels do fundo da tela
          right: 20, // 20 pixels da direita da tela
          backgroundColor: "green", // Fundo verde
          padding: 10, // Espaçamento interno de 10 pixels
          borderRadius: 5, // Bordas arredondadas
        }}
        onPress={() => navigation.navigate("CadastroItemScreen")}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>
          Adicionar Produto
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProdutosScreen;
