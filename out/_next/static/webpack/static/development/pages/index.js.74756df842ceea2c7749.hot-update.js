webpackHotUpdate("static/development/pages/index.js",{

/***/ "./src/stores/UiStore.js":
/*!*******************************!*\
  !*** ./src/stores/UiStore.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var mobx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mobx */ "./node_modules/mobx/lib/mobx.module.js");
/* harmony import */ var _constants_months__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants/months */ "./src/constants/months.js");
/* harmony import */ var _uiEmitter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../uiEmitter */ "./src/uiEmitter.js");
/* harmony import */ var _mapInstance__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../mapInstance */ "./src/mapInstance.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash/get */ "./node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _constants_regions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../constants/regions */ "./src/constants/regions.js");
/* harmony import */ var _tmp_destinations_json__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../tmp/destinations.json */ "./tmp/destinations.json");
var _tmp_destinations_json__WEBPACK_IMPORTED_MODULE_7___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../../tmp/destinations.json */ "./tmp/destinations.json", 1);
var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object['ke' + 'ys'](descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object['define' + 'Property'](target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and set to use loose mode. ' + 'To use proposal-class-properties in spec mode with decorators, wait for ' + 'the next major version of decorators in stage 2.'); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









moment__WEBPACK_IMPORTED_MODULE_5___default.a.locale('sv');
var points = {};

var mapDestinations = function mapDestinations(destinations) {
  return destinations.map(function (destination) {
    var _destination$flightPr = destination.flightProducts,
        flightProducts = _destination$flightPr === void 0 ? [] : _destination$flightPr;
    var prices = {};
    var bonuses = {};
    var requiredPoints;
    flightProducts.forEach(function (month) {
      var m = moment__WEBPACK_IMPORTED_MODULE_5___default()(month.outBoundDate).format('MMM');
      var price = lodash_get__WEBPACK_IMPORTED_MODULE_4___default()(month, 'lowestPrice.totalPrice');
      var a = 60000 / 10000;
      var requiredBonus = a * price;

      if (price && !prices[m]) {
        prices[m] = parseInt(price);
        bonuses[m] = requiredBonus;
        requiredPoints = requiredBonus && Math.round(requiredBonus / 1000) * 1000;
      }
    });
    return _objectSpread({}, destination, {
      city: lodash_get__WEBPACK_IMPORTED_MODULE_4___default()(destination, 'location.cityName'),
      prices: prices,
      bonuses: bonuses,
      requiredPoints: requiredPoints
    });
  });
};

var origins = mapDestinations(_tmp_destinations_json__WEBPACK_IMPORTED_MODULE_7__.filter(function (d) {
  return d.coordinates;
}));
var UiStore = (_class =
/*#__PURE__*/
function () {
  function UiStore() {
    var _this = this;

    _classCallCheck(this, UiStore);

    _initializerDefineProperty(this, "isPageLoading", _descriptor, this);

    _initializerDefineProperty(this, "selectedDestination", _descriptor2, this);

    _initializerDefineProperty(this, "destinations", _descriptor3, this);

    _initializerDefineProperty(this, "selectedMonth", _descriptor4, this);

    _initializerDefineProperty(this, "priceFilter", _descriptor5, this);

    _initializerDefineProperty(this, "showFlights", _descriptor6, this);

    this.user = {
      points: 9130
    };

    _initializerDefineProperty(this, "setSelectedMonth", _descriptor7, this);

    _initializerDefineProperty(this, "setLoaded", _descriptor8, this);

    this.updateLocations = function () {
      var final = origins.map(function (origin) {
        var price = origin.prices[_this.selectedMonth];
        var bonus = origin.bonuses[_this.selectedMonth];
        var bonusProgress = _this.user.points / bonus * 100;

        if (price) {
          bonusProgress = bonusProgress > 100 ? 100 : parseInt(bonusProgress);
        }

        return _objectSpread({}, origin, {
          priceRaw: price,
          price: price && "".concat(price, " ").concat(origin.currency),
          bonusProgress: bonusProgress,
          euroBonus: bonus
        });
      }).filter(function (dest) {
        return dest.priceRaw && dest.priceRaw < _this.priceFilter;
      });
      _mapInstance__WEBPACK_IMPORTED_MODULE_3__["default"].showLocations(final);
    };

    _initializerDefineProperty(this, "randomDestination", _descriptor9, this);

    _initializerDefineProperty(this, "toggleModdal", _descriptor10, this);

    _initializerDefineProperty(this, "clearSelected", _descriptor11, this);

    _initializerDefineProperty(this, "setPriceFilter", _descriptor12, this);

    _initializerDefineProperty(this, "focusRegion", _descriptor13, this);
  }

  _createClass(UiStore, [{
    key: "fetchDestinations",
    value: function fetchDestinations() {}
  }, {
    key: "setSelectedDestination",
    value: function setSelectedDestination(destination) {
      var _this2 = this;

      this.selectedDestination = null;
      setTimeout(function () {
        _this2.selectedDestination = destination;
        _mapInstance__WEBPACK_IMPORTED_MODULE_3__["default"].setDestination(destination);
      }, 50);
    }
  }]);

  return UiStore;
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "isPageLoading", [mobx__WEBPACK_IMPORTED_MODULE_0__["observable"]], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return true;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "selectedDestination", [mobx__WEBPACK_IMPORTED_MODULE_0__["observable"]], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "destinations", [mobx__WEBPACK_IMPORTED_MODULE_0__["observable"]], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return origins;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "selectedMonth", [mobx__WEBPACK_IMPORTED_MODULE_0__["observable"]], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _constants_months__WEBPACK_IMPORTED_MODULE_1__["default"][0];
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "priceFilter", [mobx__WEBPACK_IMPORTED_MODULE_0__["observable"]], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 13449;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, "showFlights", [mobx__WEBPACK_IMPORTED_MODULE_0__["observable"]], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, "setSelectedMonth", [mobx__WEBPACK_IMPORTED_MODULE_0__["action"]], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this3 = this;

    return function (month) {
      _this3.selectedMonth = month;

      _this3.setSelectedDestination(null);

      _mapInstance__WEBPACK_IMPORTED_MODULE_3__["default"].removeCurrentMarker();

      _this3.updateLocations();
    };
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class.prototype, "setLoaded", [mobx__WEBPACK_IMPORTED_MODULE_0__["action"]], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this4 = this;

    return function () {
      _this4.isPageLoading = false;
      setTimeout(function () {
        _uiEmitter__WEBPACK_IMPORTED_MODULE_2__["default"].emit('pageLoaded');

        _this4.updateLocations();

        var coords = _this4.destinations.filter(function (d) {
          return _constants_regions__WEBPACK_IMPORTED_MODULE_6__["default"][0].airports.includes(lodash_get__WEBPACK_IMPORTED_MODULE_4___default()(d, 'destinationAirport.code'));
        }).filter(function (d) {
          return d.coordinates;
        }); // .map(d => [d.coordinates.latitude, d.coordinates.latitude]);


        _mapInstance__WEBPACK_IMPORTED_MODULE_3__["default"].fitBounds(coords); // TODO
      }, 200);
    };
  }
}), _applyDecoratedDescriptor(_class.prototype, "setSelectedDestination", [mobx__WEBPACK_IMPORTED_MODULE_0__["action"]], Object.getOwnPropertyDescriptor(_class.prototype, "setSelectedDestination"), _class.prototype), _descriptor9 = _applyDecoratedDescriptor(_class.prototype, "randomDestination", [mobx__WEBPACK_IMPORTED_MODULE_0__["action"]], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this5 = this;

    return function () {
      var destination = origins[Math.floor(Math.random() * origins.length)];

      _this5.setSelectedDestination(destination);
    };
  }
}), _descriptor10 = _applyDecoratedDescriptor(_class.prototype, "toggleModdal", [mobx__WEBPACK_IMPORTED_MODULE_0__["action"]], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this6 = this;

    return function () {
      _this6.showFlights = !_this6.showFlights;
    };
  }
}), _descriptor11 = _applyDecoratedDescriptor(_class.prototype, "clearSelected", [mobx__WEBPACK_IMPORTED_MODULE_0__["action"]], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this7 = this;

    return function () {
      _this7.setSelectedDestination(null);

      _mapInstance__WEBPACK_IMPORTED_MODULE_3__["default"].removeCurrentMarker();
    };
  }
}), _descriptor12 = _applyDecoratedDescriptor(_class.prototype, "setPriceFilter", [mobx__WEBPACK_IMPORTED_MODULE_0__["action"]], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this8 = this;

    return function (value) {
      _this8.clearSelected();

      _this8.priceFilter = value;

      _this8.updateLocations();
    };
  }
}), _descriptor13 = _applyDecoratedDescriptor(_class.prototype, "focusRegion", [mobx__WEBPACK_IMPORTED_MODULE_0__["action"]], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this9 = this;

    return function (regions) {
      _this9.setSelectedDestination(null);

      _mapInstance__WEBPACK_IMPORTED_MODULE_3__["default"].removeCurrentMarker();

      var coords = _this9.destinations.filter(function (d) {
        return regions.includes(lodash_get__WEBPACK_IMPORTED_MODULE_4___default()(d, 'destinationAirport.code'));
      }).filter(function (d) {
        return d.coordinates;
      }); // .map(d => [d.coordinates.latitude, d.coordinates.latitude]);


      _mapInstance__WEBPACK_IMPORTED_MODULE_3__["default"].fitBounds(coords);
    };
  }
})), _class);
/* harmony default export */ __webpack_exports__["default"] = (new UiStore());

/***/ })

})
//# sourceMappingURL=index.js.74756df842ceea2c7749.hot-update.js.map