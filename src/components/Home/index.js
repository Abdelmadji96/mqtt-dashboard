import React, { useEffect, useState } from 'react';
import { io } from "socket.io-client";
import PropTypes from 'prop-types';

import styles from './home.module.css';
import RoomComponent from '../Room';


const HomePageComponent = ({ data }) => {
  const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    console.log('socket', socket.on('messages', (data) => (
      setMessages((currentState) => [...currentState, JSON.parse(data)])
    )));
  }, [socket]);


  return (
    <div className={styles.container}>
      <h1>MRC - DashBoard</h1>
      <div className={styles.roomsWrapper}>
        {data.length > 0 && data.map((item) => {
          const roomMessages = messages.filter((message) => item.devices.find((device) => device._id === message.payload?.deviceId)?._id === message.payload?.deviceId);
          return (<RoomComponent data={item} messages={roomMessages} key={item._id} />)
        })}
      </div>
    </div>
  );
};

HomePageComponent.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    devices: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired,
      serialProduct: PropTypes.string.isRequired,
    })),
    _id: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired),
};

export default HomePageComponent;
