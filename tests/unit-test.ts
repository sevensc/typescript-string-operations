import { String } from '../source/source'
declare var QUnit;

    QUnit.module("String.Format", () => {
        QUnit.test( "String.Format() ShortDatePattern", ( assert ) => {
            var actual = String.Format("{0:d}", "2017-01-23 00:00");
            assert.equal(actual, "23.01.2017", "expected -> '23.01.2017', succeed");
        });
        
        QUnit.test( "String.Format() SortableDate", ( assert ) => {
            var actual = String.Format("{0:s}", "21.03.2017 22:15:01");
            assert.equal(actual, "2017-03-21T22:15:01", "expected -> '2017-03-21T22:15:01', succeed");
        });

        QUnit.test( "String.Format() Uppercase", ( assert ) => {
            var actual = String.Format("{0:U}", "awesome");
            assert.equal(actual, "AWESOME", "expected -> 'AWESOME', succeed");
        });

        QUnit.test( "String.Format() Thousands seperator", ( assert ) => {
            var actual = String.Format("{0:n}", "10000000000");
            assert.equal(actual, "10.000.000.000", "expected -> '10.000.000.000', succeed");
        });

        QUnit.test( "String.Format() Lowercase", ( assert ) => {
            var actual = String.Format("{0:L}", "AWESOME");
            assert.equal(actual, "awesome", "expected -> 'awesome', succeed");
        });
    });
    
    QUnit.module("String.Join", () => {
         QUnit.test( "String.Join() strings args", ( assert ) => {
            var actual = String.Join("; ", "red", "yellow", "blue");

            assert.equal(actual, "red; yellow; blue", "test with string -> 'red; yellow; blue', succeed");
        });

         QUnit.test( "String.Join() array", ( assert ) => {
            var array = ["red", "yellow", "blue"];
            var actual = String.Join("; ", array);

            assert.equal(actual, "red; yellow; blue", "test with array -> 'red; yellow; blue', succeed");
        });
    });
