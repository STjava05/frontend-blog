
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';
import { BlogDetail, fetchComment } from '../../reducers/apiSlice';
import {  Col, Row } from 'react-bootstrap';
import Comment from '../../components/comment';
// import { use } from 'passport';

const Blog = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  console.log(id);

  const blogDetailData = useSelector((state) => state.blog.Detail);
  const blogCommentData = useSelector((state) => state.blog.Comment);
  console.log(blogCommentData);
  useEffect(() => {
    // Chiamata all'azione Blog con l'ID del blog
    dispatch(BlogDetail(id));
  }, [dispatch, id]);

  useEffect(() => {
    // Chiamata all'azione Blog con l'ID del blog
    dispatch(fetchComment(id));
  }, [dispatch, id]);




  return (
    <Row>
      <Col md={8}>
        <div>
          {blogDetailData && (
            <div key={blogDetailData._id}>
              <img src={blogDetailData.cover} alt="" />
              <h1>{blogDetailData.title}</h1>
              {blogDetailData.content}
              {blogDetailData.email}
            </div>

          )}
        </div>
      </Col>
      {/* <Col md={4}>
        {blogCommentData && (
          <div key={blogCommentData._id}>
            <h1>Commenti</h1>
            <h6>{blogCommentData.content}</h6>
            <p>{blogCommentData.author}</p>
            <p>{blogCommentData.rate}</p>
            
            
           
          </div>
        )}
        <Comment />
        
        </Col> */}
        
    </Row>
     
   

  )


}

export default Blog



