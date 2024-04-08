import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function SignupPage() {

    return (
      <div className='flex-center'>
        <h1 className='hobbiton-brushhand'>Sign-up</h1>
        <Form className='flex-center'>
            <Form.Group className="mb-3 center-text">
                <Form.Label>Display Name</Form.Label>
                <Form.Control type="text" placeholder="Enter a public display name" />
                <Form.Text className="text-muted">Dsiplay names (aka gamer handles) are public</Form.Text>
            </Form.Group>

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
    )
  }
  
  export default SignupPage