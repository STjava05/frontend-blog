import React from "react";
import { Col, Image, Row } from "react-bootstrap";
import "./styles.css";
import { BsFillHeartFill } from "react-icons/bs";




const BlogAuthor = props => {
  const { name, avatar } = props;
  
  
  return (
    <Row>
      <Col xs={"auto"} className="pe-0">
        <Image className="blog-author" src={avatar} roundedCircle />
      </Col>
      <Col>
        <div>di</div>
        <h6>{name}</h6>
          
      </Col>
      <Col className="mt-3">
        <i>
        <BsFillHeartFill />
      </i>
      </Col>
      
    </Row>
  );
};

export default BlogAuthor;
