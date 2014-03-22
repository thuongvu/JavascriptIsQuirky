describe('Javascript: ', function() {

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

		});

		describe("Null: ", function() {

			it("should return object when typeof is used on it because the null value is an empty object pointer", function() {
				var foo = null;
				expect(typeof foo).not.toBe("null");
				expect(typeof foo).toBe("object");
			});

			it("is superficially equal to undefined, because undefined is a derivative of null", function() {
				expect(null == undefined).toBeTruthy();
			});
		});

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
		});

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
		});

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
		});

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
			
		});

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
		});

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
		});
	


		


	});
});