/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function() {

eval("// document.addEventListener(\"DOMContentLoaded\", () => {\n//     const main = document.getElementById(\"main\");\n//     new Example(main);\n// })\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  // let stockTicker = \"\";\n\n  const handletickerSubmit = e => {\n    let stockTicker = \"MSFT\";\n    fetch(`https://api.stockdata.org/v1/data/quote?symbols=${stockTicker}&api_token=X52Nf4JHwEFtnmWs4BaNWYfUk9WYvVBHqBe6dPG9`).then(response => response.json()).then(data => {\n      // Do something with the retrieved data\n      document.getElementById('data-container').textContent = JSON.stringify(data);\n      // document.getElementById('data-container').textContent = data.day_high;\n      // const dayHighAAPL = data['day_high'];\n      // Log the day_high values to the console\n      // console.log('AAPL Day High:');\n    }).catch(error => {\n      console.error('Error:', error);\n    });\n    //     const tickerInput = document.querySelector(\".ticker-input\");\n    //     stockTicker = tickerInput.value;\n    //     fetch(`https://api.stockdata.org/v1/data/quote?symbols=MSFT&api_token=X52Nf4JHwEFtnmWs4BaNWYfUk9WYvVBHqBe6dPG9`)\n    //     .then(response => {\n    //         debugger;\n    //         return response.json()})\n    //     .then(data => {\n    //         // Do something with the retrieved data\n    //         document.getElementById('data-container').textContent = JSON.stringify(data);\n    //         // document.getElementById('data-container').textContent = data.day_high;\n    //         // const dayHighAAPL = data['day_high'];\n    //         // Log the day_high values to the console\n    //         // console.log('AAPL Day High:');\n    //     })\n    //     .catch(error => {\n    //         console.error('Error:', error);\n    //     });\n    //     // tickerInput.value = \"\";\n  };\n\n  const listSubmitButton = document.querySelector(\".ticker-submit\");\n  listSubmitButton.addEventListener(\"click\", handletickerSubmit);\n});\n\n// export default Example;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguanMiLCJuYW1lcyI6WyJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJoYW5kbGV0aWNrZXJTdWJtaXQiLCJlIiwic3RvY2tUaWNrZXIiLCJmZXRjaCIsInRoZW4iLCJyZXNwb25zZSIsImpzb24iLCJkYXRhIiwiZ2V0RWxlbWVudEJ5SWQiLCJ0ZXh0Q29udGVudCIsIkpTT04iLCJzdHJpbmdpZnkiLCJjYXRjaCIsImVycm9yIiwiY29uc29sZSIsImxpc3RTdWJtaXRCdXR0b24iLCJxdWVyeVNlbGVjdG9yIl0sInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zdG9jay1hcHAvLi9zcmMvaW5kZXguanM/YjYzNSJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XHJcbi8vICAgICBjb25zdCBtYWluID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYWluXCIpO1xyXG4vLyAgICAgbmV3IEV4YW1wbGUobWFpbik7XHJcbi8vIH0pXHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XHJcblxyXG4gICAgLy8gbGV0IHN0b2NrVGlja2VyID0gXCJcIjtcclxuXHJcbiAgICBjb25zdCBoYW5kbGV0aWNrZXJTdWJtaXQgPSAoZSkgPT4ge1xyXG5cclxuICAgICAgICBsZXQgc3RvY2tUaWNrZXIgPSBcIk1TRlRcIjtcclxuICAgICAgICBmZXRjaChgaHR0cHM6Ly9hcGkuc3RvY2tkYXRhLm9yZy92MS9kYXRhL3F1b3RlP3N5bWJvbHM9JHtzdG9ja1RpY2tlcn0mYXBpX3Rva2VuPVg1Mk5mNEpId0VGdG5tV3M0QmFOV1lmVWs5V1l2VkJIcUJlNmRQRzlgKVxyXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgLy8gRG8gc29tZXRoaW5nIHdpdGggdGhlIHJldHJpZXZlZCBkYXRhXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkYXRhLWNvbnRhaW5lcicpLnRleHRDb250ZW50ID0gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XHJcbiAgICAgICAgICAgIC8vIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkYXRhLWNvbnRhaW5lcicpLnRleHRDb250ZW50ID0gZGF0YS5kYXlfaGlnaDtcclxuICAgICAgICAgICAgLy8gY29uc3QgZGF5SGlnaEFBUEwgPSBkYXRhWydkYXlfaGlnaCddO1xyXG4gICAgICAgICAgICAvLyBMb2cgdGhlIGRheV9oaWdoIHZhbHVlcyB0byB0aGUgY29uc29sZVxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnQUFQTCBEYXkgSGlnaDonKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yOicsIGVycm9yKTtcclxuICAgICAgICB9KTtcclxuICAgIC8vICAgICBjb25zdCB0aWNrZXJJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGlja2VyLWlucHV0XCIpO1xyXG4gICAgLy8gICAgIHN0b2NrVGlja2VyID0gdGlja2VySW5wdXQudmFsdWU7XHJcbiAgICAvLyAgICAgZmV0Y2goYGh0dHBzOi8vYXBpLnN0b2NrZGF0YS5vcmcvdjEvZGF0YS9xdW90ZT9zeW1ib2xzPU1TRlQmYXBpX3Rva2VuPVg1Mk5mNEpId0VGdG5tV3M0QmFOV1lmVWs5V1l2VkJIcUJlNmRQRzlgKVxyXG4gICAgLy8gICAgIC50aGVuKHJlc3BvbnNlID0+IHtcclxuICAgIC8vICAgICAgICAgZGVidWdnZXI7XHJcbiAgICAvLyAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCl9KVxyXG4gICAgLy8gICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgIC8vICAgICAgICAgLy8gRG8gc29tZXRoaW5nIHdpdGggdGhlIHJldHJpZXZlZCBkYXRhXHJcbiAgICAgICAgLy8gICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGF0YS1jb250YWluZXInKS50ZXh0Q29udGVudCA9IEpTT04uc3RyaW5naWZ5KGRhdGEpO1xyXG4gICAgLy8gICAgICAgICAvLyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGF0YS1jb250YWluZXInKS50ZXh0Q29udGVudCA9IGRhdGEuZGF5X2hpZ2g7XHJcbiAgICAvLyAgICAgICAgIC8vIGNvbnN0IGRheUhpZ2hBQVBMID0gZGF0YVsnZGF5X2hpZ2gnXTtcclxuICAgIC8vICAgICAgICAgLy8gTG9nIHRoZSBkYXlfaGlnaCB2YWx1ZXMgdG8gdGhlIGNvbnNvbGVcclxuICAgIC8vICAgICAgICAgLy8gY29uc29sZS5sb2coJ0FBUEwgRGF5IEhpZ2g6Jyk7XHJcbiAgICAvLyAgICAgfSlcclxuICAgIC8vICAgICAuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgLy8gICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvcjonLCBlcnJvcik7XHJcbiAgICAvLyAgICAgfSk7XHJcbiAgICAvLyAgICAgLy8gdGlja2VySW5wdXQudmFsdWUgPSBcIlwiO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgY29uc3QgbGlzdFN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGlja2VyLXN1Ym1pdFwiKTtcclxuICAgICAgbGlzdFN1Ym1pdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxldGlja2VyU3VibWl0KTtcclxufSk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbi8vIGV4cG9ydCBkZWZhdWx0IEV4YW1wbGU7XHJcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUFBLFFBQVEsQ0FBQ0MsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsTUFBTTtFQUVoRDs7RUFFQSxNQUFNQyxrQkFBa0IsR0FBSUMsQ0FBQyxJQUFLO0lBRTlCLElBQUlDLFdBQVcsR0FBRyxNQUFNO0lBQ3hCQyxLQUFLLENBQUUsbURBQWtERCxXQUFZLHFEQUFvRCxDQUFDLENBQ3pIRSxJQUFJLENBQUNDLFFBQVEsSUFBSUEsUUFBUSxDQUFDQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQ2pDRixJQUFJLENBQUNHLElBQUksSUFBSTtNQUNWO01BQ0FULFFBQVEsQ0FBQ1UsY0FBYyxDQUFDLGdCQUFnQixDQUFDLENBQUNDLFdBQVcsR0FBR0MsSUFBSSxDQUFDQyxTQUFTLENBQUNKLElBQUksQ0FBQztNQUM1RTtNQUNBO01BQ0E7TUFDQTtJQUNKLENBQUMsQ0FBQyxDQUNESyxLQUFLLENBQUNDLEtBQUssSUFBSTtNQUNaQyxPQUFPLENBQUNELEtBQUssQ0FBQyxRQUFRLEVBQUVBLEtBQUssQ0FBQztJQUNsQyxDQUFDLENBQUM7SUFDTjtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNJO0lBQ0E7SUFDSjtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7RUFDRSxDQUFDOztFQUVELE1BQU1FLGdCQUFnQixHQUFHakIsUUFBUSxDQUFDa0IsYUFBYSxDQUFDLGdCQUFnQixDQUFDO0VBQ2pFRCxnQkFBZ0IsQ0FBQ2hCLGdCQUFnQixDQUFDLE9BQU8sRUFBRUMsa0JBQWtCLENBQUM7QUFDcEUsQ0FBQyxDQUFDOztBQVVGIn0=\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ }),

/***/ "./src/index.scss":
/*!************************!*\
  !*** ./src/index.scss ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguc2NzcyIsIm1hcHBpbmdzIjoiO0FBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zdG9jay1hcHAvLi9zcmMvaW5kZXguc2Nzcz85NzQ1Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/index.scss\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
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
/******/ 	__webpack_modules__["./src/index.js"](0, {}, __webpack_require__);
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.scss"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;