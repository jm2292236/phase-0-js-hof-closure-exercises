const { 
  forEach, 
  map, 
  filter, 
  every, 
  some, 
  majority, 
  once,
  groupBy,
  arrayToObject, 
} = require('../index.js');
const sinon = require('sinon'); 
const { expect } = require('chai');

describe('index.js', function(){
  describe('forEach', function() {
    var stub = sinon.stub(console, 'log');
    
    after(function() {
      stub.restore();
    })
    
    const array = [1, 2, 3];
    forEach(array, stub);

    it('calls the callback with the element, index, and original array', function() {
      expect(stub.withArgs(1, 0, array).calledOnce).to.be.true;
      expect(stub.withArgs(2, 1, array).calledOnce).to.be.true;
      expect(stub.withArgs(3, 2, array).calledOnce).to.be.true;
    })
  })

  describe('map', function() {
    const original = [1, 2, 3, 4, 5];
    const result = map(original, (el) => el * 2);

    it('returns a new array', function() {
      expect(result).to.not.equal(original);
    })

    it('applies calback to all elements in the new array', function() {
      expect(result).to.have.ordered.members([2, 4, 6, 8, 10]);
    })
  })

  describe('filter', function() {
    const original = [1, 2, 3, 4, 5];
    const result = filter(original, (el) => el % 2 === 0);

    it('returns a new array', function() {
      expect(result).to.not.equal(original);
    })

    it('keeps the elements that return true for the given callback', function() {
      expect(result).to.have.ordered.members([2, 4]);
    })
  })

  describe('every', function() {
    it('returns true when the callback returns true for all elements', function() {
      const original = ['ace', 'cat', 'dog', 'pit'];
      const result = every(original, (el) => el.length === 3);
      expect(result).to.be.true;
    })

    it("returns false when the callback doesn't return true for all elements", function() {
      const original = ['ace', 'cat', 'parrot', 'dog'];
      const result = every(original, (el) => el.length === 3);
      expect(result).to.be.false;
    })
  })

  describe('some', function() {
    it('returns true when the callback returns true for at least one element', function() {
      const original = [5, 7, 9, 13, 16, 17, 19, 21];
      const result = some(original, (el) => el % 2 === 0);
      expect(result).to.be.true;
    })

    it("returns false when the callback doesn't return true for any elements", function() {
      const original = [5, 7, 9, 13, 17, 19, 21];
      const result = some(original, (el) => el % 2 === 0);
      expect(result).to.be.false;
    })
  })

  describe('majority', function() {
    const original = [20, 21, 22, 23, 24, 25, 26, 27, 28];
    
    it('returns true if the callback returns true for the majority of elements', function() {
      const result = majority(original, (el) => el % 2 === 0);
      expect(result).to.be.true;
    })

    it("returns false if the callback doesn't return true for the majority of elements", function() {
      const result = majority(original, (el) => el % 2 !== 0);
      expect(result).to.be.false;
    })
  })

  describe('once', function() {
    const multiplyByTwo = function(num) {
      return num * 2;
    }
    const spy = sinon.spy(multiplyByTwo);
    
    const multiplyByTwoOnce = once(spy);
    let resCall1
    let resCall2
    let resCall3
    
    if (multiplyByTwoOnce instanceof Function) {
      resCall1 = multiplyByTwoOnce(5);
      resCall2 = multiplyByTwoOnce(10);
      resCall3 = multiplyByTwoOnce(12);
    }

    it('returns a function', function() {
      expect(multiplyByTwoOnce).to.be.a('function');
    })

    it('returns the correct result by calling the callback', function() {
      expect(resCall1).to.equal(10);
    })

    it('called the callback only once', function() {
      expect(spy.calledOnce).to.be.true;
    })

    it('returns the saved result on subsequent calls', function() {
      expect(resCall2).to.equal(10);
      expect(resCall3).to.equal(10);
    })
  })

  describe('groupBy', function() {
    const input = [4.2, 6.1, 6.3];
    const result = groupBy(input, (el) => Math.floor(el));
    
    it('returns an object', function() {
      expect(result).to.be.an('object');
    })
    

    it('group array items together based on the callback return value', function() {
      expect(result).to.be.eql({
        4: [4.2],
        6: [6.1, 6.3]
      })
    }) 
  })

  describe('arrayToObject', function() {
    const input = ['cat', 'dog', 'bird'];
    const result = arrayToObject(input, (word) => word + 's');

    it('returns an object', function() {
      expect(result).to.be.an('object');
    })

    it('object has original array elements as keys and the result of the callback as values', function() {
      expect(result).to.be.eql({
        'cat': 'cats',
        'dog': 'dogs',
        'bird': 'birds',
      })
    })
  })
})
