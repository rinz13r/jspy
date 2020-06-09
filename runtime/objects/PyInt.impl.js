import { PyInt_Type, PyInt } from "./PyInt.decl.js";
import { PyStr } from "./PyStr.decl.js";
import { PyNotImplemented } from "./PyNotImplemented.decl.js";
import { $PyBool_From, PyFalse, PyTrue } from "./PyBool.decl.js";

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

PyInt_Type.__eq__ = function (u, v) {
	if (!PyInt_Check (u) || !PyInt_Check (v)) {
		return PyNotImplemented;
	}
	return $PyBool_From (u.val == v.val);
}

PyInt_Type.__bool__ = function (self) {
	if (self.val == 0) {
		return PyFalse;
	}
	return PyTrue;
}
PyInt_Type.__sub__ = function (u, v) {
	if (!PyInt_Check (u) || !PyInt_Check (v)) {
		return PyNotImplemented;
	}
	return new PyInt (u.val-v.val);
}
PyInt_Type.__mul__ = function (u, v) {
	if (!PyInt_Check (u) || !PyInt_Check (v)) {
		return PyNotImplemented;
	}
	return new PyInt (u.val*v.val);
}