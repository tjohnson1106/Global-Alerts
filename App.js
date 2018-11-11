import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

import { AlertProvider, AlertConsumer } from "./src/components/GlobalAlerts";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fa7E2175",
    alignItems: "center",
    justifyContent: "center"
  }
});

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
              body: "This body text",
              display: "top", // bottom, top, modal
              // display: 'modal',
              ctaText: "Confirm",
              ctaOnPress: () => alert("pressed cta"),
              theme: "success" // success, error
            })
          }
        />
        <Button
          title="Modal"
          onPress={() =>
            this.props.alert({
              title: "Title",
              body: "This body text",
              display: "modal", // bottom, top, modal
              // display: 'modal',
              ctaText: "Confirm",
              ctaOnPress: () => alert("pressed cta")
            })
          }
        />
        <Button
          title="Bottom"
          onPress={() =>
            this.props.alert({
              title: "Title",
              body: "This body text",
              display: "bottom", // bottom, top, modal
              // display: 'modal',
              ctaText: "Confirm",
              ctaOnPress: () => alert("pressed cta")
            })
          }
        />
      </View>
    );
  }
}

export default () => (
  <AlertProvider
    customStyles={{
      error: {
        container: {
          backgroundColor: "#cc0000"
        },
        text: {
          color: "#fff"
        },
        button: {}
      },
      success: {
        container: {
          backgroundColor: "#00E4FF"
        },
        text: {
          color: "#fff",
          fontWeight: "bold",
          fontSize: 24
        },
        title: {},
        body: {}
      }
    }}
  >
    <AlertConsumer>{({ alert }) => <App alert={alert} />}</AlertConsumer>
  </AlertProvider>
);

// import React, { Component } from "react";
// import { StyleSheet, Text, View, Button } from "react-native";

// import { AlertProvider, AlertConsumer } from "./src/components/GlobalAlerts";

// class App extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text>Global Alerts</Text>
//         <Button
//           title="Top"
//           onPress={() =>
//             this.props.alert({
//               title: "Title",
//               body: "This Body Text",

//               display: "top",
//               ctaText: "Confirm",
//               ctaOnPress: () => alert("pressed cta"),
//               theme: "error" // or success
//             })
//           }
//         />
//         <Button
//           title="Modal"
//           onPress={() =>
//             this.props.alert({
//               title: "Bottom",
//               body: "Body Text",
//               display: "bottom",
//               ctaText: "Confirm",
//               ctaOnPress: () => alert("pressed cta")
//             })
//           }
//         />
//         <Button
//           title="Bottom"
//           onPress={() =>
//             this.props.alert({
//               title: "Modal",
//               body: "Body Text",
//               display: "modal",
//               ctaText: "Confirm",
//               ctaOnPress: () => alert("pressed cta")
//             })
//           }
//         />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FFF11190",
//     alignItems: "center",
//     justifyContent: "center"
//   }
// });

// export default () => (
//   <AlertProvider
//     customStyles={{
//       error: {
//         container: {
//           backgroundColor: "#cc0000"
//         },
//         text: {
//           color: "#fff"
//         },

//         button: {}
//       },
//       success: {
//         container: {
//           backgroundColor: "#4bb543"
//         },
//         text: {
//           color: "#fff",
//           fontWeight: "bold",
//           fontSize: 24
//         }
//       }
//     }}
//   >
//     <AlertConsumer>{({ alert }) => <App alert={alert} />}</AlertConsumer>
//   </AlertProvider>
// );
