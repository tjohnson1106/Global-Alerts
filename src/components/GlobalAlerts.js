import React, { Component } from "react";
import { View } from "react-native";

const AlertContext = React.createContext({});

export const AlertConsumer = AlertContext.Consumer;

export class AlertProvider extends Component {
  alert = () => alert("alert");
  render() {
    return (
      <AlertConsumer.Provider
        value={{
          alert: this.alert
        }}
      >
        {this.props.children}
      </AlertConsumer.Provider>
    );
  }
}
