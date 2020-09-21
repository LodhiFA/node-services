/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/server.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./config/db.ts":
/*!**********************!*\
  !*** ./config/db.ts ***!
  \**********************/
/*! exports provided: connectDB */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"connectDB\", function() { return connectDB; });\n/* harmony import */ var _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs3/regenerator */ \"@babel/runtime-corejs3/regenerator\");\n/* harmony import */ var _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_corejs3_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/asyncToGenerator */ \"@babel/runtime-corejs3/helpers/asyncToGenerator\");\n/* harmony import */ var _babel_runtime_corejs3_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! config */ \"config\");\n/* harmony import */ var config__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(config__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nvar db = config__WEBPACK_IMPORTED_MODULE_3___default.a.get('mongoURI');\nvar connectDB = /*#__PURE__*/function () {\n  var _ref = _babel_runtime_corejs3_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {\n    return _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            _context.prev = 0;\n            _context.next = 3;\n            return mongoose__WEBPACK_IMPORTED_MODULE_2___default.a.connect(db, {\n              useNewUrlParser: true,\n              useUnifiedTopology: true,\n              useCreateIndex: true\n            });\n\n          case 3:\n            console.log('MongoDB Connected ....');\n            _context.next = 10;\n            break;\n\n          case 6:\n            _context.prev = 6;\n            _context.t0 = _context[\"catch\"](0);\n            console.error(_context.t0.message);\n            process.exit(1);\n\n          case 10:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee, null, [[0, 6]]);\n  }));\n\n  return function connectDB() {\n    return _ref.apply(this, arguments);\n  };\n}();\n\n//# sourceURL=webpack:///./config/db.ts?");

/***/ }),

/***/ "./src/models/users.ts":
/*!*****************************!*\
  !*** ./src/models/users.ts ***!
  \*****************************/
/*! exports provided: User */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"User\", function() { return User; });\n/* harmony import */ var _babel_runtime_corejs3_core_js_stable_date_now__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/date/now */ \"@babel/runtime-corejs3/core-js-stable/date/now\");\n/* harmony import */ var _babel_runtime_corejs3_core_js_stable_date_now__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_date_now__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_1__);\n\n\nvar userSchema = new mongoose__WEBPACK_IMPORTED_MODULE_1___default.a.Schema({\n  name: {\n    type: String,\n    required: true\n  },\n  email: {\n    type: String,\n    required: true,\n    unique: true\n  },\n  password: {\n    type: String,\n    required: true\n  },\n  avatar: {\n    type: String\n  },\n  date: {\n    type: Date,\n    \"default\": _babel_runtime_corejs3_core_js_stable_date_now__WEBPACK_IMPORTED_MODULE_0___default.a\n  }\n});\nvar User = mongoose__WEBPACK_IMPORTED_MODULE_1___default.a.model('user', userSchema);\n\n//# sourceURL=webpack:///./src/models/users.ts?");

/***/ }),

/***/ "./src/routes/api/auth.ts":
/*!********************************!*\
  !*** ./src/routes/api/auth.ts ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n\nvar authRoute = express__WEBPACK_IMPORTED_MODULE_0___default.a.Router(); // @route   GET api/auth\n// @desc    Retrieve auth\n// @access  Public\n\nauthRoute.get('/', function (req, res) {\n  return res.send('Auth Route');\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (authRoute);\n\n//# sourceURL=webpack:///./src/routes/api/auth.ts?");

/***/ }),

/***/ "./src/routes/api/posts.ts":
/*!*********************************!*\
  !*** ./src/routes/api/posts.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n\nvar postsRoute = express__WEBPACK_IMPORTED_MODULE_0___default.a.Router(); // @route   GET api/posts\n// @desc    Retrieve posts\n// @access  Public\n\npostsRoute.get('/', function (req, res) {\n  return res.send('Posts Route');\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (postsRoute);\n\n//# sourceURL=webpack:///./src/routes/api/posts.ts?");

/***/ }),

