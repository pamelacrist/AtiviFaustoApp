import { React, useState, useEffect } from 'react';
import { View, TextInput, Button, Alert,ImageBackground } from 'react-native';
import fundo from '../../assets/fundo.png';
//import  AsyncStorage  from '@react-native-async-storage/async-storage';
import { useRoute, useNavigation } from '@react-navigation/native';
import auth, { db } from "../config/firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { deleteDoc } from "firebase/firestore";
const CadastroItemScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const productId = route.params ? route.params.productId : null;
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [avaliacao, setAvaliacao] = useState('');
    const [categoria, setCategoria] = useState('');
    const [fotos, setFotos] = useState([]);
    
    useEffect(() => {
        const loadProduto = async () => {
            try {
                console.log(productId)
                console.log(productId)
                if(productId){
                    const docSnap = await getDoc(doc(db, "produtos", productId));
                    if (docSnap.exists()) {
                        const produto = docSnap.data();
                        setNome(produto.nome||'');
                        setDescricao(produto.descricao||'');
                        setValor(produto.valor||'');
                        setCategoria(produto.categoria||'');
                        setFotos(produto.fotos || []);
                    }
                }
            } catch (error) {
                console.log('Erro ao carregar o produto.',error);
                Alert.alert('Erro ao carregar o produto.');
            }
        };

        loadProduto();
    }, [productId]);
    const handleRemove = async () => {
        try {
            if (productId) {
                await deleteDoc(doc(db, "produtos", productId));
                console.log('Produto removido com sucesso!');
                navigation.navigate('ProdutosScreen');
            } else {
                Alert.alert('Erro ao remover o produto. Produto não encontrado.');
            }
        } catch (error) {
            console.log('Erro ao remover o produto.', error);
            Alert.alert('Erro ao remover o produto.');
        }
    };
    const handleSubmit = async () => {
        try {
            const id = productId || Math.random().toString(36).substring(2);
            console.log(id);
            const produto = { productId, nome, descricao, valor, avaliacao, categoria, fotos };
            await setDoc(doc(db, "produtos", id), produto);

            // Verificar se o documento foi salvo
            const docSnap = await getDoc(doc(db, "produtos", id));
            if (docSnap.exists()) {
                console.log('Produto salvo com sucesso!');
            } else {
                console.log('Erro ao salvar o produto.',docSnap);
            }
        } catch (error) {
            console.log('Erro ao salvar o produto.',error);
            Alert.alert('Erro ao salvar o produto.');
        }
        navigation.navigate('ProdutosScreen');
    };
    return (

        <ImageBackground source={fundo} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 10, width: '80%' }}>
                <TextInput 
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingLeft: 10 }} 
                    placeholder="Nome" 
                    value={nome} 
                    onChangeText={setNome} 
                />
                <TextInput 
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingLeft: 10 }} 
                    placeholder="Descrição" 
                    value={descricao} 
                    onChangeText={setDescricao} 
                />
                <TextInput 
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingLeft: 10 }} 
                    placeholder="Valor" 
                    value={valor} 
                    onChangeText={setValor} 
                    keyboardType="numeric" 
                />
                <TextInput 
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingLeft: 10 }} 
                    placeholder="Categoria" 
                    value={categoria} 
                    onChangeText={setCategoria} 
                />
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingLeft: 10 }} 
                    placeholder="Fotos (separadas por vírgula)"
                    value={fotos.join(', ')}
                    onChangeText={(text) => setFotos(text.split(', '))}
                />
                <Button title="Salvar" onPress={handleSubmit} color="green" />
                {productId && <Button title="Remover" onPress={handleRemove} color="red" />}
            </View>
        </ImageBackground>
    );
};

export default CadastroItemScreen;