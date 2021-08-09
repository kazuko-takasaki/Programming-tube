
const ImagePreview = (props) => {
    return(
        <div className='p-media__thumb'>
            <img alt='画像'　src={props.path} onClick={() => props.delete(props.id)} />
            <p>アイコンを変更する場合はクリックして削除</p>
        </div>
    )
};

export default ImagePreview