"use strict";
exports.__esModule = true;
require("../styles/Map.scss");
require("../styles/Home.scss");
var react_1 = require("react");
var MapChart_1 = require("./MapChart");
var SightingMapInfo_1 = require("./SightingMapInfo");
function Map() {
    var _a = react_1.useState(), chosen = _a[0], setChosen = _a[1];
    return (react_1["default"].createElement("div", { className: "map-component", "data-testid": "map-component" },
        react_1["default"].createElement("h2", { className: "map-header" }, "MAP OF SIGHTINGS"),
        react_1["default"].createElement("div", { className: "map-container", "data-testid": "map-container" },
            react_1["default"].createElement(MapChart_1.MapChart, { chosen: chosen, setChosen: setChosen })),
        react_1["default"].createElement("div", { className: "map-info", "data-testid": "map-info" },
            react_1["default"].createElement(SightingMapInfo_1["default"], { chosen: chosen }))));
}
exports["default"] = Map;
