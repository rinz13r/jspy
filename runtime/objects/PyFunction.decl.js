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

export { PyFunction, PyFunction_Type };