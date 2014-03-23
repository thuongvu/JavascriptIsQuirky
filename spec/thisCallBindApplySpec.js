describe("This:", function() {
	it("should hold value of undefined in global functions and anonymous functions  if not bound to objects in strict mode", function() {
		window.color = 'blue';
		function thisUseStrict() {
			'use strict';
			return this.color;
		}
		expect(function() {thisUseStrict() }).toThrow(new TypeError("Cannot read property 'color' of undefined"));
	});

	it("is not defined until an object invokes the this function at runtime");

	it("If this is used in a global function, it refers to the window object", function() {
		var name = "Abby";
		function showName() {
			return this.name; // this will have value of window object
		};
		var person = {
			name: "Barry",
			showName: function () {
				return this.name; // refers to the person object, because showName will be invoked by person object
			}
		};
		expect(showName()).toMatch("Abby");
		expect(person.showName()).toMatch("Barry");
	});

	describe("Tricky uses of this:", function() {
		describe("1.  Callbacks", function() {
			it("In a method passed as a callback, use call/bind/apply for proper context", function() {
				var nameObj = {
					name: "Charlie",
					returnName: function() {
						// console.log(this.name);
						return this.name;
					}
				};
				function callReturnName() {
					nameObj.returnName();
				};
				expect(callReturnName()).toBe(undefined);

				function invokeCallback(callback) {
					// do something else...
					callback();
				};
				// console.log(nameObj.returnName.call(nameObj));
				nameObj.returnName.call(nameObj)
				var boundReturnName = nameObj.returnName.bind(nameObj);
				// console.log(boundReturnName());

				// invokeCallback(boundReturnName);
			
// THIS DOESNT WORK, FIX LATER TODO		
			});
		});
		describe("2. Inside Closures:", function() {
			it("A closure can't access the outer function's this var because this is accessible only by the function itself, not inner function");
			it("Inside an anonymous function, set the this value to another variable before entering the method", function() {
				var animals = {
					data: [{species: 'Giraffe'}, {species: 'Elephant'}],
					listOfSpecies: [],
					logEachAnimal: function() {
						var that = this; // we set the value of "this" to "that" variable, so we can use later
						this.data.forEach(function(animal) {
							that.listOfSpecies.push(animal.species); //inside, we use that
						});
					}
				};
				var list = animals.listOfSpecies;
				expect(list.length).toBe(0);
				animals.logEachAnimal();
				expect(list.length).toBe(2);
			});
		});

		describe("3. When a method is assigned to a variable,", function() {
			it("use a bind() to maintain 'this'", function() {
				var carFactory = {
					car: {brand: "Ford"},
					returnCar: function() {
						return this.car.brand;
					}
				};
				// this will throw an error because it will executes in a global context, and there is no car.brand globally
				var returnCarFactoryCar = carFactory.returnCar;
				expect(function() {returnCarFactoryCar();}).toThrow(new TypeError("Cannot read property 'brand' of undefined"));
				// set this value with the bind method to carFactory
				var returnBindedCar = carFactory.returnCar.bind(carFactory);
				returnBindedCar();
			});

			describe("4. When borrowing methods", function() {
				it("use call/apply", function() {
					var gameController = {
						scores: [1,2,3,4,5],
						avgScore: null
					};

					var appController = {
						scores: [10, 11, 12, 13, 14, 15],
						avgScore: null,
						avg: function() {
							var sumOfScores = this.scores.reduce (function (prev, cur, index, array) {
							   return prev + cur;
						   });

							this.avgScore = sumOfScores / this.scores.length;
						}
					};
					appController.avg();
					expect(appController.avgScore).toEqual(12.5);


					// gameController object borrows appController's avg method
					// the this value inside appController.avg method will be set to the gameController object
					appController.avg.apply(gameController, gameController.scores);
					expect(gameController.avgScore).toEqual(3);
				});
			});

		});
	}); // tricky uses of this end
}); // this end


