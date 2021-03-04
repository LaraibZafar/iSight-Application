import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";

import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";

export default function App() {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const takeImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 0,
      base64: true,
    });
    console.log(result);

    if (!result.cancelled) {
      // Response = await fetch("192.168.10.4:4000/", {
      //   method: "GET",
      // });
      setImage(result.uri);
      // return fetch("192.168.10.4:4000/")
      //   .then((response) => response.json())
      //   .then((responseJson) => {
      //     console.log(responseJson);
      //   });
      //console.log(Response);

      fetch("http://192.168.10.4:4000/api/posts/image", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          result: result,
        }),
      })
        .then((response) => {
          console.log(response);
          return response.json;
        })
        .catch((error) => console.warn("fetch error:", error));

      // try {
      //   let res = await fetch("192.168.10.4:4000/api/posts/image", {
      //     method: "POST",
      //     headers: {
      //       Accept: "application/json",
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       result,
      //     }),
      //   });
      //   res = await res.json();
      //   console.log(res);
      // } catch (e) {
      //   console.error(e);
      // }
    }
  };
  const onButtonSubmit = () => {
    fetch("https://creepy-goosebumps-16308.herokuapp.com/imageCheck", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input:
          "https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/03/GettyImages-1092658864_hero-1024x575.jpg?w=1155&h=1528",
      }),
    }).then((response) => console.log(response.json()));
  };

  const onButtonSubmit2 = () => {
    fetch("http://192.168.10.4:4000/api/posts/image", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input:
          "https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/03/GettyImages-1092658864_hero-1024x575.jpg?w=1155&h=1528",
      }),
    }).then((response) => console.log(response.json()));
  };
  return (
    <View style={styles.container}>
      <Button onPress={() => takeImage()} title="Cuck"></Button>
      <StatusBar style="auto" />
      <Image style={{ width: 66, height: 58 }} source={{ uri: image }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
