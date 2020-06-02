import { PyObject, PyType } from "./PyObject.decl.js"

function PyInt (val) {
	this.val = parseInt (val);
	this.type =  PyInt_Type;
}

let PyInt_Type = new PyType ('int');

PyInt.prototype = PyInt_Type;

export {PyInt, PyInt_Type};