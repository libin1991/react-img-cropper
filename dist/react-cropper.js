'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var optionProps = ['dragMode', 'aspectRatio', 'data',
// unchangeable props start from here
'viewMode', 'preview', 'responsive', 'restore', 'checkCrossOrigin', 'checkOrientation', 'modal', 'guides', 'center', 'highlight', 'background', 'autoCrop', 'autoCropArea', 'movable', 'rotatable', 'scalable', 'zoomable', 'zoomOnTouch', 'zoomOnWheel', 'wheelZoomRation', 'cropBoxMovable', 'cropBoxResizable', 'toggleDragModeOnDblclick', 'minContainerWidth', 'minContainerHeight', 'minCanvasWidth', 'minCanvasHeight', 'minCropBoxWidth', 'minCropBoxHeight', 'ready', 'cropstart', 'cropmove', 'cropend', 'crop', 'zoom'];

var unchangeableProps = optionProps.slice(3);

var ReactCropper = function (_Component) {
  _inherits(ReactCropper, _Component);

  function ReactCropper() {
    _classCallCheck(this, ReactCropper);

    return _possibleConstructorReturn(this, (ReactCropper.__proto__ || Object.getPrototypeOf(ReactCropper)).apply(this, arguments));
  }

  _createClass(ReactCropper, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var options = Object.keys(this.props).filter(function (propKey) {
        return optionProps.indexOf(propKey) !== -1;
      }).reduce(function (prevOptions, propKey) {
        return _extends({}, prevOptions, _defineProperty({}, propKey, _this2.props[propKey]));
      }, {});

      var Cropper = require('cropperjs').default;
      this.cropper = new Cropper(this.img, options);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this3 = this;

      if (nextProps.src !== this.props.src) {
        this.cropper.reset().clear().replace(nextProps.src);
      }
      if (nextProps.aspectRatio !== this.props.aspectRatio) {
        this.setAspectRatio(nextProps.aspectRatio);
      }
      if (nextProps.data !== this.props.data) {
        this.setData(nextProps.data);
      }
      if (nextProps.dragMode !== this.props.dragMode) {
        this.setDragMode(nextProps.dragMode);
      }
      if (nextProps.cropBoxData !== this.props.cropBoxData) {
        this.setCropBoxData(nextProps.cropBoxData);
      }
      if (nextProps.canvasData !== this.props.canvasData) {
        this.setCanvasData(nextProps.canvasData);
      }
      if (nextProps.moveTo !== this.props.moveTo) {
        if (nextProps.moveTo.length > 1) {
          this.moveTo(nextProps.moveTo[0], nextProps.moveTo[1]);
        } else {
          this.moveTo(nextProps.moveTo[0]);
        }
      }
      if (nextProps.zoomTo !== this.props.zoomTo) {
        this.zoomTo(nextProps.zoomTo);
      }
      if (nextProps.rotateTo !== this.props.rotateTo) {
        this.rotateTo(nextProps.rotateTo);
      }
      if (nextProps.scaleX !== this.props.scaleX) {
        this.scaleX(nextProps.scaleX);
      }
      if (nextProps.scaleY !== this.props.scaleY) {
        this.scaleY(nextProps.scaleY);
      }
      if (nextProps.enable !== this.props.enable) {
        if (nextProps.enable) {
          this.enable();
        } else {
          this.disable();
        }
      }

      Object.keys(nextProps).forEach(function (propKey) {
        if (nextProps[propKey] !== _this3.props[propKey] && unchangeableProps.indexOf(propKey) !== -1) {
          throw new Error('prop: ' + propKey + ' can\'t be change after componentDidMount');
        }
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.img) {
        // Destroy the cropper, this makes sure events such as resize are cleaned up and do not leak
        this.cropper.destroy();
        delete this.img;
        delete this.cropper;
      }
    }
  }, {
    key: 'setDragMode',
    value: function setDragMode(mode) {
      return this.cropper.setDragMode(mode);
    }
  }, {
    key: 'setAspectRatio',
    value: function setAspectRatio(aspectRatio) {
      return this.cropper.setAspectRatio(aspectRatio);
    }
  }, {
    key: 'getCroppedCanvas',
    value: function getCroppedCanvas(options) {
      return this.cropper.getCroppedCanvas(options);
    }
  }, {
    key: 'setCropBoxData',
    value: function setCropBoxData(data) {
      return this.cropper.setCropBoxData(data);
    }
  }, {
    key: 'getCropBoxData',
    value: function getCropBoxData() {
      return this.cropper.getCropBoxData();
    }
  }, {
    key: 'setCanvasData',
    value: function setCanvasData(data) {
      return this.cropper.setCanvasData(data);
    }
  }, {
    key: 'getCanvasData',
    value: function getCanvasData() {
      return this.cropper.getCanvasData();
    }
  }, {
    key: 'getImageData',
    value: function getImageData() {
      return this.cropper.getImageData();
    }
  }, {
    key: 'getContainerData',
    value: function getContainerData() {
      return this.cropper.getContainerData();
    }
  }, {
    key: 'setData',
    value: function setData(data) {
      return this.cropper.setData(data);
    }
  }, {
    key: 'getData',
    value: function getData(rounded) {
      return this.cropper.getData(rounded);
    }
  }, {
    key: 'crop',
    value: function crop() {
      return this.cropper.crop();
    }
  }, {
    key: 'move',
    value: function move(offsetX, offsetY) {
      return this.cropper.move(offsetX, offsetY);
    }
  }, {
    key: 'moveTo',
    value: function moveTo(x, y) {
      return this.cropper.moveTo(x, y);
    }
  }, {
    key: 'zoom',
    value: function zoom(ratio) {
      return this.cropper.zoom(ratio);
    }
  }, {
    key: 'zoomTo',
    value: function zoomTo(ratio) {
      return this.cropper.zoomTo(ratio);
    }
  }, {
    key: 'rotate',
    value: function rotate(degree) {
      return this.cropper.rotate(degree);
    }
  }, {
    key: 'rotateTo',
    value: function rotateTo(degree) {
      return this.cropper.rotateTo(degree);
    }
  }, {
    key: 'enable',
    value: function enable() {
      return this.cropper.enable();
    }
  }, {
    key: 'disable',
    value: function disable() {
      return this.cropper.disable();
    }
  }, {
    key: 'reset',
    value: function reset() {
      return this.cropper.reset();
    }
  }, {
    key: 'clear',
    value: function clear() {
      return this.cropper.clear();
    }
  }, {
    key: 'replace',
    value: function replace(url, onlyColorChanged) {
      return this.cropper.replace(url, onlyColorChanged);
    }
  }, {
    key: 'scale',
    value: function scale(scaleX, scaleY) {
      return this.cropper.scale(scaleX, scaleY);
    }
  }, {
    key: 'scaleX',
    value: function scaleX(_scaleX) {
      return this.cropper.scaleX(_scaleX);
    }
  }, {
    key: 'scaleY',
    value: function scaleY(_scaleY) {
      return this.cropper.scaleY(_scaleY);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _props = this.props,
          src = _props.src,
          alt = _props.alt,
          crossOrigin = _props.crossOrigin;


      return _react2.default.createElement(
        'div',
        {
          src: null,
          crossOrigin: null,
          alt: null,
          style: this.props.style,
          className: this.props.className
        },
        _react2.default.createElement('img', {
          crossOrigin: crossOrigin,
          ref: function ref(img) {
            _this4.img = img;
          },
          src: src,
          alt: alt === undefined ? 'picture' : alt,
          style: { opacity: 0 }
        })
      );
    }
  }]);

  return ReactCropper;
}(_react.Component);

