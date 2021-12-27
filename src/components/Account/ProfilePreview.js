import React, { useState, useContext, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Context as UserContext } from 'context/UserContext';
import ProfileImage from 'widgets/ProfileImage';
import { tmpWidth } from 'components/FontNormalize';
import { onClickSingle } from 'lib/utils/imageEditor';

const ProfilePreview = ({ img }) => {
  const { state } = useContext(UserContext);
  const [image, setImage] = useState({
    name: '',
    uri: state.myInfo.profileImage,
    type: 'image/jpeg',
  });

  const onClickChange = () => {
    onClickSingle(setImage);
  };

  useEffect(() => {
    img.name = image.name;
    img.type = image.type;
    img.uri = image.uri;
  }, [image]);

  return (
    <View style={styles.container}>
      <ProfileImage img={image.uri} imgStyle={styles.profileImage} />
      <TouchableOpacity onPress={onClickChange}>
        <Text style={styles.text}>프로필 사진 바꾸기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 24 * tmpWidth,
    alignItems: 'center',
  },
  profileImage: {
    width: 108 * tmpWidth,
    height: 108 * tmpWidth,
    borderRadius: 108 * tmpWidth,
  },
  text: {
    fontSize: 13 * tmpWidth,
    fontWeight: '700',
    color: '#8bc0ff',
    marginTop: 12 * tmpWidth,
    marginBottom: 28 * tmpWidth,
  },
});

export default ProfilePreview;
