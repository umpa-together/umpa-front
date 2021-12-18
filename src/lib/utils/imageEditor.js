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
    images.forEach(({ filename, path }) => {
      arr.push({
        name: filename,
        type: image.mime,
        uri: `file://${path}`,
      });
    });
    setImages(arr);
  });
};

export const onClickCrop = (uri, setImages) => {
  ImagePicker.openCropper({
    path: uri,
    includeBase64: true,
    width: 500,
    height: 500,
  }).then((image) => {
    setImages((prev) => [
      ...prev,
      { name: image.filename, type: image.mime, uri: `file://${image.path}` },
    ]);
  });
};
