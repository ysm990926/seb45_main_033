import { useState,  useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Container, InputContainer, EditContainer, Button } from "./Comment.styled";
import Modal from '../../components/Modal/Modal'
import { checkLogin } from "../../checkLogin/checkLogin";

const BASE_URL = process.env.REACT_APP_API_URL;

export default function CommentHandler({ recipeId, timeSlice, memberId }) {
    const comment = {
        "comments":
        [
            {
                "commentId": 1,
                "commentBody": "Updated comment content.",
                "timestamp": "2023-08-16T15:49:20.753395",
                "memberId": 1,
                "userName": "홍길동"
            },
            {
                "commentId": 2,
                "commentBody": "Updated comment content.",
                "timestamp": "2023-08-16T15:49:20.753395",
                "memberId": 2,
                "userName": "홍길동2"
            },
        ]
    }
    const [ comments, setComments ] = useState([])
    const [ commentBody, setCommentBody ] = useState("");
    // 댓글 수정
    const [ commentIdToEdit, setCommentIdToEdit ] = useState(null);
    const [ isEditing, setIsEditing ] = useState(false);
    const [ editingComment, setEditingComment] = useState("")

    const [showModal, setShowModal] = useState(false);
    const isLogin = checkLogin()
    
    const AccessToken = sessionStorage.getItem('Token');

    useEffect(() => {
        // 댓글 불러오기
        const getComments = async () => {
            try {
                const response = await axios.get(`http://ec2-13-124-153-3.ap-northeast-2.compute.amazonaws.com:8080/${recipeId}`)
                // const response = await axios.get(`${BASE_URL}/${recipeId}`)
                setComments(response.data.comments)
            } catch (err) {
                console.error("댓글 조회 요청 실패: ", err)
            }
            };
            getComments()
        }, [])
        
    // 댓글 작성
    const handleCommentSubmit = async () => {
        try {
            if (commentBody.trim() === "") {
                alert("댓글 내용을 입력하세요")
                return;
            }
            if (commentBody.length > 500) {
                alert("댓글은 500자 이하여야 합니다.")
                return;
            }
            const response = await axios.post(`http://ec2-13-124-153-3.ap-northeast-2.compute.amazonaws.com:8080/${recipeId}`, 
            // const response = await axios.post(`${BASE_URL}/${recipeId}`, 
                { commentBody: commentBody }, 
                { headers: { Authorization: `Bearer ${AccessToken}`,
                },
            });
            if (response.status === 200) {
                const newComment = response.data
                setComments((prevComments) => [...prevComments, newComment]);
                setCommentBody("");
            } 
        } catch (error) {
            console.error("댓글 등록 요청 실패:", error);
        }
    }

    // 댓글 삭제
    const handleCommentDelete = async (commentId) => {
        try {
            const response = await axios.delete(`http://ec2-13-124-153-3.ap-northeast-2.compute.amazonaws.com:8080/comment/${recipeId}/${commentId}`, {
            // const response = await axios.delete(`${BASE_URL}/comment/${recipeId}/${commentId}`, {
                headers: {
                Authorization: `Bearer ${AccessToken}`,
            },
            })
            if (response.status === 204) {
                const updateComments = comments.filter((comment) => comment.commentId !== commentId)
                setComments(updateComments)
            }
        } catch (error) {
            console.error("댓글 삭제 오류:", error);
        }
    }

    // 댓글 수정
    const handleCommentSave = async (commentId) => {
        try {
            const response = await axios.patch(`http://ec2-13-124-153-3.ap-northeast-2.compute.amazonaws.com:8080/comment/${recipeId}`, 
            // const response = await axios.patch(`${BASE_URL}/comment/${recipeId}`, 
                { commentBody: editingComment}, 
                { headers: { 
                    Authorization: `Bearer ${AccessToken}`
                }
            });

            if (response.status === 200) {
                const updatedComments = comments.map((comment) => {
                    comment.commentId === commentId ? response.data : comment 
            })
            setComments(updatedComments);
            setCommentIdToEdit(null);
            setIsEditing(false);
            setEditingComment("");
            } else if (response.status === 400) {
                // 댓글 500자 이하
                alert(response.data.message)
            } 
        } catch (error) {
            console.error("댓글 수정 저장 오류:", error)
        }
    }
    // 로그인 요청 모달
    const handleModal = () => {
        //
        if (isLogin) {
            setShowModal(true)
        }
    }

    return (
        <Container>
            {showModal && (
                <Modal 
                    type="LoginPlz"
                    func={() => setShowModal(false)}
                    recipe_id={recipeId}
                />
            )}
            <InputContainer>
                <textarea
                    rows='5'
                    cols='100'
                    value={commentBody}
                    onChange={(e) => setCommentBody(e.target.value)}
                    placeholder="댓글을 입력하세요..."
                    onClick={handleModal}
                />
                <Button 
                    boxColor="orange"
                    onClick={handleCommentSubmit}>등록</Button>
            </InputContainer>
            <ul>
                {comments.map((el, index) => {
                    return (
                        <li key={index}>
                            <div className='header'>
                                <div className='name'>{el.userName}</div>
                                <div className='time'>작성일 {timeSlice(el.timestamp)}</div>
                            </div>
                            {!(commentIdToEdit === el.commentId && isEditing) ? (
                                <div className='contents'>{el.commentBody}</div>
                            ) : (
                                <textarea
                                    className="edit-input"
                                    rows='3'
                                    cols='100'
                                    value={editingComment}
                                    onChange={(e) => setEditingComment(e.target.value)}
                                ></textarea>
                            )}
                            <EditContainer>
                                    {/* 본인이 작성한 글에만 수정과 삭제버튼 표시 */}
                                    {el.memberId === memberId && (
                                        <>
                                            {!(commentIdToEdit === el.commentId && isEditing) ? (
                                                <div className="Btn-container">
                                                    <Button
                                                        size="small"
                                                        boxColor="orange"
                                                        onClick={() => {
                                                            setCommentIdToEdit(el.commentId);
                                                            setEditingComment(el.commentBody);
                                                            setIsEditing(true);
                                                        }}
                                                    >
                                                        수정
                                                    </Button>
                                                    <Button 
                                                        size="small"
                                                        onClick={() => handleCommentDelete(el.commentId)}>
                                                        삭제
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div className="Btn-container">
                                                    <Button 
                                                        size="small"
                                                        boxColor="orange"
                                                        onClick={() => handleCommentSave(el.commentId)}>
                                                        등록
                                                    </Button>
                                                    <Button
                                                        size="small"
                                                        onClick={() => {
                                                            setCommentIdToEdit(null);
                                                            setIsEditing(false);
                                                            setEditingComment("");
                                                        }}
                                                    >
                                                        취소
                                                    </Button>
                                                </div>
                                            )}
                                        </>
                                    )}
                            </EditContainer>
                        </li>
                    )})}
            </ul>
        </Container>
    )
}