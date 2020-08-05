import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import {useDispatch} from 'redux-react-hook';
import { Row, Affix, Input } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import {createComment } from '../../actions/comments';
import style from './index.module.scss';

const { TextArea } = Input;
const New = ({ match }) => {
    const { params: { id } } = match;
    const [value, setValue] = useState('');
    const dispatch = useDispatch()
    const handleClick =(e) =>{
        e.preventDefault();
        if(id){
            let param = new URLSearchParams();
            param.append('id', id);
            param.append('comment', value);
            dispatch(createComment(param, true))
        }
    }
    return (
        <div className={style.container}>
            <Affix offsetTop={0}>
                <Row
                    className={style.appbar}
                    justify="space-between"
                    align="middle"
                >
                    <Link to="/"><LeftOutlined className={style.icon} /></Link>

                    <a
                        href="#!"
                        className={style.send}
                        onClick = { handleClick}
                    >
                        {id ? 'Comment' : 'Send'}</a>
                </Row>
            </Affix>
            <div className={style.content}>
                <TextArea
                    value = {value}
                    className={style.textarea}
                    placeholder={id ? "Write a comment" : "Share your story..."}
                    onChange = { e => setValue(e.target.value)}
                />
            </div>
        </div>
    )
}

export default New;