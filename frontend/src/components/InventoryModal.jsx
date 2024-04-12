import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function InventoryModal(props) {

    return (
        <Modal
            {...props}
            fullscreen={true}
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Inventory</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* TODO: insert inventory here */}
            </Modal.Body>
        </Modal>
    )
  }
  
  export default InventoryModal