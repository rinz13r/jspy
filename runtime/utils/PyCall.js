import { $PyTuple_From } from "../objects/PyTuple.decl.js";

function $CallWithArgs (callable, args, kwargs) {
	if (callable.type.__call__ != undefined) {
		return callable.type.__call__ (callable, args);
	}
	console.pylog (`TypeError: '${callable.type.name}' object is not callable`);
	throw new Error ('123');
}

function $CallWithNoArgs (callable) {
	return $CallWithArgs (callable, $PyTuple_From ([]));
}

function $CallWithVariadicArgs (callable, ...args) {
	return $CallWithArgs (callable, $PyTuple_From (args)); // TODO: check
}

export { $CallWithArgs, $CallWithNoArgs, $CallWithVariadicArgs };
