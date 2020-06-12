import { PyType, PyObject_Type } from "./PyObject.decl.js";

function $PyStr_From (jsString) {
	let ret = new String (jsString);
	ret.type = PyStr_Type;
	return  ret;
}

let PyStr_Type = Object.create (PyObject_Type);
PyType.call (PyStr_Type, 'str');

export { $PyStr_From, PyStr_Type };