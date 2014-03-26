describe("", function() {});
describe("Browser Object Model", function() {
	describe("Global Scope", function() {
		it("All variables and functions declared globally become properties and methods of the window object", function() {
			car = "Toyota";
			sayCar = function() {
				return this.car;
			};
			expect(car).toBe("Toyota");
			expect(sayCar()).toBe("Toyota");

			// also accessible as a property of the window object
			expect(window.car).toBe("Toyota");
			expect(window.sayCar()).toBe("Toyota");

			// delete off window object
			delete car;
			delete sayCar;
			expect(function() {
				car
			}).toThrow(new ReferenceError("car is not defined"));

			expect(function() {
				sayCar();
			}).toThrow(new ReferenceError("sayCar is not defined"));
		});
	});
	describe("Window position", function() {
		describe("You can't accurately determine left/top coordinates of a browser window across all browsers: some use screenLeft/screenTop, while others use screenX/screenY", function() {});
	});
	describe("Window Size", function() {
		describe("You can't accurately determine the size of a browser window itself, but you can get the dimensions of the page viewport", function() {
			describe("innerWidth, innerHeight, outerWidth, outerHeight, document.documentElement.clientWidth, document.documentElement.clientHeight", function() {});
		});
	});
	describe("Opening windows", function() {
		it("window.open() accepts 4 arguments: URL to load, window target, string of features, boolean value indicating new page to take place of currently loaded page", function() {
			// window.open("http://google.com", "_self"); // if you un-comment this, it will redirect to google.com in this window
		

			// the 3rd argument is ignored when not opening a new window
			// window.open("http://google.com", "_blank", "fullscreen=yes, location=yes, toolbar=yes"); // opening a new window
		});
		describe("You can use window.close() to close a newly opened pop-up window, or top.close() to close automatically without confirmation of the user", function() {});
	});	
	describe("Intervals and timeouts", function() {});
	describe("Location Object", function() {
		describe("Query String arguments", function() {});
		describe("Manipulating Location", function() {});
		describe("Navigator Object", function() {});
	}); // location object end
	describe("History object", function() {});
}); // brwoser object model end