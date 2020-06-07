import { PyTuple_Type, PyTuple } from "./PyTuple.decl.js";
import { PyNotImplemented } from "./PyNotImplemented.decl.js";

function PyTupleCheck (u) {
	if (u.type == PyTuple_Type) return true;
	// TODO : Walk up the type tree and see if PyTupleType exists
	return false;
}

PyTuple_Type.__add__ = function (self, other) {
	if (!PyTupleCheck (self) || !PyTupleCheck (other)) return PyNotImplemented;
	return new PyTuple (self.arr.concat (other.arr));
}

PyTuple_Type.__str__ = function (self) {
	if (!PyTupleCheck (self)) return PyNotImplemented;
	let js_str = ``;
	for (let el of self.arr) {
		let el_pystr = el.__str__ ();
		js_str += el_pystr.val;
	}
	return PyStr (js_str);
}