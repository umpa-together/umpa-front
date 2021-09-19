import ImagePicker from 'react-native-image-crop-picker';
import CameraRoll from "@react-native-community/cameraroll";

const MAX_FILES = 5
const FIRST_ALBUM_NUM = 10

export const getTotal = (album, setAlbum) => {
    CameraRoll.getPhotos({first: 1000, after: album.after })
    .then(({edges, page_info})=>{
        const newCount = edges.length;
        const nextPage = page_info.has_next_page;
        const after = page_info.end_cursor;
        setAlbum((prev) => ({total: prev.total + newCount, next: nextPage, after: after}));
    })
}

export const getQuickPhoto = (setImages) => {
    CameraRoll.getPhotos({ 
        first: FIRST_ALBUM_NUM,
        assetType: 'Photos',
    }).then(r => {
        setImages(r.edges)
    })
}

export const onClickCamera = (setImages) => {
    ImagePicker.openCamera({
        width: 500,
        height: 500,
        cropping: true,
    }).then(image => {
        setImages((prev) => [...prev, { name: image.filename, type: image.mime, uri: 'file://' + image.path }])
    });    
}

export const onClickSingle = (setImages) => {
    ImagePicker.openPicker({
        width: 500,
        height: 500,
        includeBase64: true,
        mediaType: 'photo',
    }).then(image => {
        setImages({ name: image.filename, type: image.mime, uri: 'file://' + image.path })
    })
}

export const onClickMultiple = (setImages) => {
    ImagePicker.openPicker({
        width: 500,
        height: 500,
        multiple: true,
        includeBase64: true,
        mediaType: 'photo',
        maxFiles: MAX_FILES
    }).then(images => {
        multipleCrop(images, setImages)
    })
}

export const onClickCrop = (uri, setImages) => {
    ImagePicker.openCropper({
        path: uri,
        includeBase64: true,
        width: 500,
        height: 500,
    }).then(image => {
        setImages((prev) => [...prev, { name: image.filename, type: image.mime, uri: 'file://' + image.path }])
    })
}

const multipleCrop = async (images, setImages) => {
    const props = {
        cropped: [],
        length: images.length,
        current: images.length,
    }
    await cropCurrent(props, images);
    setImages(props.cropped)
}

const cropCurrent = async (props, images) => {
    while (props.current) {
        const croppedImg = await crop(images[props.length - props.current])
        props.cropped.push({name: croppedImg.filename, type: croppedImg.mime, uri: 'file://' + croppedImg.path})
        props.current = props.current - 1
    }
}

const crop = async (img) => {
    return await ImagePicker.openCropper({
        path: img.path,
        includeBase64: true,
        width: 500,
        height: 500,
    })
}

// usage of getTotal(), getQuickPhoto()
// const [album, setAlbum] = useState({ total: 0, next: true })
//useEffect(() => {
//    if (album.next)     getTotal(album, setAlbum)
//},[album])

//useEffect(() => {
//    getQuickPhoto(setImages)
//}, [])