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
		it("In a method passed as a callback, use call/bind/apply for proper context", function() {
			var user = {
				name: "Charlie",
				showName: function() {
					return this.name;
				}
			};
			function callShowName() {
				user.showName();
			};
			expect(callShowName()).toBe(undefined);
			
			function bindShowName() {
				user.showName.bind(user);
			};
			// bindShowName();
			// console.log(bindShowName());
// THIS DOESNT WORK, FIX LATER TODO		
		});

		// it("Closures can't access the outer function's this variable because it is only accessible by the function itself, not inner functions", function() {
		// 	var user = {
		// 		data: [{name: "Delta"}, {name: "Emily"}],
		// 		showName: function () {
		// 			this.data.forEach(function(person) {
		// 				console.log(this.name);
		// 			});
		// 		}
		// 	};

		// 	console.log(user.showName());

		// });

	});
	


}); // this end