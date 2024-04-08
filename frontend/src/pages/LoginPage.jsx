import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function LoginPage() {

    return (
      <>
        <div className='flex-center'>
        <h1 className='hobbiton-brushhand'>Login</h1>
        <Form className='flex-center'>

            <Form.Group className="mb-3 center-text" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3 center-text" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Button variant="outline-success" type="submit">Submit</Button>
        </Form>
      </div>
      </>
    )
  }
  
  export default LoginPage