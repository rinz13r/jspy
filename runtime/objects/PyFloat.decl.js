import { PyObject_Type, PyType } from "./PyObject.decl.js";

function $PyFloat_From (n) {
	let ret = new Number (parseFloat (n));
	ret.type = PyFloat_Type;
	return ret;
}

let PyFloat_Type = Object.create (PyObject_Type);
PyType.call (PyFloat_Type, 'float');

export {
	$PyFloat_From,
	PyFloat_Type
};