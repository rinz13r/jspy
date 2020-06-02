import { PyFunction_Type, PyFunction } from "./PyFunction.decl.js";
import { PyStr } from "./PyStr.decl.js";

function __call__ (self, args, kwargs) {
	if (self.jsfunc.length != args.length) {
		// throw error
		console.error ('PyTypeError : arity mismatch')
	}
	return self.jsfunc.apply (null, args.arr);
}

function __str__ (self) {
	return new PyStr (self.dict.__name__);
}

PyFunction_Type.__call__ = __call__;
PyFunction_Type.__get__ = function (self, u) {
	// console.log ('__get__', self);
	// console.log (self.jsfunc.toString ());
	return new PyFunction (self.name, self.jsfunc.bind (null, u));
};
PyFunction_Type.__repr__ = function (u) {return 'PyFunction';};
PyFunction_Type.__str__ = __str__;