import { PyStr_Type, $PyStr_From } from "./PyStr.decl.js";
import { PyNotImplemented } from "./PyNotImplemented.decl.js";

function PyStr_Check (o) {
	return o.type === PyStr_Type || PyStr_Type.isPrototypeOf (o.type);
}

function __repr__ (self) {return self.val;}
function __str__ (self) {
	return self;
}
function __add__ (u, v) {
	if (!PyStr_Check (u)) {
		// TODO: raise PyTypeError
		return PyNotImplemented;
	}
	if (!PyStr_Check (v)) {
		return PyNotImplemented;
	}
	return $PyStr_From (u+v);
}

PyStr_Type.__repr__ = __repr__;
PyStr_Type.__add__ = __add__;
PyStr_Type.__str__ = __str__;