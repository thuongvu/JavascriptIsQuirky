describe("", function() {});
it("", function() {});

function htmlEventOnclick(event) {
	console.log("htmlEventOnclick clicked, and the event is");
	console.log(event);
};
describe("Events", function() {
	describe("Event Handlers", function() {
		describe("HTML Event Handlers", function() {
			describe("with event handlers defined in html attributes, they are are wrapped in a function, and have access to the event object", function() {});
			describe("Also, within this function, document and the element itself can be accessed as if they were local variables", function() {});
			describe("Cons", function() {
				describe("The user might try to interact with the element before the event handler is ready, you can deal with this by try/catching it", function() {});
				describe("The augmentation of scope chain in the event handler function varies across browsers", function() {});
				describe("It couples the html to javascript, so you'd have to change event handler in html + in js", function() {});
			});
		});
		describe("DOM level 0 Event Handlers", function() {
			it("Assigning an event handler", function() {
				var clicked = 0;
				expect(clicked).toEqual(0);

				// get a reference to the object
				var domLevelZeroEventBtn = document.getElementById("domLevelZeroEventBtn");

				// add it as a method
				domLevelZeroEventBtn.onclick = function() {
					clicked = 1;
				};
				domLevelZeroEventBtn.onclick();
				expect(clicked).toEqual(1);

				// the onclick event hndler isn't assigned until the code is run, so if the user interacts with the page bfore its loaded, the nthe button won't do anything
			});
			it("The event handler is considereda method of the element, therefore it is run within the scope of the element, with this = element", function() {
				var domLevelZeroEventBtn = document.getElementById("domLevelZeroEventBtn");
				var clicked = null;
				domLevelZeroEventBtn.onclick = function() {
					clicked = this.id;
				};
				domLevelZeroEventBtn.onclick();

				expect(clicked).toBe('domLevelZeroEventBtn');
			});
			it("You can remove an event handler assigned via DOM Level 0 by seeting the value of the event handler property to 0", function() {
				var domLevelZeroEventBtn = document.getElementById("domLevelZeroEventBtn");
				var clicked = 0;
				domLevelZeroEventBtn.onclick = function() {
					clicked++;
				};
				domLevelZeroEventBtn.onclick();

				expect(clicked).toEqual(1);

				// remove the event listener
				domLevelZeroEventBtn.onclick = null;

				// let's try to invoke the onclick again - it will throw an error
				expect(function() {

					domLevelZeroEventBtn.onclick();

				}).toThrow(new TypeError("Property 'onclick' of object #<HTMLButtonElement> is not a function"))

			});
			
		});
		describe("DOM level 2 Event Handlers", function() {});
		describe("Internet Explorer Event Handlers", function() {});
		describe("Cross browser event handlers", function() {});
		describe("Event/DOM Event object", function() {});
		describe("Internet Explorer Event Object", function() {});
		describe("Cross-browser Event Object", function() {});
		describe("Event Types", function() {
			describe("UI", function() {});
			describe("Focus", function() {});
			describe("Wheel", function() {});
		});
		describe("HTML5 Events", function() {
			describe("BeforeUnload", function() {});
			describe("DOMContentLoaded Event", function() {});
			describe("readystatechange Event", function() {});
			describe("pageshow/pagehide Event", function() {});
			describe("hashchange Event", function() {});
		});
		describe("Memory and performance", function() {
			describe("Event delegation", function() {});
			describe("Removing event handlers", function() {});
			describe("Custom DOM events", function() {});
		});
	});
});







describe("", function() {});
it("", function() {});




