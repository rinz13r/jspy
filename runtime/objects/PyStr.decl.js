import { PyType } from "./PyObject.decl.js";

function PyStr (val) {
	this.val = val;
	this.type = PyStr_Type;
}

let PyStr_Type = new PyType ('str');

PyStr.prototype = PyStr_Type;

export { PyStr, PyStr_Type };