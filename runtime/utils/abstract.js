import { PyNotImplemented } from "../objects/PyNotImplemented.decl.js";
import { PyStr } from "../objects/PyStr.decl.js";

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

function $bin_op (op, left, right) {
	if (op == "+") {
		return $bin_add (left, right);
	}
}

export { $operator_bin_add, $repr, $GetAttrString, $bin_op, $SetAttrString };