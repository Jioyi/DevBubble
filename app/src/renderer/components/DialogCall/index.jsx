import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import DialogNewCall from './states/DialogNewCall';
import DialogIncomingCall from './states/DialogIncomingCall';
import { SocketContext } from '../SocketContext';

const DialogCall = () => {
  const {
    state,
    openNewCall,
    cancelNewCall,
    callToUser,
    openIncomingCall,
    cancelIncomingCall,
    userIncomingCall,
    acceptIncomingCall,
    myStream,
    setStream,
    callAccepted,
    setOpenNewCall,
    setOpenIncomingCall,
  } = useContext(SocketContext);
  const history = useHistory();

  useEffect(() => {
    if (callAccepted) {
      setOpenIncomingCall(false);
      setOpenNewCall(false);
      history.push('/call');
    }
  }, [callAccepted]);

  return (
    <>
      <DialogNewCall
        streamRef={myStream}
        open={openNewCall}
        state={state}
        cancel={cancelNewCall}
        callToUser={callToUser}
        setStream={setStream}
      />
      <DialogIncomingCall
        open={openIncomingCall}
        state={state}
        cancel={cancelIncomingCall}
        user={userIncomingCall}
        acceptCall={acceptIncomingCall}
        streamRef={myStream}
        setStream={setStream}
      />
    </>
  );
};

export default DialogCall;
