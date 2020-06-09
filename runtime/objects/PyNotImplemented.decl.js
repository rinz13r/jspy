import { PyObject_Type, PyType } from "./PyObject.decl.js";

let PyNotImplemented_Type = Object.create (PyObject_Type);
PyType.call (PyNotImplemented_Type, 'NotImplementedType');

const PyNotImplemented = {
	type : PyNotImplemented_Type
};

export { PyNotImplemented };