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
			it(" Each instance should have properties and methods", function() {
				var obj = new Object();
				obj.foo = "a";

				// Constructor
				expect(obj.constructor).toBeDefined(); // constructor is the function used to create the object

				// hasOwnProperty
				expect(obj.hasOwnProperty("foo")).toBe(true); // given property exists on object instance
				expect(obj.hasOwnProperty("bar")).toBe(false);

				// isPrototypeOf(Object)
				expect(obj.isPrototypeOf()).toBeDefined(); // determines if object is a prototype of another object

				// propertyIsEnumerable(propertyName)
				expect(obj.propertyIsEnumerable("foo")).toBe(true); // indicates if the given property can be enumeated in for in statement
				expect(obj.propertyIsEnumerable("bar")).toBe(false);
				expect(obj.propertyIsEnumerable("constructor")).toBe(false);

				// toLocaleString()
				expect(obj.toLocaleString()).toBeDefined(); // returns string representation for locale of execution environment

				// toString()
				expect(obj.toString()).toBeDefined(); // returns a string represenation of the object

				// valueOf()
				expect(obj.toString()).toBeDefined(); // returns string, number, boolean equivalent of objct, often same value as toString()

			});
			
		});



	


		


	});
});