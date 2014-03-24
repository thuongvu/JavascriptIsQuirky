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
			function Animal() {};

			Animal.prototype.species = "Rhino";
			Animal.prototype.legs = 4;
			Animal.prototype.saySpecies = function() {
				return this.species;
			};
			var rhino1 = new Animal();
			var rhino2 = new Animal();
			rhino2.species = "Blue Rhino";


			it("The in operator returns true as long as the property is accessible by the object, whether on the prototype or instance", function() {
				expect("species" in rhino1).toBe(true);
				expect("species" in rhino2).toBe(true);
			});
			it("A prototype property can be determined if the in operator returns true, but hasOwnProperty returns false", function() {
				function hasPrototypeProperty(object, property) {
					return !object.asOwnProperty(property) && (property in object);
					// if the object DOESN'T have the property as an instance property, but the property is accesible to the object, it must be a prototype property
				expect(hasPrototypeProperty(rhino1, "species")).toBe(true);
				expect(hasPrototypeProperty(rhino2, "species")).toBe(false);
				};
			});
			it("To retrieve a list of all enumerable instance properties on an object, use the Object.keys() method", function() {
				// it accepts an object as its argument and returns an array of strings containing names of all enumerable properties... in this case, directly on a prototype
				var keysOfAnimalPrototype = Object.keys(Animal.prototype);
				expect(keysOfAnimalPrototype).toMatch(["species", "legs", "saySpecies"]);
			});

			it("You can also use the Object.keys() method to retrieve enumerable properties on an instance", function() {
				var keysOfRhino2Prototype = Object.keys(rhino2);
				expect(keysOfRhino2Prototype).toMatch(["species"]);
				// it is different than a for/in because it only returns an array of elements of enumerable properties found directly on the object
			});

			it("A for/in will return a list of enumerable proeprties, both on instance, and on the prototype, only requirement being enumerable ", function() {
				var propertiesInRhino2 = [];
				for (var property in rhino2) {
					propertiesInRhino2.push(property);
				};
				expect(propertiesInRhino2).toMatch(["species", "legs", "saySpecies"]);
			});

			it("To retrieve a list of all instance properties, whether enumerable or not, use Object.getOwnProperties()", function() {
				var keysOfAnimalPrototype = Object.getOwnPropertyNames(Animal.prototype);
				expect(keysOfAnimalPrototype).toMatch(["constructor", "species", "legs", "saySpecies"]); // note that we get back the non-enumerable "constructor"

				var keysOfRhino2 = Object.getOwnPropertyNames(rhino2);
				expect(keysOfRhino2).toMatch(["species"]);
			});

		});
		describe("Alternate Prototype Syntax", function() {
			it("One can overwrite the prototype with an object literal that contains properties and methods instead of each method one by one", function() {
				function Animal() {};
				Animal.prototype = {
					species: "Rhino",
					legs: 4,
					saySpecies: function() {
						return this.species;
					}
				};
				
				var rhino1 = new Animal();
				expect(rhino1.species).toBe("Rhino");
			});
			it("By doing so, the constructor property over the prototype is overwritten, pointing to a different, new object", function() {
				function Animal() {};
				Animal.prototype = {
					species: "Rhino",
					legs: 4,
					saySpecies: function() {
						return this.species;
					}
				};
				
				var rhino1 = new Animal();
				// the instanceof operator still works reliably.
				expect(rhino1 instanceof Object).toBe(true);
				expect(rhino1 instanceof Animal).toBe(true);

				// but the constructor doesn't indicate the type of object
				// we overwrote the prototype's constructor, which points back to the function on which it is a property
				expect(rhino1.constructor == Object).toBe(true);
				expect(rhino1.constructor == Animal).toBe(false);

			});
			it("We can set the constructor's value within the object literal, but this causes the constructor to be enumerable, not normal", function() {
				function Animal() {};
				Animal.prototype = {
					constructor: Animal,
					species: "Rhino",
					legs: 4,
					saySpecies: function() {
						return this.species;
					}
				};
				
				var rhino1 = new Animal();

				expect(Animal.prototype.propertyIsEnumerable('constructor')).toBe(true);
			});
			it("We can use Object.defineProperty, passing in the prototype, and the constructor property, and set enumerable to false", function() {
				function Animal() {};
				Animal.prototype = {
					species: "Rhino",
					legs: 4,
					saySpecies: function() {
						return this.species;
					}
				};

				Object.defineProperty(Animal.prototype, "constructor", {
					enumerable: false,
					value: Animal
				});
				
				var rhino1 = new Animal();

				expect(Animal.prototype.propertyIsEnumerable('constructor')).toBe(false);
			});

		});
		describe("Dynamic nature of protoypes", function() {
			it("Changes made to the prototype are immediately reflected on instances, even if the instance eisted before the change was made", function() {
				// The instance is first searched for the property, and when it's not found on the instance, it goes up the chain to the prototype. 
				// Since the link between the instance and prototype is a pointer, not a copy, the search finds the proeprty on the prototype and returns the function stored there
				function Animal() {};

				Animal.prototype.species = "Rhino";
				Animal.prototype.saySpecies = function() {
					return this.species;
				};

				var rhino = new Animal();
				
				var prototypeOfRhino = rhino.__proto__;
				expect(prototypeOfRhino.species).toBe("Rhino");
				expect(rhino.species).toBe("Rhino");

			});

			it("But if you overwrite the entire prototype, you sever the tie between constructor and original prototype", function() {
				function Animal() {};

				var rhino = new Animal();

				// we overwrote the prototype
				Animal.prototype = {
					species: "Rhino",
					legs: 4,
					saySpecies: function() {
						return this.species;
					}
				};

				// rhino's prototype points to the old prototype, with no properties on it
				var prototypeOfRhino = rhino.__proto__;
				expect(prototypeOfRhino.species).toBe(undefined);
				expect(rhino.species).toBe(undefined);

				// make a new instance of Animal(); and points to the new prototype
				var rhino2 = new Animal();
				var prototypeOfRhino2 = rhino2.__proto__;
				expect(prototypeOfRhino2.species).toBe("Rhino");
				expect(rhino2.species).toBe("Rhino");

			});

		});
		
		describe("Native object properties", function() {
			it("You can access methods of native reference types like Array or String by prototype");
			it("You can also change them, but it creates name collision sif a method that didnt exist natively in one browser is implemented natively in another, or accidentally overwrite native methods");
		});

		describe("Problems with prototypes", function() {
			it("You can't pass initialization arguments into the constructor, meaning all instances get the same property");
			it("Properties that contain reference values are problematic", function() {
				function Animal() {};

				Animal.prototype = {
					species: "Rhino",
					legs: 4,
					saySpecies: function() {
						return this.species;
					},
					habitats: ["Africa", "Asia"]
				};
				var rhino = new Animal();
				var rhino2 = new Animal();

				rhino.habitats.push("Middle East");

				//because habitats array exists on Animal.prototype and not on the the rhino instance, these changes point to the same array of rhino2
				expect(rhino.habitats).toMatch(["Africa", "Asia", "Middle East"]);
				expect(rhino2.habitats).toMatch(["Africa", "Asia", "Middle East"]);

			});
		});
	}); // prototype pattern end
	 describe("Combination Constructor/Prototype Pattern", function() {
		it("constructor defines instance properties, whereas prototype pattern defines methods", function() {
			function Animal(species, legs) {
				this.habitats = ["Africa", "Asia"];
				this.species = species;
				this.legs = legs;
			};

			Animal.prototype = {
				constructor: Animal,
				
				saySpecies: function() {
					return this.species;
				},
				
			};
			var rhino = new Animal();
			var rhino2 = new Animal();

			rhino.habitats.push("Middle East");
			expect(rhino.habitats).toMatch(["Africa", "Asia", "Middle East"]);
			expect(rhino2.habitats).toMatch(["Africa", "Asia"]);
		})
	
	 });

	 describe("Dynamic Prototype Pattern/// SKIP", function() {

	 });

	 describe("Parasitic Constructor Pattern", function() {
	 	it("creates a constructor that wraps the creation and return of another object, while looking like a typical constructor", function() {
	 		function Animal(species, legs) {
	 			var o = new Object();
	 			o.species = species;
	 			o.legs = legs;
	 			o.saySpecies = function() {
	 				return this.species;
	 			};
	 			return o;
	 		};

	 		var buffalo = new Animal("buffalo", 4);
	 		expect(buffalo.saySpecies()).toBe("buffalo");
	 	});
	 	it("is used to create constructors for objects that may not be possible otherwise", function() {
	 		// for example, usually we can't get direct access to the Array constructor
	 		// but we want to create a special array that has an extra method
	 		function SpecialArray() {
	 			// create array;
	 			var values = new Array();

	 			// add values
	 			// we're borrowing the push method, from Array, but since values is an instance of array, we only need to explicitly set the context to values
	 			// a new array is created an initialized using the push() method, which has all the constructor arguments passed to it
	 			// we are pushing everything from the arguments with apply, which takes a context object, and an array
	 			values.push.apply(values, arguments);


	 			// i just tried for (var i = 0; i < array.length; i++) { values.push(arguments[i])}
	 			// but using an apply makes much more sense when its with the arguments object

	 			// assign method
	 			values.toPipedString = function() {
	 				return this.join("|");
	 			};

	 			// return it
	 			return values;
	 		};
	 		var colors = new SpecialArray("red", "blue", "green");
	 		expect(colors.toPipedString()).toMatch("red|blue|green");
	 	});
		it("But there is no relationship between the returned object and constructor/constructor's prototype");
		it("Therefore there are problems of object identification - it's as if the object was created outside of a constructor");


	 });

	 describe("Durable Constructor Pattern // SKIP", function() {

	 });

	 describe("Inheritance", function() {
	 	describe("Prototype Chaining", function() {
	 		it("Default prototypes", function() {

	 		});
	 		it("Prototype and instance relationships", function() {

	 		});
	 		it("Working with Methods", function() {

	 		});
	 		it("Problems with Prototype Chaining", function() {

	 		});
	 		
	 	}); //prototype chainign end
	 	describe("Constructor Stealing", function() {

	 	}); // constructor stealing end
	 	describe("Prototypal Inheritance", function() {

	 	});
	 	describe("Parasitic Inheritance", function() {

	 	});
	 	describe("Parasitic Combination Inheritance", function() {

	 	});

	 }); //inheritance end
}); // oop end


















