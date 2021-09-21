import React, { useRef } from 'react';
import Avatar from '@material-ui/core/Avatar';
//components
import TextTooltip from './../../components/TextTooltip';
const { SERVER_API_URL } = process.env;

const avatarRef = ({ user, className, handlerOnClick, variant, alt }) => {
  const avatarRef = useRef();
  const handlerWithRef = () => {
    handlerOnClick(avatarRef.current, user.ID);
  };

  return (
    <TextTooltip title={`@${user.username}`} placement="bottom">
      <Avatar
        ref={avatarRef}
        onClick={handlerWithRef}
        variant={variant}
        className={className}
        alt={alt}
        src={`${SERVER_API_URL}/avatars/${user.avatar}`}
      />
    </TextTooltip>
  );
};

export default avatarRef;
