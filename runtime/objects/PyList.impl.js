import { PyList_Type } from "./PyList.decl.js";
import { PyStr } from "./PyStr.decl.js";

PyList_Type.__str__ = function (self) {
	return self.toString ();
}

PyList_Type.__getitem__ = function (self, idx) {
	if (idx < self.length) {
		return self[idx];
	}
	// TODO: throw IndexError
}

PyList_Type.__setitem__ = function (self, idx, val) {
	if (idx < self.length) {
		self[idx] = val;
	}
	// TODO: throw IndexError
}

PyList_Type.__str__ = function (self) {
	return new PyStr (self.toString ());
}