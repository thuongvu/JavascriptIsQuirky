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
		describe("are functions that have access to  variables from another function's scope", function() {});
		describe("When a function is called, an execution context is created, and its scope chain created", function() {});
		describe("The activation object for the function is initialized with values for arguments and any named arguments", function() {});
		describe("Then the outer function's activation object is the second object in the scope chain, and this continues until the scope chain reaches the global execution context", function() {});
		it("For example", function() {
			function compare(num1, num2) {
				if (num1 < num2) {
					return -1;
				} else if (num1 > num2) {
					return 1;
				} else {
					return 0;
				};
			};
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
		it("An anonymous function's scope chain contains a reference to the activation object for the outer function", function() {
			var compare = createComparisonFunction("name");
			var result = compare({name:"Quincy"}, {name: "Ruth"});
		});
	}); // Closures end

}); // Function Expressions end