/***/ "./src/routes/api/profile.ts":
/*!***********************************!*\
  !*** ./src/routes/api/profile.ts ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n\nvar profileRoute = express__WEBPACK_IMPORTED_MODULE_0___default.a.Router(); // @route   GET api/profile\n// @desc    Retrieve profile\n// @access  Public\n\nprofileRoute.get('/', function (req, res) {\n  return res.send('Profile Route');\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (profileRoute);\n\n//# sourceURL=webpack:///./src/routes/api/profile.ts?");

/***/ }),

/***/ "./src/routes/api/users.ts":
/*!*********************************!*\
  !*** ./src/routes/api/users.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs3/regenerator */ \"@babel/runtime-corejs3/regenerator\");\n/* harmony import */ var _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_corejs3_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/asyncToGenerator */ \"@babel/runtime-corejs3/helpers/asyncToGenerator\");\n/* harmony import */ var _babel_runtime_corejs3_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var express_validator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! express-validator */ \"express-validator\");\n/* harmony import */ var express_validator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(express_validator__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var gravatar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! gravatar */ \"gravatar\");\n/* harmony import */ var gravatar__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(gravatar__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! bcryptjs */ \"bcryptjs\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _models_users__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../models/users */ \"./src/models/users.ts\");\n\n\n\n\n\n\n\nvar userRoute = express__WEBPACK_IMPORTED_MODULE_2___default.a.Router(); // @route   POST api/users\n// @desc    Register users\n// @access  Public\n\nuserRoute.post('/', [Object(express_validator__WEBPACK_IMPORTED_MODULE_3__[\"check\"])('name', 'Name is required').not().isEmpty(), Object(express_validator__WEBPACK_IMPORTED_MODULE_3__[\"check\"])('email', 'Please include a valid email').isEmail(), Object(express_validator__WEBPACK_IMPORTED_MODULE_3__[\"check\"])('password', 'Please enter password with 6 or more characters').isLength({\n  min: 6\n})], /*#__PURE__*/function () {\n  var _ref = _babel_runtime_corejs3_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(req, res) {\n    var errors, _req$body, name, email, password, user, avatar, salt;\n\n    return _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            errors = Object(express_validator__WEBPACK_IMPORTED_MODULE_3__[\"validationResult\"])(req);\n\n            if (errors.isEmpty()) {\n              _context.next = 3;\n              break;\n            }\n\n            return _context.abrupt(\"return\", res.status(400).json({\n              errors: errors.array()\n            }));\n\n          case 3:\n            _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password;\n            _context.prev = 4;\n            _context.next = 7;\n            return _models_users__WEBPACK_IMPORTED_MODULE_6__[\"User\"].findOne({\n              email: email\n            });\n\n          case 7:\n            user = _context.sent;\n\n            if (!user) {\n              _context.next = 10;\n              break;\n            }\n\n            return _context.abrupt(\"return\", res.status(400).json({\n              errors: [{\n                msg: 'User already exists'\n              }]\n            }));\n\n          case 10:\n            // Get users gravatar\n            avatar = gravatar__WEBPACK_IMPORTED_MODULE_4___default.a.url(email, {\n              s: '200',\n              r: 'pg',\n              d: 'mm'\n            });\n            user = new _models_users__WEBPACK_IMPORTED_MODULE_6__[\"User\"]({\n              name: name,\n              email: email,\n              avatar: avatar,\n              password: password\n            }); // Encrypt password\n\n            _context.next = 14;\n            return bcryptjs__WEBPACK_IMPORTED_MODULE_5___default.a.genSalt(10);\n\n          case 14:\n            salt = _context.sent;\n            _context.next = 17;\n            return bcryptjs__WEBPACK_IMPORTED_MODULE_5___default.a.hash(password, salt);\n\n          case 17:\n            user.password = _context.sent;\n            _context.next = 20;\n            return user.save();\n\n          case 20:\n            // Return jsonwebtoken\n            res.send('User Registered');\n            _context.next = 27;\n            break;\n\n          case 23:\n            _context.prev = 23;\n            _context.t0 = _context[\"catch\"](4);\n            console.log(_context.t0.message);\n            res.status(500).send('Server error');\n\n          case 27:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee, null, [[4, 23]]);\n  }));\n\n  return function (_x, _x2) {\n    return _ref.apply(this, arguments);\n  };\n}());\n/* harmony default export */ __webpack_exports__[\"default\"] = (userRoute);\n\n//# sourceURL=webpack:///./src/routes/api/users.ts?");

