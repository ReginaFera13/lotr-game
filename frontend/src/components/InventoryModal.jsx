import { useState, useEffect } from 'react'
import axios from "axios"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function InventoryModal(props) {
    const [inventory, setInventory] = useState([])
    const {player, playerInfo, playerStats} = props
    // console.log('playerStats', playerStats)
    // console.log('playerInfo', playerInfo)

    // console.log('props', props)

    const getInventory = async (playerStats) => {
        const id = playerStats[0].id
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/v1/game_inventory/?char_id=${id}`);
            const items = response.data;
            setInventory(items)
        } catch (error) {
            console.error("Error inventory:", error);
        }
    }

    useEffect(() => {
        if (playerStats && playerStats.length > 0) {
            getInventory(playerStats)
        }
    }, [playerStats]);

    // console.log('inventory', inventory)

    const name = playerInfo[0].name

    const renderEquipt = (inventory) => {
        for (let i = 0; i < inventory.length; i++) {
            const item = inventory[i]
            console.log('item', item)
            const item_catagory = inventory[i].item_id.category
            console.log('item_catagory', item_catagory)

            
        }
    }

    renderEquipt(inventory)

    return (
        <Modal
            {...props}
            fullscreen={true}
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Inventory</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        <Col>{name}</Col>
                    </Row>
                    <Row>
                        <Col id='Weapon'>Weapon</Col>
                        <Col id='Helmet'>Helmet</Col>
                    </Row>
                    <Row>
                        <Col id='Chest'>Chest</Col>
                        <Col id='Cloak'>Cloak</Col>
                    </Row>
                    <Row>
                        <Col id='Legs'>Legs</Col>
                        <Col id='Footware'>Footware</Col>
                    </Row>
                    <Row>
                        <Col id='Consumable'>Consumable</Col>
                    </Row>
                </Container>
                <div></div>
                <div></div>
                <div></div>
            </Modal.Body>
        </Modal>
    )
  }
  
  export default InventoryModal