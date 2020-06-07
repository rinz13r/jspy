import { PyTuple } from "../objects/PyTuple.decl.js";

function $CallWithArgs (callable, args, kwargs) {
	if (callable.__call__ != undefined) {
		return callable.__call__ (callable, args);
	}
	console.error (`PyTypeError: '${callable.type.name}' object is not callable`);
}

function $CallWithNoArgs (callable) {
	return $CallWithArgs (callable, new PyTuple ());
}

function $CallWithVariadicArgs (callable, ...args) {
	return $CallWithArgs (callable, new PyTuple (args));
}

export { $CallWithArgs, $CallWithNoArgs, $CallWithVariadicArgs };