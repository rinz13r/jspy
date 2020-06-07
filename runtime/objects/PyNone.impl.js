import { PyNone_Type } from "./PyNone.decl.js";
import { PyStr } from "./PyStr.decl.js";

PyNone_Type.__repr__ = function (self) {
	return `None`;
}

PyNone_Type.__str__ = function (self) {
	return new PyStr ('None');
}