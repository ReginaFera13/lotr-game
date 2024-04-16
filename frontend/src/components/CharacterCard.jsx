import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProgressBar from 'react-bootstrap/ProgressBar';


function CharacterCard({id, armor, att_sp, dam, health, stam, exp, level, curr_char, team, teamInfo, player, setPlayer}) {

    const name = teamInfo[id].name

    return (
        <Card style={{ width: '15rem' }}>
            <Card.Body>
                <Card.Title className='font-size-12'>{name}</Card.Title>
                <Card.Text>
                    <Container>
                        <Row>
                            <Col className='font-size-10'>Health</Col>
                            <Col>
                                <ProgressBar variant="danger" now={health} />
                            </Col>
                        </Row>
                        <Row>
                            <Col className='font-size-10'>Stamina</Col>
                            <Col>
                                <ProgressBar variant="success" now={stam} />
                            </Col>
                        </Row>
                        <Row>
                            <Col className='font-size-10'>Armor</Col>
                            <Col className='font-size-10'>Damage</Col>
                            <Col className='font-size-10'>Attack Speed</Col>
                        </Row>
                        <Row>
                            <Col className='font-size-10'>{armor}</Col>
                            <Col className='font-size-10'>{dam}</Col>
                            <Col className='font-size-10'>{att_sp}</Col>
                        </Row>
                    </Container>
                </Card.Text>
                <Button className='font-size-10' variant="outline-success" size="sm">Set Active</Button>
            </Card.Body>
        </Card>
    )
  }
  
  export default CharacterCard