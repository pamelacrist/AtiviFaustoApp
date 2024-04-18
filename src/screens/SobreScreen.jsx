import { ScrollView, Text, View } from "react-native";
import { styles } from "../config/styles";

export default function SobreScreen() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.innerContainer}>
          <Text style={styles.h1}>Sobre o App</Text>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nibh
            elit, sagittis in pharetra eu, congue non diam. Vivamus elementum
            nulla et nunc feugiat, sit amet finibus tellus tempor. In laoreet
            elit ac elit venenatis, id molestie diam tincidunt. Phasellus nec
            risus quis arcu bibendum dapibus. Phasellus finibus quam fermentum
            quam hendrerit volutpat. Curabitur convallis semper metus, in mattis
            tortor suscipit sit amet. Praesent eleifend nunc varius nisi
            facilisis consectetur. Suspendisse placerat lectus tempus facilisis
            dictum. Interdum et malesuada fames ac ante ipsum primis in
            faucibus. Fusce pretium hendrerit risus eget aliquet. In dapibus
            purus vitae purus elementum euismod. Maecenas tristique massa et
            elit aliquet vehicula quis ac leo. Nunc porta lectus in nibh feugiat
            luctus. Nulla facilisi. Integer pharetra tellus mauris, vitae
            imperdiet urna eleifend eget. Cras mattis turpis ut elit egestas, id
            condimentum nisi hendrerit. Quisque erat orci, ullamcorper id ornare
            nec, feugiat in tellus. Fusce a mi ligula. Donec id dui ligula.
            Mauris a efficitur nibh. Sed ut gravida diam, eget sagittis magna.
            Duis non pretium ex. Sed et nisl eget nibh sagittis rutrum. Cras in
            lorem eu purus tincidunt egestas. Integer ac rhoncus nulla. Nulla
            facilisi. Nullam et pulvinar dolor. Cras suscipit diam velit, vitae
            imperdiet libero sodales ac. Vestibulum ante ipsum primis in
            faucibus orci luctus et ultrices posuere cubilia curae; Donec
            gravida imperdiet nibh. Mauris in arcu nulla. Suspendisse porttitor
            nibh tortor, at ultricies urna auctor id. Vestibulum ante ipsum
            primis in faucibus orci luctus et ultrices posuere cubilia curae;
            Nulla condimentum dolor neque, et faucibus augue vestibulum ac.
            Mauris aliquet, ipsum a fringilla pulvinar, tellus ligula rutrum
            massa, ac rhoncus neque justo ac sem. Phasellus a lectus
            condimentum, consequat arcu ut, aliquam augue.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}