# CHANGELOG
#### 1.6.0
- updated dependencies
- fixed "deprecated" text

#### 1.5.0
- Using latest typescript version, please check if your environment still works with this version before upgrading!
- feature: !IMPORTANT methods/properties starting with uppercase are marked deprecated now and will be removed in future versions! Check the deprecated infos
- feature: `String.isNullOrWhiteSpace` accepts null or undefined now
- feature: added new methods/properties: `isNullOrWhiteSpace(), formatString(), joinString(), empty`, check [README](https://github.com/sevensc/typescript-string-operations/blob/main/README.md)
- chore: Updated packages
- chore: added linting

#### 1.4.1
- docs: added missing docs for `AppendLine` and `AppendLineFormat`
- bufix: fixed circleci badge

#### 1.4.0
- feature: added `AppendLine` and `AppendLineFormat`
- feature: added hexadecimal conversion specifier
- bugfix: `StringBuilder` initialization without parameter adds empty string to internal Values Array.
- bugfix: When there is no placeholder in the template passed to String.format it should return the original template
