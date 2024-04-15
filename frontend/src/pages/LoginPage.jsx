import { useState, useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { login } from '../utilities';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, setUser }  = useOutletContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = await login(email, password);
    setUser(response)
    navigate('/game')
    console.log(user)
  };

  return (
      <>
          <div className='flex-center'>
              <h1 className='hobbiton-brushhand'>Login</h1>
              <Form className='flex-center' onSubmit={handleSubmit}>

                  <Form.Group className="mb-3 center-text">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                      <Form.Text className="text-muted">
                          We'll never share your email with anyone else.
                      </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3 center-text">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </Form.Group>

                  <Button variant="outline-success" type="submit">Submit</Button>
              </Form>
          </div>
      </>
  );
}

export default LoginPage;