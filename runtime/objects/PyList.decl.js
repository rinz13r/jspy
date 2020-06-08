import { PyObject_Type, PyType } from "./PyObject.decl.js";

function PyList_From (jsArray) {
	jsArray.type = PyList_Type;
	jsArray.dict = {};

	return jsArray;
}

let PyList_Type = Object.create (PyObject_Type);
PyType.call (PyList_Type, 'list');

export { PyList_From, PyList_Type }