import {
 View,
 Text
} from "react-native";

import { useLocalSearchParams } from "expo-router";

import { satellites } from "../data/satellites";

export default function SatelliteDetails() {

 const { satelliteId } =
 useLocalSearchParams();

 const satellite =
 satellites.find(
   sat => sat.id === satelliteId
 );

 return (

   <View>

     <Text>{satellite.nome}</Text>

     <Text>
       ID: {satellite.id}
     </Text>

     <Text>
       Data da missão:
       {satellite.dataMissao}
     </Text>

     <Text>
       Periastro:
       {satellite.periastro} km
     </Text>

     <Text>
       Apoastro:
       {satellite.apoastro} km
     </Text>

     <Text>
       Direção:
       {satellite.direcao}
     </Text>

     <Text>
       Energia:
       {satellite.energia.tipo}
     </Text>

     <Text>
       Produção:
       {satellite.energia.producao}
       kW
     </Text>

     <Text>
       Temperatura:
       {
         satellite.sensores
         .temperatura
       }°C
     </Text>

     <Text>
       Radiação:
       {
         satellite.sensores
         .radiacao
       }
     </Text>

   </View>

 );
}