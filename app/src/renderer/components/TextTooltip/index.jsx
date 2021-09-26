import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

const TextTooltip = withStyles({
  tooltip: {
    backgroundColor: '#18191c',
    color: '#fff',
  },
})(Tooltip);

export default TextTooltip;
