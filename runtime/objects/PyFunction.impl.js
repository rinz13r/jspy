import { PyFunction_Type, PyFunction_From } from "./PyFunction.decl.js";
import { $PyStr_From } from "./PyStr.decl.js";
import { PyMethod_From } from "./PyMethod.decl.js";

function __call__ (self, args, kwargs) {
	// console.log (self.length, args.len);
	if (self.length != args.length) {
		// TODO: Throw
		console.pylog ('PyTypeError : arity mismatch')
		throw Error ('Arity mismatch');
	}
	return self.apply (null, args);
}

function __str__ (self) {
	return $PyStr_From (`<function '${self.__name__}'>`);
}

PyFunction_Type.__call__ = __call__;
PyFunction_Type.__get__ = function (self, u) {
	// console.log ('__get__', self);
	// console.log (self.jsfunc.toString ());
	return PyMethod_From (self.__name__, self.bind (null, u));
};
PyFunction_Type.__repr__ = function (u) {
	return `<function '${u.__name__}'>`;
};

PyFunction_Type.__str__ = __str__;
