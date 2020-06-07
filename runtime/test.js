import { $GetAttrString, $repr, $bin_op } from "./utils/abstract.js"
import { PyInt, PyStr, PyTuple, PyFunction, PyFunction_From, PyType, PyTrue, PyFalse } from "./objects/exit.js"
import { $CallWithArgs } from "./utils/PyCall.js";
import { PyType_Type, PyObject_Type, PyObject } from "./objects/PyObject.decl.js";

console.pylog = console.log;

let a = new PyInt (12);
let b = new PyInt (90);
let s = new PyStr ('hey');
let t = new PyStr (' there');

function $call (callable, args, kwargs) {
	if (callable.type.__call__ != undefined) {
		return callable.type.__call__ (callable, args);
	}
	console.error ('Not a callable');
}

let reprfunc = $GetAttrString (a, '__str__');

$repr ($bin_op ("+", a, b));
$repr ($bin_op ("+", PyTrue, PyTrue));
$repr (PyTrue)

let Point = Object.create (PyObject_Type);
PyType.call (Point, 'point');

Point.__init__ = function proxy_call (self, args, kwargs) {
	$CallWithArgs (Point.init, args, kwargs);
}
Point.__init__ = PyFunction_From ('__init__', function (self, x, y) {
	self.dict.x = x;
	self.dict.y = y;
});
// Point.__init__.type.__call__ (PyInt.__init__, )
// Point.init = new PyFunction ('init', function (self, x, y) {
// 	self.dict.x = x;
// 	self.dict.y = y;
// });
Point.__repr__ = function (self) {
	return `point`;
}
console.log ($call (Point, new PyTuple (Point, a, b)));