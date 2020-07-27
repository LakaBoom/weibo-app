import React, { useEffect } from 'react';
import { useDispatch, useMappedState } from 'redux-react-hook';
import { getHomeTimeLine } from '../../actions/timeline';
import moment from 'moment';
import { Card } from 'antd';
import { RetweetOutlined, MessageOutlined, LikeOutlined } from '@ant-design/icons';
import style from './index.module.scss';

const mapStateTimeline = state => state.timeline;

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

const Home = () => {
    const dispatch = useDispatch();
    const { home = [] } = useMappedState(mapStateTimeline);

    useEffect(() => {
        dispatch(getHomeTimeLine());
    }, [dispatch]);

    return (
        <div className={style.container}>
            {
                home.map(({text, user, created_at, source, pic_urls, comments_count, attitudes_count, reposts_count }) => (
                    <Card
                        key={Math.random()}
                        className={style.post}
                        bordered={false}
                        hoverable
                        title={getPostTitle(user, created_at, source)}
                        actions={[
                            <div>
                                <RetweetOutlined key="repost" />
                                <span>{reposts_count || 'Share'}</span>
                            </div>,
                            <div>
                                <LikeOutlined key="like" />
                                <span>{attitudes_count || 'Like'}</span>
                            </div>,
                            <div>
                                <MessageOutlined key="comment" />
                                <span>{comments_count || 'Comment'}</span>
                            </div>
                        ]}
                    >

                        <div className={style.content}>
                            <div className={style.text}>
                                {text}
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
                ))
            }
        </div>
    )
}

export default Home;