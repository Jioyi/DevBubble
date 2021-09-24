import React, { createContext, useState, useRef, useEffect } from 'react';
import store from './../../redux/store';
import * as Peer from 'simple-peer';
import ClientSocketIO from 'socket.io-client';
const SocketContext = createContext();
const { SERVER_API_URL } = process.env;

const ContextProvider = ({ children }) => {
  const { user } = store.getState().auth;
  //const [socket, setSocket] = useState(null);
  let state = useRef('avaible');

  const [stream, setStream] = useState(null);
  const [stream2, setStream2] = useState(null);

  const [connectionSoket, setConnectionSoket] = useState(false);
  const [openNewCall, setOpenNewCall] = useState(false);
  const [openIncomingCall, setOpenIncomingCall] = useState(false);
  const [userNewCall, setUserNetCall] = useState(null);
  const [userIncomingCall, setUserIncomingCall] = useState(null);
  const [incomingCallSignal, setIncomingCallSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);

  const socket = useRef();
  const peer = useRef();
  let myStream = useRef();

  //const socket = useRef();

  const resetCall = () => {
    if (window.stream) {
      window.stream.getTracks().forEach((track) => {
        track.stop();
      });
    }
    peer.current.destroy();
    state.current = 'avaible';
    socket.current.removeListener('callAccepted');
    setCallAccepted(false);
    setUserIncomingCall(false);
    setUserNetCall(null);
    setStream(null);
    setStream2(null);
  };

  const newCall = (user) => {
    setUserNetCall(user);
    setOpenNewCall(true);
  };

  const cancelIncomingCall = () => {
    setOpenIncomingCall(false);
  };

  const cancelNewCall = () => {
    setOpenNewCall(false);
  };

  const closeCall = () => {
    resetCall();
  };

  const acceptIncomingCall = async () => {
    state.current = 'inCall';
    setCallAccepted(true);
    peer.current = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.current.on('signal', (data) => {
      socket.current.emit('acceptCall', { signal: data, to: userIncomingCall });
    });

    peer.current.on('stream', (stream) => {
      setStream2(stream);
    });
    peer.current.on('close', () => {
      resetCall();
      console.log('peer close ------');
    });
    peer.current.on('error', () => {
      resetCall();
      console.log('peer error ------');
    });

    peer.current.signal(incomingCallSignal);
  };

  const callToUser = async () => {
    state.current = 'calling';
    peer.current = new Peer({
      initiator: true,
      trickle: false,
      config: {
        iceServers: [
          {
            urls: 'stun:numb.viagenie.ca',
            username: 'karlosagreda@hotmail.com',
            credential: 'Superkata33',
          },
          {
            urls: 'turn:numb.viagenie.ca',
            username: 'sultan1640@gmail.com',
            credential: '98376683',
          },
        ],
      },
      stream: stream,
    });

    peer.current.on('signal', (data) => {
      socket.current.emit('callUser', {
        userToCall: userNewCall,
        signalData: data,
        from: user,
      });
    });

    peer.current.on('stream', (stream) => {
      setStream2(stream);
    });

    peer.current.on('close', () => {
      resetCall();
      console.log('peer close ------');
    });

    peer.current.on('error', () => {
      resetCall();
      console.log('peer error ------');
    });

    socket.current.on('callAccepted', (signal) => {
      state.current = 'inCall';
      setCallAccepted(true);
      peer.current.signal(signal);
    });
  };

  useEffect(() => {
    socket.current = ClientSocketIO(SERVER_API_URL, {
      query: { calls: true, ID: user.ID },
      secure: true,
      reconnection: true,
      rejectUnauthorized: false,
      reconnectionAttempts: 10,
    });
    socket.current.on('connect', async () => {
      setConnectionSoket(true);
    });
    socket.current.on('disconnect', async () => {
      setConnectionSoket(false);
    });
    socket.current.on('ImCallingYou', async (data) => {
      if (state.current === 'avaible') {
        setOpenIncomingCall(true);
        state.current = 'acceptingCall';
      }
      setUserIncomingCall(data.from);
      setIncomingCallSignal(data.signal);
    });
  }, []);

  return (
    <SocketContext.Provider
      value={{
        connectionSoket,
        state,
        openNewCall,
        userNewCall,
        cancelNewCall,
        callToUser,
        newCall,
        stream,
        setUserIncomingCall,
        setOpenIncomingCall,
        openIncomingCall,
        userIncomingCall,
        acceptIncomingCall,
        cancelIncomingCall,
        myStream,
        setStream,
        callAccepted,
        setOpenNewCall,
        stream2,
        closeCall,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
