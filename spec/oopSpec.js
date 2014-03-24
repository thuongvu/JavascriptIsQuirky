describe("OOP", function() {
	describe("Factory Pattern", function() {
		it("writes a function that accepts arguments which to build an object, and return it", function(){
			function animalFactory(species, legs) {
				var o = new Object;
				o.species = species;
				o.legs = legs;
				o.saySpecies = function() {
					return this.species;
				};
				return o;
			};

			var giraffe = animalFactory("giraffe", 4);
			var bird = animalFactory("bird", 2);

			expect(giraffe.legs).toEqual(4);
			expect(bird.legs).toEqual(2);

		});
		it("'s weakness is object identification, (what type of object an object is)", function() {
//TO DO
		});
	}); // factory pattern end
	describe("Constructor Pattern", function() {
		function AnimalConstructor(species, legs) {
			this.species = species;
			this.legs = legs;
			this.saySpecies = function() {
				return this.species;
			};
		};

		var dog = new AnimalConstructor("dog", 4);  // 1

		describe("Constructors as functions", function() {

			it("Constructors can be used to create specific types of objects", function() {
				
				expect(dog.constructor).toBe(AnimalConstructor); // 2
				expect(dog.legs).toEqual(4); //3
				expect(dog.species).toMatch("dog");

				// 1. Create new object
				// 2. Assign this value of constructor to the new object, so that this points to the new object
				// 3. Add properties to the new object
				// 4. Return the new object
			});
			it("The instanceof operator can identify that instances of a particular type (what type of object an object it)", function() {
				expect(dog instanceof Object).toBe(true);
				expect(dog instanceof AnimalConstructor).toBe(true);
				expect(function() {dog instanceof PersonConstructor}).toThrow(new ReferenceError("PersonConstructor is not defined"));
			});
			it("Differences: No object is being created explicitly");
			it("Differences: Properties and methods are assigned directly to the 'this' object.");
			it("Differences: There is no return statement.");

			it("You can use a constructor as a constructor", function() {
				// The only difference between constructor functions and regular ones is that you call it with new
				var cat = new AnimalConstructor("cat", 4);

				expect(cat.saySpecies()).toBe("cat");
			});

			it("You can use a constructor as a function", function() {
				AnimalConstructor("snail", 0); // adds to the window object

				expect(window.saySpecies()).toBe("snail");
			});

			it("You can call the function in the scope of another object", function() {
				var lion = new AnimalConstructor();
				AnimalConstructor.call(lion, "lion", 4);

				expect(lion.saySpecies()).toBe("lion");
			});

		});
		describe("Problems with constructors", function() {
			it("Each method is defined, a new object is being instantiated, once for each instance, and this is inefficient", function() {
				var zebra = new AnimalConstructor("zebra", 4);
				var monkey = new AnimalConstructor("monkey", 2);

				// functions of te same name on different instances are not equivalent
				expect(zebra.saySpecies == monkey.saySpecies).toBe(false);
			});

			it("A solution to that problem is function sharing", function() {
				function Flower(name, color) {
					this.name = name;
					this.clor = color;
					this.sayName = sayName;
				};
				function sayName() {
					return this.name;
				};

				// instantiate new objects
				var sunflower = new Flower("sunflower", "yellow");
				var tulip = new Flower("tulip", "white");

				// invoking the shared method, sayName
				expect(sunflower.sayName()).toBe("sunflower");
				expect(tulip.sayName()).toBe("tulip");

				// these two objects share the sayName function that is defiend on the global scope
				expect(sunflower.sayName == tulip.sayName).toBe(true);
			});

			it("The problem of function sharing with the constructor pattern is that we pollute the global scope, and we no longer encapsulates everything to one object");

		});

	}); //constructor pattern end

	describe("prototype pattern", function() {
		describe("How prototypes Work", function() {

		});
		describe("Prototypes and the in operator", function() {

		});
		describe("Dynamic nature of protoypes", function() {

		});
		describe("Problems with prototypes", function() {

		});
	}); // prototype pattern end
 
}); // oop end