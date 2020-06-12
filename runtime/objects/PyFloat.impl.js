import { PyFloat_Type, $PyFloat_From } from "./PyFloat.decl.js";
import { PyNotImplemented } from "./PyNotImplemented.decl.js";
import { PyNone } from "./PyNone.decl.js";
import { $PyStr_From } from "./PyStr.decl.js";

function PyFloat_Check (o) {
	return o.type === PyFloat_Type || PyFloat_Type.isPrototypeOf (o.type);
}
function JSNumber_Check (n) {return n instanceof Number;}

PyFloat_Type.__add__ = function (u, v) {
	if (!PyFloat_Check (u) && !JSNumber_Check (v)) {
		return PyNotImplemented;
	}
	return $PyFloat_From (u+v);
}

PyFloat_Type.__new__ = function (cls) {
	if (cls != PyFloat_Type) {

	}
	return $PyFloat_From (0);
}

PyFloat_Type.__init__ = function (self, n) {
	return PyNone;
}

PyFloat_Type.__str__ = function (self) {
	if (!PyFloat_Check (self)) {
		return PyNotImplemented;
	}
	return  $PyStr_From (String (self));
}