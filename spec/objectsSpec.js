describe("Objects", function() {
	describe("Type of Properties", function() {
		describe("Data properties", function() {
			describe("have four attributes:", function() {
				it("[[Configurable]] indicates if the property by be redefined by deleting, changing the prop's attributes, or changing prop into accessor property, defaut is true");
				it("[[Enumerable]] indicates if the property will be returned in a for-in loop, default is true");
				it("[[Writable]] indicates if the propety's value can be changed, default is true");
				it("[[Value]] contains the  value for the property, default is undefined");
			});
			describe("contain a single location for data value, read and written to.", function() {
				var person = {
					name: "me"
				};
				// creating property called name on person object, with a value of "me"
				// [[Value]] is set to "me"
			});
			describe("One can change default peroperty attributes using the Object.defineProperty() method", function() {
				it("Setting [[Writable]] to false means the property's value can't change", function() {
					var hero = {};
					expect(hero.identity).toBe(undefined);
					// Object.defineProperty() method accepts 3 arguments: 
						// 1. object on which property to add or modify
						// 2. property
						// 3. descriptor object
					Object.defineProperty(hero, "identity", { writable: false, value: "Clark Kent"});
					expect(hero.identity).toBe("Clark Kent");

					// the value of the identity property cannot be changed because the writable attribute is false
					hero.identity = "Bruce Wayne";

					expect(hero.identity).toBe("Clark Kent");
				});

				it("Setting [[Configurable]] to false does not allow property to be deleted, or changing property's attributes, or changing property into accessor", function() {
					var voldemort = {};
					Object.defineProperty(voldemort, "identity", {configurable: false, value: "Tom Riddle"});
					expect(voldemort.identity).toMatch("Tom Riddle");

					// try to redefine property, expect it to throw an error
					expect(function() {
						Object.defineProperty(voldemort, "identity", {configurable: true, value: "Tom Riddle"});
					}).toThrow(new TypeError("Cannot redefine property: identity"));


					// then try to delete property, identity, but it still remains
					delete voldemort.identity;
					expect(voldemort.identity).toMatch("Tom Riddle");

					// try to redefine property value
					voldemort.identity = "Harry Potter";
					expect(voldemort.identity).toMatch("Tom Riddle");

				});
				it("when you use Object.defineProperty() the values for configurable, enumerable, and writable then default to false automatically, unles you state otherwise");
			});
		}); // data properties end

		describe("Accessor properties", function() {
			describe("have 4 attributes:", function() {
				it("[[Configurable]] indicates if the proeprty may be deleted, property's attributes may be changed, or changing the property into a data property");
				it("[[Enumerable]] indicates if the property will be returned in a for-in loop");
				it("[[Get]] is the function to call when the property is read from, default undefined");
				it("[[Set]] is the function to call when the property is writen to, default undefined");
			}); 

			it("You must define an accessor property explicitly using Object.defineProperty()", function() {
				// declaring book with _year property, which indicates that property is not intended to be accessed outside of the object's methods
				var book = {
					_year: 2004,
					edition: 1
					// year property defined below as an accessor
				};
				expect(book.edition).toEqual(1); 

				Object.defineProperty(book, "year", {
					get: function() {
						return this._year;
					},
					set: function(newValue) {
						if (newValue > 2004) {
							this._year = newValue;
							this.edition += newValue - 2004;
						};
					}
				});

				// let's use the setter property on year, not to be confused with _year
				book.year = 2005;
				expect(book.year).toEqual(2005);
				expect(book.edition).toEqual(2); // 2 instead of 1 now

				// a typical use case for accessor properties = when setting a property value, it results in other changes
				
			});

			it("You can define multiple properties using Object.defineProperties()", function() {
				var newBook = {};

				Object.defineProperties(newBook, {
					_year: { 
						configurable: true,
						writable: true,
						enumerable: true,
						value: 2004
					},
					edition: {
						configurable: true,
						writable: true,
						enumerable: true,
						value: 1
					},

					year: {
						get: function() {
							return this._year;
						},
						set: function(newValue) {
							if (newValue > 2004) {
								this._year = newValue;
								this.edition += newValue - 2004;
							};
						}
					}
				});

				expect(newBook.year).toEqual(2004);
				expect(newBook.edition).toEqual(1);
				newBook.year = 2014;
				expect(newBook.year).toEqual(2014);
				expect(newBook.edition).toEqual(11);


				
				
				// console.log(newBook.year)
// TODO - i don't know why get setter method isnt working
			});

			it("You can read property attributes using Object.getOwnPropertyDiscriptor()", function() {
				// this method accepts two arguments: 
					// 1. the object on which the property resides
					// 2. name of the property whose descriptor should be retried
				var newBook = {};

				Object.defineProperties(newBook, {
					_year: { 
						configurable: true,
						writable: true,
						value: 2004
					},
					edition: {
						configurable: true,
						writable: true,
						value: 1
					},

					year: {
						get: function() {
							return this._year;
						},
						set: function(newValue) {
							if (newValue > 2004) {
								this._year = newValue;
								this.edition += newValue - 2004;
							};
						}
					}
				});

				var _yearDescriptor = Object.getOwnPropertyDescriptor(newBook, "_year");
				expect(_yearDescriptor.configurable).toBe(true);
				expect(_yearDescriptor.enumerable).toBe(false);
				expect(_yearDescriptor.writable).toBe(true);
				expect(_yearDescriptor.value).toBe(2004);


				var yearDescriptor = Object.getOwnPropertyDescriptor(newBook, "year");
				expect(yearDescriptor.writable).toBe(undefined);
				expect(yearDescriptor.value).toBe(undefined);
				expect(typeof yearDescriptor.get).toBe("function");
				expect(typeof yearDescriptor.set).toBe("function");
			});
		}); // accessor properties end
	
	}); // type of properties end

	describe("Own and Inherited Properties", function() {
		it("To find out if a property exists on an object, either inherited or own, use the IN operator", function() {
			var food = {fruit:"banana"};

			// own properties
			var isFruitInFood = "fruit" in food;
			expect(isFruitInFood).toBe(true);

			var isVegetableInFood = "vegetable" in food;
			expect(isVegetableInFood).toBe(false);

			// inherited properties
			var isTooStringInFood = "toString" in food;
			expect(isTooStringInFood).toBe(true);
		});

		it("To find out whether an object has a property as one of its own property, and not inherited ones, use hasOwnProperty() method", function() {
			var food = {fruit:"banana"};

			// fruit is a property on food
			var isFruitOwnProperty = food.hasOwnProperty("fruit");
			expect(isFruitOwnProperty).toBe(true);

			// toString is an inherited property, so hasOwnProperty will return false
			var isTooStringOwnProperty = food.hasOwnProperty("toString");
			expect(isTooStringOwnProperty).toBe(false);
		});
		
		it("To access enumerable owned properties on objects, use the for/in loop", function() {
			var food = {
				fruit:"banana",
				healthy: true,
				color: "yellow"
			}; 

			var foodProperties = [];
			expect(foodProperties.length).toEqual(0);

			for (var property in food) {
				foodProperties.push(property);
			};

			expect(foodProperties.length).toEqual(3);

		});

		it("To access inherited properties on objects that are enumerable, use the for/in loop", function() {
			function HigherLearning() {
				this.educationLevel = "University";
			};

			var school = new HigherLearning();
			school.schoolName = "MIT";
			school.schoolLocation = "Boston";

			var propertiesInSchool = [];
			expect(propertiesInSchool.length).toBe(0);

			for (var property in school) {
				propertiesInSchool.push(property);
			};
			
			// its own properties
			expect(propertiesInSchool).toContain("schoolName");
			expect(propertiesInSchool).toContain("schoolLocation");
			// educationLEvel is not inherited from the HigherLearning constructor
			// it is created as a new property on each object because it uses the 'this' keyboard to define the property
			expect(propertiesInSchool).toContain("educationLevel");

		});

		describe("Deleting Properties", function() {
			// var MilkyWay = {
			function MilkyWay() {
				this.existsInUniverse = true;
				this.pluto = 10000;
			}
				
			// }

			var solarSystem = new MilkyWay();
			solarSystem.mercury = 1;
			solarSystem.venus = 2;
			solarSystem.earth = 3;
			solarSystem.mars = 4;
			solarSystem.jupiter = 5;
			solarSystem.saturn = 6;
			solarSystem.neptune=  7
			solarSystem.pluto = 8; // this pluto property overwrites the one that is written by the constructr function

			it("You can delete properties from an object using the delete operator", function() {
				expect(solarSystem.pluto).toBe(8);
				delete solarSystem.pluto;
				expect(solarSystem.pluto).toBe(undefined);

				// pluto is still there on the prototype because we only deleted it from the solarSystem instance				
				var newSolarSystem = new MilkyWay();
				expect(newSolarSystem.pluto).toBe(10000);
			
			});

			it("You can't delete properties that were inherited", function() {
				expect(solarSystem.toString).toBeDefined();
				delete solarSystem.toString();
				expect(solarSystem.toString).toBeDefined();
			});

			it("You must delete inherited properties on the prototype object, where the properties were defined", function() {
				expect(solarSystem.isHuge).toBeUndefined();
				// defining a prototype on the MilkyWay function (constructor)
				MilkyWay.prototype.isHuge = true;

				// now isHuge property should be on the inherited solarSystem
				expect(solarSystem.isHuge).toBeDefined();
				expect(solarSystem.isHuge).toBe(true);

				//isHuge is not an own property of the solarSystem instance
				expect(solarSystem.hasOwnProperty("isHuge")).toBe(false);

				// let's try to delete the inherited isHuge property
				delete solarSystem.isHuge;
				expect(solarSystem.isHuge).toBeDefined();
				expect(solarSystem.isHuge).toBe(true);

				// It was not deleted.  We must delete it from the prototype itself
				delete MilkyWay.prototype.isHuge;
				expect(solarSystem.isHuge).toBeUndefined();

			});

		}); // delete end
	}); //own and inherited properties end
	describe("Serialize and Deserialize Objects", function() {
		it("To serialize an object, use JSON.stringify", function() {
			var fruits = {
				apple: "red",
				banana: "yellow",
				kiwi: "green"
			};
			expect(typeof fruits).toBe("object");

			var fruitsStringified = JSON.stringify(fruits);
			expect(typeof fruitsStringified).toBe("string");
		});

		it("To deserialize an object, use JSON.parse", function() {
			var fruitString = '{"apple":"red","banana":"yellow","kiwi":"green"}';
			expect(typeof fruitString).toBe("string");

			var fruitObj = JSON.parse(fruitString);
			expect(typeof fruitObj).toBe("object");
		});
	}); // serialize and deserialize end
}); //  objects end





























