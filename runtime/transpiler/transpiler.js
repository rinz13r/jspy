import { parse } from "./Python.js"
import * as objects from "../objects/exit.js"
import * as utils from "../utils/all.js"
import * as builtins from "../builtins.js"

class Visitor {
	constructor () {
		this.program = `let scope = {};\n`;
		this.namespace = "lib.py";
		this.currentScope = "scope";
		this.defintionScope = "scope";
		this.executionScope = "scope";
		this.parentScope = "scope";
	}
	reset () {
		this.program = `let scope = {
			print : lib.py.builtins.print
		};\n`;
	}
	visitBinop (node) {
		console.log (node);
		this.program += `${this.namespace}.$bin_op ("${node.op}", `;
		this.visit (node.left);
		this.program += ',';
		this.visit (node.right);
		this.program += ')'
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
		this.program += `${this.namespace}.$CallWithArgs (`;
		this.visit (node.func); // callable
		this.program += ', ';
		this.program += `new ${this.namespace}.PyTuple (`
		for (let arg of node.args) {
			this.visit (arg);
			this.program += ',';
		}
		this.program += ')';
		this.program += ')\n';
	}
	visitDef (node) {
		console.log (node);
		this.program += `function ${node.name} (`;
		for (let param of node.params) {
			this.program += param.name;
			this.program += ', ';
		}
		let scope = this.currentScope;
		this.currentScope = `${this.parentScope}_`;
		this.program += `) {${this.currentScope} = Object.create (${this.parentScope});`;
		for (let param of node.params) {
			this.program += `${this.currentScope}.${param.name} = ${param.name};`;
		}
		let prev = this.parentScope;
		this.parentScope = this.currentScope;
		for (let stmt of node.code) {
			this.visit (stmt);
		}
		this.parentScope = prev;
		this.program += '}'
		this.currentScope = scope;
		this.program += `${this.currentScope}.${node.name} = new ${this.namespace}.PyFunction ("${node.name}", ${node.name});`;
	}
	visitDefToNativeLambda (node) {
		this.program += `function (`
		for (let param of node.params) {
			this.program += param.name;
			this.program += ', ';
		}
		this.program += ') {';
		for (stmt in node.code) {
			this.visit (stmt);
			this.program += ';\n';
		}
		// TODO: Add PyNone
		this.program += '}';
	}
	visitReturn (node) {
		if (node.values.length == 1) {
			this.program += `return `;
			this.visit (node.values[0]);
		} else if (node.values.length > 1) {
			// 
		}
		this.program += ';';
	}
	visitDot (node) {
		this.program += `${this.namespace}.$GetAttrString (`;
		this.visit (node.value);
		this.program += `, "${node.name}")`;
	}
	visitArg (node) {
		this.visit (node.actual);
	}
	visitName (node) {
		this.program += `${this.currentScope}.${node.id}`;
	}
	visit (ast) {
		let program = "";
		console.log (ast.type);
		this[`visit${ast.type[0].toUpperCase () + ast.type.substr (1)}`] (ast);
	}
	visitClass (node) {
		console.log (node);
		// TODO: Consider Base Class
		this.program += `${this.currentScope}.${node.name} = Object.create (${this.namespace}.PyObject_Type);\n`;
		this.program += `${this.namespace}.PyType.call (${this.currentScope}.${node.name}, '${node.name}');\n`;
		let scope = this.currentScope;
		this.currentScope = `${this.currentScope}.${node.name}`;
		// Define all functions in the type object scope.
		// TODO: Consider Type properties and put them in __dict__
		for (let code of node.code) {
			// if (code.type == "def") this.visitDefToNativeLambda (code);
			this.visit (code);
		}
		// this.program += `$initialize_class_dict (${this.currentScope}.${node.name});\n`
		this.currentScope = scope;
	}
}

let div = document.getElementById ('console');
console.pylog = function (...args) {
	for (let arg of args) {
		let text = document.createTextNode (`${arg}`);
		let br = document.createElement ('br');
		div.appendChild (text);
		div.appendChild (br);
	}
}


let visitor = new Visitor ();
function run (program) {
	div.innerHTML = "";
	visitor.reset ();
	visitor.visit (parse (program));
	console.log (visitor.program);
	eval (visitor.program);
	return visitor.program;
}

let py = {}
Object.assign (py, objects);
Object.assign (py, utils);
py.builtins = {};
Object.assign (py.builtins, builtins);
console.log (py);
export {
	py,
	run
}