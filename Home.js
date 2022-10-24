import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/Octicons';
import Icon3 from 'react-native-vector-icons/Feather';
import History from './History';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentNumber, setCurrentNumber] = useState('');
  const [lastNumber, setLastNumber] = useState('');
  const [operationText, setOperationText] = useState('');
  const [resultText, setResultText] = useState('');
  const [visible, setVisible] = React.useState(false);
  let historyText = ['abc'];
  const historyResult = [];
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

  const styles = StyleSheet.create({
    modalView: {
      backgroundColor: 'white',
      borderRadius: 20,
      height: '80%',
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
    },
    historyList: {
      width: '90%',
    },
    buttonclose: {
      height: '22%',
      backgroundColor: 'white',
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
      width: '100%',
    },
    results: {
      backgroundColor: darkMode ? '#282f3b' : '#f5f5f5',
      maxWidth: '100%',
      minHeight: '35%',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
    },
    resultText: {
      maxHeight: 45,
      color: '#FF6666',
      margin: 15,
      fontSize: 35,
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
      minHeight: '54%',
      flex: 2,
    },
    textButton: {
      color: darkMode ? '#b5b7bb' : '#7c7c7c',
      fontSize: 28,
    },
    buttonClose: {
      marginTop: '6%',
      marginRight: 30,
    },
  });

  const handleInput = (btnPressed) => {
    if (
      btnPressed === '+' ||
      btnPressed === '-' ||
      btnPressed === '*' ||
      btnPressed === '/'
    ) {
      setCurrentNumber(currentNumber + btnPressed);
      return;
    }

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
        } else setLastNumber(currentNumber + '=');
        calculate();
    }
    setCurrentNumber(currentNumber + btnPressed);
  };

  const calculate = () => {
    let lastArr = currentNumber[currentNumber.length - 1];
    if (
      lastArr === '/' ||
      lastArr === '*' ||
      lastArr === '-' ||
      lastArr === '+' ||
      lastArr === '.'
    ) {
      setCurrentNumber(currentNumber);
    } else {
      setOperationText(currentNumber);

      let result = eval(currentNumber).toString();

      setCurrentNumber(result);
      setResultText(result);
    }
  };

  return (
    <View>
      <View style={styles.results}>
        <TouchableOpacity style={styles.themeButton}>
          <Icon
            name={darkMode ? 'light-up' : 'moon'}
            size={24}
            color={darkMode ? 'white' : 'black'}
            onPress={() => (darkMode ? setDarkMode(false) : setDarkMode(true))}
          />
        </TouchableOpacity>

        <View style={styles.themeButton}>
          <Modal animationType="slide" transparent={true} visible={visible}>
            <View>
              <View style={styles.modalView}>
                <ScrollView style={styles.historyList}>
                  <History
                    operationText={historyText[1]}
                    resultText={historyResult[1]}
                  />
                  <History />
                  <History />
                  <History />
                  <History />
                  <History />
                  <History />
                </ScrollView>
                <View style={styles.buttonclose}>
                  <Pressable
                    style={styles.buttonClose}
                    onPress={() => setVisible(false)}
                  >
                    <Icon3 name="trash-2" size={30} />
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
          <TouchableOpacity>
            <Icon2
              name={'history'}
              size={24}
              onPress={() => {
                setVisible(true);
              }}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.historyText}>{lastNumber}</Text>
        <Text style={styles.resultText}>{currentNumber}</Text>
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
