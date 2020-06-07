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
			print : lib.py.builtins.pyprint
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
		if (node.sources.length != 1) {
			console.error ('tuples unpacking not supported');
		}
		console.log (node);
		if (node.targets[0].type == "dot") {
			this.setAttr = true;
			this.visit (node.targets[0]);
			this.visit (node.sources[0]);
			this.program += ');\n';
			return;
		}
		this.visit (node.targets[0]);
		this.program += '=';
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
		this.program += `${this.currentScope}.${node.name} = ${this.namespace}.PyFunction_From ('${node.name}', `
		this.program += `function (`;
		for (let param of node.params) {
			this.program += param.name;
			this.program += ', ';
		}
		let scope = this.currentScope;
		this.currentScope = `${this.parentScope}_`;
		this.program += `) {let ${this.currentScope} = Object.create (${this.parentScope});`;
		for (let param of node.params) {
			this.program += `${this.currentScope}.${param.name} = ${param.name};`;
		}
		let prev = this.parentScope;
		this.parentScope = this.currentScope;
		for (let stmt of node.code) {
			this.visit (stmt);
		}
		this.parentScope = prev;
		this.program += '});'
		this.currentScope = scope;
		// this.program += `${this.currentScope}.${node.name} = new ${this.namespace}.PyFunction ("${node.name}", ${node.name});`;
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
		if (this.setAttr) {
			this.program += `${this.namespace}.$SetAttrString (`;
			this.visit (node.value);
			this.program += `, "${node.name}", `;
			this.setAttr = false;
			return;
		}
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
		console.log (ast);
		this[`visit${ast.type[0].toUpperCase () + ast.type.substr (1)}`] (ast);
	}
	listOfItems (items) {
		this.program += '[';
		for (let item of items) {
			this.visit (item);
			this.program += ',';
		}
		this.program += ']';
	}
	visitTuple (ast) {
		this.program += `new ${this.namespace}.PyTuple (...`;
		this.listOfItems (ast.items);
		this.program += ')\n';
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