## 标签选择算符（Label Selector）

在列举资源的时候，`labelSelector` 可用来根据对象的标签来限制返回的列表。
默认的行为是返回所有对象。
标签选择算符可接受的值是一个用逗号分隔的*条件（term）*列表。
使用反斜线转义的逗号会被视为数据的一部分而不是分隔符，
这类逗号会被包含在所返回的条件中，并且前导反斜线不会被去掉。
每个*term*包含一个 *key*、一个 *operator* 和一个 *value*。
其中 *key* 不可以包含被转义的特殊字符，
所以第一个出现的可识别的操作符会被用作分割点。
当 *operator* 被成功地提取出来之后，系统会对 *value* 部分的内容进行解析。
合法的 *operator* 必须是 `!=`、`==` 和 `=` 之一，`==` 和 `=` 等价。
当选择算符的列表中存在多个条件时，系统会将多个条件按 **逻辑与（AND）**
的语义来进行组合。

字段的形式化定义如下：

```console
<selector-syntax>         ::= <requirement> | <requirement> "," <selector-syntax>
<requirement>             ::= [!] KEY [ <set-based-restriction> | <exact-match-restriction> ]
<set-based-restriction>   ::= "" | <inclusion-exclusion> <value-set>
<inclusion-exclusion>     ::= "in" | "notin" 
<value-set>               ::= "(" <values> ")"
<values>                  ::= VALUE | VALUE "," <values>
<exact-match-restriction> ::= ["="|"=="|"!="] VALUE
```

在上面的定义中，`KEY` 是由一个或多个字符构成的序列，
且其遵循 `[<DNS_SUBDOMAIN>"/"]<DNS_LABEL>` 模式。
`KEY` 的最大长度是 63 个字符。
`VALUE` 是由零个或者多个字符组成的序列，模式为 `"([A-Za-z0-9_-\.])"`，
其最大长度也是 63 个字符。分隔符是空白字符（` ` 或 `\t`）。

需要注意的是 `"in"` 表达的是 `KEY` 所给的主键存在且标签值在 `VALUE` 中。
`"notin"` 表示的是 `KEY` 所给的主键不存在，或者对应的标签值不在 `VALUE`
所给的列表中。
空字符串（`""`）是合法的 `VALUE` 值。
如果标签选择算符中只给了 `KEY`，则意味着要求 `KEY` 对应的主键存在，
但可以是任何取值。
如果选择算符中给出的是 `!KEY` 形式的主键，则意味着要求`KEY` 主键不存在。

