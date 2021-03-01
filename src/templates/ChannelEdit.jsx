import React from 'react';
import {useCallback, useState} from 'react';
import TextInput from '../components/UI/TextInput';
import SelectBox from '../components/UI/SelectBox';
import PrimaryButton from '../components/UI/PrimaryButton';
import {saveChannel} from '../reducks/channel/operations';
import { useDispatch } from 'react-redux';

const ChannelEdit = () => {
    const dispatch = useDispatch();
    
    const [title, setTitle] = useState(""),
            [description, setDescription] = useState(""),
            [category, setCategory] = useState(""),
            [url, setUrl] = useState("")

    //チャンネル名
    const inputTitle = useCallback( (e) => {
        setTitle(e.target.value)
    },[setTitle])

    //紹介文
    const inputDescription = useCallback( (e) => {
        setDescription(e.target.value)
    },[setDescription])

    //カテゴリー
    

    //URL
    const inputUrl = useCallback( (e) => {
        setUrl(e.target.value)
    },[setUrl])

    const categories = [
        {id: 'Javascript', name: 'Javascript'},
        {id: 'HTML/CSS', name: 'HTML/CSS'},
        {id: 'Ruby', name: 'Ruby'},
    ];

    return(
        <section>
            <h2 className='u-text_headline u-text-center'>Youtubeチャンネルの登録・編集</h2>
            <div className='c-section-container'>
                <TextInput 
                    fullWidth={true} label={'チャンネル名'} multiline={true} required={true}
                    onChange={inputTitle} rows={2} value={title} type={'text'}
                />

                <TextInput 
                    fullWidth={true} label={'紹介文'} multiline={true} required={true}
                    onChange={inputDescription} rows={5} value={description} type={'text'}
                />

                <TextInput 
                    fullWidth={true} label={'チャンネルのURL'} multiline={true} required={true}
                    onChange={inputUrl} rows={2} value={url} type={'text'}
                />
                
                <SelectBox
                    label={"カテゴリー"} options={categories} required={true} select={setCategory} value={category}
                />
                <div className='center'>
                    <PrimaryButton 
                        label={'登録'}
                        onClick={() => dispatch(saveChannel(title,description,url,category))}
                    />
                </div>
            </div>
        </section>
        )
}

export default ChannelEdit