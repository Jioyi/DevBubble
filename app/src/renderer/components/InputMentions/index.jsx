import React, { useState, useCallback, useEffect } from 'react';
import { MentionsInput, Mention } from 'react-mentions';
import axios from 'axios';
//internal files
import defaultStyle from './defaultStyle.js';
import classNames from './style.css';

const { SERVER_API_URL } = process.env;

const InputMentions = ({ value, onChange, handleKeyDown }) => {
  const [users, setUsers] = useState([]);
  const [emojis, setEmojis] = useState([]);
  const onAdd = useCallback(() => {}, []);
  const neverMatchingRegex = /($a)/;

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

  const getEmojis = async () => {
    const response = await axios.get(`${SERVER_API_URL}/emojis`);
    if (response?.data?.message === 'successful') {
      setEmojis(response.data.emojis);
    }
  };

  const searchEmoji = (query) => {
    if (query.length === 0) return;
    const matches = emojis
      .filter((emoji) => {
        return emoji.name.indexOf(query.toLowerCase()) > -1;
      })
      .slice(0, 10);
    return matches.map(({ emoji }) => ({ id: emoji }));
  };

  useEffect(() => {
    getUsers();
    getEmojis();
  }, []);

  return (
    <MentionsInput
      spellCheck={false}
      name="content"
      value={value}
      onChange={onChange}
      style={defaultStyle}
      onKeyDown={handleKeyDown}
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
      <Mention
        trigger=":"
        markup="__id__"
        regex={neverMatchingRegex}
        data={searchEmoji}
      />
    </MentionsInput>
  );
};

export default InputMentions;
