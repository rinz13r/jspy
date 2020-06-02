// Expose slots (dunders) to the user via PyFunctions.

import { PyMeta_Type } from "./PyObject.decl.js";
import { PyInt, PyInt_Type } from "./PyInt.decl.js";
import { PyStr, PyStr_Type } from "./PyStr.decl.js";
import { PyFunction, PyFunction_Type } from "./PyFunction.decl.js";
import { PyTuple, PyTuple_Type } from "./PyTuple.decl.js";

import {  } from "./PyObject.impl.js";
import {  } from "./PyInt.impl.js";
import {  } from "./PyStr.impl.js";
import {  } from "./PyFunction.impl.js";
import {  } from "./PyTuple.impl.js";

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

let types = [PyInt_Type, PyStr_Type, PyMeta_Type, PyTuple_Type, PyFunction_Type];

for (let type of types) {
	f (type);
}

console.log ('exitted');

export { PyInt, PyStr }