import { String, StringBuilder, isNullOrWhiteSpace, formatString, joinString, newLine } from '..';
import { Fruit } from './fruit';
import { expect } from 'chai';
import 'mocha';

describe('String.IsNullOrWhitespace', () => {

    it('should return true on null string', () => {
        const teststring: string | null = null;
        let result = String.IsNullOrWhiteSpace(teststring);

        expect(result).to.equal(true);
        result = String.isNullOrWhiteSpace(teststring);
        expect(result).to.equal(true);
        result = isNullOrWhiteSpace(teststring);
        expect(result).to.equal(true);
    });

    it('should return true on empty string', () => {
        const teststring = '';
        let result = String.IsNullOrWhiteSpace(teststring);

        expect(result).to.equal(true);
        result = String.isNullOrWhiteSpace(teststring);
        expect(result).to.equal(true);
        result = isNullOrWhiteSpace(teststring);
        expect(result).to.equal(true);
    });

    it('should return true only whitespace', () => {
        const teststring = '    ';
        let result = String.IsNullOrWhiteSpace(teststring);

        expect(result).to.equal(true);
        result = String.isNullOrWhiteSpace(teststring);
        expect(result).to.equal(true);
        result = isNullOrWhiteSpace(teststring);
        expect(result).to.equal(true);
    });

    it('should return false contains non-whitespace characters', () => {
        const teststring = '  s  ';
        let result = String.IsNullOrWhiteSpace(teststring);

        expect(result).to.equal(false);
        result = String.isNullOrWhiteSpace(teststring);
        expect(result).to.equal(false);
        result = isNullOrWhiteSpace(teststring);
        expect(result).to.equal(false);
    });
});

