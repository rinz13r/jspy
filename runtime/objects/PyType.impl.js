import { PyType_Type, PyType } from "./PyObject.decl.js";

PyType_Type.__call__ = function (cls, args, kwargs) {
	// TODO: Support __new__
	// Simulate __new__ for now
	let ret = {
		type : cls,
		dict : {},
	};
	cls.__init__ (ret, args, kwargs);
	return ret;
}
PyType_Type.__str__ = function (self) {
	return new PyStr (`type`);
}