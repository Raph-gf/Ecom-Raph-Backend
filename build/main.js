require('source-map-support/register');
module.exports =
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/controllers/productsController.js":
/*!***********************************************!*\
  !*** ./src/controllers/productsController.js ***!
  \***********************************************/
/*! exports provided: getAllProducts, getProduct, createProduct, updateProduct, deleteProduct */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAllProducts", function() { return getAllProducts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getProduct", function() { return getProduct; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createProduct", function() { return createProduct; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateProduct", function() { return updateProduct; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteProduct", function() { return deleteProduct; });
/* harmony import */ var _models_productsModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/productsModel */ "./src/models/productsModel.js");

const getAllProducts = async (req, res) => {
  try {
    const allProducts = await _models_productsModel__WEBPACK_IMPORTED_MODULE_0__["default"].find();
    console.log(allProducts);
    res.json(allProducts);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
const getProduct = async (req, res) => {
  try {
    const product = await _models_productsModel__WEBPACK_IMPORTED_MODULE_0__["default"].findById({
      _id: req.params.id
    });
    console.log(product);
    res.json(product);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
const createProduct = async (req, res) => {
  try {
    const newUser = await _models_productsModel__WEBPACK_IMPORTED_MODULE_0__["default"].create(req.body);
    console.log(newUser.email);
    res.json({
      message: "User created succesfully",
      newUser
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
const updateProduct = async (req, res) => {
  try {
    const updateProduct = await _models_productsModel__WEBPACK_IMPORTED_MODULE_0__["default"].findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    console.log(updateProduct);
    console.log(updateProduct);
    await updateProduct.save();
    res.json({
      message: "Product updated succesfully",
      updateProduct
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
const deleteProduct = async (req, res) => {
  try {
    const deleteProduct = await _models_productsModel__WEBPACK_IMPORTED_MODULE_0__["default"].findByIdAndDelete({
      _id: req.params.id
    });
    console.log(deleteProduct);
    res.json({
      message: "Product deleted succesfully",
      deleteProduct
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

/***/ }),

/***/ "./src/controllers/userController.js":
/*!*******************************************!*\
  !*** ./src/controllers/userController.js ***!
  \*******************************************/
/*! exports provided: signIn, login */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "signIn", function() { return signIn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "login", function() { return login; });
/* harmony import */ var _models_userModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/userModel */ "./src/models/userModel.js");
/* harmony import */ var dotenv_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dotenv/config */ "dotenv/config");
/* harmony import */ var dotenv_config__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(dotenv_config__WEBPACK_IMPORTED_MODULE_1__);


const jwt = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");
const secretKey = process.env.SECRETKEY;
const signIn = async (req, res) => {
  try {
    const newUser = await _models_userModel__WEBPACK_IMPORTED_MODULE_0__["default"].create(req.body);
    newUser.password = await newUser.encryptedPassword(req.body.password);
    newUser.save();
    const createToken = jwt.sign({
      id: newUser.id
    }, secretKey, {
      expiresIn: "1d"
    });
    res.json({
      newUser,
      createToken
    });
  } catch (error) {
    res.json({
      error: error.message
    });
  }
};
const login = async (req, res) => {
  const email = req.body.email;
  try {
    const user = await _models_userModel__WEBPACK_IMPORTED_MODULE_0__["default"].findOne({
      email
    }).select("+password");
    if (!user) {
      const error = new Error("Email invalide");
      throw error;
    }
    const verifiedPassword = await user.validPassword(req.body.password, user.password);
    if (!verifiedPassword) {
      const error = new Error("Invalid password");
      throw error;
    }
    const token = jwt.sign({
      id: user.id
    }, secretKey, {
      expiresIn: "1d"
    });
    res.json({
      user,
      token,
      message: "Connexion réussi"
    });
  } catch (error) {
    res.json({
      error: error.message
    });
  }
};


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var dotenv_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dotenv/config */ "dotenv/config");
/* harmony import */ var dotenv_config__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(dotenv_config__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mongoose */ "mongoose");
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! cors */ "cors");
/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(cors__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _routes_productsRoute__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./routes/productsRoute */ "./src/routes/productsRoute.js");
/* harmony import */ var _routes_userRoute__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./routes/userRoute */ "./src/routes/userRoute.js");






main().catch(err => console.log(err));
async function main() {
  await mongoose__WEBPACK_IMPORTED_MODULE_2___default.a.connect("mongodb://127.0.0.1:27017/EcomDB");
  console.log(`[DATABASE] MongoDB is connected ⚡️`);
}
const app = express__WEBPACK_IMPORTED_MODULE_0___default()();
const port = process.env.PORT;
app.use(cors__WEBPACK_IMPORTED_MODULE_3___default()());
app.use(express__WEBPACK_IMPORTED_MODULE_0___default.a.json());
app.use(express__WEBPACK_IMPORTED_MODULE_0___default.a.urlencoded({
  extended: false
}));
app.get("/", (req, res) => {
  res.json("Welcome to the huuudd");
});
app.use("/users", _routes_userRoute__WEBPACK_IMPORTED_MODULE_5__["default"]);
app.use("/products", _routes_productsRoute__WEBPACK_IMPORTED_MODULE_4__["default"]);
app.listen(port, () => console.log(`[SERVER] Listening on http://localhost:${port}`));

/***/ }),

/***/ "./src/models/productsModel.js":
/*!*************************************!*\
  !*** ./src/models/productsModel.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ "mongoose");
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);

const productSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0__["Schema"]({
  image: {
    type: String
  },
  name: {
    type: String
  },
  price: {
    type: Number
  },
  description: {
    type: String
  }
}, {
  timestamps: true
});
const Product = Object(mongoose__WEBPACK_IMPORTED_MODULE_0__["model"])("Product", productSchema);
/* harmony default export */ __webpack_exports__["default"] = (Product);

/***/ }),

/***/ "./src/models/userModel.js":
/*!*********************************!*\
  !*** ./src/models/userModel.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ "mongoose");
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bcryptjs */ "bcryptjs");
/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_1__);


const userSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0__["Schema"]({
  firstname: {
    type: String,
    required: true,
    trim: true
  },
  lastname: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  zipCode: {
    type: Number,
    min: [1000, "Code Postal is too short"],
    max: 99999,
    required: true
  },
  Adress: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});
userSchema.methods.encryptedPassword = async password => {
  const salt = bcryptjs__WEBPACK_IMPORTED_MODULE_1___default.a.genSaltSync(5);
  const hash = bcryptjs__WEBPACK_IMPORTED_MODULE_1___default.a.hashSync(password, salt);
  return hash;
};
userSchema.methods.validPassword = async (candidatePassword, oldPassword) => {
  const result = await bcryptjs__WEBPACK_IMPORTED_MODULE_1___default.a.compare(candidatePassword, oldPassword);
  return result;
};
const User = Object(mongoose__WEBPACK_IMPORTED_MODULE_0__["model"])("User", userSchema);
/* harmony default export */ __webpack_exports__["default"] = (User);

/***/ }),

/***/ "./src/routes/productsRoute.js":
/*!*************************************!*\
  !*** ./src/routes/productsRoute.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _controllers_productsController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../controllers/productsController */ "./src/controllers/productsController.js");

const productRouter = __webpack_require__(/*! express */ "express").Router();
productRouter.get("/all-products", _controllers_productsController__WEBPACK_IMPORTED_MODULE_0__["getAllProducts"]);
productRouter.get("/:id", _controllers_productsController__WEBPACK_IMPORTED_MODULE_0__["getProduct"]);
productRouter.post("/create-product", _controllers_productsController__WEBPACK_IMPORTED_MODULE_0__["createProduct"]);
productRouter.put("/update-product/:id", _controllers_productsController__WEBPACK_IMPORTED_MODULE_0__["updateProduct"]);
productRouter.delete("/delete-product/:id", _controllers_productsController__WEBPACK_IMPORTED_MODULE_0__["deleteProduct"]);
/* harmony default export */ __webpack_exports__["default"] = (productRouter);

/***/ }),

/***/ "./src/routes/userRoute.js":
/*!*********************************!*\
  !*** ./src/routes/userRoute.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _controllers_userController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../controllers/userController */ "./src/controllers/userController.js");

const userRouter = __webpack_require__(/*! express */ "express").Router();
userRouter.post("/connexion", _controllers_userController__WEBPACK_IMPORTED_MODULE_0__["login"]);
userRouter.post("/inscription", _controllers_userController__WEBPACK_IMPORTED_MODULE_0__["signIn"]);
/* harmony default export */ __webpack_exports__["default"] = (userRouter);

/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/raphaelgarnier--fagour/Documents/Dev.web/BACKEND/Ecom-BACKEND/src/index.js */"./src/index.js");


/***/ }),

/***/ "bcryptjs":
/*!***************************!*\
  !*** external "bcryptjs" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("bcryptjs");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),

/***/ "dotenv/config":
/*!********************************!*\
  !*** external "dotenv/config" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("dotenv/config");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ })

/******/ });
//# sourceMappingURL=main.map