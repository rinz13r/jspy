function PyObject () {
	this.type = PyObject_Type;
}

function PyType (name) {
	this.name = name;
	this.type = PyMeta_Type;
	this.dict = {};
}
let PyMeta_Type = new Object ();
PyMeta_Type.name = 'type';
PyMeta_Type.type = PyMeta_Type;
PyMeta_Type.dict = {};
let PyMeta_Meths = {
	'__repr__' : function (self) {return self.name;},
	'__call__' : function (self, args, kwargs) {
		let object = new Object ();
		self.__init__.call (this, args);
		return object;
	}
}
Object.assign (PyMeta_Type, PyMeta_Meths);

// let PyFunction_Type = new PyType ('function', {});
// function PyFunction (jsfunc) {
// 	this.jsfunc = jsfunc;
// 	this.type = PyFunction_Type;
// }
// let data = {
// 	'__repr__' : function (u) {return 'PyFunction';},
// 	'__get__' : function (self, u) {return new PyFunction (this.jsfunc.bind (null, u));},
// 	'__call__' : function (self, args, kwargs) {
// 		return self.jsfunc.apply (null, )
// 	}
// };
// Object.assign (PyFunction_Type, data);
// PyFunction.prototype = PyFunction_Type;

// for (let k in data) {
// 	PyFunction_Type.dict[k] = new PyFunction (data[k]);
// }


let PyObject_Type = new PyType ('object', {
	'__repr__' : function (self) {return '<PyObject>';}
});
PyObject.prototype = PyObject_Type;


// for (let k in PyMeta_Meths) {
// 	PyMeta_Type.dict[k] = new PyFunction (data[k]);
// }

export { PyObject, PyType, PyMeta_Type };
export default { PyObject, PyType, PyMeta_Type };