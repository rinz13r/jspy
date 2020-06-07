// Utils to build class

import { $CallWithArgs, $CallWithVariadicArgs } from "./PyCall.js";

function $get_binary_slot_wrapper (f) {
	return $binary_slot_wrapper.bind (f);
}

function $get_unary_slot_wrapper (f) {
	return $unary_slot_wrapper.bind (f);
}

function $binary_slot_wrapper (u, v) {
	// function bound to 'this'
	$CallWithVariadicArgs (this, u, v);
}

function $unary_slot_wrapper (u) {
	// PyFunction bound to 'this'
	$CallWithVariadicArgs (this, u);
}

const dunders = new Set ([
	'__repr__',
	'__str__',
	'__call__',
	'__add__',
	'__get__',
]);

const arity_for_name = {
	'__repr__' : 1,
	'__str__' : 1,
	'__call__' : 2, // TODO : kwargs
	'__add__' : 2,
	'__get__' : 3,
};

function $intialize_usr_dict (type) {
	for (let dunder of dunders) {
		if (type.hasOwnProperty (dunder)) {
			if (arity_for_name[dunder] == 1) {
				
			}
		}
	}
}

function tp_call (self, ...args) {
	// TODO : arity check
	return $CallWithArgs (self.dict.__init__, new PyTuple (args));
}

export { $get_binary_slot_wrapper };