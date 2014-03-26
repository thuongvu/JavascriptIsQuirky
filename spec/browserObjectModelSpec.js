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
// TO DO
	describe("Intervals and timeouts", function() {
		it("You can set a timeout using window.setTimeout(), which accepts two arguemnts, the code to execute, and milliseconds to wait before execution", function() {
			setTimeout(function() {
			// execute something in 1000 milliseconds from now
			// console.log("This will appear in 1 second!");     // uncomment this to try it
			}, 1000);
		});
		it("When setTimeout() is called, it returns a numeric id for the timeout, and you can use clearTimeout() and pass in the timeout ID to cancel it", function() {
			// set timeout
			var myTimeout = setTimeout(function() {
				console.log("This should not appear because the clearTimeout will clear myTimeout.");
			}, 1000);

			// cancel it
			clearTimeout(myTimeout);
		});
	});
	it("setInterval can be used to execute code repeatedly until the interval is cancelled or page unloaded", function() {
		var numStart = 0;
		var numEnd = 10;
		function incrementNum() {
			numStart++;
			if (numEnd <= numEnd) {
				clearInterval(intervalId);
			};
		};

		intervalId = setInterval(incrementNum, 100);
	});
	describe("The Location Object", function() {
		describe("is a property of both the window and document, window.location and document.location point to the same object", function() {});
		describe("and it can parse the URL into discrete segments: hash, host, hostname, href, pathname, port, protocol, search", function() {});
		describe("Query String arguments with location.search returns everything from the question mark until the end of the url", function() {});
		describe("Manipulating Location", function() {
			it("You can use assign() or window.location, or location.href to change the browser location", function() {
																				// uncomment to try any of these
				// location.href = "http://google.com";			// most commonly used
				// window.location = "http://google.com";
				// location.assign("http://google.com");
			});
			it("You can change properties in the location object to change to different page, hash, search, hostname, pathname", function() {});
			it("location.replace() loads a new place, but doesn't place it in history", function() {
				// location.replace("http://google.com")			// uncomment to try
			});
			it("location.reload() can reload the displayed page, no arguments and it will reload from cache, pass 'true' and it will load from server", function() {
				// location.reload()										// uncomment to try
			});
		}); // manipulating location end
		describe("Navigator Object", function() {
			
		});
	}); // location object end
	describe("History object", function() {});
}); // brwoser object model end