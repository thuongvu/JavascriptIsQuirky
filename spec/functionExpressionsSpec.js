describe("", function() {});
describe("Function Expressions", function() {
	describe("Function Declarations", function() {
		it("The function name property can return the identifier of the function", function() {
			function functionName() {};
			expect(functionName.name).toBe('functionName');
		});
		it("Function declarations are hoisted to the top to be read before code executes", function() {
			// helloWorld is called
			helloWorld();
			expect(helloWorld()).toBe("hello world");
			// even though helloWorld() is called before it's declared, it works because of hoisting
			function helloWorld() {
				return "hello world";
			};
		});	
		describe("Function expressions", function() {
			describe("looks like a normal variable assignment", function() {});
			describe("The function created is considered an anonymous function because it has no identifier after the function keyword, so the name keyword is an empty string", function() {});
			it("They act like other expressions, and must be assigned before usage", function() {
				expect(function() {

					helloWorld() // invoking helloWorld() and we expect it to throw an error

				}).toThrow(new Error("undefined is not a function"));

				var helloWorld = function() {
					return "Hello world";
				};

			});
			it("This code, written with function declarations, will behave unexpectedly", function() {

					var isTrue = true;
					if (isTrue == true) {
						function helloWorld() {
							return "hello";
						};
					} else {
						function helloWorld() {
							return "world";
						};
					};
					expect(helloWorld()).toBe("world");
					// Most browsers will return the second case no matter what.
					// when the javascript is loaded, remember that it looks through the script to hoist functions
					// the second declaration overwrites the first declaration
			});
			it("Using function expressions, this performs as we might expect", function() {
				var isTrue = true;
				if (isTrue == true) {
					var helloWorld = function() {
						return "hello";
					};
				} else {
					var helloWorld = function() {
						return "world";
					};
				};
				expect(helloWorld()).toBe("hello");
				// this one assigns the correct function expression to the variable helloWorld based on condition
			});
		});
		describe("Any time a function is being used as avalue, it is a function expression", function() {});
	}); // Function Declarations end
	describe("Recursion", function() {
		it("A classic factorial recursive function", function() {
			function factorial(num) {
				if (num <= 1) {
					return 1;
				} else {
					return num * factorial(num - 1);
				};
			};
			expect(factorial(5)).toEqual(120);
		});
		it("You can prevent a recursive function from functioning by changing the reference to the original function", function() {
			function factorial(num) {
				if (num <= 1) {
					return 1;
				} else {
					return num * factorial(num - 1);
				};
			};

			var anotherFactorial = factorial;
			factorial = null;

			expect(function(){

				anotherFactorial(5)

			}).toThrow(new TypeError("object is not a function"));

			//this doesn't work because when factorial is set to null, only one reference to the original function remains
			// therefore when anotherFactorial() is called, it will try to invoke factorial() which is null
			
		});
		it("You can use arguments.callee, a pointer to the functon being executed, to call a function recursively", function() {
			function factorial(num) {
				if (num <= 1) {
					return 1;
				} else {
					return num * arguments.callee(num - 1); // using arguments.callee will ensure that the function will work regardless of how its accessed
				};
			};
			var anotherFactorial = factorial;
			factorial = null;
			expect(anotherFactorial(5)).toEqual(120);
		});

		it("arguments.callee will not work in strict mode.  Instead, use named function expressions", function() {
			var factorial = (function f(num) {
				if (num <= 1) {
					return 1;
				} else {
					return num * f(num -1);
				};
			});

			expect(factorial(5)).toBe(120);
			// a named function express, f() is created and assigned to the variable factorial
			// the name f remains the same if the funtion is assigned to another variable, so the recursive call will always execute correctly

		});

	}); // Recursion end
	describe("Closures", function() {
		function compare(num1, num2) {
			if (num1 < num2) {
				return -1;
			} else if (num1 > num2) {
				return 1;
			} else {
				return 0;
			};
		};
		describe("are functions that have access to  variables from another function's scope", function() {});
		describe("When a function is called, an execution context is created, and its scope chain created", function() {});
		describe("The activation object for the function is initialized with values for arguments and any named arguments", function() {});
		describe("Then the outer function's activation object is the second object in the scope chain, and this continues until the scope chain reaches the global execution context", function() {});
		it("For example", function() {
			var result = compare(5,10);
			// this defines a function named compare() that is called in the global execution context
			// when compare is called, a new activation object is created that contains arguments, num1, and num2
			// the global execution context's variable object is next in the compare() execution context's scope chain, and it contains this, result, and compare
		});
		describe("An object represents the variables in each execution context.", function() {});
		describe("A global context's variable object always exists, while a local context variable object exist while the function is executed", function() {});
		describe("when defining a function, its scope chain is created, loaded with the global variable object, and saved to the [[scope]] property", function() {});
		describe("When the function is called, an execution context is created and its scope chain is built up by coping the objects in the function's [[scope]] property", function() {});
		describe("Then, the activation object, which also acts as a variable object, is created and pushed to the front of the context's scope chain", function() {});
		describe("when the function is done executing, the local activation object is destroyed.  Closures, on the other hand...", function() {});
		function createComparisonFunction(propertyName) {
			return function(object1, object2) {
				var value1 = object1[propertyName];
				var value2 = object2[propertyName];

				if (value1 < value2) {
					return -1;
				} else if (value1 > value2) {
					return 1;
				} else {
					return 0;
				};
			};
		};
		it("An anonymous function's scope chain contains a reference to the activation object for the outer function", function() {
			var compare = createComparisonFunction("name");
			var result = compare({name:"Quincy"}, {name: "Ruth"});
			expect(result).toEqual(-1);
		});
		describe("when the anonymous function is returned from createComparisonFunction(), its scope chain has been initialized to contain the activation object from createComparisonFunction() and the global variable object", function() {});
		describe("and the activation object from createComparisonFunction() cannot be destroyed until the function finishes executing, because the reference still exists in the anonymous function's scope chain", function() {});
		it("after createComparisonFunction() completes, the scope chain for its execution context is destroyed, but its activation object will remain in memory until the anonymous function is destroyed", function() {
			// the comparison function is created and stored in the variable compareNames
			var compareNames = createComparisonFunction("name");
			// call function
			var result = compareNames({name:"Quincy"}, {name: "Ruth"});
			expect(result).toEqual(-1);

			// deference function so memory can be reclaimed
			compareNames = null;
			expect(compareNames).toBe(null);
		});
		describe("Closures and variables", function() {
// TO DO -- REDO THIS ONE, pg 225
			it("The closure always gest te last value from the containing function, as they store a reference for the entire variable object, not just a particular variable", function() {
				function createFunctions() {
					var result = new Array();
					for (var i = 0; i < 10; i++) {
						result[i] = function() {
							return i;
						};
					};
					return result;
				};

				function createFunctionsCorrect() {
					var result = new Array();

					for (var i = 0; i < 10; i++) {
						result[i] = function(num) {
							return function() {
								return num;
							};
						}(i);
					};
					return result;
				};
			});
		}); // closures and variables end

		describe("The this object", function() {
			it("is bound at runtime based on the context which a function is executed, so within an anonymous function, is not bound to the object, but window/undefined", function() {
				// no var here to make contextName global
				contextName = "The window";
				var obj = {
					contextName: "My object",
					getName: function() {
						return function() {
							return this.contextName;
						};
					}
				};
				// getName() returns an anonymous function, which returns this.contextName;
				// because getName returns a function, calling getName()() immediately calls the function that is returned, which returns a string
				// each function automatically gets two variables as soon as the function is called: this, and arguments
				// an inner function can't access these variables directly from an outer function
				// but we can allow a closure to access a different this object by storing it in another variable that the closure can have acccess to
				expect(obj.getName()()).toBe("The window");
			});
			it(" we can allow a closure to access a different this object by storing it (saving the reference) in another variable that the closure can have acccess to", function() {
				contextName = "The window";
				var obj = {
					contextName: "My object",
					getName: function() {
						var that = this; 					// that
						return function() {
							return that.contextName;   // that
						};
					}
				};
				expect(obj.getName()()).toBe("My object");
				// before defining the anonymous function, a variable named that is assigned to the this object
				// therefore when the closure is defined, the slocure has access to that, because it is in the containing function
				// even after the function has returned, that is still bound to obj, therefore when we call obj.getName()() it requires "my object"
			});
			it("A few other ways to call a method and their effect on a this object", function() {
				contextName = "The window";
				var obj = {
					contextName: "My object",
					getName: function() {
						return this.contextName;
					}
				};

				expect(   obj.getName()                   ).toBe("My object"); // calls the method the normal way, and returns "My object" because this.name is the same as object.name
				expect(   (obj.getName())                 ).toBe("My object");  // places () around objecet.getName, which is actually equivalent to without the ()
				expect(   (obj.getName = obj.getName)()   ).toBe("The window"); // it performs an assignment.  then calls the result.  the value of this assignment expression is the expression itself, (a function expression), so the this value is not maintained, and "The window" is returned
			});

		}); // this object end

	}); // Closures end
	describe("Memory leaks", function() {
//TO DO, pg 227
	});
	describe("Mimicking block scope", function() {
		it("The syntax for an anonymous function used as a block/private scope/immediately invoked function is", function() {
			(function(){
				// block code
			})();
			// this is a function declaration inside () to indicate that it's actually a function expression, and then invoked with the second set of () at the end
		});
		it("A less confusing view of the same syntax", function() {
			// A less confusing view of the same syntax: 
			var someFunction = function() {  // 1
				// block code
			};
			someFunction();	// 2

			// 1 a function expression. an anonymous function is created and assigned to the var someFunction
			// 2 invoking it.  
		});
		it("Refactoring it, a function declaration can't have () at the end of it, throwing an error", function() {
			// refactor

			// if we do this, it will throw an error because javascript sees the fuction keyword as the beginning of a function declaration, and they cannot be followed by ()
			// function() {
			// 	// block code
			// }()
		});
		it("but function expressions can be surrounded by (), therefore to turn a function declaration into an expression, we just surround it with ()", function() {
			(function() {
				// block code
			})();
		});
		it("A block/private scope/immediately invoked function can be used where variables are needed temporarily", function() {
			function outputNumbers(count) {
				(function() {
					var arr = [];
					for (var i =0; i < count; i++) {
						arr.push(i);
					};
				})();
				expect(function() {

					i;

				}).toThrow(new ReferenceError("i is not defined"));

				// outside of the block scope, the i var is no longer accessible
			};
			outputNumbers(5);
		});
		it("A normal function", function() {
			function outputNumbers(count) {
				var arr = [];
				for (var i = 0; i < count; i++) {
					arr.push(i);
				};
				var i; // redeclare var i
				expect(i).toEqual(10); // i is still available
			};
			outputNumbers(10)
		});
		describe("This pattern limits the closure memory problem, before there is no reference to the anonymous function, because it is destroyed immediately after the function has compeleted", function() {});

	});
	describe("Private variables", function() {
		describe("A privileged method is a public method that has access to private vars/functions", function() {
			it("One way to achieve this is to do so inside a constructor", function() {
				function MyObject() {
					// private vars/functions
					var privateVar = 10;
					function privateFunction() {
						return privateVar;
					};

					// privileged methods
					this.publicMethod = function() {
						privateVar++;
						return privateFunction();
					};

				};

				var instance = new MyObject();

				// trying to access privateVar throws an error, because we can't access it directly
				expect(instance.privateVar).toBe(undefined);

				// but we can use the publicMethod to access it indirectly
				expect(instance.publicMethod()).toBe(11)
			});
			it("Another example of using a constructor", function() {
				function Person(name) {
					this.getName = function() {
						return name;
					};
					this.setName = function (value) {
						name = value;
					};
				};
				
				// using the getName and setName methods, both accessible methods outside the constructor that can access a private name variable
				// since both methods are defined inside the constructor, they are closures and have access to name through the scope chain
				var person = new Person("Me");
				expect(person.getName()).toBe("Me");

				person.setName("You");
				expect(person.getName()).toBe("You");
			});
			describe("The downside is you must use the constructor pattern, which is flawed because a new method is created for every instance", function() {});
		});
	}); //private variable end
	describe("Static Private variables", function() {
		
	}); // static private variable end
	describe("The module pattern", function() {

	}); // module pttern end
	describe("The Module-Augmentation pattern", function() {

	}); //module augmentation pattern end

}); // Function Expressions end












