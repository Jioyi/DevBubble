import React from 'react';
import { useDispatch } from 'react-redux';

//components
import InputMentions from '../InputMentions';
//hooks
import useValue from './../hooks/useValue';
//actions
import { updateMessage } from './../../redux/actions'

const EditableInputMentions = ({ message, setEditable }) => {
  const dispatch = useDispatch();
  const [value, onChange, onAdd] = useValue(message.content);

  const handleKeyDown = (e) => {
    if (e.shiftKey && e.keyCode === 13) {
      return;
    }
    if (e.which == 13) {
      e.preventDefault();
      handleOnSubmitMessage();
    }
  };

  const handleOnSubmitMessage = () => {
    if (value.trim().length !== 0) {
      const data = {
        messageID: message.ID,
        DirectMessageID: message.DirectMessageID,
        content: value,
      };
      dispatch(updateMessage(data));
    }
    setEditable('');
  };

  return (
    <InputMentions
      value={value}
      onChange={onChange}
      onAdd={onAdd}
      type={'edit'}
      handleKeyDown={handleKeyDown}
    />
  );
};

export default EditableInputMentions;