describe('String.Format Number Pattern', () => {
    describe('Placeholders', () => {
        it('should return template if no format is found', () => {
            const template = 'Bar';
            const valueToInsert = 'Foo';
            let result = String.Format(template, valueToInsert);

            expect(result).to.equal(template);
            result = String.format(template, valueToInsert);
            expect(result).to.equal(template);
            result = formatString(template, valueToInsert);
            expect(result).to.equal(template);
        });

        it('should format the string correct', () => {
            const template = '{0}';
            const valueToInsert = 'Foo';
            let result = String.Format(template, valueToInsert);

            expect(result).to.equal(valueToInsert);
            result = String.format(template, valueToInsert);
            expect(result).to.equal(valueToInsert);
            result = formatString(template, valueToInsert);
            expect(result).to.equal(valueToInsert);
        });

        it('should format the string correct multiple times', () => {
            const template = '{0}Bar{0}';
            const valueToInsert = 'Foo';
            const expectedValue = 'FooBarFoo';
            let result = String.Format(template, valueToInsert);

            expect(result).to.equal(expectedValue);
            result = String.format(template, valueToInsert);
            expect(result).to.equal(expectedValue);
            result = formatString(template, valueToInsert);
            expect(result).to.equal(expectedValue);
        });

        it('should format the string correct multiple values', () => {
            const template = '{0}Bar{1}';
            const valueToInsert = 'Foo';
            const secondValueToInsert = 'Baz';
            const expectedValue = 'FooBarBaz';
            let result = String.Format(template, valueToInsert, secondValueToInsert);

            expect(result).to.equal(expectedValue);
            result = String.format(template, valueToInsert, secondValueToInsert);
            expect(result).to.equal(expectedValue);
            result = formatString(template, valueToInsert, secondValueToInsert);
            expect(result).to.equal(expectedValue);
        });
    });
    describe('formating', () => {
        describe('dates', () => {
            it('should set the correct display date using Date', () => {
                const template = '{0:d}';
                const valueToInsert = new Date(2017, 4, 13);

                const expectedValue = '13.04.2017';
                let result = String.Format(template, valueToInsert);

                console.log(result);
                expect(result).to.equal(expectedValue);
                result = String.format(template, valueToInsert);
                console.log(result);
                expect(result).to.equal(expectedValue);
                result = formatString(template, valueToInsert);
                console.log(result);
                expect(result).to.equal(expectedValue);
            });

            it('should set the correct sortable date using Date', () => {
                const template = '{0:s}';
                const valueToInsert = new Date(2017, 4, 13);

                const expectedValue = '2017-04-13';
                let result = String.Format(template, valueToInsert);

                console.log(result);
                expect(result).to.equal(expectedValue);
                result = String.format(template, valueToInsert);
                console.log(result);
                expect(result).to.equal(expectedValue);
                result = formatString(template, valueToInsert);
                console.log(result);
                expect(result).to.equal(expectedValue);
            });

            it('should set the correct display date using string', () => {
                const template = '{0:d}';
                const valueToInsert = '2017-01-23 00:00';

                const expectedValue = '23.01.2017';
                let result = String.Format(template, valueToInsert);

                console.log(result);
                expect(result).to.equal(expectedValue);
                result = String.format(template, valueToInsert);
                console.log(result);
                expect(result).to.equal(expectedValue);
                result = formatString(template, valueToInsert);
                console.log(result);
                expect(result).to.equal(expectedValue);
            });

            it('should set the correct sortable date using string', () => {
                const template = '{0:s}';
                const valueToInsert = '21.03.2017 22:15:01';

                const expectedValue = '2017-03-21T22:15:01';
                let result = String.Format(template, valueToInsert);

                console.log(result);
                expect(result).to.equal(expectedValue);
                result = String.format(template, valueToInsert);
                console.log(result);
                expect(result).to.equal(expectedValue);
                result = formatString(template, valueToInsert);
                console.log(result);
                expect(result).to.equal(expectedValue);
            });

            it('should set the correct sortable date without time using string', () => {
                const template = '{0:s}';
                const valueToInsert = '21.03.2017';

                const expectedValue = '2017-03-21T00:00:00';
                let result = String.Format(template, valueToInsert);

                console.log(result);
                expect(result).to.equal(expectedValue);
                result = String.format(template, valueToInsert);
                console.log(result);
                expect(result).to.equal(expectedValue);
                result = formatString(template, valueToInsert);
                console.log(result);
                expect(result).to.equal(expectedValue);
            });
        });

        describe('uppercasing', () => {
            it('should return the string as uppercase', () => {
                const expectedValue = 'AWESOME';
                const template = '{0:U}';
                const valueToInsert = 'awesome';

                let actual = String.Format(template, valueToInsert);

                expect(actual).to.equal(expectedValue);
                actual = String.format(template, valueToInsert);
                expect(actual).to.equal(expectedValue);
                actual = formatString(template, valueToInsert);
                expect(actual).to.equal(expectedValue);
            });

            it('should return the string as lowercase', () => {
                const expectedValue = 'awesome';
                const template = '{0:L}';
                const valueToInsert = 'AWESOME';

                let actual = String.Format(template, valueToInsert);

                expect(actual).to.equal(expectedValue);
                actual = String.format(template, valueToInsert);
                expect(actual).to.equal(expectedValue);
                actual = formatString(template, valueToInsert);
                expect(actual).to.equal(expectedValue);
            });
        });

        describe('numbers', () => {

            it('should not pad without specifier using {0}', () => {
                const template = '{0}';
                let result = String.Format(template, 5);

                expect(result).to.equal('5');
                result = String.format(template, 5);
                expect(result).to.equal('5');
                result = formatString(template, 5);
                expect(result).to.equal('5');
            });

            it('should pad 5 to 05 using {0:00}', () => {
                const template = '{0:00}';
                let result = String.Format(template, 5);

                expect(result).to.equal('05');
                result = String.format(template, 5);
                expect(result).to.equal('05');
                result = formatString(template, 5);
                expect(result).to.equal('05');
            });

            it('should pad 5 to 005 using {0:000}', () => {
                const template = '{0:000}';
                let result = String.Format(template, 5);

                expect(result).to.equal('005');
                result = String.format(template, 5);
                expect(result).to.equal('005');
                result = formatString(template, 5);
                expect(result).to.equal('005');
            });

            it('should ignore padding when input is longer then template', () => {
                const template = '{0:000}';
                let result = String.Format(template, 50000);

                expect(result).to.equal('50000');
                result = String.format(template, 50000);
                expect(result).to.equal('50000');
                result = formatString(template, 50000);
                expect(result).to.equal('50000');
            });

            it('should set the correct thousands seperator', () => {
                const template = '{0:n}';
                const valueToInsert = '10000000000';
                const expectedValue = '10.000.000.000';

                let result = String.Format(template, valueToInsert);

                expect(result).to.equal(expectedValue);
                result = String.format(template, valueToInsert);
                expect(result).to.equal(expectedValue);
                result = formatString(template, valueToInsert);
                expect(result).to.equal(expectedValue);
            });

            it('should set the correct thousands seperator keeping the decimals', () => {
                const template = '{0:n}';
                const valueToInsert = '10000000000,12345';
                const expectedValue = '10.000.000.000,12345';

                let result = String.Format(template, valueToInsert);

                expect(result).to.equal(expectedValue);
                result = String.format(template, valueToInsert);
                expect(result).to.equal(expectedValue);
                result = formatString(template, valueToInsert);
                expect(result).to.equal(expectedValue);
            });
        });

        describe('hexadecimal', () => {
            it('number should be converted to hex lowercase', () => {
                let result = String.Format('{0:x}', 500);

                expect(result).to.equal('1f4');
                result = String.format('{0:x}', 500);
                expect(result).to.equal('1f4');
                result = formatString('{0:x}', 500);
                expect(result).to.equal('1f4');
            });

            it('number should be converted to hex uppercase', () => {
                let result = String.Format('{0:X}', 500);

                expect(result).to.equal('1F4');
                result = String.format('{0:X}', 500);
                expect(result).to.equal('1F4');
                result = formatString('{0:X}', 500);
                expect(result).to.equal('1F4');
            });

            it('decimal should be converted to hex lowercase', () => {
                let result = String.Format('{0:x}', 321.124);

                expect(result).to.equal('141.1fbe76c8b44');
                result = String.format('{0:x}', 321.124);
                expect(result).to.equal('141.1fbe76c8b44');
                result = formatString('{0:x}', 321.124);
                expect(result).to.equal('141.1fbe76c8b44');
            });

            it('decimal should be converted to hex uppercase', () => {
                let result = String.Format('{0:X}', 321.124);

                expect(result).to.equal('141.1FBE76C8B44');
                result = String.format('{0:X}', 321.124);
                expect(result).to.equal('141.1FBE76C8B44');
                result = formatString('{0:X}', 321.124);
                expect(result).to.equal('141.1FBE76C8B44');
            });

            it('minus decimal should be converted to hex lowercase', () => {
                let result = String.Format('{0:x}', -321.124);

                expect(result).to.equal('-141.1fbe76c8b44');
                result = String.format('{0:x}', -321.124);
                expect(result).to.equal('-141.1fbe76c8b44');
                result = formatString('{0:x}', -321.124);
                expect(result).to.equal('-141.1fbe76c8b44');
            });

            it('minus decimal should be converted to hex uppercase', () => {
                let result = String.Format('{0:X}', -321.124);

                expect(result).to.equal('-141.1FBE76C8B44');
                result = String.format('{0:X}', -321.124);
                expect(result).to.equal('-141.1FBE76C8B44');
                result = formatString('{0:X}', -321.124);
                expect(result).to.equal('-141.1FBE76C8B44');
            });
        });
    });

});

