import { useNavigate, useOutletContext } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { deleteProfile } from '../utilities';

function DeleteProfileModal(props) {
    const {setUserInfo, setUser} = useOutletContext()
    const navigate = useNavigate()

    // TODO: deleteProfile
    const handleDeleteProfile = async () => {
        try {
            await deleteProfile();
            setUserInfo([]);
            setUser([]);
            navigate('/')
            props.onDelete(); // Notify parent component about the deletion
        } catch (error) {
            console.error('Error deleting profile:', error);
            // Handle deletion failure
        }
    };

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">WARNING</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4 className='center-text'>Delete Profile</h4>
                    <Form className='flex-center'>
                        <Form.Group className="mb-3 center-text flex-center">
                            <Form.Label>Are you sure you want to PERMANENTLY delete your profile?</Form.Label>
                        </Form.Group>
                        <Button onClick={() => handleDeleteProfile()} variant="outline-danger" size="lg">Delete Pofile</Button>
                    </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
  }
  
  export default DeleteProfileModal