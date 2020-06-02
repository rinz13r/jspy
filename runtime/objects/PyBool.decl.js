import { PyInt, PyInt_Type } from "./PyInt.decl.js";

let PyTrue = new PyInt (1);
let PyFalse = new PyInt (0);

let PyBool_Type = new PyType ('bool', {}, PyInt_Type);

PyTrue.type = PyBool_Type;
PyFalse.type = PyBool_Type;

export { PyTrue, PyFalse, PyBool_Type };
export default { PyTrue, PyFalse, PyBool_Type };