describe("Call, bind, apply:", function() {
	describe("The bind() method", function() {
		it("allows a developer to explicitly set a specific object to be bound to this when a function/method is invoked");
		
			it("allows a developer to set the this value on methods", function() {
		// examples in previous section for this
			});
			it("allows a developer to borrow methods", function() {
				var food = {
					data: ['apple', 'banana']
				};

				var drinks = {
					data: ['coke', 'pepsi'],
					returnItems: function() {
						return this.data;
					}
				};
				expect(drinks.returnItems()).toMatch(['coke', 'pepsi']);
				
				expect(function() {
					food.returnItems = drink.returnItems;
				}).toThrow(new Error("drink is not defined"));

				expect(food.returnItems).toBeUndefined();
				food.returnItems = drinks.returnItems.bind(food);
				expect(food.returnItems).toBeDefined();

				expect(food.returnItems()).toMatch(['apple', 'banana']);

			});
			it("allows a developer to curry a function", function() {
				// it is the use of a function that accepts one or more arguments to return a new function with some of the arguments already set
				// the returned function has access to the arguments/variables of the outer function

				function greet(gender, age, name) {
					if (gender === 'male') {
						var salutation = "Mr. ";
					} else if (gender === 'female') {
						var salutaiton = "Ms. ";
					};

					if (age > 25) {
						return "Hello, " + salutation + name + ".";
					} else {
						return "Hey, " + name + ".";
					};
				};

				// let's use the bind method to curry, or preset one or more params of the greet functon
				// first argument of bind is what to say 'this' to, which are aren't using right now
				var greetAdultMale = greet.bind(null, "male", 45);
				expect(greetAdultMale("Edward")).toMatch("Hello, Mr. Edward.");

				var greetYoungFemale = greet.bind(null, "female", 20);
				expect(greetYoungFemale("Faith")).toMatch("Hey, Faith.");
			});
	}); // bind end
	
	describe("Apply and Call", function() {
		it("can be used to set the this value in callback functions", function() {
			var clientData = {
				fullName: "Not set",
				setName: function(firstName, lastName) {
						this.fullName = firstName + " " + lastName;
				}
			};

			function getUserInput(firstName, lastName, callbackFunction, callbackObjContext) {
				// apply sets the this value to whatever we pass as callbackObj
				callbackFunction.apply(callbackObjContext, [firstName, lastName]);
			};

			expect(clientData.fullName).toMatch("Not set")
			getUserInput("Thuongvu", "Ho", clientData.setName, clientData);
			expect(clientData.fullName).toMatch("Thuongvu Ho")
		});
		describe("Borrowing functions with apply and call:", function() {
			it("One can borrow Array.prototype methods using call", function() {
				var arrayLikeObj = {0: "Frank", 1: 23, 2: 45, 3:["Georgia", "Henry"], length:4};

				// borrowing the slice method from the Array prototype to use on arrayLikeObj
				var newArray = Array.prototype.slice.call(arrayLikeObj, 0);
				expect(newArray.length).toBe(4);

				// indexOf
				searchForFortyFive = Array.prototype.indexOf.call(arrayLikeObj, 45);
				expect(searchForFortyFive).toBeGreaterThan(0);

				//reverse
				Array.prototype.reverse.call(arrayLikeObj);
				expect(arrayLikeObj[0]).toMatch(["Georgia", "Henry"]);
			});

			it("One can use call/apply to extract parameters passed into a function's arguments object, an array-like object property on all functions", function() {
				function foo(bar) {
					// borrowing Array.slice using call
					// first argument is arguments object
					// 2nd argument tells function to return copy of array starting at index 1
					var args = Array.prototype.slice.call(arguments);
					return args;
					// args becomes a real array, with a copy of all the parameters passed to transitionTo
				};
				expect(foo("Hello", "World")).toMatch(["Hello", "World"]);
			});

			it("One can borrow methods and functions from one's own custom methods and functions", function() {
				var gameController = {
					scores: [5,6,7,8,9,10],
					avgScore: null
				};

				var appController = {
					scores: [15,16,17,18,19,20],
					avgScore: null,
					avg: function () {
						var sumOfScores = this.scores.reduce(function(prev, cur, index, array) {
							return prev + cur;
						});
						this.avgScore = sumOfScores / this.scores.length;
					}
				};

				// use apply() so the 2nd argument must be an array
				// we borrow appController's avg method, and use apply to set the context object to be gameController
				appController.avg.apply(gameController, gameController.scores);
				expect(gameController.avgScore).toBe(7.5);

				// we haven't invoked appController.avg on the appController object
				expect(appController.avgScore).toBeNull();

			});

			it("if we change the parent method that is inherited, all changes to the parent will reflect on the child method", function() {
				var gameController = {
					scores: [5,6,7,8,9,10],
					avgScore: null
				};

				var appController = {
					scores: [15,16,17,18,19,20],
					avgScore: null,
					avg: function () {
						var sumOfScores = this.scores.reduce(function(prev, cur, index, array) {
							return prev + cur;
						});
						this.avgScore = sumOfScores / this.scores.length;
					}
				};

				appController.maxNum = function () {
					this.avgScore = Math.max.apply(null, this.scores);
				};

				appController.maxNum.apply(gameController, gameController.scores);

				expect(gameController.avgScore).toEqual(10);
			});

			it("apply() can execute variable-arity functions, or functions with an array of arguments", function() {
				// the aridy of a function specifies the number of arguments the function was defined to accept

				// the Math.max() method accepts any number of arguments
				var highestNumber = Math.max(23, 56, 21, 4, 62, 74);
				expect(highestNumber).toEqual(74);

				// we can't pass an array of numbers as an argument
				var numbers = [3, 56, 6, 21, 53];

				var highestNumberArrA = Math.max(numbers);
				expect(highestNumberArrA).not.toEqual(56);
				expect(highestNumberArrA).toEqual(NaN);

				// we can use apply() to pass an array of numbers
				var highestNumberArrB = Math.max.apply(null, numbers); //pass null as first argument because first argument of apply() sets this value
				expect(highestNumberArrB).toEqual(56);
			});

			it("we can write our own variadic function using apply()", function() {

				var animals = ["penguins", "giraffes", "elephants", "lions", "monkeys"];

				function logAnimals() {
					var args = Array.prototype.slice.call(arguments);
					var lastAnimal = args.pop();
					return "There are " + args.join(", ") + ", and " + lastAnimal + " in the zoo."
				};
				var allAnimals = logAnimals.apply(null, animals);

				expect(allAnimals).toMatch("here are penguins, giraffes, elephants, lions, and monkeys in the zoo.");

			});
			
		});

	});

}); //call, bind, apply end