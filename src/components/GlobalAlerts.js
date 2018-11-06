import React, { Component } from "react";
import { View, StyleSheet, Text, SafeAreaView } from "react-native";

const AlertContext = React.createContext({});

export const AlertConsumer = AlertContext.Consumer;

export class AlertProvider extends Component {
  state = {
    visible: false,
    title: "",
    body: ""
  };

  alert = ({
    title = "",
    body = "",
    display = "bottom", // top, modal
    ctaText = "",
    ctaOnPress = null
  }) => {
    // alert("alert");

    this.setState({
      title,
      body,
      visible: true
    });
  };
  render() {
    const { title, body, visible, display } = this.state;

    const containerStyles = [styles.alertContainer];

    if (display === "bottom") {
      containerStyles.push(styles.bottom);
    } else if (display === "top") {
      containerStyles.push(styles.top);
    } else if (display === "modal") {
      containerStyles.push(styles.modal);
    }

    return (
      <AlertConsumer.Provider
        value={{
          alert: this.alert
        }}
      >
        {this.props.children}
        {visible && (
          <View style={containerStyles}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.body}>{body}</Text>
          </View>
        )}
      </AlertConsumer.Provider>
    );
  }
}

const styles = StyleSheet.create({
  alertContainer: {
    backgroundColor: "#fafbfc",
    paddingHorizontal: 20,
    paddingVertical: 60
  },

  top: {},
  bottom: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    borderTopWidth: 1,
    borderTopColor: "#e1e4e8"
  },
  modal: {},
  title: {
    fontSize: 20
  },

  body: {
    fontSize: 16
  }
});
