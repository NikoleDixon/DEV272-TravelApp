import { useState } from "react";
import { View } from "react-native";
import DestinationCard from "../components/DestinationCard";

export default function TestCards() {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <View style={{ padding: 16 }}>
      <DestinationCard
        name="Tulum"
        country="Mexico"
        category="Beaches"
        imageUrl="https://amanda-wanders.com/wp-content/uploads/2022/11/Tulum-Travel-Guide-Cover.jpg"
        isSaved={isSaved}
        onToggleSave={() => setIsSaved(!isSaved)}
      />
    </View>
  );
}
