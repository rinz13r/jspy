import { PyInt_Type, $PyInt_From } from "./PyInt.decl.js";
import { PyType } from "./PyObject.decl.js";

let PyTrue = $PyInt_From (1);
let PyFalse = $PyInt_From (0);

let PyBool_Type = Object.create (PyInt_Type);
PyType.call (PyBool_Type, 'bool', PyInt_Type);

PyTrue.type = PyBool_Type;
PyFalse.type = PyBool_Type;

function $PyBool_From (jsBool) {
	return jsBool ? PyTrue : PyFalse;
}


export { PyTrue, PyFalse, PyBool_Type, $PyBool_From };