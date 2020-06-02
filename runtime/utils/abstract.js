function $operator_bin_add (u, v) {
	return u.__add__ (u, v);
}

function $repr (u) {
	console.log (u.__repr__ (u));
}

function $GetAttrString (o, selector) {
	let typ = o.type;
	if ('__getattribute__' in typ) {
		return typ.__getattribute__ (o);
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
			console.log (o, o.dict);
			console.log ('here2');
			return o.dict[selector];
		}
		if (res) {
			if ('__get__' in res.type) {
				console.log ('here3');
				return res.__get__ (res, o, typ);
			}
			console.log ('here4');
			return res;
		}
	}
	console.log ('out');

	// Try o.__getattr__
	// Throw PyAttributeError

}

export {$operator_bin_add, $repr, $GetAttrString};