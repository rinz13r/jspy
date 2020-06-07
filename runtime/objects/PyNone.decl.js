import { PyType } from "./PyObject.decl.js";

let PyNone_Type = new PyType ('NoneType');

const PyNone = {
	type : PyNone_Type
};

export { PyNone, PyNone_Type };