import { parse } from "./Python.js"
import * as objects from "../objects/include.js"
import * as utils from "../utils/include.js"
import * as builtins from "../builtins.js"

class Visitor {
	constructor () {
		this.program = `let scope = {};\n`;
		this.namespace = "lib.py";
		this.currentScope = "scope";
		this.nestedScope = "scope";
		this.nestingLevel = 0;
	}
	reset () {
		this.program = `let scope = {
			print : lib.py.builtins.pyprint,
			int : lib.py.PyInt_Type,
			str : lib.py.PyStr_Type,
			sqrt : lib.py.builtins.sqrt
		};\n`;
	}
	visitBinop (node) {
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
		if (typeof (node.value) == "number") {
			if (Number.isInteger (node.value)) {
				this.program += `(${this.namespace}.$PyInt_From (${node.value}))`;
			} else {
				this.program += `(${this.namespace}.$PyFloat_From (${node.value}))`;
			}
			console.log (node);
		} else if (typeof (node.value) == "string") {
			if (node.value[0] == "\\" || node.value[0] == '\'') {
				this.program += `(${this.namespace}.$PyStr_From (${node.value}))`;
			} else if (node.value == "None") {
				this.program += `(${this.namespace}.PyNone)`;
			} else if (node.value == "True") {
				this.program += `(${this.namespace}.PyTrue)`;
			} else if (node.value == "False") {
				this.program += `(${this.namespace}.PyFalse)`;
			} else {
				console.error (`unknown literal type`);
			}
		}
		else {
			console.error ('unknown literal type');
		}
	}
	visitCall (node) {
		this.program += `${this.namespace}.$CallWithArgs (`;
		this.visit (node.func); // callable
		this.program += ', ';
		this.program += `${this.namespace}.$PyTuple_From (`
		for (let arg of node.args) {
			this.visit (arg);
			this.program += ',';
		}
		this.program += ')';
		this.program += ')\n';
	}
	visitDef (node) {
		this.program += `${this.currentScope}.${node.name} = ${this.namespace}.PyFunction_From ('${node.name}', `
		this.program += `function (`;
		for (let param of node.params) {
			this.program += param.name;
			this.program += ', ';
		}
		let prev_nestedScope = this.nestedScope;
		this.nestingLevel++;
		this.nestedScope = this.getScopeName ();
		this.program += `) {var ${this.nestedScope} = Object.create (${prev_nestedScope});`;
		let prev_currentScope = this.currentScope;
		this.currentScope = this.nestedScope;
		for (let param of node.params) {
			this.program += `${this.currentScope}.${param.name} = ${param.name};`;
		}
		for (let stmt of node.code) {
			this.visit (stmt);
		}
		this.program += `\n return ${this.namespace}.PyNone});\n`;
		this.nestingLevel--;
		this.nestedScope = prev_nestedScope;
		this.currentScope = prev_currentScope;
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
		try {
			this[`visit${ast.type[0].toUpperCase () + ast.type.substr (1)}`] (ast);
		} catch (e) {
			console.error (`visit${ast.type[0].toUpperCase () + ast.type.substr (1)} is undefined`);
			console.error (ast);
		}
	}
	visitWhile (node) {
		this.program += `while (${this.namespace}.JS_truth_value (`;
		this.visit (node.cond.items[0]);
		this.program += `)) {\n`;
		for (let stmt of node.code) {
			this.visit (stmt);
		}
		this.program += `}\n`;
	}
	visitIf (node) {
		this.program += `if (${this.namespace}.JS_truth_value (`
		this.visit (node.cond.items[0]);
		this.program += ')) {\n';
		for (let stmt of node.code) {
			this.visit (stmt);
		}
		this.program += '}';
		if (node.elif) {
			for (let elif_node of node.elif) {
				this.program += 'else ';
				this.visitIf (elif_node);
			}
		}
		if (node.else) {
			this.program += 'else {\n';
			for (let stmt in node.else.code) {
				this.visit (stmt);
			}
			this.program += '}\n';
		}
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
		this.program += `${this.namespace}.$PyTuple_From (...`;
		this.listOfItems (ast.items);
		this.program += ')\n';
	}
	visitList (ast) {
		this.program += `${this.namespace}.$PyList_From (`
		this.listOfItems (ast.items);
		this.program += ')\n';
	}
	getScopeName () {
		let ret = 'scope';
		for (let i = 0; i < this.nestingLevel; i++) ret += '_';
		return ret;
	}
	visitPass () {}
	visitClass (node) {
		// TODO: Consider Base Class
		this.program += `${this.currentScope}.${node.name} = Object.create (${this.namespace}.PyObject_Type);\n`;
		this.program += `${this.namespace}.PyType.call (${this.currentScope}.${node.name}, '${node.name}');\n`;
		this.nestingLevel++;
		this.program += `var ${this.getScopeName()} = ${this.namespace}.getClassScope (${this.currentScope}.${node.name}, ${this.nestedScope});\n`;
		let prevScope = this.currentScope;
		this.currentScope = this.getScopeName ();
		// Define all functions in the type object scope.
		// TODO: Consider Type properties and put them in __dict__
		for (let code of node.code) {
			this.visit (code);
		}
		this.nestingLevel--;
		this.currentScope = prevScope;
		this.program += `${this.namespace}.$initialize_type (${this.currentScope}.${node.name});\n`
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


function getClassScope (type, parscope) {
	return new Proxy ({type: type, parscope : parscope}, {
		get (target, key, recv) {
			if (target.type.hasOwnProperty (key)) {
				return target.type[key];
			}
			return target.parscope[key];
		},
		set (target, key, value, recv) {
			// console.log (`proxy set key: ${key}, val: ${value}`);
			target.type[key] = value;
			return true;
		}
	});
}

let py = {}
Object.assign (py, objects);
Object.assign (py, utils);
py.builtins = {};
Object.assign (py.builtins, builtins);
py.getClassScope = getClassScope;

export {
	py,
	run
}
