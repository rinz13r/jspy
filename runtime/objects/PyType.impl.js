import { PyMeta_Type, PyType } from "./PyObject.decl.js";

function __init__ () {

}
function __getattribute__ (self) {
	if (self == PyMeta_Type) {

	}
}

function __call__ (self, args) { // Return new Instance of class
	let ret = {};
	self.__init__ (ret, args);
}