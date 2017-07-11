import { String } from '../source/source';
import { expect } from 'chai';
import 'mocha';


describe('String.IsNullOrWhitespace', () => {

    it('should return true on null string', () => {
        let teststring = null;
        let result = String.IsNullOrWhiteSpace(teststring);
        expect(result).to.equal(true);
    });

    it('should return true on empty string', () => {
        let teststring = '';
        let result = String.IsNullOrWhiteSpace(teststring);
        expect(result).to.equal(true);
    });

    it('should return true only whitespace', () => {
        let teststring = '    ';
        let result = String.IsNullOrWhiteSpace(teststring);
        expect(result).to.equal(true);
    });

    it('should return false contains non-whitespace characters', () => {
        let teststring = '  s  ';
        let result = String.IsNullOrWhiteSpace(teststring);
        expect(result).to.equal(false);
    });
});

describe('String.Format', () => {
    describe('Placeholders', () => {
        it('should format the string correct', () => {
            let template = "{0}";
            let valueToInsert = "Foo";
            let result = String.Format(template, valueToInsert);
            expect(result).to.equal(valueToInsert);
        });

        it('should format the string correct multiple times', () => {
            let template = "{0}Bar{0}";
            let valueToInsert = "Foo";
            let expectedValue = "FooBarFoo";
            let result = String.Format(template, valueToInsert);
            expect(result).to.equal(expectedValue);
        });

        it('should format the string correct multiple values', () => {
            let template = "{0}Bar{1}";
            let valueToInsert = "Foo";
            let secondValueToInsert = "Baz";
            let expectedValue = "FooBarBaz";
            let result = String.Format(template, valueToInsert, secondValueToInsert);
            expect(result).to.equal(expectedValue);
        });
    });
    describe('formating', () => {
        it('should format the string correct multiple values', () => {
            let template = "{0:d}{1}";
            let valueToInsert = new Date(2017, 4, 13, 4, 15);

            let expectedValue = "13.04.2017";
            let result = String.Format(template, valueToInsert);
            expect(result).to.equal(expectedValue);
        });
        describe('numbers', () => {
            it('should pad with one zero', () =>{
                let template = '{0:00}';
                let result = String.Format(template, 5);
                expect(result).to.equal('05');
            });
            it('should pad with two zero', () =>{
                let template = '{0:000}';
                let result = String.Format(template, 5);
                expect(result).to.equal('005');
            });
        });
    });
});