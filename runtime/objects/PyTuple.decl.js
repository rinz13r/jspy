import { PyType, PyObject_Type } from "./PyObject.decl.js";

let PyTuple_Type = Object.create (PyObject_Type);
PyType.call (PyTuple_Type, 'tuple');

function $PyTuple_From (...args) {
	args.type = PyTuple_Type;
	return args;
}

export { PyTuple_Type, $PyTuple_From };
