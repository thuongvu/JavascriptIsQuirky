describe("OOP", function() {
	describe("Factory Pattern", function() {
		it("writes a function that accepts arguments which to build an object, and return it", function(){
			function animalFactory(species, legs) {
				var o = new Object;
				o.species = species;
				o.legs = legs;
				o.saySpecies = function() {
					return this.species;
				};
				return o;
			};

			var giraffe = animalFactory("giraffe", 4);
			var bird = animalFactory("bird", 2);

			expect(giraffe.legs).toEqual(4);
			expect(bird.legs).toEqual(2);

		});
		it("'s weakness is object identification, (what type of object an object is)", function() {
//TO DO
		});
	}); // factory pattern end
	describe("Constructor Pattern", function() {
		describe("Constructors as functions", function() {

			function AnimalConstructor(species, legs) {
				this.species = species;
				this.legs = legs;
				this.saySpecies = function() {
					return this.species;
				};
			};

			var dog = new AnimalConstructor("dog", 4);  // 1

			it("Constructors can be used to create specific types of objects", function() {
				
				expect(dog.constructor).toBe(AnimalConstructor); // 2
				expect(dog.legs).toEqual(4); //3
				expect(dog.species).toMatch("dog");

				// 1. Create new object
				// 2. Assign this value of constructor to the new object, so that this points to the new object
				// 3. Add properties to the new object
				// 4. Return the new object
			});
			it("The instanceof operator can identify that instances of a particular type (what type of object an object it)", function() {
				expect(dog instanceOf Object).toBe(true);
				expect(dog instanceOf AnimalConstructor).toBe(true);
				expect(dog instanceOf PersonConstructor).toBe(false);
			});
			it("Differences: No object is being created explicitly");
			it("Differences: Properties and methods are assigned directly to the 'this' object.");
			it("Differences: There is no return statement.");
		});
		describe("Problems with constructors", function() {

		});

	}); //constructor pattern end

	describe("prototype pattern", function() {
		describe("How prototypes Work", function() {

		});
		describe("Prototypes and the in operator", function() {

		});
		describe("Dynamic nature of protoypes", function() {

		});
		describe("Problems with prototypes", function() {

		});
	}); // prototype pattern end
 
}); // oop end