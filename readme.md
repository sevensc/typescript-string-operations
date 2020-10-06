

![CircleCI](https://img.shields.io/circleci/build/github/iwt-svenulrich/typescript-string-operations?logo=circleci&token=e3f75ec3d21d6da12384faf594c9d05fe9f65747)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=sevensc_typescript-string-operations&metric=alert_status)](https://sonarcloud.io/dashboard?id=sevensc_typescript-string-operations)![npm](https://img.shields.io/npm/v/typescript-string-operations)![npm](https://img.shields.io/npm/dw/typescript-string-operations)

# Action Required !!
in v2.0.0 `String` is renamed to `$String` to prevent overriding the native JS String. If you dont want to change all of your code,
you can create an alias in your import statement like so:

```typescript
 import { $String as String, StringBuilder } from 'typescript-string-operations';
 ```

# Simple lightweight string operation library for Typescript.
## No jQuery required! Unit tested, works with Angular.


```typescript
 import { $String, StringBuilder } from 'typescript-string-operations';
 ```

#### USAGE:

### $String.empty
```typescript
var id = $String.empty;
```

### $String.isNullOrWhiteSpace():
```typescript
var id = image.GetId();
if($String.isNullOrWhiteSpace(id))
	return image;
```
### $String.format():

```typescript
var id = image.GetId()
$String.format("image_{0}.jpg", id)
output: "image_2db5da20-1c5d-4f1a-8fd4-b41e34c8c5b5.jpg";
```

Specifier available!
```typescript
var value = $String.format("{0:L}", "APPLE"); //output "apple"

value = $String.format("{0:U}", "apple"); // output "APPLE"

value = $String.format("{0:d}", "2017-01-23 00:00"); //output "23.01.2017"


value = $String.format("{0:s}", "21.03.2017 22:15:01") //output "2017-03-21T22:15:01"

value = $String.format("{0:n}", 1000000);
//output "1.000.000"

value = $String.format("{0:00}", 1);
//output "01"
```

## UPDATE
#### $String.format for Objects including specifiers

```typescript
var fruit = new Fruit();
fruit.type = "apple";
fruit.color = "RED";
fruit.shippingDate = new Date(2018, 1, 1);
fruit.amount = 10000;

$String.format("the {type:U} is {color:L} shipped on {shippingDate:s} with an amount of {amount:n}", fruit);
// output: the APPLE is red shipped on 2018-01-01 with an amount of 10.000

```


|	Specifier	  |	 			Result 	   	    |
| :-------------: |:---------------------------:|
|		`L`		  |	LowerCase					|
|		`U`		  |	UpperCase					|
|		`d`		  |	ShortDatePattern			|
|		`s`		  |	SortableDateTimePattern		|
|		`n`		  |	Thousand seperator			|
|		`00`	  |	Padding numbers				|



### $String.Join():

```typescript
var value = $String.join("; ", "Apple", "Banana");
//output: "Apple; Banana";
```
#### OR

```typescript
 let object = { Name: "Foo", Value: "Bar" };
 var value = $String.join('.', object);
//output: "Foo.Bar";

var array = ['Apple', 'Banana']
var value = $String.join("; ", array);
//output: "Apple; Banana";
```

## Methods

| Method                    |  Type       |       Description          | Parameter  |
| :------------------------:|:-----------:|:--------------------------:|:----------:|
|  `empty`                  | `Property`  |    simply returns `""`.    |
| `isNullOrWhiteSpace`      | `Method`    | returns true value if given parameter is either null, empty or undefined. | `format`, `args`
| `format`                  | `Method`    | Converts the value of objects to strings based on the formats specified and inserts them into another string. | `format`, `args`
| `foin`                    | `Method`    |   Combines arguments delimited by given seperator.| `delimiter`,`args`
| `foin`                    | `Method`    |   Combines arguments delimited by given seperator from array. | `delimiter`,`array` |


### StringBuilder

Just like you know from C#,


```typescript

var favoriteFruit: string = this.fruitService.getFavorite(); //Blueberries

var builder = new StringBuilder("My favorite fruits are: ");
builder.append("Apples, ");
builder.append("Bananas ");

// of course using $String.Format()
builder.appendFormat("and especially {0:U}!", favoriteFruit);
builder.appendFormat(" I eat {0} every day!", 10);

var fruits = builder.toString();

//output: "My favorite fruits are: Apples, Bananas and especially BLUEBERRIES! I eat 10 every day!";

```
## Methods

| Method                    |  Type       |       Description          | Parameter  |
| :------------------------:|:-----------:|:--------------------------:|:----------:|
|  `append`                 | `Method`    |    appends a string.       | `value`    |
|  `appendLine`             | `Method`    |    like append and an extra line        | `value`    |
|  `appendFormat`           | `Method`    |    see description for `$String.Format()`| `format`, `args`|
|  `appendLineFormat`       | `Method`    |    like appendFormat and an extra line | `format`, `args`|
|  `clear`		            | `Method`    |    clears the `StringBuilder`   |       |
|  `toString`	            | `Method`    |    creates the actual string.  |       |