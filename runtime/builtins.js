import { PyFunction } from "./objects/exit.js";
import { $repr } from "./utils/abstract.js"

let print = new PyFunction ('print', function (u) {
	$repr (u);
});

export { print };