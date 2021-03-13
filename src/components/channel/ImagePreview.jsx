
const ImagePreview = (props) => {
    return(
        <div className='p-media__thumb'>
            <img alt='画像'　src={props.path} onClick={() => props.delete(props.id)} />
        </div>
    )
};

export default ImagePreview