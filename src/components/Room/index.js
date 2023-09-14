import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import styles from './room.module.css';


const RoomComponent = ({ data: { number, devices }, messages }) => {

  const getDeviceStatus = (deviceId) => {
    try {
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/listen/${deviceId}`);
    } catch (error) {
      console.log('error in getDeviceStatus method', error);
    }
  };

  const actualPresence = ({ presenceDetected, roomPresenceIndication, trackerTargets }) => (
    presenceDetected && roomPresenceIndication > 0 && trackerTargets.length > 0
  )

  return (
    <div className={styles.container}>
      <p className={styles.room}> {`Room : ${number}`}</p>
      {devices.length > 0 && devices.map((item, index) => (
        <div key={index}>
          <span>{`Serial product ${index + 1} : ${item.serialProduct}`}</span>
          <div className={styles.btnWrapper}>
            <button className={styles.btn} onClick={() => getDeviceStatus(item._id)}>
              <p>Show state</p>
            </button>
          </div>
          <div className={styles.stateWrapper}>
            {messages.length > 0 && messages.map((messageItem) => {
              const isPresence = messageItem.type === 4;
              return (
                <div>
                  <div className={isPresence ? styles.presence : styles.fall}>
                    {isPresence ? 'Presence' : 'Fall'}
                    {actualPresence(messageItem.payload) && (
                      messageItem.payload.trackerTargets.map((item) => (
                        <p className={styles.trackerTarget}>{`x:${item.x} , y:${item.y} , z:${item.z}`}</p>
                      ))
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

RoomComponent.propTypes = {
  data: PropTypes.shape({
    devices: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired,
      serialProduct: PropTypes.string.isRequired,
    })),
    _id: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
  messages: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.number.isRequired,
    payload: PropTypes.shape({
      trackerTargets: PropTypes.arrayOf(PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
        z: PropTypes.number.isRequired,
      }).isRequired,)
    }).isRequired
  }).isRequired),
};

RoomComponent.defaultProps = {
  messages: [],
};

export default RoomComponent;
