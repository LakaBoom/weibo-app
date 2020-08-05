import React from 'react';
import { useDispatch, useMappedState } from 'redux-react-hook';
import { getHomeTimeLine } from '../../actions/timeline';
import Post from '../components/Post';
import CommentsList from '../components/CommentsList';
import { Row, Affix } from 'antd';
import { Link } from 'react-router-dom';
import { UserOutlined, EditOutlined } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroller';
import style from './index.module.scss';
import { LOGIN_URL } from '../../constants';

const mapStateTimeline = state => state.timeline;

const Home = () => {
    const dispatch = useDispatch();
    const { home: { posts, page }, current } = useMappedState(mapStateTimeline);

    const handleInfinitOnLoad = () => {
        dispatch(getHomeTimeLine({ page: page + 1 }));
    }
    return (
        <div className={style.container}>
            <Affix offsetTop={0}>
                <Row
                    className={style.appbar}
                    justify="space-between"
                    align="middle"
                >
                    <a href={LOGIN_URL}><UserOutlined className={style.icon} /></a>
                    <div className={style.appTitle}>Weibo App</div>
                    <Link to="/new"><EditOutlined className={style.icon} /></Link>
                </Row>
            </Affix>
            <InfiniteScroll
                initialLoad
                pageStart={1}
                loadMore={handleInfinitOnLoad}
                hasMore={true}
            >
                {
                    posts.map(({ id, ...rest }) => (
                        <>
                            <Post
                                key={Math.random()}
                                id={id}
                                isCurrent={current === id}
                                {...rest} />
                            {
                                current === id &&
                                <CommentsList id={current}/>
                            }
                        </>
                    ))
                }
            </InfiniteScroll>
        </div>
    )
}

export default Home;