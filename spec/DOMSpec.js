describe("", function() {});
describe("The DOM", function() {
	describe("Node relationships", function() {
		it("Each node has a childNodes property containing NodeList", function() {
			// it is an array like object that can be accessed through bracket notation, but it is not an array
			// it is a current reprentation of nodes
			var bodyNode = document.documentElement.childNodes[2];
			function convertToArray(node) {
				return Array.prototype.slice.call(node, 0);
			}; 
			var arrayNodes = convertToArray(bodyNode.childNodes);

			expect(arrayNodes.length).toBeGreaterThan(0);	// we expect to see more than one childNode 

			// console.log(arrayNodes)								// uncomment to see this in the console
		});
	}); // node relationships end
	
}); // THE DOM END 
describe("", function() {});