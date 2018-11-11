import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

import { AlertProvider, AlertConsumer } from "./src/components/GlobalAlerts";

class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Global Alerts</Text>
        <Button
          title="Top"
          onPress={() =>
            this.props.alert({
              title: "Title",
              body: "This Body Text",

              display: "top",
              ctaText: "Confirm",
              ctaOnPress: () => alert("pressed cta"),
              theme: "error" // or success
            })
          }
        />
        <Button
          title="Modal"
          onPress={() =>
            this.props.alert({
              title: "Bottom",
              body: "Body Text",
              display: "bottom",
              ctaText: "Confirm",
              ctaOnPress: () => alert("pressed cta")
            })
          }
        />
        <Button
          title="Bottom"
          onPress={() =>
            this.props.alert({
              title: "Modal",
              body: "Body Text",
              display: "modal",
              ctaText: "Confirm",
              ctaOnPress: () => alert("pressed cta")
            })
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF11190",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default () => (
  <AlertProvider
    customStyles={{
      error: {
        container: {
          backgroundColor: "#cc0000"
        },
        text: {},
        button: {}
      },
      success: {
        container: {
          backgroundColor: "#4bb543"
        }
      }
    }}
  >
    <AlertConsumer>{({ alert }) => <App alert={alert} />}</AlertConsumer>
  </AlertProvider>
);
