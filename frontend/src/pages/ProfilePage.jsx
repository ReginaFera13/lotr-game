import { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DeleteProfileModal from '../components/DeleteProfileModal';

function ProfilePage() {
  const [modalShow, setModalShow] = useState(false)

    return (
      <div className='flex-center'>
        <h1 className='hobbiton-brushhand'>TEMP: Display Name</h1>
          <Form className='flex-center'>
            <Form.Group className="mb-3 center-text flex-center">
                <Form.Label>Display Name</Form.Label>
                <Form.Text>TEMP: Display Name</Form.Text>
                <Form.Control type="text" placeholder="Change public display name" />
                <Form.Text className="text-muted">Dsiplay names (aka gamer handles) are public</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3 center-text flex-center">
                <Form.Label>Email address</Form.Label>
                <Form.Text>TEMP: Email</Form.Text>
                <Form.Control type="email" placeholder="Change email" />
                <Form.Text className="text-muted">We'll never share your email with anyone else</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3 center-text">
                <Form.Label>New Password</Form.Label>
                <Form.Control type="password" placeholder="Change password" />
            </Form.Group>

            <Form.Group className="mb-3 center-text">
                <Form.Label>Current Password</Form.Label>
                <Form.Control type="password" placeholder="Enter current password"/>
            </Form.Group>

            <Button variant="outline-success" type="submit">Submit</Button>
        </Form>
        <div className="d-grid gap-2">
          <Button onClick={() => setModalShow(true)} variant="outline-danger" size="lg">Delete Pofile</Button>
        </div>
        <DeleteProfileModal show={modalShow} onHide={() => setModalShow(false)}/>
      </div>
    )
  }
  
  export default ProfilePage