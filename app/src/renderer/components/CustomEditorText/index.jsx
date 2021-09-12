import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MentionsInput, Mention } from 'react-mentions';
import defaultStyle from './defaultStyle.js';
import classNames from './style.css';
import useValue from './useValue.jsx';
const { SERVER_API_URL } = process.env;

const CustomEditorText = () => {
  const [users, setUsers] = useState([]);
  const [value, onChange, onAdd] = useValue('');

  const getUsers = async () => {
    const response = await axios.get(`${SERVER_API_URL}/user`);
    if (response?.data?.message === 'successful') {
      const usersOdered = response.data.users.map((user) => ({
        display: user.username,
        id: user.ID,
        avatar: user.avatar,
      }));
      setUsers(usersOdered);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <MentionsInput
        id="my-textarea"
        value={value}
        onChange={onChange}
        style={defaultStyle}
        placeholder={'Enviar mensaje!'}
        className="mentions"
        classNames={classNames}
        allowSuggestionsAboveCursor={true}
        a11ySuggestionsListLabel={'mensiones sugeridas!'}
      >
        <Mention
          suggestionsPosition={'top'}
          trigger="@"
          data={users}
          markup="@@@____id__^^^____display__@@@^^^"
          displayTransform={(userID) => {
            const userTarget = users.find((user) => user.id === userID);
            return `@${userTarget.display}`;
          }}
          onAdd={onAdd}
          className={classNames.mentions__mention}
          renderSuggestion={(
            suggestion,
            search,
            highlightedDisplay,
            index,
            focused
          ) => (
            <div className={`user ${focused ? 'focused' : ''}`}>
              {highlightedDisplay}
            </div>
          )}
        />
      </MentionsInput>
    </>
  );
};

export default CustomEditorText;
