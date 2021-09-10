import { remote } from 'electron';
const WIN = remote.getCurrentWindow();

export const close = () => {
  // eslint-disable-next-line no-unused-vars
  return (dispatch) => {
    try {
      WIN.minimizeApp();
    } catch (error) {
      console.log(error);
    }
  };
};

export const minimize = () => {
  // eslint-disable-next-line no-unused-vars
  return (dispatch) => {
    try {
      WIN.minimize();
    } catch (error) {
      console.log(error);
    }
  };
};

export const maximize = () => {
  // eslint-disable-next-line no-unused-vars
  return (dispatch) => {
    try {
      if (WIN.isMaximized()) {
        WIN.unmaximize();
      } else {
        WIN.maximize();
      }
    } catch (error) {
      console.log(error);
    }
  };
};
