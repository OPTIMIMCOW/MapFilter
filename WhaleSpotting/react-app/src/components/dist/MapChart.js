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
exports.MapChart = void 0;
var react_1 = require("react");
var react_simple_maps_1 = require("react-simple-maps");
require("../styles/Map.scss");
var geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";
function MapChart(_a) {
    var chosen = _a.chosen, setChosen = _a.setChosen;
    var _b = react_1.useState([]), data = _b[0], setData = _b[1];
    react_1.useEffect(function () {
        populateSightingData()
            .then(function (data) { return setData(data); });
    }, []);
    if (data.length === 0) {
        return react_1["default"].createElement("div", { "data-testid": "loading" }, " Loading... ");
    }
    return (react_1["default"].createElement(react_simple_maps_1.ComposableMap, { className: "simple-map", projection: "geoEqualEarth", "data-testid": "simple-map" },
        react_1["default"].createElement(react_simple_maps_1.ZoomableGroup, { zoom: 1 },
            react_1["default"].createElement(react_simple_maps_1.Geographies, { geography: geoUrl }, function (_a) {
                var geographies = _a.geographies;
                return geographies.map(function (geo) { return react_1["default"].createElement(react_simple_maps_1.Geography, { key: geo.rsmKey, geography: geo, fill: "#DDD", stroke: "#FFF" }); });
            }),
            data.map(function (_a, index) {
                var id = _a.id, longitude = _a.longitude, latitude = _a.latitude;
                var isChosen = chosen !== undefined && id === chosen.id;
                return react_1["default"].createElement(react_simple_maps_1.Marker, { "data-testid": isChosen ? "chosen" : "not-chosen", key: index, coordinates: [longitude, latitude], name: "", onClick: function () { return setChosen({ id: id, lat: latitude, lon: longitude }); } },
                    react_1["default"].createElement("circle", { r: 2, fill: isChosen ? "#FFA500" : "#0000FF", stroke: "#fff", strokeWidth: 0.2 }));
            }))));
}
exports.MapChart = MapChart;
function populateSightingData() {
    return __awaiter(this, void 0, Promise, function () {
        var response, response2, json, json2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("https://hotline.whalemuseum.org/api.json?limit=1000")];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, fetch("https://hotline.whalemuseum.org/api.json?limit=1000&page=2")];
                case 2:
                    response2 = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    json = _a.sent();
                    return [4 /*yield*/, response2.json()];
                case 4:
                    json2 = _a.sent();
                    return [2 /*return*/, json.concat(json2)];
            }
        });
    });
}
