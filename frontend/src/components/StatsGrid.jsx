import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function StatsGrid({ data, activeTab }) {
    console.log(data)

    return (
        <Container>
            <Row>
                <Col>Viewing: {activeTab}</Col>
            </Row>
            <Row>
                <Col>Games Completed</Col>
                <Col className='text-right'>{data.games_completed}</Col>
            </Row>
            <Row>
                <Col>Times Killed</Col>
                <Col className='text-right'>{data.total_times_killed}</Col>
            </Row>
            <Row>
                <Col>Enemies Killed</Col>
                <Col className='text-right'>{data.total_enemies_killed}</Col>
            </Row>
            <Row>
                <Col>Resources Collected</Col>
                <Col className='text-right'>{data.total_resources_collected}</Col>
            </Row>
        </Container>
    )
  }
  
  export default StatsGrid