describe('String.Format Text Pattern', () => {
    describe('formatting', () => {
        it('Should parse out the word', () => {
            // Arrange
            const fruit = { type: 'apple', color: 'red' };

            // Act
            // Assert
            let formatted = String.Format('the {type} is {color}', fruit);

            expect(formatted).to.equal('the apple is red');
            formatted = String.format('the {type} is {color}', fruit);
            expect(formatted).to.equal('the apple is red');
            formatted = formatString('the {type} is {color}', fruit);
            expect(formatted).to.equal('the apple is red');
        });

        it('Should parse out the word with specifiers and TS Class', () => {
            // Arrange
            const fruit: Fruit = new Fruit('apple', 'RED', '31.12.2018 01:02:03', '10000');

            // Act
            // Assert
            let formatted = String.Format('the {type:U} is {color:L} shipped on {shippingDate:s} with an amount of {amount:n}', fruit);

            expect(formatted).to.equal('the APPLE is red shipped on 2018-12-31T01:02:03 with an amount of 10.000');
            formatted = String.format('the {type:U} is {color:L} shipped on {shippingDate:s} with an amount of {amount:n}', fruit);
            expect(formatted).to.equal('the APPLE is red shipped on 2018-12-31T01:02:03 with an amount of 10.000');
            formatted = formatString('the {type:U} is {color:L} shipped on {shippingDate:s} with an amount of {amount:n}', fruit);
            expect(formatted).to.equal('the APPLE is red shipped on 2018-12-31T01:02:03 with an amount of 10.000');
        });
    });
});

