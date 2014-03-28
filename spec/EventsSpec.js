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
				// try to invoke the click again
				domLevelTwoEventBtn.click();
				// clicked var remains the same, it works!
				expect(clicked).toEqual(2);
			});
		});
		describe("Event/DOM Event object", function() {
			it("No matter level 1 or level 2, when a DOM event is fired, all information is gathered and stored on an event called event", function() {
				var domLevelTwoEventBtn = document.getElementById("domLevelTwoEventBtn");
				var currentTarget, eventPhase, eventTarget, eventType, that = null;

				domLevelTwoEventBtn.addEventListener("click", function(event) {
					currentTarget = event.target;			// 1
					eventPhase = event.eventPhase;		// 2 
					eventTarget = event.target;			// 3
					typeOfEvent = event.type;				// 4
					that = this;								// 5
				}, false);

				domLevelTwoEventBtn.click();

				expect(currentTarget).toBe(domLevelTwoEventBtn);
				expect(eventPhase).toBe(2);
				expect(eventTarget).toBe(domLevelTwoEventBtn)
				expect(typeOfEvent).toBe("click");
				expect(that).toBe(domLevelTwoEventBtn);

				// 1 currentTarget is the element whose event handler is currently handling the event
				// 2 eventPhase is the phase during which event handler is being called, 1 capturing, 2 at target, 3 bubbling
				// 3 target is the target of the event
				// 4 type is the etype of event fired
				// 5 this is the value of currentTarget
				// in this case, currentTarget, target, and this share the same value, because the event handler was assigned directly onto the target
			});
			it("the event.currentTarget, target, and this may not be equal is the evnet handler exists on the parent node", function() {
				var currentTarget, that, target = null;
				// add eventHandler
				document.body.onclick = function(event) {
					currentTarget = event.currentTarget;
					that = this;
					target = event.target;
				};
				// click
				document.body.click();
				// we invoked the click from document.body
				expect(currentTarget).toBe(document.body);
				expect(that).toBe(document.body);
				expect(target).toBe(document.body);



				//  if the event handler is on the parent node of the button, now THIS and CURRENTARGET are equal to document.body
				// remember that 'this' points to the value of currentTarget, and currentTarget points to the element whose event handler is currently handling the event
				// but the target is the target of the event, in this case below, the button element itself
				// since the button doesn't have an event handler assigned, the click event bubbles up to document.body, which handles the event
				var domLevelTwoEventBtn = document.getElementById("domLevelTwoEventBtn");
				domLevelTwoEventBtn.click();
				expect(currentTarget).toBe(document.body);
				expect(that).toBe(document.body);
				expect(target).toBe(domLevelTwoEventBtn);
			});
			it("the event.type property is useful to assign a single funtion to handle multiple events", function() {
				var clicked = 0;
				var domLevelTwoEventBtn = document.getElementById("domLevelTwoEventBtn");
				var handler = function(event) {
					switch(event.type) {
						case "click":
							clicked++;
							break;
						case "mouseover":
							event.target.style.backgroundColor = "red";
							break;
						case "mouseout":
							event.target.style.backgroundColor = "";
							break;
					};
				};

				domLevelTwoEventBtn.onclick = handler;
				domLevelTwoEventBtn.onmouseover = handler;
				domLevelTwoEventBtn.onmouseout = handler;

				domLevelTwoEventBtn.click();
				expect(clicked).toEqual(1);

				// can't test mouseover, TO DO

			});
			it("preventDefault is used to prevent the default action of a particular event", function() {
				var googleLink = document.getElementById("googleLink");
				// if you commented this out, the page will redirect to google.com
				googleLink.onclick = function(event) {
					event.preventDefault();
				}
				// if you commented this out, the page will redirect to google.com
				googleLink.click();
			});
			it("Normally, an event bubbles up", function() {
				var btnClicked = 0;
				var documentBodyClicked = 0;
				var domLevelTwoEventBtn = document.getElementById("domLevelTwoEventBtn");
				domLevelTwoEventBtn.onclick = function(event) {
					btnClicked++;
				};
				document.body.onclick = function(event) {
					documentBodyClicked++;
				};

				domLevelTwoEventBtn.click();

				expect(btnClicked).toEqual(1);
				expect(documentBodyClicked).toEqual(1);

				// we didn't invoke a click on document.body, but the event bubbled up
			});
			it("stopPropagation() stops the flow of an event through the DOM immediately, cancelling any further event capturing or bubbling before it occurs", function() {
				// same as the last example, event we add stopPropagation() method on event for domLEvelTwoEventsBtn.onclick
				var btnClicked = 0;
				var documentBodyClicked = 0;
				var domLevelTwoEventBtn = document.getElementById("domLevelTwoEventBtn");
				domLevelTwoEventBtn.onclick = function(event) {
					btnClicked++;
					event.stopPropagation();				// what we added
				};
				document.body.onclick = function(event) {
					documentBodyClicked++;
				};

				domLevelTwoEventBtn.click();

				expect(btnClicked).toEqual(1);
				expect(documentBodyClicked).toEqual(0);	// this time, the event does not bubble up, stopping the event handler on document.body from being fired

			});
			it("eventPhase helps determine what phase of event flow is currently active, 1 = capture, 2 = target, 3 = bubble", function() {
				var orderEventPhase = [];
				var domLevelTwoEventBtn = document.getElementById("domLevelTwoEventBtn");
				domLevelTwoEventBtn.onclick = function(event) {
					orderEventPhase.push("domLevelTwoEventBtn: " + event.eventPhase);
				};

				document.body.addEventListener("click", function(event) {
					orderEventPhase.push("document.body: " + event.eventPhase);
				}, true);

				document.body.onclick = function(event) {
					orderEventPhase.push("document.body: " + event.eventPhase);
				};

				domLevelTwoEventBtn.click();

				expect(orderEventPhase).toMatch(["document.body: 1", "domLevelTwoEventBtn: 2", "document.body: 3"] );
				// when the button is clicked, the first event handler to fire is the document.body in capture phase, eventPhase is 1
				// then the event handler on the button is fired, eventPhase is 2
				// the last event handler is during the bubbling phase of document.body, and the eventPhase is 3
			});

		});
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




