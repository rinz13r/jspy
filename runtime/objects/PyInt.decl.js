import { PyObject_Type, PyType } from "./PyObject.decl.js"

function $PyInt_From (val) {
	let ret = new Number (parseInt (val));
	// console.log('val=', val);
	// console.log (`parseInt(${val})=${parseInt (val)}`)
	ret.type = PyInt_Type;
	return ret;
}

let PyInt_Type = Object.create (PyObject_Type);
PyType.call (PyInt_Type, 'int');

export {PyInt_Type, $PyInt_From};