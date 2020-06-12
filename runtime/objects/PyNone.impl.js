import { PyNone_Type } from "./PyNone.decl.js";
import { $PyStr_From } from "./PyStr.decl.js";

PyNone_Type.__repr__ = function (self) {
	return `None`;
}

PyNone_Type.__str__ = function (self) {
	return $PyStr_From ('None');
}