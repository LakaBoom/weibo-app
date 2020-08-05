import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useMappedState } from 'redux-react-hook';
import { List, Avatar, Card, Button, Row, Col, Input } from 'antd';
import moment from 'moment';
import { getComments, createComment } from 'actions/comments';
import { COMMENT_PAGESIZE } from 'constants/index';
import style from './index.module.scss';

const mapStateComments = state => state.comments;

const CommentsList = ({ id }) => {
    const dispatch = useDispatch();
    const [value, setVaule] = useState('');
    const { comments = [], page = 0, total = 0 } = useMappedState(mapStateComments);

    const handleInfiniteOnLoad = useCallback(() => {
        dispatch(getComments({ id, page: page + 1, count: COMMENT_PAGESIZE }))
    }, [dispatch, id, page]);

    useEffect(() => {
        handleInfiniteOnLoad()
    }, [])

    const loadMore = page * COMMENT_PAGESIZE < total && (
        <div className={style.loadMore}>
            <Button onClick={handleInfiniteOnLoad}>more</Button>
        </div>
    )

    const handleSendComment = () => {
        let param = new URLSearchParams();
        param.append('id', id);
        param.append('comment', value);
        dispatch(createComment(param, true));
        setVaule('');
    }
    return (
        <Card className="commentsList">
            <Row>
                <Col span={20}>
                    <Input onChange={e => setVaule(e.target.value)} value={value} />
                </Col>
                <Col span={4}>
                    <Button type="primary" onClick={handleSendComment}>Send</Button>
                </Col>
            </Row>
            <List
                loadMore={loadMore}
                dataSource={comments}
                renderItem={item => (
                    <List.Item key={item.id}>
                        <List.Item.Meta
                            avatar={
                                <Avatar src={item.user.avatar_hd} />
                            }
                            title={
                                <div>
                                    <span>{item.user.name}</span>
                                    <span className={style.extra}>{moment(item.created_at).fromNow()}</span>
                                </div>

                            }
                            description={item.text}
                        />
                    </List.Item>
                )}
            />
        </Card>
    )
}

export default CommentsList;