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

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/raphaelgarnier--fagour/Documents/Dev.web/BACKEND/Ecom-BACKEND/src/index.js */"./src/index.js");


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