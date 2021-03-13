import {makeStyles} from "@material-ui/styles";
import IconButton from "@material-ui/core/IconButton";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate"
import {useCallback} from "react";
import {storage} from "../../firebase/index"
import ImagePreview from './ImagePreview'


const useStyles = makeStyles( {
    icon: {
        height: 48,
        width: 48
    }
})

const ImageArea = ({images,setImages}) => {
    const classes = useStyles();

    const uploadImage = useCallback((event) => {
        const file = event.target.files;

        console.log(file)
        
        let blob = new Blob(file, { type: "image/jpeg" });

        console.log(blob);

        // Generate random 16 digits strings
        const S="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        const N=16;
        const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N))).map((n)=>S[n%S.length]).join('')

        console.log(fileName);

        const uploadRef = storage.ref('images').child(fileName);
        const uploadTask = uploadRef.put(blob);


        uploadTask.then(() => {
            // Handle successful uploads on complete
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                const newImage = {id: fileName, path: downloadURL};
                ({images,setImages}).setImages([newImage])
            
            });
        });
    },[images,setImages])

const deleteImage = useCallback( async(id) => {
    const ret = window.confirm('削除しますか？')
    if (!ret) {
        return false
    } else {
        const newImages = ({images,setImages}).images.filter(image => image.id !== id);
        ({images,setImages}).setImages(newImages);
        return storage.ref('images').child(id).delete()
    }
},[images,setImages])

    return (
        <div>
            <div className='u-text-right'>
                <span>チャンネルのアイコン登録</span>
                <IconButton className={classes.icon}>
                    <label>
                        <AddPhotoAlternateIcon />
                        <input className='u-display-none' 
                        type='file' 
                        id ='image'
                        onChange={(e) => uploadImage(e)}
                        />
                    </label>
                </IconButton>
            </div>
            <div>
                <div className='p-grid__list-images'>
                    {({images,setImages}).images.length > 0 && (
                        ({images,setImages}).images.map(image => <ImagePreview id={image.id} path={image.path} key={image.id} delete={deleteImage} />)
                    )}
                </div>
            </div>
        </div>
    )
}

export default ImageArea