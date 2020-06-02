import { PyType } from "./PyObject.decl.js";

function PyStr (val) {
	this.val = val;
	this.type = PyStr_Type;
}

let PyStr_Type = new PyType ('str', {
	'__str__' : function (u) {return u;},
	'__add__' : function (u, v) {return new PyStr (u.val + v.val);},
	'__repr__' : function (self) {return self.val;},
});

PyStr.prototype = PyStr_Type;

export { PyStr, PyStr_Type };