import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function MapModal(props) {

    return (
        <Modal
            {...props}
            fullscreen={true}
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Map</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* TODO: insert map here */}
            </Modal.Body>
        </Modal>
    )
  }
  
  export default MapModal