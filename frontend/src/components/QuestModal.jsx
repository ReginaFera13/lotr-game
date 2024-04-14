import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function QuestModal(props) {

    return (
        <Modal
            {...props}
            fullscreen={true}
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Quests</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* TODO: insert quests here */}
            </Modal.Body>
        </Modal>
    )
  }
  
  export default QuestModal