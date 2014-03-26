describe("", function() {});
describe("The DOM", function() {
	describe("Node relationships", function() {
		// body node
		var bodyNode = document.documentElement.childNodes[2];

		it("Each node has a childNodes property containing NodeList", function() {
			// it is an array like object that can be accessed through bracket notation, but it is not an array
			// it is a current reprentation of nodes

			// function to convert a node Object to an array representation
			function convertToArray(node) {
				return Array.prototype.slice.call(node, 0);
			};

			// body node converted to an array
			var arrayNodes = convertToArray(bodyNode.childNodes);

			// we expect to see more than one childNode on body element
			expect(arrayNodes.length).toBeGreaterThan(0);	

			// console.log(arrayNodes)								// uncomment to see this in the console
		});
		it("Each node within a childNodes list is considered to be a sibling of the other codes in the same list, and you can use use the previousSibling and nextSibling properties to navigate the list", function() {
			// second node of body is bodyNode.childNodes[1];
			expect(bodyNode.childNodes[1].nextSibling).toBe(bodyNode.childNodes[2]);
			expect(bodyNode.childNodes[1].previousSibling).toBe(bodyNode.childNodes[0]);
		});
		it("The firstChild and lastChild properties point to the first and last node in the childNodes list", function() {
			expect(bodyNode.firstChild).toBe(bodyNode.childNodes[0]);
			expect(bodyNode.lastChild).toBe(bodyNode.childNodes[bodyNode.childNodes.length - 1]);
		});
		it("If there are no children, firstChild and lastChild will return null", function() {
			expect(bodyNode.childNodes[1].childNodes[0].firstChild).toBe(null);
			expect(bodyNode.childNodes[1].childNodes[0].lastChild).toBe(null);
		});
		it("If there is only one child, firstChild and lastChild will point to the same node", function() {
// TO DO		
		});
		it("hasChildNode() returns true if a node has one or more child nodes", function() {
			expect(bodyNode.hasChildNodes()).toBe(true);
		});

	}); // node relationships end
	describe("Manipulating nodes", function() {
		describe("appendChild() adds a node to the end of childNodes list, and it returns the newly added node", function() {});
		describe("If the node passed in already exists in the document, it's moved to the new location", function() {});
		describe("The insertBefore() method places the node at a specific location, and accepts 2 arguments: the node to insert, and a reference node", function() {});
		describe("The node to insert becomes the previousSibling of the reference node", function() {});
		describe("If there's no reference node, then insertBefore() acts like appendChild()", function() {});
		describe("replaceChild() accepts two arguments, the node to insert, and the node to replace", function() {});
		describe("removeChild() accepts a single argument,the node to remove", function() {});
		describe("cloneNode() creates an exact copy of a node, accepts a boolean argument.  If true, it clones the node and entire subtree.  If false, only the initial node.", function() {});
		describe("normalize() searches a node and its descendants, and if empty text nodes are found, they are removed, and if text nodes are siblings, they're goined together into a single text node", function() {});
	}); // manipulating nodes end
	describe("Javascript represents document nodes with the Document type.  document, lowercase, is an object, a property of the window object.", function() {});
	describe("Document children", function() {
		it("The document.documentElement property points to the <html> element of a page", function() {
			expect(document.childNodes[1]).toBe(document.documentElement);
		});
		it("The document.body property points to the <body> element of a page", function() {
			expect(document.childNodes[1].childNodes[2]).toBe(document.body);
		});
	}); // document children end
	describe("Document information", function() {
		it("document.URL returns the full URL", function() {});
		it("document.domain returns the domain", function() {});
		it("document.referrer returns the referrer, if there is one", function() {});
	}); // document information end
	describe("Locating elements", function() {
		it("getElementById() accepts one argument, the ID of an element to retrieve, and if none, will return null, else, reference to element", function() {
			expect(document.getElementById("div1")).not.toBe(null); // it retrieves reference to div1
			expect(document.getElementById("fakeId")).toBe(null);
		});
		it("getElementsByTagName() accepts one argument, the tag name of the elements to retrieve, and returns a nodeList containing 0 or more elements", function() {
			expect(	document.getElementsByTagName('div').length	).toBeGreaterThan(2);
		});
		it("namedItem() lets you reference an item in the collection via name attribute", function() {});
		it("To retrieve all elements in the document, pass in * to getElementsByTagName() ", function() {});
		it("getElementsByName() returns all elements that have a given name attribute", function() {});
		describe("documents.anchors = a elements that have a name attribute, document.forms = forms, document.images = img elements, document.links = a elements", function() {});
	}); // locating elements end
	describe("Document writing", function() {
		describe("document.write() adds text as is, writeIn() appends a new line '\n' afterwards", function() {});
		describe("If it's loaded after the page loads, it will overwrite it all, it must output to the page as its being rendered", function() {});
	}); // document writing end
	describe("The element type", function() {
		describe("The Element type is most often used in web development", function() {});
		it("An element's tag name is accessed via nodeName property or tagName property", function() {
			var div1 = document.getElementById("div1");
			// we expect it to return DIV, all caps, instead of div
			expect(div1.tagName).toBe("DIV");
			expect(div1.nodeName).toBe("DIV");
		});
	});
	describe("HTML Elements", function() {
		describe("are represented by the HTMLElement type, and it inherits from Element and adds several properties, available on every html element: id, title, lang, dir, className", function() {});
		it("Information specified on the element may be retrieved via properties: .id, .className, .title, .lang, .dir", function() {
			var div1 = document.getElementById("div1");
			expect(div1.className).toBe("divClass");
			expect(div1.id).toBe("div1");
		});
		it("You can also change element attributes by assigning new values to those properties", function() {
			// before change
			var div1 = document.getElementById("div1");
			expect(div1.className).toBe("divClass");
			expect(div1.id).toBe("div1");
			// changing it
			div1.className = "divClassChanged"
			div1.id = "div1Changed";
			// checking after it has changed
			expect(div1.id).toBe("div1Changed");
			expect(div1.className).toBe("divClassChanged");
			// changing it back for sanity
			div1.className = "divClass"
			div1.id = "div1";
		});
	});
}); // THE DOM END 
describe("", function() {});
it("", function() {});



















