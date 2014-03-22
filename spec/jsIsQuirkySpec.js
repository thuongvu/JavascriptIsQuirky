describe('Javascript: ', function() {
	describe('Syntax/DataTypes/Functions', function() {
			describe('Data types:', function() {

				it('should have 5 primitive types: undefined, null, boolean, number, string; and a complex type, object: ', function() {
					var isUndefined;
					var bool = true;
					var str = 'hello world';
					var num = 5;
					var obj = {};

					expect(typeof isUndefined).toBe('undefined');
					expect(typeof bool).toBe('boolean');
					expect(typeof str).toBe('string');
					expect(typeof num).toBe('number');
					expect(typeof obj).toBe('object');

				});

				describe('Undefined: ', function() {
					it('should have typeof null return object because null is an empty object reference', function() {
						var somethingNull = null;
						expect(typeof obj).not.toBe(undefined);
						expect(typeof somethingNull).toBe('object');
					});

					it('should have undefined type for variables that are declared but not initialized', function() {
						var foo; // foo is declared without initializing it
						expect(foo).toBe(undefined);

						// var bar is declared, and initialized to be undefined.  this is unnecessary, because uninitialized 
						// variables get the value of undefined automaticlaly
						var bar = undefined;
						expect(bar).toBe(undefined);
					});

					it("should have variables containing the value undefined to be different from variables that haven't been declared", function() {
						
						var foo; // var foo is declared, but has value of undefined
						// var bar; // COMMENT OUT THIS LINE to make sure that this variable isn't declared

						expect(foo).toBe(undefined); // foo will have value of undeclared, whereas
						expect(function(){bar}).toThrow(new ReferenceError("bar is not defined")); //bar will throw an error
					});

					it("however, typeof should return undefined on both unintialized variables and also undeclared variables", function() {
						var foo; // var foo is decalred but has value of undefined

						// var bar; // var foo is not declared;

						expect(typeof foo).toBe('undefined');
						expect(typeof bar).toBe('undefined');
					});

				}); // undefined end

				describe("Null: ", function() {

					it("should return object when typeof is used on it because the null value is an empty object pointer", function() {
						var foo = null;
						expect(typeof foo).not.toBe("null");
						expect(typeof foo).toBe("object");
					});

					it("is superficially equal to undefined, because undefined is a derivative of null", function() {
						expect(null == undefined).toBeTruthy();
					});
				}); // null end

				describe("Boolean: ", function() {
					describe("can convert other data types to a boolean value with the Boolean() casting function: ", function() {
						
						it("Non-empty strings are true, empty strings are false", function() {
							var str = "foo";
							var emptyStr = "";
							expect(Boolean(str)).toBe(true);
							expect(Boolean(emptyStr)).toBe(false);
						});

						it("Non-zero numbers are true, 0 and NaN are false", function() {
							var positiveNum = 1;
							var negativeNum = -1;
							var zero = 0;
							var notANumber = NaN;

							expect(Boolean(positiveNum)).toBe(true);
							expect(Boolean(negativeNum)).toBe(true);
							expect(Boolean(zero)).toBe(false);
							expect(Boolean(notANumber)).toBe(false);
						});
						
						it("objects are true, null is false", function() {
							var obj = {};
							var nullObj = null;

							expect(Boolean(obj)).toBe(true);
							expect(Boolean(nullObj)).toBe(false);
						});
						
						it("undefined cannot be true, it is always converted to false", function() {
							var foo = undefined;
							expect(Boolean(foo)).toBe(false);
						});			
					});
				}); // boolean end

				describe("Number: ", function() {

			// TODO
			// describe("parseInt", function() {

			// });

					describe("NaN (Not a Number): ", function() {
						it(" will return NaN in any operation involving NaN", function() {
							expect(NaN / 10).toEqual(NaN);
						});

						it(" is not equal to any value, including NaN", function() {
							expect(NaN == NaN).toEqual(false);
						});

						it(" has a isNaN() function that accepts a single argument of any data type to determine if value is NaN", function() {
							// isNaN will first attempt to convert any value into a number
							expect(isNaN(NaN)).toBe(true); // NaN is not a number
							expect(isNaN(1)).toBe(false); // number 1
							expect(isNaN("1")).toBe(false); // string "1" is converted
							expect(isNaN("foo")).toBe(true); // can't convert "foo" to a number
							expect(isNaN(true)).toBe(false); // true can convert to 1
						});
					});
				}); // number end

				describe("String: ", function() {
					it("The toString() method is available on numbers, booleans, objects, and strings", function() {
						// number
						var num = 1;
						var numToString = num.toString();
						// boolean
						var isTrue = true.toString();
						// object
						var obj = {"foo": "bar"};
						var objToString = obj.toString();
						// string
						var str = "foo";
						var strToString = str.toString();
						// null
						var isNull = null;
						// var isNulltoString = isNull.toString(); // will throw error
						// undefined
						var isUndefined = undefined;
						// var isUndefinedToString = isUndefined.toString() // will throw error

						expect(numToString).toBe("1");
						expect(isTrue).toBe("true");
						expect(strToString).toBe("foo");
					});
				}); // string end

				describe("Object: ", function() {
					describe(" Each instance should have these properties and methods: ", function() {
						// beforeEach(function() {
							var obj = new Object();
							obj.foo = "a";
						// });
						
						it("Constructor", function() {
							expect(obj.constructor).toBeDefined(); // constructor is the function used to create the object
						});
							
						it("hasOwnProperty('property')", function() {
							// given property exists on object instance and not on the prototype
							expect(obj.hasOwnProperty("foo")).toBe(true); 
							expect(obj.hasOwnProperty("bar")).toBe(false);

						});

						it("isPrototypeOf('prototype')", function() {
							expect(obj.isPrototypeOf()).toBeDefined(); // determines if object is a prototype of another object
						});
						
						it("propertyIsEnumerable('propertyName')", function() {
							expect(obj.propertyIsEnumerable("foo")).toBe(true); // indicates if the given property can be enumeated in for in statement
							expect(obj.propertyIsEnumerable("bar")).toBe(false);
							expect(obj.propertyIsEnumerable("constructor")).toBe(false);
						});

						it("toLocaleString()", function() {
							expect(obj.toLocaleString()).toBeDefined(); // returns string representation for locale of execution environment
						});			

						it("toString()", function() {
							expect(obj.toString()).toBeDefined(); // returns a string represenation of the object
						});
						
						// valueOf()
						it("valueOf()", function() {
							expect(obj.toString()).toBeDefined(); // returns string, number, boolean equivalent of objct, often same value as toString()
						});
					});
			}); // object end
		}); // data types end

				describe("Operators: ", function() {
					describe("Equality Operators: ", function() {
						describe("Equal and not Equal == ", function() {
							it("If one operand is string and other is number, convert the string into a number before checking", function() {
								expect(1 == "1").toBe(true);
							});
							it("If one operand is boolean, convert it to number before checking", function() {
								expect(true == 1).toBe(true);
							});
							it("If one operand is object and other is not, valueOf() called to retrieve primitive value to compare", function() {
								var obj = {"foo": "bar"};
		// TO DO - FIGURE OUT HOW TO TEST THIS
							});
							it("Values of null and undefined are equal", function() {
								expect(null == undefined).toBe(true);
							})

						});
						describe("Identically Equal ===", function() {
							
							it("does not do type conversion", function() {
								expect(1 == "1").toBeTruthy(); // true because of type conversion of ==
								expect(1 === "1").toBe(false); // no type conversion
							});

							it("null == undefined, but null !==undefined because they are not the same type", function() {
								expect(null == undefined).toBeTruthy();
								expect(null === undefined).toBe(false);
							});
							
						});
					});
				}); // operator end

				describe("Functions:", function() {
					describe("The arguments object:", function() {

						it("acts like an array so you can access each argument using bracket notation", function() {
							function foo(argumentA, argumentB) {
								expect(arguments.length).toEqual(2);
								expect(arguments[0]).toMatch("hello");
								expect(arguments[1]).toMatch("world");
							};
							foo("hello", "world");
						});

						it("can be used to check the number of arguments passed into the function via length property", function(){
							function foo(argumentA, argumentB) {
								expect(arguments.length).toEqual(2);
							};
							foo("hello", "world");
						});

						it("can allow developers to let functions accept any number of arguments", function() {
							function addAccordingToArgumentsLength(num1, num2) {
								if (arguments.length === 1) {
									return arguments[0] + 1;
								} else if (arguments.length === 2) {
									return arguments[0] + arguments[1];
								};
							};
							expect(addAccordingToArgumentsLength(5)).toEqual(6); // 5 + 1 = 6;
							expect(addAccordingToArgumentsLength(5,10)).toEqual(15);
						});

						it("can be used along with named arguments as well", function() {
							function addAccordingToArgumentsLength(num1, num2) {
								return arguments[0] + num2;
							};
							expect(addAccordingToArgumentsLength(5,10)).toEqual(15);
						});

						describe(" values in the arguments object are kept in sync with the named arguments:", function() {
							
							it("Therefore the change in arguments[1] will change the value of the named argument, num2", function() {
								function addAccordingToArgumentsLength(num1, num2) {
									arguments[1] = 10;
									return arguments[0] + num2;
								};
								expect(addAccordingToArgumentsLength(1,2)).toEqual(11);
							});

							it("But if only one argument is passed in, changing arguments[1] will not reflect in the named argument", function() {
								function addAccordingToArgumentsLength(num1, num2) {
									arguments[1] = 10;
									return arguments[0] + num2;
								};
								expect(addAccordingToArgumentsLength(1)).toEqual(NaN);
								// the length of the arguemnts object is based on the number of arguments passedin, not number of named arguemnts listed for the function
							});

							it("Named arguments not passed into the function are assigned value undefined", function() {
								function returnSecondArgument(num1, num2) {
									arguments[1] = 10;
									return num2;
								};
								expect(returnSecondArgument(1)).toBe(undefined);
							});

							it("In strict mode, named argument num2 will remain undefined even if arguments[1] is set to a value", function() {
								function strictFunction(num1, num2) {
									'use strict';
									function returnSecondArgument(num1, num2) {
										arguments[1] = 10;
										return num2;
									};
								}
								expect(strictFunction(1,2)).toBe(undefined);
							});

						});

					});
				}); // function end
	}); // Syntax/DataTypes/Functions end

	describe("Reference Types:", function() {
		describe("Object Type:", function() {
			// TO DO
		});

		describe("Array Type:", function() {
			describe("instanceOf vs isArray: ", function() {
				it("isArray() should determine if a given value is an array regardless of global execution context", function() {
					var arr = [];
					expect(Array.isArray(arr)).toBe(true);
				});
			})

			describe("Conversion methods: ", function() {
				it("toString() and valueOf() returns  the same -- a comma seperated string of each element in array", function() {
					var alphabet = ['a', 'b', 'c'];
					expect(alphabet.toString()).toMatch('a,b,c');
					expect(alphabet.valueOf()).toMatch('a,b,c')
				});

				it("We can overwrite the toString method on an object", function() {
					var obj1 = {
						toString: function() {
							return "foo";
						}
					};
					var obj2 = {
						toString: function() {
							return "bar";
						}
					};
					var arr = [obj1, obj2];

					expect(arr.toString()).toMatch("foo,bar");
				});
			});

			describe("Stack Methods:", function() {
				// last in, first out.  The most recently added item is the first removed
				// insertion = push & removal = pop
				// only occur at the top of the stack

				it("push() should accept any number of arguments and add them to the end of the array, returning the array's new length", function() {
					var arr = [];
					arr.push(1,2);
					expect(arr.length).toMatch(2);
					arr.push(5);
					expect(arr.length).toMatch(3);
					expect(arr.push(7)).toBe(4); // remember that push() returns the array's new length
				});

				it("pop() should  remove the last element in the array, decrease the array's length, and return the item", function() {
					var arr = [1,4,6,8];
					arr.pop();
					expect(arr.length).toMatch(3);
					expect(arr).toMatch([1,4,6]);
					expect(arr.pop()).toBe(6); // remember that pop() returns the item popped
				});
			});

			describe("Queue methods:", function() {
				// FIFO - first in, first out
				// adds items to the end of the list, and retrieves items from front of list
				// with shift() removing first item, and push() adding to the end of the array = queue
				it("shift() removes the first item of the array and returns it, decreasing length of array", function() {
					var arr = [1,4,6,8];
					arr.shift();
					expect(arr.length).toMatch(3);
					expect(arr).toMatch([4,6,8]);
					expect(arr.shift()).toBe(4); // remember that shift() returns the item shifted
				});

				// if we add item to front of the array(), and pop(), remove item from ack of array, queue = in opposite direction
				it("unshift() adds any number of arguments to the front of the array and returns length of array", function() {
					var arr = [2,4,6,8];
					arr.unshift(1,3);
					expect(arr).toMatch([1,3,2,4,6,8]);
					expect(arr.unshift(5)).toBe(7); // remember that unshift() returns the length of array
				});
			});

			describe("Reordering methods:", function() {
				it("concat() copies the array, appends the method arguments to the end, and returns the newly constructed array", function() {
					var arr = [1,2,3];
					var arr2 = arr.concat(4,5);
					expect(arr2).toMatch([1,2,3,4,5]);
					expect(arr).toMatch([1,2,3]); // arr is left un-modified
				});

				it("if one or more arrays are passed into concat(), the values are appended to the back of the existing array", function() {
					var arr = [1,2,3];
					var arr2 = arr.concat(4,5,[6,7,8]);
					expect(arr2).toMatch([1,2,3,4,5,6,7,8]);
					expect(arr).toMatch([1,2,3]); // arr is left un-modified
				});

				it("slice() accepts one or two arguments: starting and stopping positions of items to return", function() {
					var arr = ['red', 'orange', 'yellow', 'green', 'blue'];
					var arr2 = arr.slice(1,3); // start coping at index 1 (position 1) and stop copying before index 3 (position2)
					expect(arr2).toMatch(['orange', 'yellow']); 
				});

				it("if slice() only has one argument passed in, it begins copying from that index", function() {
					var arr = ['red', 'orange', 'yellow', 'green', 'blue'];
					var arr2 = arr.slice(2); // start copying at index 2, or position 2
					expect(arr2).toMatch(['yellow', 'green', 'blue']); 
				});

//TO DO slice with negative numbers page 117

				it("splice() can delete any number of items from an array w/ 2 arguments", function() {
					var arr = ['red', 'orange', 'yellow', 'green', 'blue'];
					arr.splice(2,2) // first argument = first item to delete, 2nd argument is number of items to delete
					expect(arr).toMatch(['red', 'orange', 'blue']);
				});

				it("splice() can insert items into a specific position of an array w/ 3 arguments", function() {
					var arr = ['red', 'orange', 'yellow', 'green', 'blue'];
					arr.splice(3, 0, "violet"); // first arg = starting position, second arg = 0, or number of items to delete, third arg = item to insert
					expect(arr).toMatch(['red', 'orange', 'yellow', 'violet', 'green', 'blue']);
				});

				it("splice() can replace items in a specific position of an array w/ 3 arguments", function() {
					var arr = ['red', 'orange', 'yellow', 'green', 'blue'];
					arr.splice(2, 1, "purple", "brown"); // first arg = starting position, second arg = items to delete, third arg = items to add
					expect(arr).toMatch(['red', 'orange', 'purple', 'brown', 'green', 'blue']);
				});

				it("splice() always returns an array that contains any items that were removed, or empty array", function() {
					var arr = ['red', 'orange', 'yellow', 'green', 'blue'];
					expect(arr.splice(2, 1, "purple", "brown")).toMatch(['yellow']);

					var arr = ['red', 'orange', 'yellow', 'green', 'blue'];
					expect(arr.splice(3, 0, "violet")).toMatch([]);

				});

			});


		}); // array type end





	}); // reference types end
}); // Javascript end























