import debounce from '@indlekofer/debounce';
import { handleChange, REDUCER } from '@indlekofer/media';
import getCoords from './utils/getCoords';

const GET_SIZE = '@indlekofer/media_container/GET_SIZE';

let __container = null;
export const config = (deviceWidth = null, deviceHeight = null, force = false) => {
  if (typeof window === 'object' && !force) {
    deviceWidth = window.innerWidth;
    deviceHeight = window.innerHeight;
  }
  if (__container === null) {
    handleChange(GET_SIZE, { width: deviceWidth, height: deviceHeight });
  } else {
    const box = __container.getBoundingClientRect();
    const coords = getCoords(box);
    let width;
    if (box.width == 0) {
      width = deviceWidth - coords.left * 2;
    }	else {
      width = box.width;
    }
    let height = deviceHeight - coords.top;

    // detect and remove padding
    height -= parseFloat(window.getComputedStyle(box, null).getPropertyValue('padding-top'));
    height -= parseFloat(window.getComputedStyle(box, null).getPropertyValue('padding-bottom'));
    width -= parseFloat(window.getComputedStyle(box, null).getPropertyValue('padding-left'));
    width -= parseFloat(window.getComputedStyle(box, null).getPropertyValue('padding-right'));

    handleChange(GET_SIZE, { width, height });
  }
};

const configDebounced = debounce(config, 400);

export const setContainer = (container) => {
  __container = container;
  config();
};

export const setup = () => {
  if (typeof window === 'object') window.addEventListener('resize', configDebounced);
};
export const unset = () => {
  if (typeof window === 'object') window.removeEventListener('resize', configDebounced);
};
setup();
config();

export {
  REDUCER,
  GET_SIZE
};

export default GET_SIZE;
