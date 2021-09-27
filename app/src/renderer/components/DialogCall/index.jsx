import React, { useContext } from 'react';
import DialogNewCall from './states/DialogNewCall';
import DialogIncomingCall from './states/DialogIncomingCall';
import { SocketContext } from '../../SocketContext';

const DialogCall = () => {
  const {
    state,
    openNewCall,
    cancelNewCall,
    callToUser,
    openIncomingCall,
    cancelIncomingCall,
    userCall,
    acceptCall,
    setStream,
  } = useContext(SocketContext);

  return (
    <>
      <DialogNewCall
        open={openNewCall}
        state={state}
        cancel={cancelNewCall}
        callToUser={callToUser}
        setStream={setStream}
        userCall={userCall}
      />
      <DialogIncomingCall
        open={openIncomingCall}
        state={state}
        cancel={cancelIncomingCall}
        userCall={userCall}
        acceptCall={acceptCall}
        setStream={setStream}
      />
    </>
  );
};

export default DialogCall;
