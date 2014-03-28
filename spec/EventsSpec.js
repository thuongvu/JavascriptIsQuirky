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
				domLevelZeroEventBtn.click();

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
		describe("DOM level 2 Event Handlers", function() {
			describe("uses addEventListener and removeEventListener(), methods that exist on all DOM nodes, accept 3 arguments: event name to handle, event handler function, boolean value: call event handler on capture phase (true) vs during bubble phase (false)", function() {
				it("With addEventListener(), you can add multiple event handlers, and they fire off in the order they were added", function() {
					var element = null;
					var clicked = false;

					// get the reference of the DOM node
					var domLevelTwoEventBtn = document.getElementById("domLevelTwoEventBtn");
					
					// add event listener, pass click, a function, and then false so it will call the event during bubble phase				
					domLevelTwoEventBtn.addEventListener("click", function() {
						element = this.id;
					}, false);
					domLevelTwoEventBtn.addEventListener("click", function() {
						clicked = true;
					}, false);

					// click it
					domLevelTwoEventBtn.click();

					// yes, it works
					expect(element).toBe("domLevelTwoEventBtn");
					expect(clicked).toBe(true);

				});
				it("removeEventListener can remove an event handler by passing in the same arguemtns as were used when the handler was added, and anonymous functions cannot be removed, because they are different functions", function() {
					var clicked = 0;
					var domLevelTwoEventBtn = document.getElementById("domLevelTwoEventBtn")
					domLevelTwoEventBtn.addEventListener("click", function() {
						clicked++;
					}, false);

					domLevelTwoEventBtn.click();
					expect(clicked).toEqual(1);

					// attempting to remove the event handler
					domLevelTwoEventBtn.removeEventListener("click", function() {
						clicked++;
					}, false);

					// trying to invoke the function that should be deleted, but it's still there
					domLevelTwoEventBtn.click();
					expect(clicked).toEqual(2);

				});
				it("Let's try removeEventListener with a named function now", function() {
					var clicked = 0;
					// declaring function
					var clickAdd = function() {
						clicked++;
					};	
					// adding the event listener
					var domLevelTwoEventBtn = document.getElementById("domLevelTwoEventBtn");
					domLevelTwoEventBtn.addEventListener("click", clickAdd, false);

					// invoking the function
					domLevelTwoEventBtn.click();
					expect(clicked).toEqual(1);

					// remove NAMED eventListener
					domLevelTwoEventBtn.removeEventListener("click", clickAdd, false);

					// try to invoke function
					domLevelTwoEventBtn.click();

					// but clicked does not incremenet, and therefore the eventListener has been removed
					expect(clicked).toEqual(1);

				});
			});
		});
		describe("Internet Explorer Event Handlers", function() {
			describe("have similar methods called attachEvent() and detachEvent(), which accept two arguments, event handler name, and event handler function, no boolean because IE only supports event bubbling, not event capturing", function() {
				it("Add an event handler with attachEvent(),", function() {
					// won't work unless in IE, uncomment to try
					// var clicked = 0;

					// var domLevelTwoEventBtn = document.getElementById("domLevelTwoEventBtn");
					// domLevelTwoEventBtn.attachEvent("onclick", function() {
							// clicked++;
					// });

					// expect(clicked).toEqual(1);


				// also, take note that it is 'onclick', and not 'click', as addEventListener.  
				});
				it("The attachEvent() handler runs in the global context, so its this value == window, vs DOMLevel2 where this value == element, or even DOMLevel1 where this == element", function() {
					// // won't work unless in IE, uncomment to try
					// var clicked = null;
					// var domLevelTwoEventBtn = document.getElementById("domLevelTwoEventBtn");
					// domLevelTwoEventBtn.attachEvent("onclick", function() {
					// 	clicked = this;
					// });
					// domLevelTwoEventBtn.click();

					// expect(clicked).toBe(window);
				});
				it("When two attachEvent() handlers are added to the same element, the event handlers fire in reverse order they were added, unlike DOMLevel2", function() {});
				it("The detachEvent() method can remove attachEvent()'s only if they are named functions, similarly to removeEventListener()", function() {
					// // won't work unless in IE, uncomment to try
					// var clicked = 0;
					// var domLevelTwoEventBtn = document.getElementById("domLevelTwoEventBtn");
					// // declaring function to invoke when 'onclick'd
					// function clickIncrement() {
					// 	clicked++;
					// };
					// // attach event
					// domLevelTwoEventBtn.attachEvent("onclick", clickIncrement);

					// // invoke it
					// domLevelTwoEventBtn.click();
					// expect(clicked).toEqual(1);				

					// // detach event
					// domLevelZeroEventBtn.detachEvent("onclick", clickIncrement);

					// // try to click it again, and expect clicked to remain 1
					// domLevelTwoEventBtn.click();
					// expect(clicked).toEqual(1);	

				});

			});
		});
		describe("Cross browser event handlers", function() {
			it("It must work on the bubbling phase, and have AddHandler() and removeHandler(), which accept 3 arguments: element to act upon, name of event, event handler function", function() {
				var EventUtil = {
					addHandler: function(element, type, handler) {
						if (element.addEventListener) {
							element.addEventListener(type, handler, false);
						} else if (element.attachEvent) {
							element.attachEvent("on" + type, handler);
						} else {
							element["on" + type] = handler;
						};
					},

					removeHandler: function(element, type, handler) {
						if (element.removeEventListener) {
							element.removeEventListener(type, handler, false);
						} else if (element.detachEvent) {
							element.detachEvent("on" + type, handler);
						} else {
							element["on" + type] = null;
						};
					}
				};

				// try it out
				var clicked = 0; // for test
				// get element
				var domLevelTwoEventBtn = document.getElementById("domLevelTwoEventBtn");
				// handler
				var clickIncrement = function() {
					clicked++;
				};
				// use the utility method to attach handler
				EventUtil.addHandler(domLevelTwoEventBtn, 'click', clickIncrement);
				// invoke function
				domLevelTwoEventBtn.click();
				domLevelTwoEventBtn.click();
				// yes, it works!
				expect(clicked).toEqual(2);


				// remove the eventHandler now
				EventUtil.removeHandler(domLevelTwoEventBtn, 'click', clickIncrement);
				domLevelTwoEventBtn.click();
				expect(clicked).toEqual(2);
			});
		});
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



