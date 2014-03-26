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

	}); // manipulating nodes end
}); // THE DOM END 
describe("", function() {});



















