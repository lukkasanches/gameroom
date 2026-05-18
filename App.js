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

    function entrouGameRoom(){
      if (!nome){
        return;
      }

      socket.emit("join", nome);
      setEntrou(true);
    }

    function movimentar(dx, dy){
      const usuario = usuarios.find(user => user.id ==id);

      if(!usuario){
        console.log("Usuário não encontrado");
        return;
      }

      socket.emit("move", {
        x: usurario.x + dx,
        y: usurario.y + dy
      })
    }
    




    if (entrou == false) {
      return (
          <View>
            <Text>Digite seu nome:</Text>
            <TextInput
              value={nome}
              onChangeText={(novoTexto) => setNome(novoTexto)}
            >
            </TextInput>
            <TouchableOpacity onPress={entrouGameRoom}>
              <Text>Entrar</Text>
            </TouchableOpacity>
          </View>
        );
    }
    else{
      return(
        <View>

            <View>
              {
                usuarios.map(usurario => (
                    <View>
                      <Text>{usuarios.nome}</Text>
                    </View>
                ))
              }
            </View>

              <TouchableOpacity onPress={() => movimentar (0, -20)} >
                <text>Cima</text>
              </TouchableOpacity>

            <View>
              <TouchableOpacity onPress={() => movimentar (20, 0)} >
                <text>Esquerda</text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => movimentar (-20, 0)} >
                <text>Direita</text>
              </TouchableOpacity>
            </View>

              <TouchableOpacity onPress={() => movimentar (0, 20)} >
                <text>Baixo</text>
              </TouchableOpacity>
            
        </View>
      );
    }
}
