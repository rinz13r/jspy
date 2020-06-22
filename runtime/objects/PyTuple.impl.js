import { PyTuple_Type, $PyTuple_From } from "./PyTuple.decl.js";
import { PyNotImplemented } from "./PyNotImplemented.decl.js";
import { $PyStr_From } from "./PyStr.decl.js";

function PyTupleCheck (u) {
	if (u.type == PyTuple_Type || PyTuple_Type.isPrototypeOf (u.type)) return true;
	return false;
}

PyTuple_Type.__add__ = function (self, other) {
	if (!PyTupleCheck (self) || !PyTupleCheck (other)) return PyNotImplemented;
	return $PyTuple_From (self.concat (other));
}

PyTuple_Type.__str__ = function (self) {
	if (!PyTupleCheck (self)) return PyNotImplemented;
	let js_str = `(`;
	for (let el of self) {
		let el_pystr = el.type.__str__ (el);
		js_str += `${el_pystr}, `;
	}
	return $PyStr_From (js_str+')');
}
