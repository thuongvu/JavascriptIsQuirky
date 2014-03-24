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
		describe("How prototypes work", function() {
			it("each function is created with a prototype property, which is an object containing properties and methods available for each particular reference type");
			it("Benefit: all properties and methods are shared among object instances on the prototype");
			
			function Animal() {};

			Animal.prototype.species = "Rhino";
			Animal.prototype.legs = 4;
			Animal.prototype.saySpecies = function() {
				return this.species;
			};
			var rhino1 = new Animal();
			var rhino2 = new Animal();
			it("Instead of assigning object information in the constructor, they can be assigned directly to the prototype", function (){
				
				
				expect(rhino1.saySpecies()).toBe("Rhino");
				expect(rhino2.saySpecies()).toBe("Rhino");

				expect(rhino1.saySpecies == rhino2.saySpecies).toBe(true);

				
			});

			it("Prototypes automatically get a property called constructor that points back to the function on which it is a property", function() {
				expect(Animal.prototype.constructor).toBe(Animal);
			});

			it("Each time a constructor is called to create a new instance, the instance has an internal pointer to the constructor's prototype, __proto__", function() {
				// var rhino1 = new Animal();
				expect(rhino1.__proto__).toBe(Animal.prototype);
			});
			it("There is a direct link between instance the constructor's PROTOTYPE, but not between the instance and constructor");
			it("The isPrototypeOf() method returns true if the [[Prototype]] points to the prototype on which the method is being called", function() {
				expect(Animal.prototype.isPrototypeOf(rhino1)).toBe(true);
			});
			it("The Object.getPrototypeOf() method returns the value of [[Prototype]]", function() {
				expect(Object.getPrototypeOf(rhino1)).toBe(Animal.prototype);
			});

			it("Using Object.getPrototypeOf() allows you to retrieve an object's prototype as well as any properties and methods on that prototype", function() {
				expect(Object.getPrototypeOf(rhino1).species).toBe("Rhino");
			});

			it("If you add a property to the instance that has the same name as the property on the prototype, it will return the one on the instance, due to lookups", function() {
				expect(rhino1.species).toMatch("Rhino");
				expect(rhino1.hasOwnProperty("species")).toBe(false); // rhino1 does not have its own property

				// changing the property on the local instance
				rhino1.species = "Black Rhino";
				expect(rhino1.species).toMatch("Black Rhino"); // from instance
				expect(rhino1.hasOwnProperty("species")).toBe(true); // now rhino1. has its own species property on the instance

				// changing the species property on the instance does not affect it on the prototype
				expect(Animal.prototype.species).toMatch("Rhino");
			});
			it("You have to delete the property that was set on the instance in order to restore te link to the prototype's property of the same name", function() {
				rhino1.species = "Black Rhino";
				expect(rhino1.hasOwnProperty("species")).toBe(true);

				delete rhino1.species;
				expect(rhino1.hasOwnProperty("species")).toBe(false);
				expect(rhino1.species).toBe("Rhino");
			});
		});
		describe("Prototypes and the in operator", function() {

		});
		describe("Dynamic nature of protoypes", function() {

		});
		describe("Problems with prototypes", function() {

		});
	}); // prototype pattern end
 
}); // oop end


















