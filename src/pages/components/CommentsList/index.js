import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useMappedState } from 'redux-react-hook';
import { List, Avatar, Card, Button, Row, Col, Input, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import { getComments, createComment, deleteComment } from 'actions/comments';
import { COMMENT_PAGESIZE, USER_ID } from 'constants/index';
import style from './index.module.scss';

const mapStateComments = state => state.comments;
const { confirm }= Modal;

const CommentsList = ({ id }) => {
    const dispatch = useDispatch();
    const [value, setVaule] = useState('');
    const { comments = [], page = 0, total = 0 } = useMappedState(mapStateComments);

    const handleInfiniteOnLoad = useCallback(() => {
        dispatch(getComments({ id, page: page + 1, count: COMMENT_PAGESIZE }))
    }, [dispatch, id, page]);

    useEffect(() => {
        handleInfiniteOnLoad()
    }, []);

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

    const handleDeleteComment = (cid)=>{
        let param = new URLSearchParams();
        param.append('cid', cid);
        confirm({
            title:'Warning',
            icon:<ExclamationCircleOutlined/>,
            content:'Are you sure delete this comment?',
            okText:'Confirm',
            cancelText:'Cancel',
            onOkay:(e)=>{
                dispatch(deleteComment(param))
            }
        })
       
    } 

    const userId = localStorage.getItem(USER_ID);
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
                    <List.Item 
                    key={item.id}
                    actions={ userId === item.user.idstr ? [<a href="!#" key="list-loadmore-delete" onClick = {()=>handleDeleteComment(id)}>delete</a>] : []}
                    >
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