
// components/blog/Blog.jsx

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  useParams,useNavigate } from 'react-router-dom';
import { fetchBlogDetail } from '../../reducers/apiSlice';
import { Col, Row, Button } from 'react-bootstrap';

const Blog = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const blogDetailData = useSelector((state) => state.blog.Detail);

  useEffect(() => {
    dispatch(fetchBlogDetail(id));
  }, [dispatch, id]);

  const createMarkup = (html) => {
    return { __html: html };
  };

  const handleDelete = async () => {
    try {
      // Chiamata API per eliminare il post
      const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/post/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        // Reindirizza alla lista dei post o a dove desideri
        navigate('/posts');
      } else {
        // Gestisci l'errore
      }
    } catch (error) {
      // Gestisci l'errore
    }
  };

  // Funzione per gestire la modifica
  const handleEdit = () => {
    // Reindirizza alla pagina di modifica del post
    navigate(`/posts/${id}/edit`);
  };

  return (
    <Row>
      <Col md={8}>
        <div>
          {blogDetailData && (
            <div key={blogDetailData._id}>
              <img src={blogDetailData.cover} alt="" />
              <h1>{blogDetailData.title}</h1>
              <div dangerouslySetInnerHTML={createMarkup(blogDetailData.content)} />
              <p>{blogDetailData.email}</p>
              
              {/* Pulsanti per eliminare e modificare */}
              <Button variant="danger" onClick={handleDelete}>Elimina</Button>
              <Button className='m-3' variant="primary" onClick={handleEdit}>Modifica</Button>
            </div>
          )}
        </div>
      </Col>
    </Row>
  );
};

export default Blog;




