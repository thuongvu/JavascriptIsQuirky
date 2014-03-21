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


		


	});
});