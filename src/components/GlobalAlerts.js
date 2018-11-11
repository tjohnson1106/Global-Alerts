import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Button,
  Animated,
  Dimensions
} from "react-native";
// iphone X series fix
import SafeAreaView from "react-native-safe-area-view";

const w = Dimensions.get("window");

const styles = StyleSheet.create({
  alertContainer: {
    backgroundColor: "#fafbfc",
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  top: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#e1e4e8"
  },
  bottom: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    borderTopWidth: 1,
    borderTopColor: "#e1e4e8"
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  modal: {
    backgroundColor: "#fafbfc",
    paddingHorizontal: 20,
    marginHorizontal: 10
  },
  title: {
    fontSize: 20
  },
  body: {
    fontSize: 16
  }
});

export const AlertContext = React.createContext({});

export const AlertConsumer = AlertContext.Consumer;

const initialState = {
  visible: false,
  title: "",
  body: "",
  ctaOnPress: null,
  ctaText: "",
  contentHeight: w.height,
  theme: null
};

export class AlertProvider extends Component {
  state = initialState;

  animatedValue = new Animated.Value(0);

  alert = ({
    title = "",
    body = "",
    display = "bottom", // top, modal
    ctaText = "",
    ctaOnPress = null,
    theme = null
  }) => {
    this.setState(
      {
        title,
        body,
        visible: true,
        display,
        ctaText,
        ctaOnPress
      },
      () => {
        Animated.timing(this.animatedValue, {
          toValue: 1,
          useNativeDriver: true,
          duration: 150
        }).start();
      }
    );
  };

  close = () => {
    Animated.timing(this.animatedValue, {
      toValue: 0,
      useNativeDriver: true,
      duration: 150
    }).start(() => {
      this.setState({
        ...initialState
      });
    });
  };
  _onLayout = ({ nativeEvent }) => {
    const height = nativeEvent.layout.height;

    this.setState({
      contentHeight: height
    });
  };

  getCustomStyles = () => {
    // set on state in alert
    const { customStyles } = this.props;
    const { theme } = this.state;

    const container = [];

    if (theme) {
      const themeStyles = customStyles[theme]; // {}, "error"
      container.push(themeStyles.container);
    }

    return { container };
  };

  renderBody = () => {
    const { title, body, ctaText, ctaOnPress } = this.state;
    return (
      <React.Fragment>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.body}>{body}</Text>
        {ctaOnPress && (
          <Button
            title={ctaText}
            onPress={() => {
              ctaOnPress();
              this.close();
            }}
          />
        )}
      </React.Fragment>
    );
  };

  renderModal = () => {
    const modalStyles = [
      styles.modal,
      {
        opacity: this.animatedValue,
        transform: [
          {
            scale: this.animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [0.5, 1]
            })
          }
        ]
      }
    ];

    modalStyles.push();

    return (
      <TouchableWithoutFeedback onPress={this.close}>
        <View style={styles.modalStyles}>
          <Animated.View style={styles.modal}>{this.renderBody()}</Animated.View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  otherThanModal = () => {
    const { display, contentHeight } = this.state;

    const forceInset = {};

    const containerStyles = [styles.alertContainer];

    if (display === "bottom") {
      containerStyles.push(styles.bottom);
      containerStyles.push({
        transform: [
          {
            translateY: this.animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [contentHeight, 0]
            })
          }
        ]
      });

      forceInset.bottom = "always";
    } else if (display === "top") {
      containerStyles.push(styles.top);
      containerStyles.push({
        transform: [
          {
            translateY: this.animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [-contentHeight, 0]
            })
          }
        ]
      });
      forceInset.top = "always";
    }

    const { container } = this.getCustomStyles();

    return (
      <Animated.View style={styles.containerStyles} onLayout={this._onLayout}>
        <TouchableWithoutFeedback onPress={this.close}>
          <SafeAreaView forceInset={forceInset}>{this.renderBody()}</SafeAreaView>
        </TouchableWithoutFeedback>
      </Animated.View>
    );
  };

  render() {
    const { visible, display } = this.state;

    return (
      <AlertContext.Provider
        value={{
          alert: this.alert
        }}
      >
        {this.props.children}
        {visible && display === "modal" && this.renderModal()}
        {visible && display !== "modal" && this.otherThanModal()}
      </AlertContext.Provider>
    );
  }
}
