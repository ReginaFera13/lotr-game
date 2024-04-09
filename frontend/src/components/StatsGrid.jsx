import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function StatsGrid({ data, activeTab }) {

    return (
        <Container>
            <Row>
                <Col>Viewing: {activeTab}</Col>
            </Row>
            <Row>
                <Col>Games Completed</Col>
                <Col className='text-right'>TEMP: Value</Col>
            </Row>
            <Row>
                <Col>Hours Played</Col>
                <Col className='text-right'>TEMP: Value</Col>
            </Row>
            <Row>
                <Col>Times Killed</Col>
                <Col className='text-right'>TEMP: Value</Col>
            </Row>
            <Row>
                <Col>Enemies Killed</Col>
                <Col className='text-right'>TEMP: Value</Col>
            </Row>
            <Row>
                <Col>Resources Collected</Col>
                <Col className='text-right'>TEMP: Value</Col>
            </Row>
        </Container>
    )
  }
  
  export default StatsGrid