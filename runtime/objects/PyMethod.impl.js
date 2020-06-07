import { PyMethod_Type } from "./PyMethod.decl.js";

function __call__ (self, args, kwargs) {
	// console.log (self.length, args.len);
	if (self.length != args.len) {
		// throw error
		console.error ('PyTypeError : arity mismatch')
	}
	return self.apply (null, args.arr);
}

function __str__ (self) {
	return new PyStr (self.__name__);
}

PyMethod_Type.__call__ = __call__;
PyMethod_Type.__get__ = function (self, u) {
	// console.log ('__get__', self);
	// console.log (self.jsfunc.toString ());
	return PyMethod_From (self.__name__, self.bind (null, u), true);
	return new PyFunction (self.name, self.jsfunc.bind (null, u));
};
PyMethod_Type.__repr__ = function (u) {
	return `<bound-method '${u.__name__}'>`;
};

PyMethod_Type.__str__ = __str__;