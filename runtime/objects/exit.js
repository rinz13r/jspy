// Expose slots (dunders) to the user via PyFunctions.

import { PyType, PyType_Type, PyObject_Type } from "./PyObject.decl.js";
import { PyInt, PyInt_Type } from "./PyInt.decl.js";
import { PyStr, PyStr_Type } from "./PyStr.decl.js";
import { PyFunction_From, PyFunction, PyFunction_Type } from "./PyFunction.decl.js";
import { PyMethod_From, PyMethod_Type } from "./PyMethod.decl.js";
import { PyTuple, PyTuple_Type } from "./PyTuple.decl.js";
import { PyTrue, PyFalse, PyBool_Type } from "./PyBool.decl.js";
import { PyList_From, PyList_Type } from "./PyList.decl.js"
import { PyNone, PyNone_Type } from "./PyNone.decl.js"

import {  } from "./PyObject.impl.js";
import {  } from "./PyInt.impl.js";
import {  } from "./PyStr.impl.js";
import {  } from "./PyFunction.impl.js";
import {  } from "./PyTuple.impl.js";
import {  } from "./PyBool.impl.js";
import {  } from "./PyType.impl.js";
import {  } from "./PyMethod.impl.js";
import {  } from "./PyList.impl.js";
import {  } from "./PyNone.impl.js";

const dunders = new Set ([
	'__repr__',
	'__str__',
	'__call__',
	'__add__',
	'__get__',
]);

function f (type_obj) {
	for (let k of Object.getOwnPropertyNames (type_obj)) {
		let v = type_obj[k];
		if (typeof v == "function") {
			type_obj[k] = PyFunction_From (k, v);
			type_obj.dict[k] = v;
		}
	}
}

let types = [PyInt_Type, PyStr_Type, PyType_Type, PyTuple_Type, PyFunction_Type, PyBool_Type, PyMethod_Type];

for (let type of types) f (type);

export {
	PyInt, PyStr, PyTuple, PyFunction, PyType,
	PyFunction_From, PyFunction_Type,
	PyBool_Type, PyTrue, PyFalse,
	PyObject_Type, f,
	PyList_From, PyList_Type,
	PyNone, PyNone_Type,
	PyInt_Type,
	PyStr_Type,
};