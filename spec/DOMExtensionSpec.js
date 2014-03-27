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
			describe("getElementsByClassName() method", function() {});
			describe("classList property", function() {});
		}); // Class end
		describe("Changes to HTML5 Document", function() {
			describe("Focus", function() {});
			describe("readyState property", function() {});
			describe("Markup insertion", function() {
				describe("innerHTML", function() {});
				describe("outerHTML", function() {});
				describe("insertAdjacentHTML()", function() {});
			});
		}); // Changes to HTML5 Document end
	}); // HTML5 end
	describe("Propietary extensions", function() {
		describe("children Property", function() {});
		describe("contains() method", function() {});
	}); // Propietary extensions end
}); //"DOM Extensions" end




describe("", function() {});
it("", function() {});