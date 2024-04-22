import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import axios from "axios"
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import StatsGrid from '../components/StatsGrid';

function StatsPage() {
  const [activeTab, setActiveTab] = useState('Easy');
  const [easyStats, setEasyStats] = useState([])
  const [mediumStats, setMediumStats] = useState([])
  const [hardStats, setHardStats] = useState([])
  const {user, userInfo} = useOutletContext()
  const userID = userInfo[0].id
  console.log(userID)




  const handleTabSelect = (tab) => {
    setActiveTab(tab);
  };

  const fetchStats = async () => {
    const response = await axios.get(`http://127.0.0.1:8000/api/v1/game_stats/?user_id=${userID}`)
    const stats = response.data
    console.log(stats)
    for (const stat of stats) {
      if (stat.diff_level == 'easy') {
        setEasyStats(stat)
      } else if (stat.diff_level == 'medium') {
        setMediumStats(stat)
      } else if (stat.diff_level == 'hard') {
        setHardStats(stat)
      }
    }
  }

  useEffect(() => {
    fetchStats()
  }, []);

  console.log('easyStats', easyStats)
  console.log('mediumStats', mediumStats)
  console.log('hardStats', hardStats)

  const statsData = {
    Easy: easyStats,
    Medium: mediumStats,
    Hard: hardStats
  };

// Note: changeGameStat for testing purposes
//   const changeGameStat = async () => {
//     try {
//         const data = { total_resources_collected: 1 }; 
//         const response = await axios.put(`http://127.0.0.1:8000/api/v1/game_stats/1/`, data);
//         console.log(response);
//         fetchStats()
//     } catch (error) {
//         console.error("Error changing game stat:", error);
//     }
// };
// changeGameStat()

const resetStats = async () => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/v1/game_stats/?user_id=${userID}`);
    const stats = response.data;

    for (const stat of stats) {
      const defaultValues = {
        games_completed: 0,
        total_enemies_killed: 0,
        total_resources_collected: 0,
        total_times_killed: 0
      };

      await axios.put(`http://127.0.0.1:8000/api/v1/game_stats/${stat.id}/`, defaultValues);
    }

    fetchStats();
  } catch (error) {
    console.error("Error resetting stats:", error);
  }
};

  return (
    <div className='flex-center'>
      <h1 className='hobbiton-brushhand'>Stats</h1>
      <Nav variant="tabs" activeKey={activeTab} onSelect={handleTabSelect}>
        <Nav.Item>
          <Nav.Link eventKey="Easy">Easy</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="Medium">Medium</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="Hard">Hard</Nav.Link>
        </Nav.Item>
      </Nav>
      {/* Data in StatsGrid should change based on which tab is selected. How should I implement this? */}
      <StatsGrid data={statsData[activeTab]} activeTab={activeTab}/>
      <Button onClick={() => resetStats()}  variant="outline-danger">Reset All Stats</Button>
    </div>
  )
}
  
  export default StatsPage