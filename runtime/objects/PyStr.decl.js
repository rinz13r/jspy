import { PyType, PyObject_Type } from "./PyObject.decl.js";

function PyStr (val) {
	this.val = val;
	this.type = PyStr_Type;
}
function PyStr_From (jsString) {
	let ret = new String (jsString);
	ret.dict = {};
	ret.type = PyStr_Type;
	return  ret;
}

let PyStr_Type = Object.create (PyObject_Type);
PyType.call (PyStr_Type, 'str');

// TODO: Remove PyStr from codebase
export { PyStr, PyStr_From, PyStr_Type };