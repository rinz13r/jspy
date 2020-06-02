- Seperate decl and impl of objects using .impl.js extension for impl files. Done to manage cross dependencies.
- Declare Type object in every object file.
- Once functions are defined in the .impl file, add it to type's dict.

Call Protocol:
function (args, kwargs);
If call if f (1, 2, 3) -> $call (f, new PyTuple (1, 2, 3));
All calls happen on PyFunctions and not native JS calls with the exception of some calls made by runtime.

PyFunction calls:
PyFunction.\_\_call__ (callable, args, kwargs);
args->PyTuple,
kwargs->PyDict

For calls to PyFunctions around native JS functions:
For example,

PyInt.\_\_str__ = function (self) {
	return new PyStr (self.val);
}

```python
a = 1
a.__add__ (2)
```

```javascript
a = new PyInt (1);
$call ($GetAttrString (a, '__add__'), new PyTuple (new PyInt (2)), /* kwargs empty for now*/);
```

$GetAttrString returns a PyMethod (self=a)
In our case however, a PyFunction itself is returned with self bound to the underlying JS native function.
PyFunction will do some checking like number of args.
Then, the internal array from PyTuple is taken and the JS Native function is called like so:

```javascript
native.apply (null, args.array);
```