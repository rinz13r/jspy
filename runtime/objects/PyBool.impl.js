import { PyBool_Type, PyTrue, PyFalse } from "./PyBool.decl.js";
import { PyStr } from "./PyStr.decl.js";
import { PyNotImplemented } from "./PyNotImplemented.decl.js";

function PyBool_Check (o) {
	return o.type === PyBool_Type || PyBool_Type.isPrototypeOf (o.type);
}

const str_cache = [new PyStr ("False"), new PyStr ("True")];

PyBool_Type.__str__ = function (self) {
	if (!PyBool_Check (self)) {
		return PyNotImplemented;
	}
	return str_cache [self.val];
}

PyBool_Type.__repr__ = function (self) {
	if (self.val == 1) {
		return "True";
	}
	return "False";
}