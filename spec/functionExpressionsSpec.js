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
}); // Function Expressions end