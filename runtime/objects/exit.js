// Expose slots (dunders) to the user via PyFunctions.

import { PyType, PyType_Type, PyObject_Type } from "./PyObject.decl.js";
import { PyInt, PyInt_Type } from "./PyInt.decl.js";
import { PyStr, PyStr_Type } from "./PyStr.decl.js";
import { PyFunction_From, PyFunction, PyFunction_Type } from "./PyFunction.decl.js";
import { PyTuple, PyTuple_Type } from "./PyTuple.decl.js";
import { PyTrue, PyFalse, PyBool_Type } from "./PyBool.decl.js";

import {  } from "./PyObject.impl.js";
import {  } from "./PyInt.impl.js";
import {  } from "./PyStr.impl.js";
import {  } from "./PyFunction.impl.js";
import {  } from "./PyTuple.impl.js";
import {  } from "./PyBool.impl.js";
import {  } from "./PyType.impl.js";

const dunders = new Set ([
	'__repr__',
	'__str__',
	'__call__',
	'__add__',
	'__get__',
]);

function f (type_obj) {
	for (let dunder in type_obj) {
		if (dunders.has (dunder)) {
			type_obj.dict[dunder] = new PyFunction (dunder, type_obj[dunder]);
		}
	}
}

let types = [PyInt_Type, PyStr_Type, PyType_Type, PyTuple_Type, PyFunction_Type, PyBool_Type];

for (let type of types) f (type);

export { PyInt, PyStr, PyTuple, PyFunction, PyType, PyFunction_From, PyTrue, PyFalse, PyObject_Type };