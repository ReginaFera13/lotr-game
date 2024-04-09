import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function DeleteGameFileModal(props) {

    // TODO: deleteProfile
    const deleteGameFile = () => {
        return 
    }

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
                <h4 className='center-text'>Delete Game File</h4>
                    <Form className='flex-center'>
                        <Form.Group className="mb-3 center-text flex-center">
                            <Form.Label>Are you sure you want to PERMANENTLY delete your game file?</Form.Label>
                            <Form.Text>Type "DELETE" and submit.</Form.Text>
                            <Form.Control type="text" placeholder="DELETE" />
                        </Form.Group>
                        <Button onClick={() => deleteGameFile()} variant="outline-danger" size="lg">Delete Pofile</Button>
                    </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
  }
  
  export default DeleteGameFileModal