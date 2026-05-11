import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

const socket = io ('https://squarewebsocketbackend.onrender.com'), {
  transports: ['websocket']
}



export default function App() {

  const [nome, setNome] = useState('');
  const [entrou, setEntrou] = useState('false');
  const [usuarios, setUsuarios] = useState([]);
  const [id, setId] = useState(null);

  useEffect(() => {
      socket.on('player', (id) => {
        setId(id);
      });

      socket.on('update', (users) => {
        setUsuarios(users);
      });

      return () => {
        socket.off('player');
        socket.off('update');
      }

  }, []);

    if (entrou == false) {
      return (
          <View>
            <Text>Digite seu nome:</Text>
            <TextInput
              value={nome}
              onChangeText={(novoTexto) => setNome(novoTexto)}
            >
            </TextInput>
            <TouchableOpacity>
              <Text onPress>Entrar</Text>
            </TouchableOpacity>
          </View>
        );
    }
    else{
      return(
        <View>
        </View
      );
    }
  
}
