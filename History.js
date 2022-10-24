import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const History = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.text}>
        <Text style={{ fontSize: 18 }}>{props.operation}</Text>
      </View>
      {/* <View style={styles.result}>
        <Text style={{ fontSize: 30 }}>20</Text>
      </View> */}
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
  container: {
    height: 100,
    backgroundColor: 'white',
    width: '100%',
    marginTop: 20,
    alignItems: 'flex-end',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  text: {
    flex: 5,
    justifyContent: 'center',
  },
  result: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
