describe("Object Oriented Programming", function() {
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

			}); // accessor properties end
		
		}); // type of properties end
	}); //  objects end

}); // oop end