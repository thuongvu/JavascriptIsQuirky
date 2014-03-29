describe("", function() {});
it("", function() {});

describe("Closures", function() {
	describe("are inner functions that have access to he outer, enclosing function's variables - scope chain", function() {});
	describe("A closure has 3 scope chains: its own scope (vars defined between its own {}, outer function's vars {} & parameters (but not the outer function's arguments object), and global vars, ", function() {});
	it("have access to the outer function's variables, even after the outer function returns", function() {
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
}); // closures end