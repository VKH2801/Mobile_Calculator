import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Modal,
  ScrollView,
  TextInput,
  LogBox,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/Octicons';

var history = [];
export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentNumber, setCurrentNumber] = useState('');
  const [lastNumber, setLastNumber] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [visible, setVisible] = React.useState(false);
  const [searchResult, setSearchResult] = useState(history);

  const searchFilterFunction = (text) => {
    if (text !== '') {
      const newData = history.filter(function (item) {
        const itemData = item ? item.toLowerCase() : ''.toUpperCase();
        const textData = text.toLowerCase();
        return itemData.indexOf(textData) > -1;
      });
      setSearchResult(newData);
      setSearchValue(text);
    } else {
      setSearchResult(history);
      setSearchValue(text);
    }
  };

  const buttons = [
    'C',
    'DEL',
    '/',
    7,
    8,
    9,
    '*',
    4,
    5,
    6,
    '-',
    1,
    2,
    3,
    '+',
    0,
    '.',
    '=',
  ];

  const handleOpenHistory = () => {
    setSearchResult(history);
    setVisible(true);
  };

  const handleInput = (btnPressed) => {
    switch (btnPressed) {
      case 'DEL':
        setCurrentNumber(currentNumber.substring(0, currentNumber.length - 1));
        return;
      case 'C':
        setLastNumber('');
        setCurrentNumber('');
        return;
      case '=':
        if (currentNumber.length == 0) {
          return;
        } else {
          // setLastNumber(currentNumber + '=');

          calculate();

          return;
        }
    }
    console.log('current number before press: ', currentNumber);
    setCurrentNumber(currentNumber + btnPressed);
    let lastArr = currentNumber[currentNumber.length - 1];
    if (
      btnPressed === '+' ||
      btnPressed === '-' ||
      btnPressed === '*' ||
      btnPressed === '/'
    ) {
      if (
        lastArr === '+' ||
        lastArr === '-' ||
        lastArr === '*' ||
        lastArr === '/'
      ) {
        const newNumber = currentNumber.slice(0, currentNumber.length - 1);
        setCurrentNumber(newNumber + btnPressed);
      }
    }
  };

  function standardizeNumber(string) {
    while (string[0] == 0 && (string[1] == 0 || string[1] != '.')) {
      string = string.slice(1);
    }
    return string;
  }
  function standardizeInput(string) {
    let result = '',
      tmp = '',
      i = 0;
    while (i < string.length) {
      if (string[i] != '+' && string[i] != '-') {
        tmp += string[i];
      } else {
        result += standardizeNumber(tmp) + string[i];
        tmp = '';
      }
      i++;
    }

    result += standardizeNumber(tmp);
    return result;
  }

  const calculate = () => {
    let lastArr = currentNumber[currentNumber.length - 1];
    if (
      lastArr === '/' ||
      lastArr === '*' ||
      lastArr === '-' ||
      lastArr === '+' ||
      lastArr === '.'
    ) {
      Alert.alert('Syntax error!');
      setCurrentNumber('');
      setLastNumber('');
    } else {
      const operation = currentNumber + '=';
      const standardizeInputNumber = standardizeInput(currentNumber);

      let result = eval(standardizeInputNumber).toString();
      setLastNumber(standardizeInputNumber);
      setCurrentNumber(result);
      history.push(operation + result);
    }
  };

  const styles = StyleSheet.create({
    historyContainer: {
      height: 100,
      backgroundColor: darkMode ? '#7b8084' : 'white',
      width: '100%',
      marginTop: 20,
      alignItems: 'flex-end',
      paddingHorizontal: 10,
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#cccccc',
      justifyContent: 'center',
    },
    textInput: {
      height: 50,
      backgroundColor: darkMode ? '#7b8084' : 'white',
      justifyContent: 'center',
      alignItems: 'flex-start',
      borderRadius: 13,
      borderWidth: 1,
      width: '80%',
      paddingHorizontal: 20,
      marginLeft: 10,
      borderColor: darkMode ? '#B5B7BB' : '#7c7c7c',
      color: darkMode ? '#e5e5e5' : 'black',
    },
    searchBar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',

      marginTop: 20,
    },
    modalView: {
      backgroundColor: darkMode ? '#7b8084' : 'white',
      borderRadius: 20,
      height: '75%',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      marginTop: '50%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    historyList: {
      width: '90%',
    },
    buttonclose: {
      height: '22%',
      backgroundColor: darkMode ? '#7b8084' : 'white',
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
      width: '100%',
    },
    results: {
      backgroundColor: darkMode ? '#282f3b' : '#f5f5f5',
      maxWidth: '100%',
      minHeight: '36.5%',
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
    resultText: {
      maxHeight: 100,
      color: '#FF6666',

      fontSize: 35,
      margin: 10,
    },
    textHistory: {
      color: darkMode ? '#e5e5e5' : 'black',
      fontSize: 20,
      marginRight: 10,
      alignSelf: 'flex-end',
    },
    historyText: {
      color: darkMode ? '#B5B7BB' : '#7c7c7c',
      fontSize: 20,
      marginRight: 10,
      alignSelf: 'flex-end',
    },
    themeButton: {
      alignSelf: 'flex-start',
      bottom: '5%',
      margin: 15,
      backgroundColor: darkMode ? '#7b8084' : '#e5e5e5',
      alignItems: 'center',
      justifyContent: 'center',
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    buttons: {
      width: '100%',
      height: '35%',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    button: {
      borderColor: darkMode ? '#3f4d5b' : '#e5e5e5',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: '24%',
      minHeight: '52.5%',
      flex: 2,
    },
    textButton: {
      color: darkMode ? '#b5b7bb' : '#7c7c7c',
      fontSize: 28,
    },
    buttonClose: {
      marginTop: '5%',
      marginRight: 30,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      height: 40,
      width: 100,
      backgroundColor: '#FF6666',
      borderRadius: 10,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.results}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <TouchableOpacity style={styles.themeButton}>
            <Icon
              name={darkMode ? 'light-up' : 'moon'}
              size={24}
              color={darkMode ? 'white' : 'black'}
              onPress={() =>
                darkMode ? setDarkMode(false) : setDarkMode(true)
              }
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.themeButton}>
            <Icon2
              name={'history'}
              size={24}
              onPress={handleOpenHistory}
              color={darkMode ? 'white' : 'black'}
            />
          </TouchableOpacity>
        </View>
        <View style={{ height: '24.5%' }}>
          <Text style={styles.historyText}>{lastNumber}</Text>
          <Text style={styles.resultText}>{currentNumber}</Text>

          {/* <TextInput
            value={currentNumber}
            onChangeText={(text) => setCurrentNumber(text)}
            style={styles.resultText}
            placeholder={currentNumber}
            keyboardType="phone-pad"
          ></TextInput> */}
        </View>
        <Modal animationType="slide" transparent={true} visible={visible}>
          <View>
            <View style={styles.modalView}>
              <View style={styles.searchBar}>
                <Icon2
                  name="search"
                  size={30}
                  color={darkMode ? 'white' : 'black'}
                />
                <TextInput
                  value={searchValue}
                  onChangeText={(text) => searchFilterFunction(text)}
                  style={styles.textInput}
                />
              </View>
              <ScrollView style={styles.historyList}>
                {searchResult.length == 0 ? (
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 300,
                    }}
                  >
                    <Text
                      style={{
                        color: darkMode ? 'white' : 'black',
                        fontSize: 30,
                        alignSelf: 'center',
                      }}
                    >
                      No history
                    </Text>
                  </View>
                ) : (
                  <>
                    {searchResult.map((item) => {
                      return (
                        <View style={styles.historyContainer}>
                          <Text style={styles.textHistory}>{item}</Text>
                        </View>
                      );
                    })}
                  </>
                )}
              </ScrollView>
              <View style={styles.buttonclose}>
                <TouchableOpacity
                  style={styles.buttonClose}
                  onPress={() => [setVisible(false), setSearchValue('')]}
                >
                  <Text style={{ fontSize: 18, color: 'white' }}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
      <View style={styles.buttons}>
        {buttons.map((btn) =>
          btn === '=' ||
          btn === '/' ||
          btn === '*' ||
          btn === '-' ||
          btn === '+' ? (
            <TouchableOpacity
              key={btn}
              style={[styles.button, { backgroundColor: '#FF6666' }]}
              onPress={() => handleInput(btn)}
            >
              <Text
                style={[styles.textButton, { color: 'white', fontSize: 28 }]}
              >
                {btn}
              </Text>
            </TouchableOpacity>
          ) : btn === 0 ? (
            <TouchableOpacity
              key={btn}
              style={[
                styles.button,
                {
                  backgroundColor:
                    typeof btn === 'number'
                      ? darkMode
                        ? '#303946'
                        : '#fff'
                      : darkMode === true
                      ? '#414853'
                      : '#ededed',
                  minWidth: '36%',
                },
              ]}
              onPress={() => handleInput(btn)}
            >
              <Text style={styles.textButton}>{btn}</Text>
            </TouchableOpacity>
          ) : btn === '.' || btn === 'DEL' ? (
            <TouchableOpacity
              key={btn}
              style={[
                styles.button,
                {
                  backgroundColor:
                    btn === '.'
                      ? darkMode
                        ? '#303946'
                        : '#fff'
                      : darkMode === true
                      ? '#414853'
                      : '#ededed',
                  minWidth: '37%',
                },
              ]}
              onPress={() => handleInput(btn)}
            >
              <Text style={styles.textButton}>{btn}</Text>
            </TouchableOpacity>
          ) : btn === 'C' ? (
            <TouchableOpacity
              key={btn}
              style={[
                styles.button,
                {
                  backgroundColor:
                    typeof btn === 'number'
                      ? darkMode
                        ? '#303946'
                        : '#fff'
                      : darkMode === true
                      ? '#414853'
                      : '#ededed',
                  minWidth: '36%',
                },
              ]}
              onPress={() => handleInput(btn)}
            >
              <Text style={styles.textButton}>{btn}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              key={btn}
              style={[
                styles.button,
                {
                  backgroundColor:
                    typeof btn === 'number'
                      ? darkMode
                        ? '#303946'
                        : '#fff'
                      : darkMode === true
                      ? '#414853'
                      : '#ededed',
                },
              ]}
              onPress={() => handleInput(btn)}
            >
              <Text style={styles.textButton}>{btn}</Text>
            </TouchableOpacity>
          )
        )}
      </View>
    </View>
  );
}

LogBox.ignoreAllLogs();
