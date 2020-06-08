import { PyType_Type, PyType } from "./PyObject.decl.js";
import { PyTuple } from "./PyTuple.decl.js"
import { PyStr } from "./PyStr.decl.js";

PyType_Type.__call__ = function (cls, args, kwargs) {
	// TODO: Support __new__
	// Simulate __new__ for now
	let ret = {
		type : cls,
		dict : {},
	};
	let nargs = new PyTuple (ret, ...args.arr);
	let tp_init = cls.__init__;
	tp_init.type.__call__ (tp_init, nargs, kwargs);
	// cls.__init__.__call__ (ret, args, kwargs);
	return ret;
}
PyType_Type.__str__ = function (self) {
	return new PyStr (`<class '${self.name}'>`);
}
PyType_Type.__repr__ = function (self) {
	return self.name;
}