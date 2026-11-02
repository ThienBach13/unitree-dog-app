import { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GO2_KILLSWITCH_PORT, GO2_ROBOT_IP } from "../constants/networkConfig";

export const ControlScreen = () => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const triggerKillswitch = async (): Promise<void> => {
    setIsProcessing(true);
    try {
      const endpoint = `http://${GO2_ROBOT_IP}:${GO2_KILLSWITCH_PORT}/kill`;

      const response = await fetch(endpoint, {
        method: "POST",
      });

      if (response.ok) {
        Alert.alert("TRIGGERED", "The killswitch was successfully activated.");
      } else {
        Alert.alert(
          "FAILED",
          `Robot received command but returned status: ${response.status}`,
        );
      }
    } catch (error) {
      Alert.alert(
        "NETWORK ERROR",
        `Could not connect to ${GO2_ROBOT_IP}. Ensure the hotspot is active and the robot is connected.`,
      );
      console.error("Killswitch network error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Go2 Control Center</Text>

      <TouchableOpacity
        style={styles.killButton}
        onPress={triggerKillswitch}
        disabled={isProcessing}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>
          {isProcessing ? "SENDING..." : "EMERGENCY STOP (LIE DOWN)"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 50,
  },
  killButton: {
    backgroundColor: "#ff0000",
    width: 250,
    height: 250,
    borderRadius: 125,
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
    shadowColor: "#ff0000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "900",
    textAlign: "center",
    padding: 20,
  },
});
