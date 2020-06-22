import { PyFunction_From, PyInt_Type, $PyInt_From, PyNone, $PyFloat_From } from "./objects/include.js";
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
	console.pylog (str.valueOf ());
});

let sqrt = PyFunction_From ('sqrt', function (u) {
	if (!(u instanceof Number)) {
		console.pylog ('sqrt: Expect int/float as argument');
		return PyNone;
	}
	return $PyFloat_From (Math.sqrt (u));
});

export { print, pyprint, sqrt };
