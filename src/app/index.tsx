import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ControlScreen } from "../screens/ControlScreen";

export default function Index() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#121212" }}>
      <StatusBar barStyle="light-content" />
      <ControlScreen />
    </SafeAreaView>
  );
}
