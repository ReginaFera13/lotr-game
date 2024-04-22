import { useState, useEffect, useContext } from 'react'
import axios from "axios"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { GameContext } from '../pages/AGamePage';

function QuestModal(props) {
    const { gameID, incompleteQuests, incompleteSubquests, completedQuests } = useContext(GameContext);

    

    const renderIncompleteSubquests = () => {
        if (incompleteSubquests.length > 0) {
            const activeSubquest = incompleteSubquests[0]
            // console.log('activeSubquest', activeSubquest)
            return (
                <div key={activeSubquest.id}>
                    <p>{activeSubquest.subquest.descrip}</p>
                </div>
            )
        } 
    };

    const renderCompletedQuests = () => {
        if (completedQuests.length > 0) {
            return completedQuests.map(quest => {
                return (
                    <div key={quest.id}>
                        <h1>Completed Quests</h1>
                        <h5>{quest.quest.name} -- Complete</h5>
                    </div>
                )
            });
        } else {
            return (
                <div>
                    <h1>Completed Quests</h1>
                    <h5>No completed quests</h5>
                </div>
            )
        } 
    };

    const renderIncompleteQuests = () => {
        if (incompleteQuests.length > 0) {
            return incompleteQuests.map(quest => {
                return (
                    <div key={quest.id}>
                        <h1>Incomplete Quests</h1>
                        <h5>{quest.quest.name}</h5>
                        <p>{quest.quest.descrip}</p>
                        {renderIncompleteSubquests()}
                    </div>
                )
            });
        } else {
            return (
                <div>
                    <h1>Incomplete Quests</h1>
                    <h5>No incompleted quests</h5>
                </div>
            )
        } 
    };




    return (
        <Modal
            {...props}
            fullscreen={true}
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Quests</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {renderIncompleteQuests()}
                {renderCompletedQuests()}
            </Modal.Body>
        </Modal>
    )
  }
  
  export default QuestModal