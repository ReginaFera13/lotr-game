import { useState, useEffect, useContext } from 'react'
import axios from "axios"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { GameContext } from '../pages/AGamePage';

function InventoryModal(props) {
    const [inventory, setInventory] = useState([])
    const [weapon, setWeapon] = useState()
    const [helmet, setHelmet] = useState()
    const [chest, setChest] = useState()
    const [cloak, setCloak] = useState()
    const [legs, setLegs] = useState()
    const [footware, setFootware] = useState()
    const [consumable, setConsumable] = useState()
    const [currency, setCurrency] = useState()
    const { team, teamInfo, teamStats, player, setPlayer, playerInfo, playerStats, renderPlayerName, allInventory, setAllInventory, getAllInventory } = useContext(GameContext);
    // console.log('playerStats', playerStats)
    // console.log('playerInfo', playerInfo)

    

    const sortInventory = (allInventory) => {
        const inventoryData = []
        for (let i = 0; i < allInventory.length; i++) {
            const item = allInventory[i]
            // console.log('item', item)
            const item_catagory = item.item.category
            // console.log('item_catagory', item_catagory)
            const equipt = item.equipt
            // console.log('equipt', equipt)
            if (item_catagory == 'Weapon' && equipt) {
                setWeapon(item)
            } else if (item_catagory == 'Helmet' && equipt) {
                setHelmet(item)
            } else if (item_catagory == 'Chest' && equipt) {
                setChest(item)
            } else if (item_catagory == 'Cloak' && equipt) {
                setCloak(item)
            } else if (item_catagory == 'Legs' && equipt) {
                setLegs(item)
            } else if (item_catagory == 'Footware' && equipt) {
                setFootware(item)
            } else if (item_catagory == 'Consumable' && equipt) {
                setConsumable(item)
            } else if (item_catagory == 'Currency') {
                setCurrency(item)
            } else {
                inventoryData.push(item)
            }
            setInventory(inventoryData)
        }
    }

    useEffect(() => {
        if (allInventory && allInventory.length > 0) {
            sortInventory(allInventory);
        }
    }, [allInventory]);

    // console.log('weapon', weapon)
    // console.log('helmet', helmet)
    // console.log('chest', chest)
    // console.log('cloak', cloak)
    // console.log('legs', legs)
    // console.log('footware', footware)
    // console.log('consumable', consumable)
    // console.log('currency', currency)
    // console.log('inventory', inventory)

    const unequipItem = async (id, category) => {
        try {
            if (category == 'Weapon') {
                setWeapon()
            } else if (category == 'Helmet') {
                setHelmet()
            } else if (category == 'Chest') {
                setChest()
            } else if (category == 'Cloak') {
                setCloak()
            } else if (category == 'Legs') {
                setLegs()
            } else if (category == 'Footware') {
                setFootware()
            } else if (category == 'Consumable') {
                setConsumable()
            }
            const data = { equipt: false }; 
            const response = await axios.put(`http://127.0.0.1:8000/api/v1/game_inventory/${id}/`, data);
            await getAllInventory(playerStats)
        } catch (error) {
            console.error("Error setting player to active:", error);
        }
    }

    const renderWeapon = () => {
        if (weapon) {
            return (
                <Card style={{ width: '5rem' }}>
                    <Card.Img variant="top" src="/src/images/Weapon.png" />
                    <Card.Body>
                        <Card.Text>{`${weapon.item.name} Level ${weapon.item.stat}`}</Card.Text>
                        <Button onClick={() => unequipItem(weapon.id, weapon.item.category)} variant="outline-success" size="sm">Unequip</Button>
                    </Card.Body>
                </Card>
            )
        } else {
            return (
                <Card style={{ width: '5rem' }}>
                    <Card.Img variant="top" src="/src/images/Weapon.png" />
                    <Card.Body>
                        <Card.Text>No item equipt</Card.Text>
                    </Card.Body>
                </Card>
            )
        }
    }

    const renderHelmet = () => {
        if (helmet) {
            return (
                <Card style={{ width: '5rem' }}>
                    <Card.Img variant="top" src="/src/images/Helmet.png" />
                    <Card.Body>
                        <Card.Text>{`${helmet.item.name} Level ${helmet.item.stat}`}</Card.Text>
                        <Button onClick={() => unequipItem(helmet.id, helmet.item.category)} variant="outline-success" size="sm">Unequip</Button>
                    </Card.Body>
                </Card>
            )
        } else {
            return (
                <Card style={{ width: '5rem' }}>
                    <Card.Img variant="top" src="/src/images/Helmet.png" />
                    <Card.Body>
                        <Card.Text>No item equipt</Card.Text>
                    </Card.Body>
                </Card>
            )
        }
    }

    const renderChest = () => {
        if (chest) {
            return (
                <Card style={{ width: '5rem' }}>
                    <Card.Img variant="top" src="/src/images/Chest.png" />
                    <Card.Body>
                        <Card.Text>{`${chest.item.name} Level ${chest.item.stat}`}</Card.Text>
                        <Button onClick={() => unequipItem(chest.id, chest.item.category)} variant="outline-success" size="sm">Unequip</Button>
                    </Card.Body>
                </Card>
            )
        } else {
            return (
                <Card style={{ width: '5rem' }}>
                    <Card.Img variant="top" src="/src/images/Chest.png" />
                    <Card.Body>
                        <Card.Text>No item equipt</Card.Text>
                    </Card.Body>
                </Card>
            )
        }
    }

    const renderCloak = () => {
        if (cloak) {
            return (
                <Card style={{ width: '5rem' }}>
                    <Card.Img variant="top" src="/src/images/Cloak.png" />
                    <Card.Body>
                        <Card.Text>{`${cloak.item.name} Level ${cloak.item.stat}`}</Card.Text>
                        <Button onClick={() => unequipItem(cloak.id, cloak.item.category)} variant="outline-success" size="sm">Unequip</Button>
                    </Card.Body>
                </Card>
            )
        } else {
            return (
                <Card style={{ width: '5rem' }}>
                    <Card.Img variant="top" src="/src/images/Cloak.png" />
                    <Card.Body>
                        <Card.Text>No item equipt</Card.Text>
                    </Card.Body>
                </Card>
            )
        }
    }

    const renderLegs = () => {
        if (legs) {
            return (
                <Card style={{ width: '5rem' }}>
                    <Card.Img variant="top" src="/src/images/Legs.png" />
                    <Card.Body>
                        <Card.Text>{`${legs.item.name} Level ${legs.item.stat}`}</Card.Text>
                        <Button onClick={() => unequipItem(legs.id, legs.item.category)} variant="outline-success" size="sm">Unequip</Button>
                    </Card.Body>
                </Card>
            )
        } else {
            return (
                <Card style={{ width: '5rem' }}>
                    <Card.Img variant="top" src="/src/images/Legs.png" />
                    <Card.Body>
                        <Card.Text>No item equipt</Card.Text>
                    </Card.Body>
                </Card>
            )
        }
    }

    const renderFootware = () => {
        if (footware) {
            return (
                <Card style={{ width: '5rem' }}>
                    <Card.Img variant="top" src="/src/images/Footware.png" />
                    <Card.Body>
                        <Card.Text>{`${footware.item.name} Level ${footware.item.stat}`}</Card.Text>
                        <Button onClick={() => unequipItem(footware.id, footware.item.category)} variant="outline-success" size="sm">Unequip</Button>
                    </Card.Body>
                </Card>
            )
        } else {
            return (
                <Card style={{ width: '5rem' }}>
                    <Card.Img variant="top" src="/src/images/Footware.png" />
                    <Card.Body>
                        <Card.Text>No item equipt</Card.Text>
                    </Card.Body>
                </Card>
            )
        }
    }

    const renderConsumable = () => {
        if (consumable) {
            return (
                <Card style={{ width: '5rem' }}>
                    <Card.Img variant="top" src="/src/images/Consumable.png" />
                    <Card.Body>
                        <Card.Text>{`${footware.item.name} Level ${footware.item.stat}`}</Card.Text>
                        <Button onClick={() => unequipItem(consumable.id, consumable.item.category)} variant="outline-success" size="sm">Unequip</Button>
                    </Card.Body>
                </Card>
            )
        } else {
            return (
                <Card style={{ width: '5rem' }}>
                    <Card.Img variant="top" src="/src/images/Consumable.png" />
                    <Card.Body>
                        <Card.Text>No item equipt</Card.Text>
                    </Card.Body>
                </Card>
            )
        }
    }

    const renderHealth = () => {
        if (playerStats) {
            return (
                <Card style={{ width: '5rem' }}>
                    <Card.Img variant="top" src="/src/images/Health.png" />
                    <Card.Body>
                        <Card.Text>{`${playerStats.health}`}</Card.Text>
                    </Card.Body>
                </Card>
            )
        } 
    }

    const renderStamina = () => {
        if (playerStats) {
            return (
                <Card style={{ width: '5rem' }}>
                    <Card.Img variant="top" src="/src/images/Stamina.png" />
                    <Card.Body>
                        <Card.Text>{`${playerStats.stamina}`}</Card.Text>
                    </Card.Body>
                </Card>
            )
        } 
    }

    const renderArmor = () => {
        if (playerStats) {
            return (
                <Card style={{ width: '5rem' }}>
                    <Card.Img variant="top" src="/src/images/Armor.png" />
                    <Card.Body>
                        <Card.Text>{`${playerStats.armor}`}</Card.Text>
                    </Card.Body>
                </Card>
            )
        } 
    }

    const renderDamage = () => {
        if (playerStats) {
            return (
                <Card style={{ width: '5rem' }}>
                    <Card.Img variant="top" src="/src/images/Damage.png" />
                    <Card.Body>
                        <Card.Text>{`${playerStats.damage}`}</Card.Text>
                    </Card.Body>
                </Card>
            )
        } 
    }

    const renderAttackSpeed = () => {
        if (playerStats) {
            return (
                <Card style={{ width: '5rem' }}>
                    <Card.Img variant="top" src="/src/images/Attack-speed.png" />
                    <Card.Body>
                        <Card.Text>{`${playerStats.att_sp}`}</Card.Text>
                    </Card.Body>
                </Card>
            )
        } 
    }

    const renderLevel = () => {
        if (playerStats) {
            return (
                <div>
                    <h1>Level {`${playerStats.level}`}</h1> 
                    <ProgressBar variant="success" now={playerStats.exp} /> 
                </div>
            )
        } 
    }

    const renderCurrency = () => {
        if (currency) {
            return (
                <Card style={{ width: '5rem' }}>
                    <Card.Img variant="top" src="/src/images/Currency.png" />
                    <Card.Body>
                        <Card.Text>{`${currency.quantity} Coins`}</Card.Text>
                    </Card.Body>
                </Card>
            )
        } else {
            return (
                <Card style={{ width: '5rem' }}>
                    <Card.Img variant="top" src="/src/images/Currency.png" />
                    <Card.Body>
                        <Card.Text>0</Card.Text>
                    </Card.Body>
                </Card>
            )
        }
    }

    const equipItem = async (id) => {
        try {
            const data = { equipt: true }; 
            const response = await axios.put(`http://127.0.0.1:8000/api/v1/game_inventory/${id}/`, data);
            getAllInventory(playerStats)
        } catch (error) {
            console.error("Error setting player to active:", error);
        }
    }

    const renderEquiptButton = (category, id) => {
        if (category == 'Weapon' || category == 'Helmet' || category == 'Chest' || category == 'Cloak' || category == 'Legs' || category == 'Footware' || category == 'Consumable') {
            return <Button onClick={() => equipItem(id)} variant="outline-success" size="sm">Equip</Button>
        }
    }

    const renderInventory = () => {
        // console.log(inventory)
        if (inventory.length > 0) {
            return inventory.map((item, index) => {
                const item_category = item.item.category;
                return (
                    <Card key={index} style={{ width: '5rem' }}>
                        <Card.Img variant="top" src={`/src/images/${item_category}.png`} />
                        <Card.Body>
                            <Card.Text>{`${item.item.name} Level ${item.item.stat}`}</Card.Text>
                            {renderEquiptButton(item_category, item.id)} 
                        </Card.Body>
                    </Card>
                );
            });
        } else {
            return <h4>No Inventory Items</h4>;
        }
    }

    return (
        <Modal
            {...props}
            fullscreen={true}
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Inventory</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='absolute left-top font-size-10 width-40vw'>
                    <Container className='flex-center'>
                        <Row>
                            <Col className='font-size-16'>{renderPlayerName()}</Col>
                        </Row>
                        <Row>
                            <Col>{renderWeapon()}</Col>
                            <Col>{renderHelmet()}</Col>
                            <Col>{renderChest()}</Col>
                            <Col>{renderCloak()}</Col>
                            <Col>{renderLegs()}</Col>
                            <Col>{renderFootware()}</Col>
                            <Col>{renderConsumable()}</Col>
                        </Row>
                    </Container>
                    <div className='flex-center-row flex-wrap'>
                        <div>{renderHealth()}</div>
                        <div>{renderStamina()}</div>
                        <div>{renderArmor()}</div>
                        <div>{renderDamage()}</div>
                        <div>{renderAttackSpeed()}</div>
                    </div>
                </div>
                <div className='absolute top-right width-40vw'>
                    <div>{renderLevel()}</div>
                    <div>
                        <div>{renderCurrency()}</div>
                        <div>{renderInventory()}</div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
  }
  
  export default InventoryModal