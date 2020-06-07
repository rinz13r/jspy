import { PyType } from "./PyObject.decl.js";
import { PyStr } from "./PyStr.decl.js";

function PyFunction (name, jsfunc) {
	this.type = PyFunction_Type;
	this.jsfunc = jsfunc;
	this.dict = {
		'__name__' : new PyStr (name)
	}
	this.name = name;
}

let PyFunction_Type = new PyType ('function');
PyFunction.prototype = PyFunction_Type;

Function.prototype.type = PyFunction_Type;
function PyFunction_From (name, jsfunc) {
	jsfunc.__name__ = name;
	jsfunc.dict = {};
	return jsfunc;
}

export { PyFunction, PyFunction_Type, PyFunction_From };