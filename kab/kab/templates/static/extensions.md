## Extensions

The OpenAPI specification allows for vendor specific extensions to the core
specification. In kubernetes, the following extensions are defined and used.

### `x-kubernetes-embedded-resource`

Type: *boolean*

This flag indicates that the value is an embedded Kubernetes `runtime.Object`,
with `TypeMeta` and `ObjectMeta`. The type must be `"object"`. It is allowed
to further restrict the embedded object. `kind`, `apiVersion` and `metadata`
are validated automatically. `x-kubernetes-preserve-unknown-fields` is allowed
to be true, but does not have to be if the object is fully specified (up to
`kind`, `apiVersion`, `metadata`).

### `x-kubernetes-int-or-string`

Type: *boolean*

This flag indicates that this value is either an integer or a string. If this
is `true`, an empty type is allowed and type as child of `"anyOf"` is
permitted if following one of the following patterns:

1. `"anyOf": [{"type": "integer"}, {"type": "string"}]`
1. `"allOf": [{"anyOf": [{"type": "integer"}, {"type": "string"} ...]}]`

### `x-kubernetes-list-map-keys`

Type: *array of string*

This annotates an array with the `x-kubernetes-list-type: map` by specifying
the keys to index the map. This tag MUST only be used on lists that have the
`"x-kubernetes-list-type"` extension set to `"map"`. Also, the values
specified for this attribute must be a scalar typed field of the child
structure (no nesting is supported). The properties specified must either be
required or have a default value, to ensure those properties are present for
all list items.

### `x-kubernetes-list-type`

Type: *string*

This annotates an array to further describe its topology. This extension must
only be used on lists and may have 3 possible values:

1. `"atomic"`: the list is treated as a single entity, like a scalar. Atomic
   lists will be entirely replaced when updated. This extension may be used on
   any type of list (struct, scalar, ...).
1. `"set"`: Sets are lists that must not have multiple items with the same
   value. Each value must be a scalar, an object with
   `x-kubernetes-map-type: atomic` or a list with
   `x-kubernetes-list-type: atomic`.
1. `"map"`: The list is treated as a map in that their elements have a non-index
   key used to identify them. Order is preserved upon merge. The `"map"` tag
   must only be used on a list with elements of type `"object"`.

Defaults to `"atomic"` for lists.

### `x-kubernetes-map-type`

Type: *string*

This annotates an object to further describe its topology. This extension must
only be used when `type` is `"object"` and may have 2 possible values:

1. `"granular"`: These maps are actual maps (key-value pairs) and each fields
   are independent from each other (they can each be manipulated by separate
   actors). This is the *default* behaviour for all maps.
1. `"atomic"`: the list is treated as a single entity, like a scalar. Atomic
   maps will be entirely replaced when updated.

### `x-kubernetes-preserve-unknown-fields`

This flag stops the API server decoding step from pruning fields which are not
specified in the validation schema. This affects fields recursively, but
switches back to normal pruning behaviour if nested `properties` or
`additionalProperties` are specified in the schema. This can either be `true` or
undefined. A value of `false` means forbidden.

### `x-kubernetes-unions`

type: *list of maps*

This flag is an attempt to encode the "oneOf" semantics for map definitions.
Each item in the list consists of the following fields:

- `discriminator`: the name of the field that will be used as the
  discriminator, if present.
- `fields-to-discriminateBy`: A map of field names to values of discriminator.

For example, the following tag specifies that the current object has a field
named `account` which can be used as a discriminator. When the `account` field
is set to `Group`, the `group` field of the object must be specified; when the
`account` field is set to `User`, the `user` field of the object must be
specified.

```json
{
  "properties": {
    "account": {
      "type": "string",
      "minLength": 1
    },
    "user": {
      "type": "object"
    },
    "group": {
      "type": "object"
    },
    "contact": {
      "type": "string"
    }
  },
  "required": [
    "account"
  ],
  "type": "object"
}
```


### `x-kubernetes-patch-merge-key`

type: *string*


### `x-kubernetes-group-version-kind`

type: *list of maps*



