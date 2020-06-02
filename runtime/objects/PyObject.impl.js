import { PyNotImplemented } from "./PyNotImplemented.decl.js";

function PyObject_Check (o) {
	return o.type == PyObject_Type;
}
function TYPE (o) {return o.type;}

function __repr__ (self) {return `<object at ?mem>`;}
function __str__ (self) {return `<object at ?mem>`;}

function __eq__ (u, v) {
	if (TYPE (u) != TYPE (v)) return PyNotImplemented;
	if (u === v) return PyTrue;
	return PyFalse;
}