describe('String.Join', () => {
    it('should join the given strings passed as args', () => {
        const stringOne = 'red', stringTwo = 'yellow', stringThree = 'blue';

        let result = String.Join('; ', stringOne, stringTwo, stringThree);

        expect(result).to.equal('red; yellow; blue');
        result = String.join('; ', stringOne, stringTwo, stringThree);
        expect(result).to.equal('red; yellow; blue');
        result = joinString('; ', stringOne, stringTwo, stringThree);
        expect(result).to.equal('red; yellow; blue');
    });

    it('should join the given array', () => {
        const object = ['red', 'yellow', 'blue'];
        let result = String.Join('; ', object);

        expect(result).to.equal('red; yellow; blue');
        result = String.join('; ', object);
        expect(result).to.equal('red; yellow; blue');
        result = joinString('; ', object);
        expect(result).to.equal('red; yellow; blue');
    });

    it('should join the given object', () => {
        const object = { Name: 'Foo', Value: 'Bar' };

        let result = String.Join('.', object);

        console.log(result);
        expect(result).to.equal('Foo.Bar');
        result = String.join('.', object);
        console.log(result);
        expect(result).to.equal('Foo.Bar');
        result = joinString('.', object);
        console.log(result);
        expect(result).to.equal('Foo.Bar');
    });
});

describe('StringBuilder initialization', () => {
    it('should not add empty string if there is no ctor parameter', () => {
        const builder = new StringBuilder();

        builder.Append('First Part... ');
        builder.Append('Second Part...');

        expect(builder.ToString()).to
            .equal('First Part... Second Part...');
    });

    it('should add a string if there is ctor parameter', () => {
        const builder = new StringBuilder(formatString('First {0}... ', 'Part'));

        builder.AppendFormat('Second {0}...', 'Part');

        console.log(builder.ToString());
        expect(builder.ToString()).to
            .equal('First Part... Second Part...');
    });
});

describe('StringBuilderng.Append', () => {
    it('should append characters', () => {
        const builder = new StringBuilder();

        builder.Append('First Part... ');
        builder.Append('Second Part...');

        expect(builder.ToString()).to
            .equal('First Part... Second Part...');
    });

    it('should append characters', () => {
        const builder = new StringBuilder();

        builder.AppendFormat('First {0}... ', 'Part');
        builder.AppendFormat('Second {0}...', 'Part');

        console.log(builder.ToString());
        expect(builder.ToString()).to
            .equal('First Part... Second Part...');
    });
});

describe('StringBuilder.AppendLine', () => {
    it('should append characters and new line', () => {
        const builder = new StringBuilder();

        builder.AppendLine('First Line...');
        builder.AppendLine('Second Line...');

        expect(builder.ToString()).to
            .equal(`${newLine}First Line...${newLine}Second Line...`);
    });

    it('should append characters and new line', () => {
        const builder = new StringBuilder();

        builder.AppendLineFormat('First {0}...', 'Line');
        builder.AppendLineFormat('Second {0}...', 'Line');

        console.log(builder.ToString());
        expect(builder.ToString()).to
            .equal(`${newLine}First Line...${newLine}Second Line...`);
    });

    it('should append characters and new line', () => {
        const builder = new StringBuilder();

        builder.AppendLine('First Line...');
        builder.AppendLine('Second Line...');

        console.log(builder.ToString());
        expect(builder.ToString()).to
            .equal(`${newLine}First Line...${newLine}Second Line...`);
    });
});