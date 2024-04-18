import { React, useState, useEffect } from "react";
import { Text, View, TouchableOpacity, FlatList, Image } from "react-native";
import { Card } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import {
  collection,
  query,
  getDocs,
  orderBy,
  startAfter,
  limit,
} from "firebase/firestore";
import { db } from "../config/firebase";

function HomeScreen() {
  const [produtos, setProdutos] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const navigation = useNavigation();

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

  useEffect(() => {
    fetchProdutos();
  }, []);

  const handleLoadMore = () => {
    fetchProdutos(lastDoc);
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={{ marginTop: 10 }}
        data={produtos}
        keyExtractor={(item, index) => index.toString()}
        horizontal={true} // Faz a lista ser horizontal
        pagingEnabled={true} // Habilita a paginação
        renderItem={({ item: produto, index }) => (
          <TouchableOpacity
            style={{ width: 200, height: 200, margin: 10 }} // Adiciona margem
            onPress={() =>
              navigation.navigate("ProdutoScreen", { productId: produto.id })
            }
          >
            {produto.fotos && produto.fotos.length > 0 && (
              <View>
                <Image
                  source={{ uri: produto.fotos[0] }}
                  style={{ width: "100%", height: "200%", borderRadius: 10 }}
                />
                <View
                  style={{
                    width: "100%",
                    padding: 10,
                  }}
                >
                  <Text
                    style={{ fontWeight: "bold" }}
                  >{`R$ ${produto.valor}`}</Text>
                  <Text>{produto.nome}</Text>
                </View>
              </View>
            )}
          </TouchableOpacity>
        )}
      />
      <FlatList
        style={{ marginTop: 10 }}
        data={produtos}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2} // Adicione esta linha
        renderItem={({ item: produto, index }) => (
          <TouchableOpacity
            style={{ width: "45%", height: 200, margin: 5 }} // Ajuste a largura e a margem para acomodar duas colunas
            onPress={() =>
              navigation.navigate("ProdutoScreen", {
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
    </View>
  );
}

export default HomeScreen;
