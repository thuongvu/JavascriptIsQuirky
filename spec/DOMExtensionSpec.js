describe("", function() {});
describe("DOM Extensions", function() {
	describe("Selectors API", function() {
		it("The querySelector() Method accepts a css query and returns the first descendant element that matches the pattern, else null", function() {
			var body = document.querySelector("body");

			var div1 = document.querySelector("#div1");
			expect(div1.id).toBe("div1");

			var li = document.querySelector("ul li");
			expect( li.childNodes[0].data ).toBe("1"); // i expect the text in the first ul > li to be "1"
		});
		it("The querySelectorAll() Method accepts one argument, a css query, and returns all matching nodes as a NodeList object, else null", function() {
			var li = document.querySelectorAll("#div1 ul li");
			expect(li.length).toEqual(3);
		});
		describe("Element Traversal", function() {
			it("5 properties of DOM elements: childElementcount, firstElementChild, lastElementChild, previousElementSibling, nextElementSibling", function() {
				var ul = document.querySelector("#div1 ul");
				expect(ul.childElementCount).toEqual(3); 									// 3 li's
				expect(ul.firstElementChild.childNodes[0].data).toEqual("1");		// first li
				expect(ul.lastElementChild.childNodes[0].data).toEqual("3");		// third li
				var firstLi = ul.firstElementChild;											// 1st li
				var secondLi = firstLi.nextElementSibling;
				var thirdLi = ul.lastElementChild;
				var anotherSecondLi = thirdLi.previousElementSibling;
				expect(secondLi.childNodes[0].data).toEqual("2");
				expect(anotherSecondLi.childNodes[0].data).toEqual("2");
			});
		});
	}); // selectors API end
	describe("HTML5", function() {
		describe("Class", function() {
			it("getElementsByClassName() method accepts one argument, a string of one or more class names, and returns a NodeList of all elements that have all the classes", function() {
				var div2 = document.getElementById("div2");
				var helloWorldInDiv2 = div2.getElementsByClassName("helloWorld");
				expect(helloWorldInDiv2).not.toBe(null);
			});
			describe("The classList property", function() {
				it("is used to check, add, remove, and toggle class names", function() {
					var helloWorldClass = document.getElementsByClassName("helloWorld")[0];

					// classList.add
					expect(helloWorldClass.classList.contains("disabled")).toBe(false); // classList.contains
					helloWorldClass.classList.add("disabled");								  
					expect(helloWorldClass.classList.contains("disabled")).toBe(true);					
					
					// class.List.toggle
					helloWorldClass.classList.toggle("blue");									
					expect(helloWorldClass.classList.contains("blue")).toBe(true);
					helloWorldClass.classList.toggle("blue");	
					expect(helloWorldClass.classList.contains("blue")).toBe(false);

					// classList.remove()
					helloWorldClass.classList.remove("disabled");	
					expect(helloWorldClass.classList.contains("disabled")).toBe(false);
				});
			});
		}); // Class end
		describe("Changes to HTML5 Document", function() {
			describe("Focus", function() {
				describe("document.activeElement always has an active poiter to the DOM elemnet that has focus", function() {});
				it("You can use the focus() method to programmatically give an element focus", function() {
// TO DO THIS ISNT WORKING				
					var input = document.getElementById("inputForFocus");
					input.focus();
					// console.log(document.activeElement === input);
				});
			});
			it("The readyState property on the document object indiates when the document has fully loaded", function() {
				var ready = false;

				expect(ready).toBe(false);

				if (document.readyState == "complete") {
					ready = true;
				};

				expect(ready).toBe(true);
			});
			describe("Markup insertion", function() {
				describe("innerHTML is the html within an element", function() {
					it("in read mode, returns html representing all of the child nodes, including elements, comments, and text nodes", function() {
						var helloWorld = document.getElementsByClassName("helloWorld")[0];
						expect(helloWorld.innerHTML).toBe("Hello world");
					});
					it("in write mode, replaces all of the child nodes in the element with a new DOM subtree based on the specified value", function() {
						var helloWorld = document.getElementsByClassName("helloWorld")[0];
						helloWorld.innerHTML = "This text is no longer hello world!";
						expect(helloWorld.innerHTML).toBe("This text is no longer hello world!");
					});
				});
				it("outerHTML is the html within an element, including the element itself, used when you want to replace the entire element and its contents", function() {
// TO DO DOESNT WORK YET
					// var helloWorld = document.getElementsByClassName("helloWorld")[0];
					// helloWorld.outerHTML = "<p>This will replace</p>";
					// console.log(helloWorld);
				});
				describe("insertAdjacentHTML() accepts two arguments, the position in which to insert, and the html text to insert", function() {
// TO DO					
					// position can be:
					// "beforebegin" - insert before the element as a previous sibling
					// "afterbegin" - insert just inside of the elemnt as a new child or series of chidren before the first child
					// "beforeend" - insert just inside of the elemnt as a new child or series of children after the last child
					// "afterend" - insert just after the element as a next sibling
				});
			});
		}); // Changes to HTML5 Document end
	}); // HTML5 end
	describe("Propietary extensions", function() {
		describe("The children Property", function() {
			it("is an HTMLCollection that contains only an element's child nodes that are also elements", function() {
				var ul = document.getElementById("div1").childNodes[1];
				var ulChildren = ul.children;
				expect(ulChildren.length).toEqual(3);
			});
		});
		describe("contains() method", function() {});
	}); // Propietary extensions end
}); //"DOM Extensions" end




describe("", function() {});
it("", function() {});


