# Simple lightweight library for Typescript. 
#### jQuery required, works without Typescript!
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
output: "file_2db5da20-1c5d-4f1a-8fd4-b41e34c8c5b5.jpg";
```

Specifier available!
```typescript
//uppercase
var value = String.Format("{0:L}", "APPLE"); //output "apple"

//lowercase
value = String.Format("{0:U}", "apple"); // output "APPLE"

//ShortDatePattern
value = String.Format("{0:d}", "2017-01-23 00:00"); //output "21.01.2017"

//SortableDateTi­mePattern
value = String.Format("{0:s}", "21.03.2017 22:15:01") //output "2017-01-23T21:15:01"

//Thousands separator
value = String.Format("{0:n}", 1000000);
//output "1.000.000"
```





### String.Join():

```typescript
var value = String.Join("; ", "Apple", "Banana");
//output: "Apple; Banana";
```
#### OR
```typscript
var array = ['Apple', 'Banana']
var value = String.Join("; ", array);
//output: "Apple; Banana";
```


#### Simply reference compiled `source.js` in your project.

```javascript
<script type="text/javascript" src="scripts/typescript-string-format.js"></script>
```


## Methods

| Method       |  Type     |       Description          | Parameter  |
| ------------- |:-------------:|:-------------:| :-----|
|  `Empty` | `Property`     |    simply returns `""`. |
| `IsNullOrWhiteSpace`      | `Method` | returns true value if given parameter is either null, empty or undefined. | `format`, `args`
| 
| `Format`      | `Method` | Converts the value of objects to strings based on the formats specified and inserts them into another string. | `format`, `args`
| `Join`      | `Method`      |   Combines arguments delimited by given seperator.| `delimiter`,`args`
| `Join`      | `Method`      |   Combines arguments delimited by given seperator from array. | `delimiter`,`array`
|


### StringBuilder
```typescript
var version = "v1";
var builder = new StringBuilder(); //default parameter -> String.Empty; 

builder.AppendFormat("Stringbuilder {0} ", version);
builder.Append("is awesome!");

var value = builder.ToString();
//output: "StringBuilder v.1 is awesome!";
```
| Method       |  Type     |       Description          | Parameter  |
| ------------- |-------------:|:-------------:| :-----|
| `Append`      | `Method`      |   adds string to instance | `value`
| `AppendFormat`      | `Method`      |   adds string to instance, using String.Format | `value`
| `ToString`      | `Method`      |   Combines to instance added strings and returns combined string |
|`Clear`      | `Method`      |   clears the builder | |


make sure to include `sf` namespace!


Usage without Typescript.
Take source.js and simply call Methods with namespace.

e.g.
`var value = sf.String.Empty;`