import React, { useCallback, useRef } from "react";
import { Button, Container, Form,InputGroup } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch } from "react-redux";
import { useState,useEffect } from "react";
import { postPost } from "../../reducers/apiSlice";
import "./styles.css";


//La funzione restituisce un componente che consente all'utente di inserire i dettagli 
//di un nuovo post del blog e inviare questi dettagli al server mediante una chiamata API per creare un nuovo post.
const NewBlogPost = () => {
  const textRef = useRef("");
  const imageRef = useRef(null);
   const titleRef = useRef("");
  const categoryRef = useRef("Social");
  const authorRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const coverRef = useRef("");

  const dispatch = useDispatch();
  const [isSumitted, setIsSubmitted] = useState(false);


  const handleChange = useCallback((value) => {
    textRef.current = value;
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();


    const postPayload = {
      title: titleRef.current.value,
      cover: coverRef.current.value,//URL
      imageRef: imageRef.current.files[0],//File 
      email: emailRef.current.value,
      password: passwordRef.current.value,
      category: categoryRef.current.value,
      author: {
        name: authorRef.current.value,
        avatar: "https://images.unsplash.com/photo-1675747158920-1b00990de2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
      },
      content: textRef.current
            
    };


    dispatch(postPost(postPayload));
    setIsSubmitted(true);
  };

  useEffect(() => {
    if (isSumitted) {
      imageRef.current.value = "";
      titleRef.current.value = "";
      categoryRef.current.value = "Social";
      authorRef.current.value = "";
      emailRef.current.value = "";
      passwordRef.current.value = "";
      coverRef.current.value = "";
      textRef.current = "";
    }
  }, [isSumitted]);
     

  return (
    <Container className="new-blog-container">
      <Form className="mt-5" onSubmit={handleSubmit}>

        <Form.Group controlId="formImage">
          <Form.Label></Form.Label>
          <Form.Control type="file" placeholder="Enter image URL" ref={imageRef} />
        </Form.Group>


        <Form.Label htmlFor="basic-url"></Form.Label>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon3">cover</InputGroup.Text>
        <Form.Control id="basic-url" aria-describedby="basic-addon3" ref={coverRef} />
      </InputGroup>



        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Titolo</Form.Label>
          <Form.Control size="lg" placeholder="Title" ref={titleRef} />
        </Form.Group>

        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Email</Form.Label>
          <Form.Control size="lg" placeholder="Email" ref={emailRef} />
        </Form.Group>

        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control size="lg" placeholder="Password" ref={passwordRef} />
        </Form.Group>

        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Author</Form.Label>
          <Form.Control size="lg" placeholder="Author" ref={authorRef} />
        </Form.Group>

        <Form.Group controlId="blog-category" className="mt-3">
          <Form.Label>Categoria</Form.Label>
          <Form.Control size="lg" as="select" ref={categoryRef}>
            <option>Social</option>
            <option>Vacanze</option>
            <option>Archittecture</option>
            <option>Natura</option>
            <option>Benessere</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="blog-content" className="mt-3">
          <Form.Label>Contenuto Blog</Form.Label>
          <ReactQuill value={textRef.current} onChange={handleChange} className="new-blog-content" />
        </Form.Group>

        <Form.Group className="d-flex mt-3 justify-content-end">
          <Button type="reset" size="lg" variant="outline-dark">
            Reset
          </Button>
          <Button type="submit" size="lg" variant="dark" style={{ marginLeft: "1em" }}>
            Invia
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default NewBlogPost;
