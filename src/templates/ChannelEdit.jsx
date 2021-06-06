import {useCallback, useState, useEffect} from 'react';
import TextInput from '../components/UI/TextInput';
import SelectBox from '../components/UI/SelectBox';
import PrimaryButton from '../components/UI/PrimaryButton';
import {editChannel} from '../reducks/channel/operations';
import {useDispatch, useSelector} from 'react-redux';
import ImageArea from '../components/channel/ImageArea';
import {db} from '../firebase';

const ChannelEdit = () => {
    const dispatch = useDispatch();

    //URLのパス名からchannelIDのみ
    let id = window.location.pathname.split('/channel/edit/')[1];

    const selector = useSelector( (state) => state);
    const uid = selector.users.uid;
    
    const 　[title, setTitle] = useState(''),
            [description, setDescription] = useState(''),
            [category, setCategory] = useState(''),
            [categories,setCategories] = useState([]),
            [url, setUrl] = useState(''),
            [thumbnail,setThumbnail] = useState(''),
            [images, setImages] = useState('')

    //チャンネル名
    const inputTitle = useCallback( (e) => {
        setTitle(e.target.value)
    },[setTitle])

    //紹介文
    const inputDescription = useCallback( (e) => {
        setDescription(e.target.value)
    },[setDescription])

    //URL
    const inputUrl = useCallback( (e) => {
        setUrl(e.target.value)
    },[setUrl])

    //URLのID
    const inputThumbnail = useCallback( (e) => {
        setThumbnail(e.target.value)
    },[setThumbnail])

    //channelIDから現在の登録情報を取得
    useEffect( () => {
        if(id !== '') {
            db.collection('channels').doc(id).get()
            .then(snapshot => {
                const data = snapshot.data();
                setTitle(data.title);
                setDescription(data.description);
                setCategory(data.category);
                setUrl(data.url);
                setThumbnail(data.thumbnail);
                setImages(data.images);;
            })
        }
    },[id]);

    //選択できるカテゴリーの取得
    useEffect( () => {
        db.collection('categories').orderBy('order', 'asc').get()
            .then(snapshots => {
                    const list = []
                    snapshots.forEach( snapshot => {
                        const data = snapshot.data()
                        list.push({
                            id: data.id,
                            name: data.name
                    })
                })
                setCategories(list)
            })
    },[]);

    return(
        <section>
            <h2 className='u-text_headline u-text-center'>PRする動画の登録・編集</h2>
            <div className='c-section-container'>
                <TextInput 
                    fullWidth={true} label={'1.PRする動画のタイトル'} multiline={true} required={true}
                    onChange={inputTitle} rows={2} value={title} type={'text'}
                />
                <TextInput 
                    fullWidth={true} label={'2.紹介文'} multiline={true} required={true}
                    onChange={inputDescription} rows={5} value={description} type={'text'}
                />
                <TextInput 
                    fullWidth={true} label={'3.PR動画のURL'} multiline={true} required={true}
                    onChange={inputUrl} rows={2} value={url} type={'text'}
                />
                <p className='u-text_p'>※PRしたい動画のURLを入力ください。</p>
                <div className="module-spacer--medium" />
                <TextInput
                    fullWidth={true} label={'4.PR動画のサムネイル'} multiline={true} required={true}
                    onChange={inputThumbnail} rows={2} value={thumbnail} type={'text'}
                />
                <p className='u-text_p'>※動画のサムネイルを表示します。</p>
                <p className='u-text_p'>URLのv=以降のIDを入力ください。※https://www.youtube.com/watch?v=(この部分)</p>
                <div className="module-spacer--medium" />
                <SelectBox
                    label={"カテゴリー"} options={categories} required={true} select={setCategory} value={category}
                />
                <ImageArea images={images} setImages={setImages} />
                <div className="module-spacer--medium" />
                <div className='center'>
                    <PrimaryButton 
                        label={'登録'}
                        onClick={() => dispatch(editChannel(id,uid,title,description,url,thumbnail,category,images))}
                    />
                </div>
            </div>
        </section>
        )
};

export default ChannelEdit