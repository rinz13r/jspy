import { PyInt, PyInt_Type } from "./objects/PyInt.decl.js"
import { PyStr } from "./objects/PyStr.decl.js"
import { $GetAttrString, $repr, $operator_bin_add } from "./utils/abstract.js"
import { PyObject, PyType } from "./objects/PyObject.decl.js";
import {  } from "./objects/exit.js"
import { PyTuple } from "./objects/PyTuple.decl.js";
import { $CallWithArgs } from "./utils/PyCall.js";

let a = new PyInt (12);
let b = new PyInt (90);
let s = new PyStr ('hey');
let t = new PyStr (' there');

function $call (callable, args, kwargs) {
	if (callable.__call__ != undefined) {
		return callable.__call__ (callable, args);
	}
	console.error ('Not a callable');
}

let reprfunc = $GetAttrString (a, '__str__');
$repr ($CallWithArgs (reprfunc, new PyTuple (a)));
$repr (a);
$repr (b);
$repr (s);
$repr (t);

// $GetAttr
$repr ($operator_bin_add (a, b));
$repr ($operator_bin_add (s, t));