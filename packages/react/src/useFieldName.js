"use strict";
exports.__esModule = true;
exports.useFieldName = void 0;
var react_1 = require("react");
var FieldGroupContext_1 = require("./FieldGroupContext");
var useFieldName = function (_a) {
    var name = _a.name;
    var fieldGroups = ((0, react_1.useContext)(FieldGroupContext_1.FieldGroupContext)).fieldGroups;
    var fieldName = ((0, react_1.useMemo)(function () { return ([
        name,
    ]
        .concat(fieldGroups
        .map(function (_a) {
        var id = _a.id, name = _a.name;
        return ("/".concat(name, ":").concat(id));
    }))
        .join('')); }, [
        fieldGroups,
        name,
    ]));
    return {
        fieldName: fieldName
    };
};
exports.useFieldName = useFieldName;
