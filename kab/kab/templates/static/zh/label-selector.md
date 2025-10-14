## Label Selector

When listing resources, the `labelSelector` can be used to restrict the list
of returned objects by their labels. The default is to return everything. The
accepted value is a comma-separated list of *terms*. Backslash-escaped commas
are treated as data instead of delimiters, and included in the returned terms
with the leading backslash perserved. Each *term* consists of a *key*, an
*operator*, and a *value*. The *key* cannot contain escaped special character
so the first occurence of a recognized operator is used as the split point.
The literal of the *value* is parsed when the *operator* is successfully
extracted. A valid operator must be one of `!=`, `==` and `=`, where `==` is
equivalent to `=`. When there are multiple terms in the selector list, they
are combined using logical **AND** operation.

The formal definition of the field is as follows:

```console
<selector-syntax>         ::= <requirement> | <requirement> "," <selector-syntax>
<requirement>             ::= [!] KEY [ <set-based-restriction> | <exact-match-restriction> ]
<set-based-restriction>   ::= "" | <inclusion-exclusion> <value-set>
<inclusion-exclusion>     ::= "in" | "notin" 
<value-set>               ::= "(" <values> ")"
<values>                  ::= VALUE | VALUE "," <values>
<exact-match-restriction> ::= ["="|"=="|"!="] VALUE
```

In the above definition, `KEY` is a sequence of one or more characters
following `[<DNS_SUBDOMAIN>"/"]<DNS_LABEL>`. The max length is 63 characters.
The `VALUE` is a sequence or zero or more characters `"([A-Za-z0-9_-\.])"`.
The max length is 63 characters. The delimiter is white space (` `, `\t`).

Note that `"in"` denotes that the `KEY` exists and is equal to any of the
`VALUE`s in its requirement. The `"notin"` denotes that the `KEY` is not equal
to any of the `VALUE`s in its requirement or it does not exist.
The empty string (`""`) is a valid `VALUE`.
A requirement with just one `KEY` denotes that the `KEY` exists and can be any
`VALUE`. A requirement with just `!KEY` requires that the `KEY` does not
exist.

