import React from 'react'
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment,  postComment, fetchComment } from '../reducers/apiSlice';

const Comment = ({ comment }) => {

    const dispatch = useDispatch();
    console.log(comment);

    const blogCommentData = useSelector((state) => state.blog.Comment);
    console.log(blogCommentData);

    const handleEdit = () => {
        dispatch(postComment(comment._id));
    }

    const handleSubmit = () => {
        const newComment = {
            ...comment,
            content: comment.content,
            rate: comment.rate,
            author: comment.author,

            
        }
        dispatch(postComment(newComment)).then(() => {
            dispatch(fetchComment(comment._id));
        });
    }

    const handleDelete = () => {
        dispatch(deleteComment(comment._id));
    }

    return (
        <div>
            <h1>{comment.author}</h1>
            <h6>{comment.content}</h6>
            <p>{comment.rate}</p>
            <Button onClick={handleEdit}>Edit</Button>
            <Button onClick={handleDelete}>Delete</Button>

            <Button onClick={handleSubmit}>Submit</Button>


        </div>
        
    )
   
}


export default Comment

