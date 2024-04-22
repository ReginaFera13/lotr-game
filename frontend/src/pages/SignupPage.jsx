import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function SignupPage() {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
      event.preventDefault();
      try {
          const response = await fetch('http://127.0.0.1:8000/api/v1/users/register/', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  email: email,
                  password: password,
                  display_name: displayName
              }),
          });
          if (response.ok) {
            navigate('/login')
          } 
      } catch (error) {
          console.error('Error during registration:', error);
          // Handle error, maybe show an error message
      }
  };

  return (
      <div className='flex-center'>
          <h1 className='hobbiton-brushhand'>Sign-up</h1>
          <Form className='flex-center' onSubmit={handleSubmit}>
              <Form.Group className="mb-3 center-text">
                  <Form.Label>Display Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter a public display name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
                  <Form.Text className="text-muted">Display names (aka gamer handles) are public</Form.Text>
              </Form.Group>

              <Form.Group className="mb-3 center-text">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  <Form.Text className="text-muted">We'll never share your email with anyone else</Form.Text>
              </Form.Group>

              <Form.Group className="mb-3 center-text">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </Form.Group>

              <Button variant="outline-success" type="submit">Submit</Button>
          </Form>
      </div>
  );
}

export default SignupPage;
