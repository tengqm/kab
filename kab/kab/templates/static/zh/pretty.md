## Pretty

When the `pretty` query string is specified with a value like `"true"`, `"1"`,
`"T"` etc and the content type transferred is `"application/json"`, the API
will pretty print the JSON for human reading with indentation and line breaks.

The API server also detects if the `User-Agent` header is prefixed with one
of the following values:

- `"curl"`
- `"Wget"`
- `"Mozilla/5.0"`

If one of the above prefix is detected, the JSON result is pretty printed as
well.
