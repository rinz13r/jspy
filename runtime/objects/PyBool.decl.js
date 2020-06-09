import { PyInt, PyInt_Type } from "./PyInt.decl.js";
import { PyType } from "./PyObject.decl.js";

let PyTrue = {};
let PyFalse = {};

PyInt.call (PyTrue, 1);
PyInt.call (PyFalse, 0);

let PyBool_Type = Object.create (PyInt_Type);
PyType.call (PyBool_Type, 'bool', PyInt_Type);

PyTrue.type = PyBool_Type;
PyFalse.type = PyBool_Type;

Object.setPrototypeOf (PyTrue, PyBool_Type);
Object.setPrototypeOf (PyFalse, PyBool_Type);

function $PyBool_From (jsBool) {
	return jsBool ? PyTrue : PyFalse;
}


export { PyTrue, PyFalse, PyBool_Type, $PyBool_From };