

![CircleCI](https://img.shields.io/circleci/build/github/iwt-svenulrich/typescript-string-operations?logo=circleci&token=9234d9f6803b37ebfcd4887fa2d6d51aa2cf5214)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=sevensc_typescript-string-operations&metric=alert_status)](https://sonarcloud.io/dashboard?id=sevensc_typescript-string-operations)![npm](https://img.shields.io/npm/v/typescript-string-operations)![npm](https://img.shields.io/npm/dw/typescript-string-operations)
# Simple lightweight string operation library for Typescript.
## No jQuery required! Unit tested, works with Angular.

```typescript
 import { String, StringBuilder } from 'typescript-string-operations';
 ```

#### USAGE:

### String.Empty
```typescript
var id = String.Empty;
```

### String.IsNullOrWhiteSpace():
```typescript
var id = image.GetId();
if(String.IsNullOrWhiteSpace(id))
	return image;
```
### String.Format():

```typescript
var id = image.GetId()
String.Format("image_{0}.jpg", id)
output: "image_2db5da20-1c5d-4f1a-8fd4-b41e34c8c5b5.jpg";
```

Specifier available!
```typescript
var value = String.Format("{0:L}", "APPLE"); //output "apple"

value = String.Format("{0:U}", "apple"); // output "APPLE"

value = String.Format("{0:d}", "2017-01-23 00:00"); //output "23.01.2017"


value = String.Format("{0:s}", "21.03.2017 22:15:01") //output "2017-03-21T22:15:01"

value = String.Format("{0:n}", 1000000);
//output "1.000.000"

value = String.Format("{0:00}", 1);
//output "01"
```

## UPDATE
#### String Format for Objects including specifiers

```typescript
var fruit = new Fruit();
fruit.type = "apple";
fruit.color = "RED";
fruit.shippingDate = new Date(2018, 1, 1);
fruit.amount = 10000;

String.Format("the {type:U} is {color:L} shipped on {shippingDate:s} with an amount of {amount:n}", fruit);
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



### String.Join():

```typescript
var value = String.Join("; ", "Apple", "Banana");
//output: "Apple; Banana";
```
#### OR

```typescript
 let object = { Name: "Foo", Value: "Bar" };
 var value = String.Join('.', object);
//output: "Foo.Bar";

var array = ['Apple', 'Banana']
var value = String.Join("; ", array);
//output: "Apple; Banana";
```

## Methods

| Method                    |  Type       |       Description          | Parameter  |
| :------------------------:|:-----------:|:--------------------------:|:----------:|
|  `Empty`                  | `Property`  |    simply returns `""`.    |
| `IsNullOrWhiteSpace`      | `Method`    | returns true value if given parameter is either null, empty or undefined. | `format`, `args`
| `Format`                  | `Method`    | Converts the value of objects to strings based on the formats specified and inserts them into another string. | `format`, `args`
| `Join`                    | `Method`    |   Combines arguments delimited by given seperator.| `delimiter`,`args`
| `Join`                    | `Method`    |   Combines arguments delimited by given seperator from array. | `delimiter`,`array` |


### StringBuilder

Just like you know from C#,


```typescript

var favoriteFruit: string = this.fruitService.getFavorite(); //Blueberries

var builder = new StringBuilder("My favorite fruits are: ");
builder.Append("Apples, ");
builder.Append("Bananas ");

// of course using String.Format()
builder.AppendFormat("and especially {0:U}!", favoriteFruit);
builder.AppendFormat(" I eat {0} every day!", 10);

var fruits = builder.ToString();

//output: "My favorite fruits are: Apples, Bananas and especially BLUEBERRIES! I eat 10 every day!";

```
## Methods

| Method                    |  Type       |       Description          | Parameter  |
| :------------------------:|:-----------:|:--------------------------:|:----------:|
|  `Append`                 | `Method`    |    appends a string.       | `value`    |
|  `AppendFormat`           | `Method`    |    see description for `String.Format()`| `format`, `args`|
|  `AppendLine`             | `Method`    |    appends a string in a new line. | `format`, `args`|
|  `AppendLineFormat`       | `Method`    |    like `String.Format()` in a new line | `format`, `args`|
|  `Clear`		            | `Method`    |    clears the `StringBuilder`   |       |
|  `ToString`	            | `Method`    |    creates the actual string.  |       |