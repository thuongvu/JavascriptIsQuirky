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
				var user = {
					name: "Charlie",
					returnName: function() {
						return this.name;
					}
				};
				function callReturnName() {
					user.returnName();
				};
				expect(callReturnName()).toBe(undefined);

				function invokeCallback(callback) {
					// do something else...
					callback();
				};

				// console.log(invokeCallback(user.returnName));
				// console.log(invokeCallback(user.returnName.bind(user)));
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

			

		});
		



	}); // tricky uses of this end
	


}); // this end