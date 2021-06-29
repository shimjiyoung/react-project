import React, {useState, useEffect} from 'react'
import {Col, Row, Container} from 'react-bootstrap'
import './posts.scss'
import Modal from './modal'

function Posts() {
    const [posts, setPosts] = useState([])
    const [error, setError] = useState(null)
    const [modalOn, setModalOn] = useState(false)
    const [body, setBody] = useState(null)

    const openModal = (body: any) => {
        setModalOn(true)
        setBody(body)
    }
    const closeModal = () => {
        setModalOn(false)
    }

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setError(null)
                setPosts([])
                fetch('https://jsonplaceholder.typicode.com/posts')
                    .then((response) => response.json())
                    .then((response) => setPosts(response));
            } catch (e) {
                setError(e)
            }
        };
        fetchPosts()
    }, []);

    if (error) return <div>에러가 발생했습니다</div>
    if (!posts) return <div>내용이 없습니다.</div>
    return (
        <div className="page">
            <div className={"modal-bg"+ (modalOn ? "--on" : "")} onClick={closeModal}></div>
            <Container className="table">
                <Row className="py-2 board">
                    <Col xs={1}>no</Col>
                    <Col xs={1}>id</Col>
                    <Col xs={10}>title</Col>
                </Row>
                {posts.map((post: any) => (
                    <Row className="py-2 board" key={post.id}>
                        <Col xs={1}>{post.id}</Col>
                        <Col xs={1}>{post.userId}</Col>
                        <Col xs={10} onClick={()=>{openModal(post.body)}}>{post.title}</Col>
                        <React.Fragment>
                            <Modal open={modalOn} close={closeModal}>
                                {body}
                            </Modal>
                        </React.Fragment>
                    </Row>
                ))}
            </Container>
        </div>
    );
}

export default Posts