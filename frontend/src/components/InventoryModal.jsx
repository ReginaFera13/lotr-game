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
    const [allInventory, setAllInventory] = useState([])
    const [inventory, setInventory] = useState([])
    const [weapon, setWeapon] = useState()
    const [helmet, setHelmet] = useState()
    const [chest, setChest] = useState()
    const [cloak, setCloak] = useState()
    const [legs, setLegs] = useState()
    const [footware, setFootware] = useState()
    const [consumable, setConsumable] = useState()
    const [currency, setCurrency] = useState()
    const { team, teamInfo, teamStats, player, setPlayer, playerInfo, playerStats, renderPlayerName } = useContext(GameContext);
    // console.log('playerStats', playerStats)
    // console.log('playerInfo', playerInfo)

    // console.log('props', props)

    const getAllInventory = async (playerStats) => {
        const id = playerStats.id
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/v1/game_inventory/?char_id=${id}`);
            const items = response.data;
            // console.log(items)
            setAllInventory(items)
        } catch (error) {
            console.error("Error inventory:", error);
        }
    }

    useEffect(() => {
        if (playerStats) {
            getAllInventory(playerStats)
        }
    }, [playerStats]);

    // console.log('allInventory', allInventory)

    // const name = () => {
    //     if (playerInfo) {
    //         return playerInfo[0].name
    //     }
    // }

    const sortInventory = (allInventory) => {
        for (let i = 0; i < allInventory.length; i++) {
            const item = allInventory[i]
            // console.log('item', item)
            const item_catagory = item.item_id.category
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
                setInventory([...inventory, item])
            }
        }
    }

    useEffect(() => {
        if (allInventory.length > 0) {
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

    const renderWeapon = () => {
        if (weapon) {
            return (
                <Card style={{ width: '5rem' }}>
                    <Card.Img variant="top" src="/src/images/Weapon.png" />
                    <Card.Body>
                        <Card.Text>{`${weapon.item_id.name} Level ${weapon.item_id.stat}`}</Card.Text>
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
                        <Card.Text>{`${helmet.item_id.name} Level ${helmet.item_id.stat}`}</Card.Text>
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
                        <Card.Text>{`${chest.item_id.name} Level ${chest.item_id.stat}`}</Card.Text>
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
                        <Card.Text>{`${cloak.item_id.name} Level ${cloak.item_id.stat}`}</Card.Text>
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
                        <Card.Text>{`${legs.item_id.name} Level ${legs.item_id.stat}`}</Card.Text>
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
                        <Card.Text>{`${footware.item_id.name} Level ${footware.item_id.stat}`}</Card.Text>
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
                        <Card.Text>{`${footware.item_id.name} Level ${footware.item_id.stat}`}</Card.Text>
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

    const renderInventory = () => {
        if (inventory.length > 0) {
            for (let i = 0; i < inventory.length; i++) {
                const item = inventory[i]
                const item_catagory = item.item_id.category
                return (
                    <Card style={{ width: '5rem' }}>
                        <Card.Img variant="top" src={`/src/images/${item_category}.png`} />
                        <Card.Body>
                            <Card.Text>{`${item.item_id.name} Level ${item.item_id.stat}`}</Card.Text>
                        </Card.Body>
                    </Card>
                )
            }
        } else {
            return <h4>No Inventory Items</h4>
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