/***/ }),

/***/ "./src/server.ts":
/*!***********************!*\
  !*** ./src/server.ts ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _config_db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../config/db */ \"./config/db.ts\");\n/* harmony import */ var _routes_api_users__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./routes/api/users */ \"./src/routes/api/users.ts\");\n/* harmony import */ var _routes_api_auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./routes/api/auth */ \"./src/routes/api/auth.ts\");\n/* harmony import */ var _routes_api_profile__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./routes/api/profile */ \"./src/routes/api/profile.ts\");\n/* harmony import */ var _routes_api_posts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./routes/api/posts */ \"./src/routes/api/posts.ts\");\n\n\n\n\n\n\nvar app = express__WEBPACK_IMPORTED_MODULE_0___default()();\nObject(_config_db__WEBPACK_IMPORTED_MODULE_1__[\"connectDB\"])(); // Init Middleware\n\napp.use(express__WEBPACK_IMPORTED_MODULE_0___default.a.json());\napp.get('/', function (req, res) {\n  return res.send('API Running');\n}); // Define Routes\n\napp.use('/api/users', _routes_api_users__WEBPACK_IMPORTED_MODULE_2__[\"default\"]);\napp.use('/api/auth', _routes_api_auth__WEBPACK_IMPORTED_MODULE_3__[\"default\"]);\napp.use('/api/profile', _routes_api_profile__WEBPACK_IMPORTED_MODULE_4__[\"default\"]);\napp.use('/api/posts', _routes_api_posts__WEBPACK_IMPORTED_MODULE_5__[\"default\"]);\nvar PORT = process.env.PORT || 5000;\napp.listen(PORT, function () {\n  console.log(\"Server started on por \".concat(PORT));\n});\n\n//# sourceURL=webpack:///./src/server.ts?");

/***/ }),

/***/ "@babel/runtime-corejs3/core-js-stable/date/now":
/*!*****************************************************************!*\
  !*** external "@babel/runtime-corejs3/core-js-stable/date/now" ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@babel/runtime-corejs3/core-js-stable/date/now\");\n\n//# sourceURL=webpack:///external_%22@babel/runtime-corejs3/core-js-stable/date/now%22?");

/***/ }),

/***/ "@babel/runtime-corejs3/helpers/asyncToGenerator":
/*!******************************************************************!*\
  !*** external "@babel/runtime-corejs3/helpers/asyncToGenerator" ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@babel/runtime-corejs3/helpers/asyncToGenerator\");\n\n//# sourceURL=webpack:///external_%22@babel/runtime-corejs3/helpers/asyncToGenerator%22?");

/***/ }),

/***/ "@babel/runtime-corejs3/regenerator":
/*!*****************************************************!*\
  !*** external "@babel/runtime-corejs3/regenerator" ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@babel/runtime-corejs3/regenerator\");\n\n//# sourceURL=webpack:///external_%22@babel/runtime-corejs3/regenerator%22?");

/***/ }),

/***/ "bcryptjs":
/*!***************************!*\
  !*** external "bcryptjs" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"bcryptjs\");\n\n//# sourceURL=webpack:///external_%22bcryptjs%22?");

/***/ }),

/***/ "config":
/*!*************************!*\
  !*** external "config" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"config\");\n\n//# sourceURL=webpack:///external_%22config%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "express-validator":
/*!************************************!*\
  !*** external "express-validator" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express-validator\");\n\n//# sourceURL=webpack:///external_%22express-validator%22?");

/***/ }),

/***/ "gravatar":
/*!***************************!*\
  !*** external "gravatar" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"gravatar\");\n\n//# sourceURL=webpack:///external_%22gravatar%22?");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongoose\");\n\n//# sourceURL=webpack:///external_%22mongoose%22?");

/***/ })

/******/ });