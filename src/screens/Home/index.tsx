import { useState } from "react";
import { Alert, FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Participant } from "../../components/Participant";
import { styles } from "./styles";

export default function Home() {
  // const participants = [ "Rodrigo", "Diego", "Myke", "Ana", "Amanda", "Dayane", "Debora", "Daniela", "Arthur"]

  const [participants, setParticipants] = useState<string[]>([]);
  const [participantName, setParticipantName] = useState(""); // Não preciso definir com type, pois já faz uma inferência;

  function handleParticipantAdd(){
    if(participants.includes(participantName)) {
      return Alert.alert("Participant existe", "Ja existe na lista um participante com esse nome")
    }

    setParticipants(prevState => [...prevState, participantName]);
    setParticipantName('')
  }

  function handleParticipantRemove(name: string) {
    Alert.alert("Remover", `Deseja mesmo remover o  participante ${name} ?`, [
      {
        text: "Sim",
        onPress: () => setParticipants(prevState => 
          prevState.filter(participant => participant !== name))
      },
      {
        text: "Não",
        style: 'cancel',
      }
    ])
  }


  return(
    <View style={styles.container}>
      <Text style={styles.eventName}>
        Nome do Evento
      </Text>
      <Text style={styles.eventDate}>
        Quinta, 24 de Abril de 2024.
      </Text>

      <View style={styles.form}>
        <TextInput 
          style={styles.input}
          placeholder="Digite aqui o nome do participante"
          placeholderTextColor={'#6b6b6b'}
          onChangeText={setParticipantName}
          value={participantName}
        />

        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>
            +
          </Text>
        </TouchableOpacity>
      </View>

    <FlatList
      data={participants}
      keyExtractor={item => item}
      renderItem={({ item }) => (
        <Participant
          key={item + 'id'}
          name={item}
          onRemove={() => handleParticipantRemove(item)}
        />
      )}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={ () => (
        <Text style={styles.listEmptyText}>
          Ninguém chegou no evento ainda? Adicione participantes a sua lista de presença.
        </Text>
      )}
    />
    </View>
  )
}