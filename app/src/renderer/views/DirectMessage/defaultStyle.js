export default {
  control: {
    backgroundColor: '#40444b',
    color: '#b9bbbe',
    fontSize: "14px",
    fontWeight: 'normal',
    height: '100%',
  },
  highlighter: {
    overflow: 'hidden',
  },
  input: { fontSize: 14, margin: 0, flex: 1 },

  '&multiLine': {
    width: `calc((100%) - 100px)`,
    maxWidth: `calc((100%) - 100px)`,
    control: {
      fontFamily: 'monospace',
      minHeight: 40,
      //color: '#b9bbbe',
      //maxHeight: 200,
      //border: '0px',
    },
    highlighter: {
      // boxSizing: 'border-box',
      // overflow: 'hidden',
      //color: '#b9bbbe',
      // border: '0px',
    },
    input: {
      margin: 5,
      flex: 1,
      border: 0,
      overflow: 'auto',
      padding: 8,
      color: '#b9bbbe',
      /*padding: 9,
      border: '1px solid silver',
      '&:focus': {
        color: red;
      }*/
    },
  },

  '&singleLine': {
    width: `calc((100%) - 100px)`,
    maxWidth: `calc((100%) - 100px)`,
    control: {
      fontFamily: 'monospace',
      minHeight: 40,
      color: '#b9bbbe',
      maxHeight: 200,
      border: '0px',
    },
    highlighter: {
      boxSizing: 'border-box',
      overflow: 'hidden',
      color: '#b9bbbe',
      border: '0px',
    },
    input: {
      margin: 5,
      flex: 1,
      border: 0,
      overflow: 'auto',
      padding: 8,
      color: '#b9bbbe',
    },
  },

  suggestions: {
    list: {
      backgroundColor: '#36393f',
      border: '1px solid rgba(0,0,0,0.15)',
      fontSize: 14,
      left: 0,
      //bottom: '100%',
      //width: '90%',
    },
    item: {
      color: '#b9bbbe',
      padding: '5px 15px',
      borderBottom: '1px solid rgba(0,0,0,0.15)',
      '&focused': {
        color: '#fff',
        backgroundColor: '#40444b',
      },
    },
  },
};
