import React, { useCallback, useRef } from "react";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { postPost } from "../../reducers/apiSlice";
import "./styles.css";


//La funzione restituisce un componente che consente all'utente di inserire i dettagli 
//di un nuovo post del blog e inviare questi dettagli al server mediante una chiamata API per creare un nuovo post.

const NewBlogPost = () => {
  const [formData, setFormData] = useState({}); // State per i dati del form
  

  const textRef = useRef();


  const dispatch = useDispatch();
  const [isSumitted, setIsSubmitted] = useState(false);
  const [content, setContent] = useState("")


  const handleChange = (value) => {
    setContent(value);


  };

  const handleSubmit = (e) => {
    e.preventDefault();


    const postPayload = {
      title: formData.title,
      cover: formData.cover,//URL

      category: formData.category,
      author: {
        name: formData.author,
        avatar: "https://images.unsplash.com/photo-1682687982502-1529b3b33f85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
      },
      content: content,
      // content: content, // Usa lo stato del contenuto

    };
    console.log(postPayload);


    dispatch(postPost(postPayload));
    setIsSubmitted(true);
  };

const resetForm = () => {
  setFormData({});
  setContent("");
};

  return (
    <Container className="new-blog-container">
      <Form className="mt-5" onSubmit={handleSubmit}>

        <Form.Label htmlFor="basic-url"></Form.Label>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon3">cover</InputGroup.Text>
          <Form.Control id="basic-url" aria-describedby="basic-addon3" onChange={(e) => setFormData({
            ...formData,
            cover: e.target.value

          })} />
        </InputGroup>

        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Titolo</Form.Label>
          <Form.Control size="lg" placeholder="Title" onChange={(e) => setFormData({
            ...formData,
            title: e.target.value

          })} />
        </Form.Group>

        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Author</Form.Label>
          <Form.Control size="lg" placeholder="Author" onChange={(e) => setFormData({
            ...formData,
            author: e.target.value

          })} />
        </Form.Group>

        <Form.Group controlId="blog-category" className="mt-3">
          <Form.Label>Categoria</Form.Label>
          <Form.Control size="lg" as="select" onChange={(e) => setFormData({
            ...formData,
            category: e.target.value

          })}>
            <option value={"social"}>Social</option>
            <option value={"vacanze"}>Vacanze</option>
            <option value={"archittecture"}>Archittecture</option>
            <option value={"natura"}>Natura</option>
            <option value={"benessere"}>Benessere</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="blog-content" className="mt-3">
          <Form.Label>Contenuto Blog</Form.Label>
          <ReactQuill value={content} onChange={handleChange} className="new-blog-content" />
        </Form.Group>

        <Form.Group className="d-flex mt-3 justify-content-end">
          <Button type="reset" size="lg" variant="outline-dark" onClick={resetForm}>
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
