describe("Variables, Scope, Memory", function() {
	describe("Passing arguments", function() {
		it("Arguments are passed by value", function() {
			function addTen(num) {
				num += 10;
				return num;
			};
			var count = 20;
			var result = addTen(count); 
			// the variable count is copied into the argument "num" for use inside the function
			// the argument num and and variable count don't recognize each other, they just happen to have the same value

			// therefore if num had been passed by reference, the value of count would have chaneged to 30 to reflect the change made inside the function
			expect(count).toBe(20);
			expect(result).toBe(30);
		});
		it("Arguments are passed by value, even when using objects", function() {
			function setAnimal (obj) {
				obj.species = "giraffe"; // 3, 4
			};
			var animal = new Object(); //1 
			setAnimal(animal); //2
			expect(animal.species).toBe("giraffe");

			
			// 1. create an object and then 
			// 2. pass it into the setAnimal() method, 
			// 3. where it is copied into obj
			// 4. obj and person both point tothe same object. obj is accessing an object by reference, even though it was passed into the function by value
				// when the species property is set on obj inside the function, this change is reflected outside the function, because that object rexists globally on the heap

			// from looking at this, it appears that the object was passed by reference, but it is not

		});
		it("To prove that arguments are passed only by value", function() {
			function setAnimal(obj) {
				obj.species = "giraffe"; // 1
				obj = new Object(); // 2
				obj.species = "unicorn"; // 3
			};

			var animal = new Object();
			setAnimal(animal);
			expect(animal.species).not.toBe("unicorn"); // 4
			expect(animal.species).toBe("giraffe");

			// 1 when animal is passed into setAnimal() its species property is set to giraffe
			// 2 then the variable obj is redefined, set to a mew object
			// 3 then species property on obj is set to "unicorn"
			// 4 if the animal was passed as reference, it would be changed to point to the object whose species is unicorn
			// however, the original reference remained intact even though the argument's value changed inside the function
			// obj is overwritten in the function, and that becomes a pointer to a local object, but then it becomes destroyed as soon as the function finishes executing
		});
	}); // Passing arguments end
	describe("In JS, think of function arguments as local variables.", function() {});
	describe("Execution context and scope", function() {
		describe("Each execution context has a variable object unpon which all of its defined variables and functions exist.  it is not accessible to a developer", function() {});
		describe("When a function runs, it creates an execution context, which has variables and functions on it for it to execute, and this context is pushed onto the top of of a context stack", function() {});
		describe("When it has finished executing, the stack is popped, returning control to the previous executing context", function() {});
		describe("When a function is executed, a scope chain of variable objects are created, to provide ordered access to all  variables and functions that an execution contet has access to", function() {});
		describe("The front of the scope chain is the variable object of the context whose code is executing", function() {});
		describe("If the context is a function, then the activation object is used as the variable object", function() {});
		describe("An activation object starts with a single defined variable called arguments, and then the next variable object in the chain is from the containing context, and so on, until the global object is reached", function() {});
//TO DO EXAMPLES PAGE 91-22
		describe("Variable Declaration", function() {
			describe("When a variable is declared using var, it is automatically added to te most immediate context available", function() {});
			it("If a variable is initialized without first being declared, it gets added to the global context automatically", function() {
				function add(num1, num2) {
					var sum = num1 + num2;
					return sum;
				};
				var result = add(10,20);
				expect(result).toEqual(30);
				expect(function() {sum}).toThrow(new ReferenceError("sum is not defined"));
				// this causes an error because sum is not accessible outside the function

				// in this one, sumGlobal does not have a var keyword, so it is initialized to a value without ever being declared
				// therefore it is created in the global context
				function addGlobal(num1, num2) {
					sumGlobal = num1 + num2;
					return sumGlobal;
				}
				var resultGlobal = addGlobal(10,20);
				expect(sumGlobal).toEqual(30);
				expect(resultGlobal).toEqual(30);
			});
		}); // Variable Declaration end
		describe("Identifier Lookup", function() {
// TODO pg 95-96
		}); // Identifier Lookup end
	}); // Execution context and scope end
	describe("Garbage Collection", function() {
		describe("Mark and sweep", function() {
			describe("When a variable comes into context, (any way, including being declared in a function) it is flagged as being in context, and vice versa when it goes out", function() {});
			describe("When the garbage collector runs, it marks all variables in memory.  Then clears marks off those in context and those referenced by in-context variables, then it sweeps away any that are still marked", function() {});
		});
		describe("Reference Counting", function() {
			describe("Less commonly used", function() {});
			describe("Every value keeps track of how many references are made to it, eg, variable declared and reference value declared, count = 1", function() {});
			describe("Every time a var with a reference is overwritten with another var, reference count --", function() {});
			describe("If no references left, garbage collector clears it", function() {});
			describe("Problem: Circular references, wherein two objects reference each other through properties, and in mark&sweep they would be deleted after these objects go out of scope, but in this system, their reference counts cannot be 0, and never get deleted", function() {});
		});
		describe("Managing Memory", function() {
			describe("De-referencing: When data is no longer necessary, it's best to set the value to null to free up the reference", function() {});
			describe("Local variables do this automatically when they go out of context", function() {});
		});
	}); // Garbage Collection end
}); // Variables, Scope, Memory end