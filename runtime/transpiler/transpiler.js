import { parse } from "./Python.js"
import * as objects from "../objects/exit.js"
import * as utils from "../utils/all.js"

class Visitor {
	constructor () {
		this.program = "";
		this.namespace = "lib.py"
	}
	reset () {
		this.program = "";
	}
	visitModule (node) {
		for (let stmt of node.code) {
			this.visit (stmt);
		}
	}
	visitAssign (node) {
		if (node.targets.length != 1) {
			console.error ('multi-targets not supoorted by parser');
		}
		this.visit (node.targets[0]);
		this.program += '=';
		if (node.sources.length != 1) {
			console.error ('tuples unpacking not supported');
		}
		this.visit (node.sources[0]);
		this.program += ';\n';
	}
	visitLiteral (node) {
		if (typeof (node.value) == "number")
			this.program += `(new ${this.namespace}.PyInt (${node.value}))`;
		else if (typeof (node.value) == "string") {
			this.program += `(new ${this.namespace}.PyStr (${node.value}))`;
		}
		else {
			console.error ('unknown literal type');
		}
	}
	visitCall (node) {
		console.log (node);
	}
	visitName (node) {
		this.program += `let ${node.id}`
	}
	visit (ast) {
		let program = "";
		console.log (ast.type);
		this[`visit${ast.type[0].toUpperCase () + ast.type.substr (1)}`] (ast);
	}
}

let visitor = new Visitor ();
function run (program) {
	visitor.reset ();
	visitor.visit (parse (program));
	console.log (visitor.program);
	return visitor.program;
}

run (`print (a)
`)

let py = {}
Object.assign (py, objects);
Object.assign (py, utils);
console.log (py);
export {
	py,
	run
}