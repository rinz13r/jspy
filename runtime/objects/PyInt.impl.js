import { PyInt_Type, PyInt } from "./PyInt.decl.js";
import { PyStr } from "./PyStr.decl.js";
import { PyNotImplemented } from "./PyNotImplemented.decl.js";

function PyInt_Check (o) {
	return o.type === PyInt_Type || PyInt_Type.isPrototypeOf (o.type);
}

PyInt_Type.__str__ = function (self) {
	if (!PyInt_Check (self)) {
		return PyNotImplemented;
	}
	return new PyStr (self.val);
}

PyInt_Type.__add__ = function (u, v) {
	if (!PyInt_Check (u) || !PyInt_Check (v)) {
		return PyNotImplemented;
	}
	return new PyInt (u.val + v.val);
}

PyInt_Type.__repr__ = function (self) {
	return self.val;
}