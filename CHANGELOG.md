# CHANGELOG

#### 1.4.0
- feature: added `AppendLine` and `AppendLineFormat`
- feature: added hexadecimal conversion specifier
- bugfix: `StringBuilder` initialization without parameter adds empty string to internal Values Array.
- bugfix: When there is no placeholder in the template passed to String.Format it should return the original template