import { PyType, PyObject_Type } from "./PyObject.decl.js";
import { PyStr } from "./PyStr.decl.js";

function PyFunction (name, jsfunc) {
	this.type = PyFunction_Type;
	this.jsfunc = jsfunc;
	this.dict = {
		'__name__' : new PyStr (name)
	}
	this.name = name;
}

let PyFunction_Type = Object.create (PyObject_Type);
PyType.call (PyFunction_Type, 'function');

// Function.prototype.type = PyFunction_Type;

function PyFunction_From (name, jsfunc) {
	jsfunc.__name__ = name;
	jsfunc.dict = {};
	jsfunc.type = PyFunction_Type;
	return jsfunc;
}

export { PyFunction, PyFunction_Type, PyFunction_From };