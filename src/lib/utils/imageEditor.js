import ImagePicker from 'react-native-image-crop-picker';

const MAX_FILES = 5;

export const onClickCamera = (setImages) => {
  ImagePicker.openCamera({
    width: 500,
    height: 500,
    cropping: true,
  }).then((image) => {
    setImages((prev) => [
      ...prev,
      { name: image.filename, type: image.mime, uri: `file://${image.path}` },
    ]);
  });
};

export const onClickSingle = (setImages) => {
  ImagePicker.openPicker({
    width: 500,
    height: 500,
    includeBase64: true,
    mediaType: 'photo',
  }).then((image) => {
    setImages({ name: image.filename, type: image.mime, uri: `file://${image.path}` });
  });
};

export const onClickMultiple = (setImages) => {
  ImagePicker.openPicker({
    width: 500,
    height: 500,
    multiple: true,
    includeBase64: true,
    mediaType: 'photo',
    maxFiles: MAX_FILES,
  }).then((images) => {
    const arr = [];
    images.forEach(({ filename, path, mime }) => {
      arr.push({
        name: filename,
        type: mime,
        uri: `file://${path}`,
      });
    });
    setImages(arr);
  });
};

export const onClickCrop = (setImages) => {
  ImagePicker.openPicker({
    width: 375,
    height: 120,
    cropping: true,
  }).then((image) => {
    setImages({ name: image.filename, type: image.mime, uri: `file://${image.path}` });
  });
};
