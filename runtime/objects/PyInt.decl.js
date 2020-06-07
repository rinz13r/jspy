import { PyObject_Type, PyType } from "./PyObject.decl.js"

function PyInt (val) {
	this.val = parseInt (val);
	this.type =  PyInt_Type;
}

function PyInt_From (val) {
	let ret = {};
	ret.val = val;
	ret.type = PyInt_Type;
	return ret;
}

let PyInt_Type = Object.create (PyObject_Type);
PyType.call (PyInt_Type, 'int');

PyInt.prototype = PyInt_Type;

export {PyInt, PyInt_Type};