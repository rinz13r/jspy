function PyObject () {
	this.type = PyObject_Type;
}

function PyType (name, base) {
	this.name = name;
	this.type = PyType_Type;
	if (base != undefined) {
		this.dict = Object.create (base.dict);
		this.base = base;
	}
	else {
		this.dict = Object.create (PyObject_Type.dict);
		this.base = PyObject_Type;
	}
}

// Metaclass
let PyType_Type = {
	dict : {}
};
PyType_Type.type = PyType_Type;

// TODO : Set base of PyObject_Type to be PyNone.
let PyObject_Type = {
	dict : {},
	type : PyType_Type
};

PyType_Type.base = PyObject_Type;

export { PyObject, PyObject_Type, PyType, PyType_Type };