ReactCropper.propTypes = {
  style: _react.PropTypes.object,
  className: _react.PropTypes.string,

  // react cropper options
  crossOrigin: _react.PropTypes.string,
  src: _react.PropTypes.string,
  alt: _react.PropTypes.string,

  // props of option can be changed after componentDidmount
  aspectRatio: _react.PropTypes.number,
  dragMode: _react.PropTypes.oneOf(['crop', 'move', 'none']),
  data: _react.PropTypes.shape({
    x: _react.PropTypes.number,
    y: _react.PropTypes.number,
    width: _react.PropTypes.number,
    height: _react.PropTypes.number,
    rotate: _react.PropTypes.number,
    scaleX: _react.PropTypes.number,
    scaleY: _react.PropTypes.number
  }),
  scaleX: _react.PropTypes.number,
  scaleY: _react.PropTypes.number,
  enable: _react.PropTypes.bool,
  cropBoxData: _react.PropTypes.shape({
    left: _react.PropTypes.number,
    top: _react.PropTypes.number,
    width: _react.PropTypes.number,
    hegiht: _react.PropTypes.number
  }),
  canvasData: _react.PropTypes.shape({
    left: _react.PropTypes.number,
    top: _react.PropTypes.number,
    width: _react.PropTypes.number,
    hegiht: _react.PropTypes.number
  }),
  zoomTo: _react.PropTypes.number,
  moveTo: _react.PropTypes.arrayOf(_react.PropTypes.number),
  rotateTo: _react.PropTypes.number,

  // cropperjs options
  // https://github.com/fengyuanchen/cropperjs#options
  // aspectRatio, dragMode, data
  viewMode: _react.PropTypes.oneOf([0, 1, 2, 3]),
  preview: _react.PropTypes.string,
  responsive: _react.PropTypes.bool,
  restore: _react.PropTypes.bool,
  checkCrossOrigin: _react.PropTypes.bool,
  checkOrientation: _react.PropTypes.bool,
  modal: _react.PropTypes.bool,
  guides: _react.PropTypes.bool,
  center: _react.PropTypes.bool,
  highlight: _react.PropTypes.bool,
  background: _react.PropTypes.bool,
  autoCrop: _react.PropTypes.bool,
  autoCropArea: _react.PropTypes.number,
  movable: _react.PropTypes.bool,
  rotatable: _react.PropTypes.bool,
  scalable: _react.PropTypes.bool,
  zoomable: _react.PropTypes.bool,
  zoomOnTouch: _react.PropTypes.bool,
  zoomOnWheel: _react.PropTypes.bool,
  wheelZoomRation: _react.PropTypes.number,
  cropBoxMovable: _react.PropTypes.bool,
  cropBoxResizable: _react.PropTypes.bool,
  toggleDragModeOnDblclick: _react.PropTypes.bool,
  minContainerWidth: _react.PropTypes.number,
  minContainerHeight: _react.PropTypes.number,
  minCanvasWidth: _react.PropTypes.number,
  minCanvasHeight: _react.PropTypes.number,
  minCropBoxWidth: _react.PropTypes.number,
  minCropBoxHeight: _react.PropTypes.number,
  ready: _react.PropTypes.func,
  cropstart: _react.PropTypes.func,
  cropmove: _react.PropTypes.func,
  cropend: _react.PropTypes.func,
  crop: _react.PropTypes.func,
  zoom: _react.PropTypes.func
};

ReactCropper.defaultProps = {
  src: null,
  dragMode: 'crop',
  data: null,
  scaleX: 1,
  scaleY: 1,
  enable: true,
  zoomTo: 1,
  rotateTo: 0
};

exports.default = ReactCropper;
