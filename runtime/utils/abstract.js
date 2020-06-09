import { PyNotImplemented } from "../objects/PyNotImplemented.decl.js";
import { PyStr } from "../objects/PyStr.decl.js";
import { $CallWithArgs, $CallWithVariadicArgs } from "./PyCall.js";
import { PyFalse, PyTrue } from "../objects/exit.js";

function $operator_bin_add (u, v) {
	return u.__add__ (u, v);
}

function $repr (u) {
	console.pylog (u.type.__repr__ (u));
}

function $GetAttrString (o, selector) {
	let typ = o.type;
	if (typ.__getattribute__) {
		return typ.__getattribute__ (o, new PyStr (selector));
	} else {
		let res;
		if (selector in typ.dict) {
			res = typ.dict[selector];
			if ('__get__' in res.type && '__set__' in res.type) {
				console.log ('here1');
				return res.__get__ (res, o, typ);
			}
		}
		if (o.hasOwnProperty ('dict') && selector in o.dict) {
			// console.log (o, o.dict);
			console.log ('here2', o.dict[selector]);
			return o.dict[selector];
		}
		if (res) {
			if ('__get__' in res.type) {
				console.log ('here3');
				return res.type.__get__ (res, o, typ);
			}
			console.log ('here4');
			return res;
		}
	}
	console.log ('out');

	// Try o.__getattr__
	// Throw PyAttributeError

}

function $SetAttrString (o, selector, val) {
	// TODO: Update algorithm to handle edge cases
	o.dict[selector] = val;
}

function $bin_add (left, right) {
	if ('__add__' in left.type) {
		let res = left.type.__add__ (left, right);
		if (res != PyNotImplemented) {
			return res;
		}
	}
	if ('__add__' in right.type) {
		let res = right.type.__add__ (right, left);
		if (res != PyNotImplemented) {
			return  res;
		}
	}
	// Ideally throw the error and stop execution unless caught.
	console.pylog (`PyTypeError: Unsupported operands for '+': '${left.type.name}' and '${right.type.name}'`);
}
function bin_op1 (slot, u, v) {
	if (slot in u.type) {
		let res = u.type[slot] (u, v);
		if (res != PyNotImplemented) {
			return res;
		}
	}
	if (slot in v.type) {
		let res = v.type[slot] (v, u);
		if (res != PyNotImplemented) {
			return  res;
		}
	}
	return undefined;
}

function $bin_eq (u, v) {
	return u.type.__eq__ (u, v); // __eq__ guaranteed to exist in the hierarchy
}

function $bin_op (op, left, right) {
	if (op == "+") {
		return $bin_add (left, right);
	} else if (op == '==') {
		return  $bin_eq (left, right);
	} else if (op == '-') {
		return bin_op1 ('__sub__', left, right); // TODO: check for undefined
	}
	console.pylog (`operator ${op} currently unsupported`);
}

function $truth_value (u) {
	if ('__bool__' in u.type) { // TODO: Throw exception when __bool__ doesn't return bool
		return  $CallWithVariadicArgs (u.type.__bool__, u);
	} else if ('__len__' in u.type) {
		let len = $CallWithVariadicArgs (u.type.__len__, u);
		if (len.val == 0) {
			return  PyFalse;
		}
		return PyTrue;
	}
	return PyTrue;
}

function JS_truth_value (u) {
	if ($truth_value (u) === PyTrue) {
		return true;
	}
	return false;
}

export { $operator_bin_add, $repr, $GetAttrString, $bin_op, $SetAttrString, JS_truth_value, $bin_eq, $truth_value };