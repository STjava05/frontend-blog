
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';
import { BlogDetail } from '../../reducers/apiSlice';


const Blog = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  console.log(id);

  const blogDetailData = useSelector((state) => state.blog.Detail);
  useEffect(() => {
    // Chiamata all'azione Blog con l'ID del blog
    dispatch(BlogDetail(id));
  }, [dispatch, id]);




  return (
    <div>
      {blogDetailData && (
        <div key={blogDetailData._id}>
          <img src={blogDetailData.cover} alt="" />
          <h1>{blogDetailData.title}</h1>
          <h6>{blogDetailData.content}</h6>
          <p>{blogDetailData.email}</p>


        </div>


      )}
    

    </div>
  )


}

export default Blog



