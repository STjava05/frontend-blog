import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { postLogin } from "../reducers/apiSlice";
import { BsGithub } from "react-icons/bs";





const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        const loginPayload = {
            email: email,
            password: password
        };

        dispatch(postLogin(loginPayload));
    }

   const handleLoginWithGithub = () => {
       window.location.href = `${process.env.REACT_APP_SERVER_BASE_URL}/auth/github`
    }


    return (
        <Container fluid className="new-blog-container p-0 ">
            <div className="loginBackground">
            <Form className="container mt-5 pt-3" onSubmit={handleSubmit}>
                <Form.Group controlId="blog-form" className="mt-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control size="lg" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="blog-form" className="mt-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control size="lg" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit" className="m-5">Login</Button>
                <Button onClick={handleLoginWithGithub} 
            variant="success" type="submit" className=" m-3 "> <BsGithub size={30} />Github</Button>
           
            </Form>
            </div>
        </Container>

    )
};
export default Login;
