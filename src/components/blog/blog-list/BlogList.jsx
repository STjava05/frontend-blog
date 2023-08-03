import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { fetchApi } from "../../../reducers/apiSlice";
import BlogItem from "../blog-item/BlogItem";



const BlogList = props => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.blog.data);
  const totalPages = useSelector((state) => state.blog.totalPages);
  const [currentPage, setCurrentPage] = useState(1);


  useEffect(() => {
    console.log(currentPage);
    console.log(posts)
    dispatch(fetchApi(currentPage));
  }, [currentPage]);

  useEffect(() => {
    console.log(posts);
  }, [posts]);
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }
  const handleNext = () => {
    if (currentPage < totalPages) {
      console.log(currentPage);

      setCurrentPage(currentPage + 1);
    }
  }

  return (

    <Row>

      {posts && posts.map((post, i) => (
        <Col
          key={`item-${i}`}
          md={4}
          style={{
            marginBottom: 50,
          }}
        >
          <BlogItem key={post.title} {...post} />

        </Col>

      ))}
      <div>
        <button onClick={handlePrevious} disabled={currentPage === 1} >Previous</button>
        <button onClick={handleNext} disabled={currentPage === totalPages} >Next</button>
      </div>

    </Row>
  );
};

export default BlogList;