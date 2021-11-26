import { StatusBar } from "expo-status-bar";
import React, { Fragment } from "react";
import { StyleSheet, View } from "react-native";
import Card from "./Card";

export default function App() {
  const item = [
    { name: "Prathamesh",color:"#101010" },
    { name: "Nemade" ,color:"#AAAAAA"},
    { name: "Nikhil" ,color:"#BBBBBB"},
    { name: "Parihar" ,color:"#CCCCCC"},
    { name: "Nayan" ,color:"#EEEEEE"},
  ];
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {item.map((data, index) => (
        <Fragment key={index}>
          <Card {...{ data }} />
        </Fragment>
      ))}
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
