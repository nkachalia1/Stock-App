/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scripts_example__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scripts/example */ \"./src/scripts/example.js\");\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  const main = document.getElementById(\"main\");\n  new _scripts_example__WEBPACK_IMPORTED_MODULE_0__[\"default\"](main);\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7QUFBd0M7QUFFeENDLFFBQVEsQ0FBQ0MsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsTUFBTTtFQUNoRCxNQUFNQyxJQUFJLEdBQUdGLFFBQVEsQ0FBQ0csY0FBYyxDQUFDLE1BQU0sQ0FBQztFQUM1QyxJQUFJSix3REFBTyxDQUFDRyxJQUFJLENBQUM7QUFDckIsQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3RvY2stYXBwLy4vc3JjL2luZGV4LmpzP2I2MzUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEV4YW1wbGUgZnJvbSBcIi4vc2NyaXB0cy9leGFtcGxlXCI7XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XHJcbiAgICBjb25zdCBtYWluID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYWluXCIpO1xyXG4gICAgbmV3IEV4YW1wbGUobWFpbik7XHJcbn0pXHJcbiJdLCJuYW1lcyI6WyJFeGFtcGxlIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwibWFpbiIsImdldEVsZW1lbnRCeUlkIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ }),

/***/ "./src/scripts/example.js":
/*!********************************!*\
  !*** ./src/scripts/example.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n// class Example {\n//     constructor(ele) {\n//         this.ele = ele;\n//         this.ele.innerHTML = \"<h1>Enter stock ticker symbol:</h1>\";\n\n//         this.ele.addEventListener('click', this.handleClick.bind(this));\n//     }\n\n//     handleClick() {\n//         this.ele.children[0].innerText = \"ouch\";\n//     }\n\n//     newMethod() {\n\n//     }\n\n// }\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  const handleFavoriteSubmit = e => {\n    e.preventDefault();\n    const favoriteInput = document.querySelector(\".favorite-input\");\n    const favorite = favoriteInput.value;\n    favoriteInput.value = \"\";\n    const newListLi = document.createElement(\"li\");\n    newListLi.textContent = favorite;\n    const favoritesList = document.getElementById(\"sf-places\");\n    favoritesList.appendChild(newListLi);\n  };\n  const listSubmitButton = document.querySelector(\".favorite-submit\");\n  listSubmitButton.addEventListener(\"click\", handleFavoriteSubmit);\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (Example);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc2NyaXB0cy9leGFtcGxlLmpzIiwibWFwcGluZ3MiOiI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQUEsUUFBUSxDQUFDQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxNQUFNO0VBQ2hELE1BQU1DLG9CQUFvQixHQUFJQyxDQUFDLElBQUs7SUFDaENBLENBQUMsQ0FBQ0MsY0FBYyxDQUFDLENBQUM7SUFFbEIsTUFBTUMsYUFBYSxHQUFHTCxRQUFRLENBQUNNLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQztJQUMvRCxNQUFNQyxRQUFRLEdBQUdGLGFBQWEsQ0FBQ0csS0FBSztJQUNwQ0gsYUFBYSxDQUFDRyxLQUFLLEdBQUcsRUFBRTtJQUV4QixNQUFNQyxTQUFTLEdBQUdULFFBQVEsQ0FBQ1UsYUFBYSxDQUFDLElBQUksQ0FBQztJQUM5Q0QsU0FBUyxDQUFDRSxXQUFXLEdBQUdKLFFBQVE7SUFFaEMsTUFBTUssYUFBYSxHQUFHWixRQUFRLENBQUNhLGNBQWMsQ0FBQyxXQUFXLENBQUM7SUFDMURELGFBQWEsQ0FBQ0UsV0FBVyxDQUFDTCxTQUFTLENBQUM7RUFDdEMsQ0FBQztFQUVELE1BQU1NLGdCQUFnQixHQUFHZixRQUFRLENBQUNNLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQztFQUNuRVMsZ0JBQWdCLENBQUNkLGdCQUFnQixDQUFDLE9BQU8sRUFBRUMsb0JBQW9CLENBQUM7QUFDdEUsQ0FBQyxDQUFDO0FBSUYsK0RBQWVjLE9BQU8iLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zdG9jay1hcHAvLi9zcmMvc2NyaXB0cy9leGFtcGxlLmpzP2ZjZWUiXSwic291cmNlc0NvbnRlbnQiOlsiXHJcbi8vIGNsYXNzIEV4YW1wbGUge1xyXG4vLyAgICAgY29uc3RydWN0b3IoZWxlKSB7XHJcbi8vICAgICAgICAgdGhpcy5lbGUgPSBlbGU7XHJcbi8vICAgICAgICAgdGhpcy5lbGUuaW5uZXJIVE1MID0gXCI8aDE+RW50ZXIgc3RvY2sgdGlja2VyIHN5bWJvbDo8L2gxPlwiO1xyXG5cclxuLy8gICAgICAgICB0aGlzLmVsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlQ2xpY2suYmluZCh0aGlzKSk7XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgaGFuZGxlQ2xpY2soKSB7XHJcbi8vICAgICAgICAgdGhpcy5lbGUuY2hpbGRyZW5bMF0uaW5uZXJUZXh0ID0gXCJvdWNoXCI7XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgbmV3TWV0aG9kKCkge1xyXG5cclxuLy8gICAgIH1cclxuXHJcbi8vIH1cclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcclxuICAgIGNvbnN0IGhhbmRsZUZhdm9yaXRlU3VibWl0ID0gKGUpID0+IHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGZhdm9yaXRlSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZhdm9yaXRlLWlucHV0XCIpO1xyXG4gICAgICAgIGNvbnN0IGZhdm9yaXRlID0gZmF2b3JpdGVJbnB1dC52YWx1ZTtcclxuICAgICAgICBmYXZvcml0ZUlucHV0LnZhbHVlID0gXCJcIjtcclxuXHJcbiAgICAgICAgY29uc3QgbmV3TGlzdExpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xyXG4gICAgICAgIG5ld0xpc3RMaS50ZXh0Q29udGVudCA9IGZhdm9yaXRlO1xyXG5cclxuICAgICAgICBjb25zdCBmYXZvcml0ZXNMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZi1wbGFjZXNcIik7XHJcbiAgICAgICAgZmF2b3JpdGVzTGlzdC5hcHBlbmRDaGlsZChuZXdMaXN0TGkpO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgY29uc3QgbGlzdFN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZmF2b3JpdGUtc3VibWl0XCIpO1xyXG4gICAgICBsaXN0U3VibWl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVGYXZvcml0ZVN1Ym1pdCk7XHJcbn0pO1xyXG5cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBFeGFtcGxlO1xyXG4iXSwibmFtZXMiOlsiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiaGFuZGxlRmF2b3JpdGVTdWJtaXQiLCJlIiwicHJldmVudERlZmF1bHQiLCJmYXZvcml0ZUlucHV0IiwicXVlcnlTZWxlY3RvciIsImZhdm9yaXRlIiwidmFsdWUiLCJuZXdMaXN0TGkiLCJjcmVhdGVFbGVtZW50IiwidGV4dENvbnRlbnQiLCJmYXZvcml0ZXNMaXN0IiwiZ2V0RWxlbWVudEJ5SWQiLCJhcHBlbmRDaGlsZCIsImxpc3RTdWJtaXRCdXR0b24iLCJFeGFtcGxlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/scripts/example.js\n");

/***/ }),

/***/ "./src/index.scss":
/*!************************!*\
  !*** ./src/index.scss ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguc2NzcyIsIm1hcHBpbmdzIjoiO0FBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zdG9jay1hcHAvLi9zcmMvaW5kZXguc2Nzcz85NzQ1Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/index.scss\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	__webpack_require__("./src/index.js");
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.scss");
/******/ 	
/******/ })()
;