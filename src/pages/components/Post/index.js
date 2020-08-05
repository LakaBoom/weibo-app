import React from 'react';
import {useDispatch} from 'redux-react-hook';
import { Card } from 'antd';
import { RetweetOutlined, MessageOutlined, LikeOutlined } from '@ant-design/icons';
import moment from 'moment';
import {setCurrentPost} from 'actions/timeline';
import style from './index.module.scss';

const getPostTitle = (user, created_at, source) => (
    <div className={style.user}>
        <img src={user.profile_image_url} alt={user.profile_image}
            className={style.avatar}
        />
        <div className={style.userInfo}>
            <div>{user.screen_name}</div>
            <div className={style.extra}>
                {moment(created_at).fromNow()} from <span dangerouslySetInnerHTML={{ __html: source }} />
            </div>
        </div>
    </div>
)

const Post = ({ id, text, user, created_at, source, pic_urls, comments_count, attitudes_count, reposts_count, retweeted_status, type , isCurrent}) => {
    const dispatch = useDispatch();
    const handleCommentClick = () =>{
        if(!comments_count){
            window.location.href =`/comment/${id}`;
        }else{
            dispatch(setCurrentPost({id:isCurrent? null :id}));
        }
    }    
    return (
        <Card
            type ={type}
            className={style.post}
            bordered={false}
            hoverable
            title={getPostTitle(user, created_at, source)}
            actions={type ? [] : [
                <div>
                    <RetweetOutlined key="repost" />
                    <span>{reposts_count || 'Share'}</span>
                </div>,
                <div>
                    <LikeOutlined key="like" />
                    <span>{attitudes_count || 'Like'}</span>
                </div>,
                <div onClick={handleCommentClick}>
                    <MessageOutlined key="comment" />
                    <span>{comments_count || 'Comment'}</span>
                </div>
            ]}
        >

            <div className={style.content}>
                <div className={style.text}>
                    {text}
                    {retweeted_status &&
                        <Post type='inner' {...retweeted_status} />
                    }
                </div>
                <ul className={style.images}>
                    {
                        pic_urls.map(({ thumbnail_pic }) => (
                            <li key={thumbnail_pic} className={style.imgWrapper}>
                                <div className={style.imgContainer}>
                                    <img src={thumbnail_pic} alt={thumbnail_pic} />
                                </div>

                            </li>
                        ))
                    }
                </ul>
            </div>
        </Card>
    )

}
export default Post;