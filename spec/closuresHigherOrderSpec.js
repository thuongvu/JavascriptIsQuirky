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
describe("Currying functions", function() {
	function add(num1, num2) {
		return num1 + num2;
	};
	describe("create functiosn that have one or more arguments already set, using a closure, to return a function with some arguments passed in", function() {});
	it("A simple example, not technically a curried function, but demonstrates rough idea", function() {
		function curriedAdd(num2) {
			return add(5, num2);
		};

		var a = add(1,2);
		var b = curriedAdd(4);

		expect(a).toEqual(3);
		expect(b).toEqual(9);
	});
	it("are usually created dynamically by calling another function, passing in a function to curry and arguments to supply", function() {
		function curry(fn) {
			var args = Array.prototype.slice.call(arguments, 1); // 1
			return function() {
				var innerArgs = Array.prototype.slice.call(arguments); // 2
				var finalArgs = args.concat(innerArgs); // 3
				return fn.apply(null, finalArgs); // 4
			};
		};

		// 1 the first argument of curry(fn) is the function, so we call slice on the arguments object, to get all the arguments past the first element, and that's why we pass in the 1
		// 2 for the inner function, we call slice on every element of the argument's object
		// 3 we use the concat() method on them to combine the arguments
		// 4 now we return fn.apply, with null, to not set a context explicitly, and finalArgs, the combined arguments of both inner and outer functions
	
		// now, to try it out
		var curriedAdd = curry(add, 5); // 5
		var allTogether = curriedAdd(6); // 6
		expect(allTogether).toEqual(11); // 7
		// 5 add() is created, with its first argument bound to 5, and it returns a function
		// 6 with the returned function, we pass in 6, which will be the second argument of add()

		// we can even pass in all the function arguments at once
		var curriedAdd2 = curry(add, 10, 20);
		expect(    curriedAdd2()    ).toEqual(30);
	});
	it("function binding", function() {
		function bind(fn, context) { // 1
			var args = Array.prototype.slice.call(arguments, 2); // 2
			return function() {
				var innerArgs = Array.prototype.slice.call(arguments);
				var finalArgs = args.concat(innerArgs);
				return fn.apply(context, finalArgs); // 3
			};
		};
		// 1 while curry accepts a function to wrap, bind() accepts the function as well as a context object
		// 2 therefore arguments for the bound function start at the third argument instead of 2nd, making it 2 instead of 1 like curry
		// 3 when fn.apply() is called, instead of null, we pass in thecontext object, which may have some arguments set already

	});
	
}); // end currying fnctions










