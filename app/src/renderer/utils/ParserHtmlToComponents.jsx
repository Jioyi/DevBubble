import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import ReactHtmlParser, {
  convertNodeToElement,
  processNodes,
} from 'react-html-parser';

const useStyles = makeStyles(() => ({
  chatBoxContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  span: {
    backgroundColor: '#faa81a',
    color: '#000',
    fontSize: '0.8rem',
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    padding: '2px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  p: {
    color: '#fff',
    fontSize: '0.9rem',
    fontWeight: 'normal',
    lineHeight: 0,
  },
}));

const ParserHtmlToComponents = ({ htmlValue, handleOpen }) => {
  const spanRef = React.useRef();
  let content = htmlValue;
  content = content.split('@@@__').join('<component user="');
  content = content.split('^^^__').join(`">@`);
  content = content.split('@@@^^^').join('</component>');
  content = '<p>' + content + '</p>';
  content = content.replace(/\n/g, '</p><p>');
  //console.log(content);
  const classes = useStyles();
  const transform = (node, index) => {
    if (node.type === 'tag' && node.name === 'p') {
      return (
        <p key={index} className={classes.p}>
          {processNodes(node.children, transform)}
        </p>
      );
    }

    if (node.type === 'tag' && node.name === 'ul') {
      node.name = 'ol';
      return convertNodeToElement(node, index, transform);
    }

    if (node.type === 'tag' && node.name === 'a') {
      node.attribs.target = '_blank';
      return convertNodeToElement(node, index, transform);
    }

    if (node.type === 'tag' && node.name === 'component') {
      const { user } = node.attribs;
      return (
        <span
          key={index}
          ref={spanRef}
          className={classes.span}
          aria-label="show-user-profile"
          aria-haspopup="true"
          onClick={(event) => {
            event.preventDefault();
            handleOpen(spanRef.current, user);
          }}
        >
          {processNodes(node.children, transform)}
        </span>
      );
    }
  };

  const options = {
    decodeEntities: true,
    transform,
  };

  return (
    <Box className={classes.chatBoxContent}>
      {ReactHtmlParser(content, options)}
    </Box>
  );
};

export default ParserHtmlToComponents;
