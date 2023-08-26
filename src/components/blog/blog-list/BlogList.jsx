// import React, { useEffect, useState } from "react";
// import { Col, Row } from "react-bootstrap";

// import { useDispatch, useSelector } from "react-redux";
// import { fetchApi } from "../../../reducers/apiSlice";
// import BlogItem from "../blog-item/BlogItem";



// const BlogList = props => {
//   const dispatch = useDispatch();
//   const posts = useSelector((state) => state.blog.data);
//   const totalPages = useSelector((state) => state.blog.totalPages);
//   const [currentPage, setCurrentPage] = useState(1);


//   useEffect(() => {
//     console.log(currentPage);
//     console.log(posts)
//     dispatch(fetchApi(currentPage));
//   }, [ currentPage]);

//   useEffect(() => {
//     console.log(posts);
//   }, [posts]);

//   const handleNext = () => {
//     if (currentPage < totalPages) {
//       console.log(currentPage);

//       setCurrentPage(currentPage + 1);
//     }
//   }

//   const handlePrevious = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   }
  

//   return (

//     <Row>

//       {posts && posts.map((post, i) => (
//         <Col
//           key={`item-${i}`}
//           md={4}
//           style={{
//             marginBottom: 50,
//           }}
//         >
//           <BlogItem key={post.title} {...post} />

//         </Col>

//       ))}
//       <div>
     
//         <button onClick={handlePrevious} disabled={currentPage === 1} >Previous</button>
//         <button onClick={handleNext} disabled={currentPage === totalPages} >Next</button>
//       </div>

//     </Row>
//   );
// };

// export default BlogList;

import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchApi } from "../../../reducers/apiSlice";
import BlogItem from "../blog-item/BlogItem";

const BlogList = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.blog.posts);
  const totalPages = useSelector((state) => state.blog.totalPages);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchApi(currentPage));
  }, [currentPage]);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  const handleDelete = (postId) => {
    // Implementa l'azione di eliminazione
  };

  const handleEdit = (postId) => {
    // Implementa l'azione di modifica
  };
console.log(posts)
  return (
    
    <Row>
      {posts && posts.posts && posts.posts.map((post, i) => (
        <Col
          key={`item-${i}`}
          md={4}
          style={{
            marginBottom: 50,
          }}
        >
          <BlogItem
            title={post.title}
            cover={post.cover}
            author={post.author}
            _id={post._id}
            onDelete={() => handleDelete(post._id)}
            onEdit={() => handleEdit(post._id)}
          />
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
