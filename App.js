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
              body: "Body Text",

              display: "top",
              ctaText: "Confirm",
              ctaOnPress: () => alert("pressed cta")
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default () => (
  <AlertProvider>
    <AlertConsumer>{({ alert }) => <App alert={alert} />}</AlertConsumer>
  </AlertProvider>
);
