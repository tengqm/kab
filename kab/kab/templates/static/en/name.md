## Object Names

Each object in a cluster has a name that is unique for that type of resources.
Every object also has a UID that is unique across the cluster. Extra
identifying information can be specified using labels and annotations.

For API operations like **get**, **update**, **patch** and **delete**, the
name of an object is encoded in the resource URL so must be provided.
For example, `"/api/v1/pods/my-pod"`.
There are 3 commonly used name constraints for objects. Some resource types
have additional restrictions on their names.

### DNS Subdomain Names

The name must be able to be used as a DNS subdomain name as defined in
<a href="https://tools.ietf.org/html/rfc1123" target="_blank">RFC 1123
<i class='fa fa-external-link-alt'></i></a>.
This means that name must:

- contain at most 253 characters
- contain only lowercase alphanumeric characters, `'-'` or `'.'`
- start with an alphanumeric character
- end with an alphanumeric character

### DNS Label Names

The name must follow the DNS label standard as defined in
<a href="https://tools.ietf.org/html/rfc1123" target="_blank">RFC 1123
<i class='fa fa-external-link-alt'></i></a>.
The means the name must:

- contain at most 63 characters
- contain only lowercase alphanumeric character or `'-'`
- start with an alphanumeric character
- end with an alphanumeric character

### Path Segment Names

The name must be able to be safely encoded as a path segment. In other words,
the name may not be "`.`" or "`..`" and the name may not contain '`/`' or
'`%`'.

### Port Name

An IANA\_SVC\_NAME as defined by
<a href="https://tools.ietf.org/rfc/rfc6335.txt" target="_blank">RFC6335
<i class='fa fa-external-link-alt'></i></a>, suitable for naming a port. The
requirements are:

- contain at most 15 characters
- contain only lowercase alphanumeric characters and `'-'`
- start with an alphanumeric character
- end with an alphanumeric character
- contain no adjacent `'-'` characters
- contain at least one character (`a`-`z`)
