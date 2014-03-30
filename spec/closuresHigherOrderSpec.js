describe("", function() {});
it("", function() {});

describe("Closures", function() {
	describe("are inner functions that have access to he outer, enclosing function's variables - scope chain", function() {});
	describe("A closure has 3 scope chains: its own scope (vars defined between its own {}, outer function's vars {} & parameters (but not the outer function's arguments object), and global vars, ", function() {});
	it("1. have access to the outer function's variables, even after the outer function returns", function() {
		// when javascript functions execute, they have the same scope chain that was in effect when they were created

		function celebrityName(firstName) {
			var str = "Their name is ";

			return function lastName(lastName) { //2
				return str + firstName + " " + lastName;
			};
		};

		var mjName = celebrityName("Michael");			// 1  // 2
		expect(mjName("Jackson")).toBe("Their name is Michael Jackson"); // 3

		// 1. at this point, the celebrityName outer function has returned
		// 2. and the closure still has access to the outer function's variable, str, and parameter, firstName
		// 3. it returns a function, and then we invoke it here
	});
	it("2. Closures store references to the outer function's variables, not a copy, or the actual value", function() {
		function celebID() {
			var celebID = 1;
			// 1
			return {
				getID: function() {
					return celebID; // 3
				},
				setID: function(newID) { // 2
					celebID = newID; 
				} 
			};
		};
		var a = celebID();
		expect( a.getID() ).toBe(1);
		a.setID(111);
		expect( a.getID() ).toBe(111);

		// 1. we are returning an object with inner functions, closures that have access to the outer function's variables
		// 2. this inner function can change the otuer function's variable because it has access to the outer function's var as a reference
		// 3. the inner function will return the updated celebID var

	});
	it("Because closures have access to the updated values of the outer function's variables, they can lead to bugs when the outer function's variable changes with a for loop", function() {
		function createIDs(listOfPeople) {
			var start = 100;
			for (var i = 0; i < listOfPeople.length; i++) {
				listOfPeople[i]["id"] = function() {
					return start + i;
				};
			};
			return listOfPeople;
		};

		var myList = [{name: "A", id: 0}, {name: "B", id: 0}, {name: "C", id: 0}];

		var createIDsForList = createIDs(myList);

		var a = createIDsForList[0];
		var b = createIDsForList[1];
		var c = createIDsForList[2];

		// we expect a.id() to be 101, b to be 102, c to be 103, but they are all 103
		// by the time the anonymous functions are called, the value of i is 3
		// remember that the closure, the anonymous function in this example, has access to the outer function's variables by REFERENCE
		// we access the updated var with the closure, and by then, the var i has changed, and we get the latest value
		expect( a.id() ).toEqual(103);
		expect( b.id() ).toEqual(103);
		expect( c.id() ).toEqual(103);
	});
	it("We can use an immediately invoked function", function() {
		function createIDs(listOfPeople) {
			var start = 100;
			for (var i = 0; i < listOfPeople.length; i++) {
				listOfPeople[i]["id"] = function(j) { // 1
					
					return function() {
						return start + j; // 2
					}() // 3

				}(i); //4
			};
			return listOfPeople;
		};

		var myList = [{name: "A", id: 0}, {name: "B", id: 0}, {name: "C", id: 0}];

		var createIDsForList = createIDs(myList);

		var a = createIDsForList[0];
		var b = createIDsForList[1];
		var c = createIDsForList[2];

		expect( a.id ).toEqual(100);
		expect( b.id ).toEqual(101);
		expect( c.id ).toEqual(102);

		// 1 the j is the i passed in on invoking this immediatley invoked function
		// 2 each iteration of the for loop passes the current value of i, saves it as the correct value to the array
		// 3 () at the end invokes it immediately and returns the value of start + j, instead of returning a function
		// 4 immediately invoke the function, passing in i.  inside the function, j is the argument, but it is here that we are passing in i as the param
	});
	
}); // closures end
describe("Callbacks/Higher order functions", function() {
	// when we pass a callback function as an argument to another function, we are only passing the function definition, doSomething
	// we are not executing the function in the parameter, doSomething()
	// now that the containing, outer function has the callback function in its parameter as a function definition, it can execute the callback function at any time, called back at a time inside the containing function's body

	// therefore, a callback is aclosure, and closuers have access to the containing function's scope variables + global
	it("We can use named or anonymous functions as callbacks", function() {
		var allUserData = [];
		var globalVar = {name: "C", specialty: "D"};

		function logData(userData) {
			var arrayOfPropsValues = [];
			for (var prop in userData) {
				var str = prop + " : " + userData[prop];
				arrayOfPropsValues.push(str.toString());
			};
			return arrayOfPropsValues;
		};

		function getInput(item, callback) {
			allUserData.push(item);
			return callback(item);
		};

		var a = getInput({name: "A", specialty: "B"}, logData);
		var b = getInput(globalVar, logData);

		// using a callback function to declare a named functio nand passing the name of the function to the parameter
		expect(a).toMatch(["name : A", "specialty : B"]);
		// passing paramters to callback functions, for example global vars
		expect(b).toMatch(["name : C", "specialty : D"]);

	});
	it("Using methods with the this object as callbacks", function() {
		// we have to modify how we execute the callback function to preserve the this object context, otherwise it will point to the global window object, or the object of the containing method
		var clientData = {
			id: 111,
			fullName: null,
			setUserName: function (firstName, lastName) {
				this.fullName = firstName + " " + lastName;
			}
		};

		function getUserInput(firstName, lastName, callback) {
			callback(firstName, lastName);
		};

		getUserInput("Barack", "Obama", clientData.setUserName);

		expect(clientData.fullName).toBe(null);

		// the fullName property was initialized onthe window object
		// expect(window.fullName).toBe("Barack Obama");


		


	});
	it("Using call", function() {
		var clientData = {
			id: 111,
			fullName: null,
			setUserName: function (firstName, lastName) {
				this.fullName = firstName + " " + lastName;
			}
		};

		function getUserInputWithCall(firstName, lastName, callback, callbackObj) {
			callback.call(callbackObj, firstName, lastName);
		}

		getUserInputWithCall("Barack", "Obama", clientData.setUserName, clientData);
		expect(clientData.fullName).toBe("Barack Obama");

	});
	it("Using apply", function() {
		var clientData = {
			id: 111,
			fullName: null,
			setUserName: function (firstName, lastName) {
				this.fullName = firstName + " " + lastName;
			}
		};

		function getUserInputWithApply(firstName, lastName, callback, callbackObj) {
			callback.apply(callbackObj, [firstName, lastName]);
		};

		getUserInputWithApply("Joe", "Biden", clientData.setUserName, clientData);

		expect(clientData.fullName).toBe("Joe Biden");

	});
}); // callbacks/higher order functions end










