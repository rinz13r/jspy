import { PyFunction_From } from "./objects/exit.js";
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
	console.log (str.val);
});

export { print, pyprint };