import { PyObject_Type, PyType } from "./PyObject.decl.js";

function PyMethod_From (name, jsfunc) {
	jsfunc.type = PyMethod_Type;
	jsfunc.__name__ = name;
	return jsfunc;
}

let PyMethod_Type = Object.create (PyObject_Type);
PyType.call (PyMethod_Type, 'method');

export { PyMethod_From, PyMethod_Type }