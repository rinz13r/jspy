import { PyNotImplemented } from "./PyNotImplemented.decl.js";
import { PyObject, PyObject_Type } from "./PyObject.decl.js";
import { $PyStr_From } from "./PyStr.decl.js";
import { PyTrue, PyFalse } from "./PyBool.decl.js";
import { PyNone } from "./PyNone.decl.js";

function PyObject_Check (o) {
	return o.type == PyObject_Type;
}
function TYPE (o) {return o.type;}

PyObject_Type. __repr__ = function (self) {return `<object at ?mem>`;}
PyObject_Type.__str__ = function (self) {
	return $PyStr_From (`<object '${self.type.name}' at ?mem>`);
}

PyObject_Type.__eq__ = function (u, v) {
	if (TYPE (u) != TYPE (v)) return PyNotImplemented;
	if (u === v) return PyTrue;
	return PyFalse;
}

PyObject_Type.__init__ = function (self) {
	return PyNone;
}

PyObject_Type.__getattribute__ = function (self, selector) {
	// TODO : conditionally throw a type error
	let res;
	// TODO: Assert selector is PyStr
	selector = selector;
	let typ = self.type;
	if (typ.dict.hasOwnProperty (selector)) { // TODO: Guarantee all types have dict
		res = self.type.dict[selector];
		if ('__get__' in res.type && '__set__' in res.type) { // Data Descriptor
			return res.type.__get__ (res, self, typ); // TODO: Maybe passing wrong args
		}
	}
	if (self.dict && selector in self.dict) {
		return self.dict[selector];
	}
	if (res) {
		if ('__get__' in res.type) {
			return res.type.__get__ (res, self, typ); // TODO
		}
		return res;
	}
	if (self.type.__getattr__) {
		return  self.type.__getattr__ (self, selector);
	}
	// TODO: Raise Attribute Error
	throw Error (`AttributeError: object '${self.type.name}' has not attribute '${selector}'`);
	// __getattr__ called by runtime function $GetAttrXXX
}