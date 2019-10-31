# @indlekofer/media_container

## Usage

```js
import GET_SIZE, { REDUCER as MEDIA_REDUCER } from '@indlekofer/media_container';

const mapStateToProps = (state) => {
  return {
    mediaContainerSize: state[MEDIA_REDUCER].get(GET_SIZE) //mediaContainerSize -> {width: 100, height: 100}
  }
}

```

## Function exports

### setContainer

### setup

### unset

### config

will set initial values for width and height. will be called automaticaly.

## Constant exports

### REDUCER

### GET_SIZE (default)
