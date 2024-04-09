import { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import StatsGrid from '../components/StatsGrid';

function StatsPage() {
  const [activeTab, setActiveTab] = useState('easy');

  const handleTabSelect = (tab) => {
    setActiveTab(tab);
  };

  const statsData = {
    easy: { /* Data for Easy difficulty */ },
    medium: { /* Data for Medium difficulty */ },
    hard: { /* Data for Hard difficulty */ }
  };

  return (
    <div className='flex-center'>
      <h1 className='hobbiton-brushhand'>Stats</h1>
      <Nav variant="tabs" activeKey={activeTab} onSelect={handleTabSelect}>
        <Nav.Item>
          <Nav.Link eventKey="easy">Easy</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="medium">Medium</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="hard">Hard</Nav.Link>
        </Nav.Item>
      </Nav>
      {/* Data in StatsGrid should change based on which tab is selected. How should I implement this? */}
      <StatsGrid data={statsData[activeTab]} activeTab={activeTab}/>
    </div>
  )
}
  
  export default StatsPage