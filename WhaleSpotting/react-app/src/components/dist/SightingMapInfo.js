"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
require("../styles/SightingMapInfo.scss");
function SightingMapInfo(_a) {
    var chosen = _a.chosen;
    var key = process.env.REACT_APP_WEATHER_API_KEY;
    var response = {
        lon: chosen === null || chosen === void 0 ? void 0 : chosen.lon,
        lat: chosen === null || chosen === void 0 ? void 0 : chosen.lat,
        species: ["Whale", "Orca", "Dolphin"]
    };
    var _b = react_1.useState(), weatherData = _b[0], setWeatherData = _b[1];
    function fetchWeather() {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + chosen.lat + "&lon=" + chosen.lon + "&units=metric&Appid=" + key)
                            .then(function (response) { return response.json(); })
                            .then(function (response) { return setWeatherData(response); })];
                    case 1: 
                    //eslint-disable-next-line
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    }
    react_1.useEffect(function () {
        if (chosen) {
            fetchWeather();
        }
    }, [chosen]);
    if (!chosen || !weatherData) {
        return react_1["default"].createElement("div", { className: "weather-component-empty", "data-testid": "loading" });
    }
    return (react_1["default"].createElement("div", { className: "weather-component", "data-testid": "weather" },
        react_1["default"].createElement("div", null, "Information about this sighting"),
        react_1["default"].createElement("div", { className: "location" },
            "Longitude: ",
            weatherData.lon,
            "\u00B0 Latitude: ",
            weatherData.lat,
            "\u00B0"),
        react_1["default"].createElement("div", { className: "sighting-info" },
            react_1["default"].createElement("div", { className: "weather-info" },
                "Current Weather: ",
                weatherData.current.weather[0].main,
                react_1["default"].createElement("ul", { className: "list" },
                    react_1["default"].createElement("li", null,
                        "Temperature: ",
                        weatherData.current.temp,
                        "\u00B0C"),
                    react_1["default"].createElement("li", null,
                        "Wind Speed: ",
                        weatherData.current.wind_speed,
                        " m/s"),
                    react_1["default"].createElement("li", null,
                        "Visibility: ",
                        weatherData.current.visibility,
                        " m"))),
            react_1["default"].createElement("div", { className: "species" },
                "Species spotted here:",
                react_1["default"].createElement("ul", { className: "list" }, response.species.map(function (s) {
                    return react_1["default"].createElement("li", { key: s }, s);
                }))),
            react_1["default"].createElement("div", { className: "whale-image-container" },
                react_1["default"].createElement("img", { className: "whale-image", src: "whaleicon512.png", alt: "whale" })))));
}
exports["default"] = SightingMapInfo;
