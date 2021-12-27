import React, { useEffect } from 'react';
import { TextInput, StyleSheet, Keyboard } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { tmpWidth } from 'components/FontNormalize';
import { useDaily } from 'providers/daily';

const CreateTitle = () => {
  const { informationRef, validity, setValidity, title, setTitle } = useDaily();

  const onChangeTitle = (text) => {
    setTitle(text);
    informationRef.current.title = text;
    if (informationRef.current.title !== '' && !validity.title) {
      setValidity((prev) => ({
        ...prev,
        title: true,
      }));
    }
  };

  useEffect(() => {
    setTitle(informationRef.current.title);
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ height: 200 * tmpWidth }}>
      <TextInput
        value={title}
        onChangeText={(text) => onChangeTitle(text)}
        placeholder="데일리를 기록해 주세요."
        multiline
        placeholderTextColor={validity.title ? 'rgb(196,196,196)' : 'rgb(238, 98, 92)'}
        autoCapitalize="none"
        autoCorrect={false}
        style={[
          title.length === 0 ? styles.input : styles.inputtext,
          !validity.title && styles.warning,
        ]}
      />
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 70 * tmpWidth,
    marginLeft: 18 * tmpWidth,
    marginRight: 18 * tmpWidth,
    fontSize: 18 * tmpWidth,
    fontWeight: '700',
    paddingBottom: 14 * tmpWidth,
  },
  inputtext: {
    height: 70 * tmpWidth,
    marginLeft: 18 * tmpWidth,
    marginRight: 18 * tmpWidth,
    fontSize: 14 * tmpWidth,
    fontWeight: '300',
    paddingBottom: 14 * tmpWidth,
  },
  warning: {
    borderBottomColor: 'rgb(238, 98, 92)',
  },
});

export default CreateTitle;
