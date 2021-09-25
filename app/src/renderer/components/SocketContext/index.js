import React, {
  createContext,
  useState,
  useRef,
  useEffect,
  useReducer,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as Peer from 'simple-peer';
//actions
import {
  setLoading,
  checkToken,
  addMessage,
  updateDirectMessage,
  updateMessageInStore,
  setMessageAlert,
  setOpenAlert,
} from './../../redux/actions';

import ClientSocketIO from 'socket.io-client';
const SocketContext = createContext();
const { SERVER_API_URL } = process.env;

const SocketContextProvider = ({ children, history }) => {
  const [, render] = useReducer((p) => !p, false);
  const dispatch = useDispatch();
  const { user, isAuthenticated, socketState, token } = useSelector(
    (state) => state.auth
  );

  //opens
  const [openNewCall, setOpenNewCall] = useState(false);
  const [openIncomingCall, setOpenIncomingCall] = useState(false);

  const [stream, setStream] = useState(null);
  const [stream2, setStream2] = useState(null);

  const [userCall, setUserCall] = useState(null);

  const [signal, setSignal] = useState();

  //refs
  const state = useRef('avaible');
  const socket = useRef();
  const peer = useRef();

  const resetCall = () => {
    setOpenIncomingCall(false);
    setOpenNewCall(false);
    if (window.stream) {
      window.stream.getTracks().forEach((track) => {
        track.stop();
      });
    }
    if (peer.current) {
      peer.current.destroy();
    }
    setState('avaible');
    socket.current.removeListener('callAccepted');
    socket.current.removeListener('dontAccept');
    socket.current.removeListener('userCancelCall');

    setUserCall(null);
    setStream(null);
    setStream2(null);
  };

  const setState = (value) => {
    state.current = value;
    render();
  };

  const newCall = (user) => {
    setUserCall(user);
    setOpenNewCall(true);
  };

  const cancelIncomingCall = () => {
    socket.current.emit('dontAcceptCall', { to: userCall, userCalled: user });
    resetCall();
  };

  const cancelNewCall = () => {
    socket.current.emit('cancelCall', { to: userCall, userCalled: user });
    resetCall();
  };

  const closeCall = () => {
    resetCall();
  };

  const acceptCall = async () => {
    setState('inCall');
    peer.current = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.current.on('signal', (data) => {
      socket.current.emit('acceptCall', { signal: data, to: userCall });
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

    peer.current.signal(signal);
  };

  const callToUser = async () => {
    setState('calling');
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
        userToCall: userCall,
        signal: data,
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
      setState('inCall');
      peer.current.signal(signal);
    });
    socket.current.on('dontAccept', async (data) => {
      const message = `@${data.userCalled.username} no a aceptado la llamada`;
      resetCall();
      dispatch(setMessageAlert(message));
      dispatch(setOpenAlert(true));
    });
  };

  const connectSocket = async () => {
    socket.current = ClientSocketIO(SERVER_API_URL, {
      query: { token: token },
      secure: true,
      reconnection: true,
      rejectUnauthorized: false,
      reconnectionAttempts: 10,
    });
    socket.current.on('connect', async () => {
      dispatch(setLoading(false));
    });
    socket.current.on('disconnect', async () => {
      dispatch(setLoading(true));
    });
    socket.current.on('ALERT_NEW_MESSAGE', async (data) => {
      const location = window.location.href;
      if (location.includes(`direct_message/${data.directMessageInfo.ID}`)) {
        dispatch(addMessage(data.messageInfo));
      }
      dispatch(updateDirectMessage(data.directMessageInfo));
    });
    socket.current.on('ALERT_EDITED_MESSAGE', async (data) => {
      const location = window.location.href;
      if (location.includes(`direct_message/${data.directMessageInfo.ID}`)) {
        dispatch(updateMessageInStore(data.messageInfo));
      }
      dispatch(updateDirectMessage(data.directMessageInfo));
    });
    socket.current.on('ImCallingYou', async (data) => {
      if (state.current === 'avaible') {
        socket.current.on('userCancelCall', async (data) => {
          const message = `@${data.userCalled.username} cancelado la llamada`;
          resetCall();
          dispatch(setMessageAlert(message));
          dispatch(setOpenAlert(true));
        });
        setOpenIncomingCall(true);
        setState('acceptingCall');
      }
      setUserCall(data.from);
      setSignal(data.signal);
    });
  };

  const connectDestroy = () => {
    socket.current.destroy();
  };

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(checkToken());
    } else {
      dispatch(setLoading(false));
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (socketState === 'connecting') {
      connectSocket();
    } else if (socketState === 'destroy') {
      connectDestroy();
    }
  }, [socketState]);

  useEffect(() => {
    console.log('state', state.current);
    if (state.current === 'avaible') {
      history.push('/home');
    } else if (state?.current === 'inCall') {
      setOpenIncomingCall(false);
      setOpenNewCall(false);
      history.push('/call');
    }
  }, [state.current]);

  return (
    <SocketContext.Provider
      value={{
        state,
        openNewCall,
        cancelNewCall,
        callToUser,
        newCall,
        stream,
        setUserCall,
        setOpenIncomingCall,
        openIncomingCall,
        userCall,
        acceptCall,
        cancelIncomingCall,
        setStream,
        setOpenNewCall,
        stream2,
        closeCall,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContextProvider, SocketContext };
