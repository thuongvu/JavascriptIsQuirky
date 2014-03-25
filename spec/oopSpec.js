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
	 		describe("Remember that each constructor has a prototype oject that points back to the constructor, and instances have a pointer to the prototype", function() {});
	 		describe("What if the prototype were actually an instance of another type, pointing to a different prototype, that in turns, have a pointer to another constructor", function() {});
	 		describe("If the prototype were an instance of another type, this pattern could create a chain between instances and prototypes", function() {});
	 		it("Implementing a prototype chain", function() {
	 			function SuperType() {
	 				this.property = true;
	 			};
	 			SuperType.prototype.getSuperValue = function() {
	 				return this.property;
	 			};
	 			function SubType() { 
	 				this.subproperty = false;
	 			};
	 			//inherits from SuperType by creating a new instance and assinign it to SubType.prototype
	 			// this overwrites the original prototype and replaces it with a new object
	 			// all the properties and methods that typically exist on an instance of SuperType now also eist on SubType.prototype
	 			SubType.prototype = new SuperType();

	 			expect(SubType.prototype.constructor).toBe(SuperType)
	 			 // the new prototype is an instance of SuperType and it not only gets proeprties and methods of a SuperType instance but also points to the SuperType's prototype
	 			
	 			SubType.prototype.getSubValue = function() {
	 				return this.subproperty;
	 			};
	 			var instance = new SubType();
	 			expect(instance.getSuperValue()).toBe(true); // accessing the this.property from the SuperType prototype
	 		describe("Prototype and instance relationships", function() {
	 			function SuperType() {
	 				this.property = true;
	 			};
	 			SuperType.prototype.getSuperValue = function() {
	 				return this.property;
	 			};
	 			function SubType() { 
	 				this.subproperty = false;
	 			};
	 			SubType.prototype = new SuperType();
	 			SubType.prototype.getSubValue = function() {
	 				return this.subproperty;
	 			};
	 			var instance = new SubType();

	 			it("The instanceof operator returns true whenever an instance is used with a constructor that appears in its prototype chain", function() {
	 				expect(instance instanceof Object).toBe(true);
	 				expect(instance instanceof SuperType).toBe(true);
	 				expect(instance instanceof SubType).toBe(true);
	 				// these are all true because of the prototype chain relationship
	 				// the SubType prototype points to the SuperType prototype, which has a constructor of SuperType, and a constructor of Object, therefore this is all true
	 			});

	 			it("The isPrototypeOf() method returns true for an instance in the chain", function() {
	 				expect(Object.prototyope.isPrototypeOf(instance)).toBe(true);
	 				expect(SuperType.prototyope.isPrototypeOf(instance)).toBe(true);
	 				expect(SubType.prototyope.isPrototypeOf(instance)).toBe(true);
	 				// each prototype in the chain has access to this method, which returns true for an instance in the chain
	 			});
	 			
	 		});
	 	});

	 		
	 		it("Working with Methods", function() {
	 			// a subType will need to override a sueprtype method or instroduce new methods not on the supertype
	 			// these methods mustb e added to the prototype AFTER re-assigning the prototype
	 			function SuperType() {
	 				this.property = true;
	 			};
	 			//inherit from SuperType
	 			SuperType.prototype.getSuperValue = function() {
	 				return this.property;
	 			};
	 			function SubType() { 
	 				this.subproperty = false;
	 			};
	 			SubType.prototype = new SuperType();
	 			// new method
	 			SubType.prototype.getSubValue = function() {
	 				return this.subproperty;
	 			};
	 			// override existing method
	 			SubType.prototype.getSubValue = function() { // this exists on the prototype, but this overrides the method for any SubTypes, but instances of SuperType will still call the original
	 				return false;
	 			}
	 			var instance = new SubType();
	 			expect(instance.getSubValue()).toBe(false);

	 		});
	 		it("You can't use the object literal approach to creating prototype methods with prototype chaining, because they will overwrite the chain", function() {
	 			function SuperType() {
	 				this.property = true;
	 			};
	 			SuperType.prototype.getSuperValue = function() {
	 				return this.property;
	 			};
	 			function SubType() { 
	 				this.subproperty = false;
	 			};
	 			//inherit from SuperType
	 			SubType.prototype = new SuperType();

	 			// we use the object literal here
	 			SubType.prototype = {
	 				getSubValue: function() {
	 					return this.subproperty;
	 				}
	 			};

	 			var instance = new SubType();
	 			// instance no longer has access to getSuperValue, as it had in the previous examples
	 			expect(function () {instance.getSuperValue()}).toThrow(new TypeError("Object #<Object> has no method 'getSuperValue'"));


	 		});
	 		describe("Problems with Prototype Chaining", function() {
	 			describe("Remember: prototype properties containing reference values are shared with all instances, so this is why they are shared within the constructor instead of the prototype", function() {});
	 			it("But when implementing inheritance using prototypes, the prototype becomes an instance of another type, so what was once instance properties, are now prototype properties", function() {
	 				function SuperType() {
	 					this.colors = ["red", "blue", "green"];
	 				};
	 				function SubType() {};

	 				// inherit from SuperType
	 				SubType.prototype = new SuperType();

	 				var instance = new SubType();
	 				instance.colors.push("black");

	 				var instance2 = new SubType();
	 				expect(instance2.colors).toMatch(["red", "blue", "green", "black"]);
	 				// all instances of SubType share a colors property
	 				// changes made on instance.colors are now reflected on instance2.colors, and we don't want that
	 			});
	 			describe("Also, you can't pass arguments into the supertype constructor when the subtype instance is being created", function(){});
	 		});
	 		
	 	}); //prototype chaining end
	 	describe("Constructor Stealing", function() {
	 		describe("The basic idea is to use call() or apply() from the supertype constructor within the subtype constructor, setting a new context object for properties/methods", function() {});
	 		describe("As functions are objects that execute code in a particular context, call and apply can change that context to execute a constructor in the context of a newly created object", function (){});
	 		it("Implementing constructor stealing", function() {
	 			function SuperType() {
	 				this.colors = ["red", "blue", "green"];
	 			};

	 			function SubType() {
	 				// inherit from SuperType
	 				// SuperType constructor is calledin the context of the newly created instance of SubType
	 				// we are setting the this, context object of SuperType function to SubType's this
	 				SuperType.call(this);
	 			};

	 			var instance = new SubType();
	 			instance.colors.push("black");

	 			var instance2 = new SubType();
	 			expect(instance2.colors == instance.colors).toBe(false);

	 		});
	 		it("You can pass arguments into the supertype constructor using constructor stealing, which prototype chaining does not offer", function() {
	 			// accepts a single argument name, which is assigned to a property
	 			function SuperType(name) { 
	 				this.name = name;
	 			};

	 			function SubType() {
	 				// inherit from SuperType by passing in argument, setting the name property for the SubType instance
	 				SuperType.call(this, "Thuongvu");

	 				// instance property
	 				this.age = 22;
	 			};

	 			var instance = new SubType();
	 			expect(instance.name).toBe("Thuongvu");
	 			expect(instance.age).toBe(22);
	 		});

	 		describe("The problem with constructor stealing is that methods must be defined inside the constructor, so no function reuse", function() {});
	 		describe("Methods defined on the supertype's prototype are not accessible on the subtype, so all types can use only the constructor pattern", function() {});

	 	}); // constructor stealing end
		describe("Combination Inheritance/pseudoclassical inheritance", function() {
			it("Use prototype chaining to inherit properties and methods on the prototype, and use constructor stealing to inherit instance properties", function() {
				// constructor defines two proeprties, name, and colors
				function SuperType(name) {
					this.name = name;
					this.colors = ["red", "blue", "green"];
				};

				// prototype defines a method alled sayName()
				SuperType.prototype.sayName = function() {
					return this.name;
				};

				function SubType(name, age) {
					// inherit properties 
					SuperType.call(this, name);
					this.age = age;
				};

				// inherit methods
				SubType.prototype = new SuperType();

				SubType.prototype.sayAge = function() {
					return this.age;
				};

				var instance = new SubType("Thuongvu", 22);
				instance.colors.push("black");
				expect(instance.sayName()).toBe("Thuongvu");
				expect(instance.sayAge()).toEqual(22);
				expect(instance.colors).toMatch(["red", "blue", "green", "black"]);

				var instance2 = new SubType("Esta", 23);
				expect(instance2.sayName()).toBe("Esta");
				expect(instance2.sayAge()).toEqual(23);
				expect(instance2.colors).toMatch(["red", "blue", "green"]);
			});

		}); //combination inheritance end
	 	describe("Prototypal Inheritance", function() {
	 		function object(o) {
	 			function F() {}; // 1
	 			F.prototype = o; // 2
	 			return new F();
	 		};
	 		// 1. creates a temporary constructor
	 		// 2. assigns a given object as the temporary constructor's prototype
	 		// 3. returns a new instance of the temporary type

	 		it("does not involve using strictly dfined constructors.", function() {});
	 		it("Prototypes allow you to create new objects based on existing objects without the need for defining new types", function() {
	 			var person = {
	 				name: "Ivan",
	 				friends: ["Johnny", "Katherine", "Laurence"]
	 			};

	 			var anotherPerson = object(person);
	 			anotherPerson.name = "Monae";
	 			anotherPerson.friends.push("Noelle");

	 			var yetAnotherPerson = object(person);
	 			yetAnotherPerson.name = "Octavius";
	 			yetAnotherPerson.friends.push("Polonius");

	 			// anotherPerson has person as its prototype, meaning it has bogth a primitive value property, and a reference value property on its prototype
	 			expect(person.isPrototypeOf(anotherPerson)).toBe(true);
	 			expect(anotherPerson.name).toBe("Monae");

	 			// person.friends is shared not only by person but with anotherPerson and yetAnotherPErson
	 			expect(person.friends).toMatch([["Johnny", "Katherine", "Laurence", "Noelle", "Polonius"]]);

	 		});
	 		describe("Reason to use this: you have an objet you want to use as a base for another object, so it should be passed into object() amd results in the object being modified accordingly", function() {});
	 		it("The Object.create() method accepts two arguments, an object to use as the prototype for a new object, and an optional argument defining additional properties to apply to the new object", function() {
	 			// when used with one argument, Object.create() behaves the same as the object() method above

	 			var person = {
	 				name: "Ivan",
	 				friends: ["Johnny", "Katherine", "Laurence"]
	 			};

	 			var anotherPerson = Object.create(person); // using Object.create()
	 			 anotherPerson.name = "Monae";
	 			 anotherPerson.friends.push("Noelle");

 				var yetAnotherPerson = Object.create(person); // using Object.create()
 				yetAnotherPerson.name = "Octavius";
 				yetAnotherPerson.friends.push("Polonius");

 				expect(person.isPrototypeOf(anotherPerson)).toBe(true);
 				expect(anotherPerson.name).toBe("Monae");
 				expect(person.friends).toMatch([["Johnny", "Katherine", "Laurence", "Noelle", "Polonius"]]);

	 		});
	 		it("The second argument for Object.create() is in the same format as the second argument for Object.defineProperties(), each property to defined is specified along with a descriptor", function() {
	 			// And any properties specified in this manner will shadow properties of the same name on the prototoype object
	 			var person = {
	 				name: "Ivan",
	 				friends: ["Johnny", "Katherine", "Laurence"]
	 			};

	 			var anotherPerson = Object.create(person, { // descriptor object here
	 				name: {
	 					value: "Monae"
	 				}
	 			});
	 			expect(anotherPerson.name).toBe("Monae");

	 		});

	 	});
	 	describe("Parasitic Inheritance", function() {
	 		describe("The idea is to create a function that does the inheritance, augments the object, and then returns the object", function() {});
	 		it("Implementing it looks like", function() {
	 			function object(o) {
	 				function F() {};
	 				F.prototype = o;
	 				return new F();
	 			};

	 			// 1 createAnother accepts a single argument, an object to base a new object on
	 			// 2 original is passed into the object function, and result = clone
	 			// 3 clone is changed to have a new method called sayHi()
	 			// 4 object is returned
	 			function createAnother(original) {  // 1
	 				var clone = object(original);    // 2 
	 				clone.sayHi = function() {			// 3
	 					return "hello world";
	 				};
	 				return clone;							// 4
	 			};

	 			var person = {
	 				name: "Ivan",
	 				friends: ["Johnny", "Katherine", "Laurence"]
	 			};

	 			var anotherPerson = createAnother(person);
	 			expect(anotherPerson.sayHi()).toBe("hello world");
	 		});
	 		it("It still has the same inefficiencies of the constructor pattern, relating to function reuse")
	 	});

	 	describe("Parasitic Combination Inheritance", function() {
	 		describe("Combination inheritance is the most used inheritance pattern in JS, but it is inefficient", function() {});
	 		describe("It calls the supertype constructor twice: once to create the subtype's prototype, and once inside the subtype constructor", function(){});
	 		it("This results in the subtype prototype ending up with instance properties of the supertype object, but to have them overwritten/shadowed when the subtype constructor executes", function() {
	 			function SuperType(name) {
	 				this.name = name;
	 				this.colors = ["red", "blue", "green"];
	 			};

	 			SuperType.prototype.sayName = function() {
	 				return this.name;
	 			};

	 			// when this is executed, the SuperType constructor is called again, which creates instance properties name and colors that masks the properties on the prototype
	 			function SubType(name, age) { 		  // second call to SuperType 
	 				SuperType.call(this, name);
	 			};

	 			// when this is executed, subType.prototype ends up with two properties: name and colors.  they are instance properties of superType, but they are now on the SubType's prototype
	 			SubType.prototype = new SuperType();  // first call to SuperType
	 			SubType.prototype.constructor = SubType;
	 			SubType.prototype.sayAge = function() {
	 				return this.age;
	 			};

	 			var instance = new SubType("Thuongvu", 22);
	 			// properties on the instance
	 			expect(instance.name).toBe("Thuongvu");
	 			expect(instance.colors).toMatch([ 'red', 'blue', 'green' ]);

	 			// properties on the prototype, but they aren't needed there
	 			var propertiesOnSubType = [];
	 			for (var properties in SubType.prototype) {
	 				propertiesOnSubType.push(properties);
	 			}
	 			expect(propertiesOnSubType).toMatch(['name', 'colors', 'constructor', 'sayAge', 'sayName'])
	 			expect(SubType.prototype.colors).toMatch([ 'red', 'blue', 'green' ])


	 		});
	 		describe("Parasitic combination inheritance: instead of calling the supertype's constructor to assign the subtype's prototype, just copy the supertype's prototype", function() {});
	 		describe("Use it to inherit from the supertype's prototype and then assign the result to the subtype's prototype", function() {});
	 		it("The implementation for this is", function() {
	 			function object(o) {
	 				function F() {};
	 				F.prototype = o;
	 				return new F();
	 			};

 				// 0 two arguments, subtype constructor, and sueprtype constructor
	 			// 1 create object. prototype of the newly created objecct will be superType.prototype. this clones the supertype's prototype
	 			// 2 augment object. the constructor property is assigned onto prototype, the newly created object, to account for losing the default constructor peroperty when the prototype is overwritten
	 			// 3  assign object.  it's ready!  the subtype's prototype is assigned to newly created object.
	 			function inheritPrototype(subType, superType) {	 // 0
	 				var prototype = object(superType.prototype);  // 1 
	 				prototype.constructor = subType; 				 // 2
	 				subType.prototype = prototype;					 // 3
	 			};
	 			// this will replace the subtype prototype assignment

	 			function SuperType(name) {
	 				this.name = name;
	 				this.colors = ["red", "blue", "green"];
	 			};

	 			SuperType.prototype.sayName = function() {
	 				return this.name;
	 			};

	 			// when this is executed, the SuperType constructor is called again, which creates instance properties name and colors that masks the properties on the prototype
	 			function SubType(name, age) { 		  // call to SuperType 
	 				SuperType.call(this, name);
	 			};

	 			// SubType.prototype = new SuperType(); // We can get rid of this first call
	 			inheritPrototype(SubType, SuperType); // by using this instead, to replace the subtype prototype assignment
	 			SubType.prototype.constructor = SubType;
	 			SubType.prototype.sayAge = function() {
	 				return this.age;
	 			};

	 			var instance = new SubType("Thuongvu", 22);
	 			
	 			// properties on the instance
	 			expect(instance.name).toBe("Thuongvu");
	 			expect(instance.colors).toMatch([ 'red', 'blue', 'green' ]);

	 			// properties on the prototype are no longer redundant, as combination inheritance
	 			var propertiesOnSubType = [];
	 			for (var properties in SubType.prototype) {
	 				propertiesOnSubType.push(properties);
	 			}
	 			expect(propertiesOnSubType).not.toMatch(['name', 'colors', 'constructor', 'sayAge', 'sayName']);
	 			expect(propertiesOnSubType).toMatch(['constructor', 'sayAge', 'sayName'])
	 			expect(SubType.prototype.colors).not.toMatch([ 'red', 'blue', 'green' ])
	 		});
	 	});

	 }); //inheritance end
}); // oop end


















