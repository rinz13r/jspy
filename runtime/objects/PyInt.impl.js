import { PyInt_Type, $PyInt_From } from "./PyInt.decl.js";
import { $PyStr_From } from "./PyStr.decl.js";
import { PyNotImplemented } from "./PyNotImplemented.decl.js";
import { $PyBool_From, PyFalse, PyTrue } from "./PyBool.decl.js";
import { PyNone } from "./PyNone.decl.js";

function PyInt_Check (o) {
	return o.type === PyInt_Type || PyInt_Type.isPrototypeOf (o.type);
}

PyInt_Type.__str__ = function (self) {
	if (!PyInt_Check (self)) {
		return PyNotImplemented;
	}
	return $PyStr_From (self);
}

PyInt_Type.__add__ = function (u, v) {
	if (!PyInt_Check (u) || !PyInt_Check (v)) {
		return PyNotImplemented;
	}
	return $PyInt_From (Number (u+v));
}

PyInt_Type.__repr__ = function (self) {
	return String (self);
}

PyInt_Type.__eq__ = function (u, v) {
	if (!PyInt_Check (u) || !PyInt_Check (v)) {
		return PyNotImplemented;
	}
	return $PyBool_From (Number (u) == Number (v));
}

PyInt_Type.__bool__ = function (self) {
	return $PyBool_From ((self != 0));
}
PyInt_Type.__sub__ = function (u, v) {
	if (!PyInt_Check (u) || !PyInt_Check (v)) {
		return PyNotImplemented;
	}
	return $PyInt_From (u-v);
}
PyInt_Type.__mul__ = function (u, v) {
	if (!PyInt_Check (u) || !PyInt_Check (v)) {
		return PyNotImplemented;
	}
	return $PyInt_From (u*v);
}

PyInt_Type.__new__ = function (cls, arg) {
	if (!(arg instanceof Number || arg instanceof String)) {
		throw Error (`int() argument must be a string, a bytes-like object or a number, not '${arg.type.name}'`);
	}
	let ret = $PyInt_From (arg);
	return ret;
}

PyInt_Type.__init__ = function (self) {
	return PyNone;
}

/*
int.__call__ ('123')

*/
