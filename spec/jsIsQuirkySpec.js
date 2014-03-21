describe('Javascript: ', function() {

	describe('Data types:', function() {

		it('should have 5 primitive types, and a complex type, object', function() {
			var und;
			var bool = true;
			var str = 'hello world';
			var num = 5;
			var obj = {};

			expect(typeof und).toBe('undefined');
			expect(typeof bool).toBe('boolean');
			expect(typeof str).toBe('string');
			expect(typeof num).toBe('number');
			expect(typeof obj).toBe('object');

		});

		it('should have typeof null return object because it is an empty object reference', function() {
			var somethingNull = null;
			expect(typeof obj).not.toBe(undefined);
			expect(typeof somethingNull).toBe('object');
		});

	});
});