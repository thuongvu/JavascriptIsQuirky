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
		describe("Variable Declaration", function() {

		}); // Variable Declaration end
		describe("Identifier Lookup", function() {

		}); // Identifier Lookup end
	}); // Execution context and scope end
	describe("Garbage Collection", function() {
		describe("Mark and sweep", function() {

		});
		describe("Reference Counting", function() {

		});
	}); // Garbage Collection end
}); // Variables, Scope, Memory end