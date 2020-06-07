import { PyType, PyObject_Type } from "./PyObject.decl.js";

function PyTuple (...args) {
	this.type = PyTuple_Type;
	this.len = args.length;
	this.arr = args;
}

let PyTuple_Type = Object.create (PyObject_Type);
PyType.call (PyTuple_Type, 'tuple');
// let PyTuple_Type = new PyType ('tuple');

export { PyTuple_Type, PyTuple };