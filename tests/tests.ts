import { String } from '../dist/index';
import { Fruit } from './fruit';
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

describe('String.Format Number Pattern', () => {
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
        describe('dates', () => {
            it('should set the correct display date using Date', () => {
                let template = "{0:d}";
                let valueToInsert = new Date(2017, 4, 13);

                let expectedValue = "13.04.2017";
                let result = String.Format(template, valueToInsert);
                console.log(result);
                expect(result).to.equal(expectedValue);
            });

            it('should set the correct sortable date using Date', () => {
                let template = "{0:s}";
                let valueToInsert = new Date(2017, 4, 13);

                let expectedValue = "2017-04-13";
                let result = String.Format(template, valueToInsert);
                console.log(result);
                expect(result).to.equal(expectedValue);
            });

            it('should set the correct display date using string', () => {
                let template = "{0:d}";
                let valueToInsert = '2017-01-23 00:00';

                let expectedValue = "23.01.2017";
                let result = String.Format(template, valueToInsert);
                console.log(result);
                expect(result).to.equal(expectedValue);
            });

            it('should set the correct sortable date using string', () => {
                let template = "{0:s}";
                let valueToInsert = '21.03.2017 22:15:01';

                let expectedValue = "2017-03-21T22:15:01";
                let result = String.Format(template, valueToInsert);
                console.log(result);
                expect(result).to.equal(expectedValue);
            });

            it('should set the correct sortable date without time using string', () => {
                let template = "{0:s}";
                let valueToInsert = '21.03.2017';

                let expectedValue = "2017-03-21T00:00:00";
                let result = String.Format(template, valueToInsert);
                console.log(result);
                expect(result).to.equal(expectedValue);
            });
        });

        describe('uppercasing', () => {
            it('should return the string as uppercase', () => {
                let expectedValue = 'AWESOME';
                let template = '{0:U}';
                let valueToInsert = 'awesome';

                let actual = String.Format(template, valueToInsert);

                expect(actual).to.equal(expectedValue);
            });

            it('should return the string as lowercase', () => {
                let expectedValue = 'awesome';
                let template = '{0:L}';
                let valueToInsert = 'AWESOME';

                let actual = String.Format(template, valueToInsert);

                expect(actual).to.equal(expectedValue);
            });
        });

        describe('numbers', () => {

            it('should not pad without specifier using {0}', () => {
                let template = '{0}';
                let result = String.Format(template, 5);
                expect(result).to.equal('5');
            });

            it('should pad 5 to 05 using {0:00}', () => {
                let template = '{0:00}';
                let result = String.Format(template, 5);
                expect(result).to.equal('05');
            });

            it('should pad 5 to 005 using {0:000}', () => {
                let template = '{0:000}';
                let result = String.Format(template, 5);
                expect(result).to.equal('005');
            });

            it('should ignore padding when input is longer then template', () => {
                let template = '{0:000}';
                let result = String.Format(template, 50000);
                expect(result).to.equal('50000');
            });

            it('should set the correct thousands seperator', () => {
                let template = '{0:n}';
                let valueToInsert = '10000000000';
                let expectedValue = '10.000.000.000';

                let result = String.Format(template, valueToInsert);

                expect(result).to.equal(expectedValue);
            });
            it('should set the correct thousands seperator keeping the decimals', () => {
                let template = '{0:n}';
                let valueToInsert = '10000000000,12345';
                let expectedValue = '10.000.000.000,12345';

                let result = String.Format(template, valueToInsert);

                expect(result).to.equal(expectedValue);
            });
        });
    });

});

describe('String.Format Text Pattern', () => {
    describe("formatting", () => {
        it("Should parse out the word", () => {
            // Arrange
            var fruit = { type: "apple", color: "red" };

            // Act
            var formatted = String.Format("the {type} is {color}", fruit);

            // Assert
            expect(formatted).to.equal("the apple is red");
        });

        it("Should parse out the word with specifiers and TS Class", () => {
            // Arrange
            var fruit: Fruit = new Fruit("apple", "RED", "31.12.2018 01:02:03", "10000");

            // Act
            var formatted = String.Format("the {type:U} is {color:L} shipped on {shippingDate:s} with an amount of {amount:n}", fruit);

            // Assert
            expect(formatted).to.equal("the APPLE is red shipped on 2018-12-31T01:02:03 with an amount of 10.000");
        });
    });
});

describe('String.Join', () => {
    it('should join the given strings passed as args', () => {
        let stringOne = "red", stringTwo = "yellow", stringThree = "blue";

        let result = String.Join('; ', stringOne, stringTwo, stringThree);

        expect(result).to.equal("red; yellow; blue");
    });

    it('should join the given array', () => {
        let object = ["red", "yellow", "blue"];
        let result = String.Join('; ', object);
        expect(result).to.equal("red; yellow; blue");
    });

    it('should join the given object', () => {
        let object = { Name: "Foo", Value: "Bar" };
        let result = String.Join('.', object);

        console.log(result);
        expect(result).to.equal("Foo.Bar");
    });
});