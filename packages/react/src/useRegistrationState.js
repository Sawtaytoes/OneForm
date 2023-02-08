"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.useRegistrationState = void 0;
var react_1 = require("react");
var initialRegistrations = {};
var defaultProps = {
    onRegister: (function () { }),
    onUnregister: (function () { })
};
var useRegistrationState = function (_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.onRegister, onRegister = _c === void 0 ? (defaultProps
        .onRegister) : _c, _d = _b.onUnregister, onUnregister = _d === void 0 ? (defaultProps
        .onUnregister) : _d;
    var onRegisterRef = ((0, react_1.useRef)(onRegister));
    (0, react_1.useEffect)(function () {
        onRegisterRef
            .current = (onRegister);
    }, [
        onRegister,
    ]);
    var onUnregisterRef = ((0, react_1.useRef)(onUnregister));
    (0, react_1.useEffect)(function () {
        onUnregisterRef
            .current = (onUnregister);
    }, [
        onUnregister,
    ]);
    var registrationsRef = ((0, react_1.useRef)(initialRegistrations));
    var getAllRegistrations = ((0, react_1.useCallback)(function () { return (registrationsRef
        .current); }, []));
    var getIsRegistered = ((0, react_1.useCallback)(function (identifier) { return (Boolean(registrationsRef
        .current[identifier])); }, []));
    var register = ((0, react_1.useCallback)(function (identifier) {
        var _a;
        registrationsRef
            .current = __assign(__assign({}, (registrationsRef
            .current)), (_a = {}, _a[identifier] = (((registrationsRef
            .current[identifier])
            || 0)
            + 1), _a));
        onRegisterRef
            .current(identifier);
        return function () {
            var _a;
            var _b = (registrationsRef
                .current), _c = identifier, numberOfRegistrations = _b[_c], otherRegistrations = __rest(_b, [typeof _c === "symbol" ? _c : _c + ""]);
            if (numberOfRegistrations
                === 1) {
                registrationsRef
                    .current = (otherRegistrations);
            }
            else {
                registrationsRef
                    .current = __assign(__assign({}, otherRegistrations), (_a = {}, _a[identifier] = (numberOfRegistrations
                    - 1), _a));
            }
            onUnregisterRef
                .current(identifier);
        };
    }, []));
    var returnType = {
        getAllRegistrations: getAllRegistrations,
        getIsRegistered: getIsRegistered,
        register: register
    };
    return returnType;
};
exports.useRegistrationState = useRegistrationState;
