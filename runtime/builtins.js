import { PyFunction_From, PyInt_Type, PyNone, PyInt } from "./objects/exit.js";
import { $repr } from "./utils/abstract.js"
import { PyStr_Type } from "./objects/PyStr.decl.js";

let print = PyFunction_From ('print', function (u) {
	$repr (u);
});

let pyprint = PyFunction_From ('print', function (u) {
	let str = u.type.__str__ (u);
	while (str.type != PyStr_Type) {
		str = str.type.__str__ (str);
	}
	console.pylog (str.val);
});

let sqrt = PyFunction_From ('sqrt', function (u) {
	if (u.type != PyInt_Type) {
		console.pylog ('sqrt: Expect int as argument');
		return PyNone;
	}
	return new PyInt (Math.sqrt (u.val));
});

export { print, pyprint, sqrt };