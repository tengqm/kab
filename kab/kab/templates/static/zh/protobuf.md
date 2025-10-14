## Protobuf Encoding

Kubernetes uses an envelope wrapper to encode **Protobuf** responses. The
wrapper starts with a 4 byte magic number to help identify content in disk or
in etcd as **Protobuf** (as opposed to JSON), and then is followed by a
Protobuf encoded wrapper message, which describes the encoding and type of the
underlying object and then contains the object.

The wrapper format is:

```
// A four byte magic number prefix:
Bytes 0-3: "k8s\x00" [0x6b, 0x38, 0x73, 0x00]

// An encoded Protobuf message with the following IDL:
message Unknown {
  // typeMeta should have the string values for "kind" and
  // "apiVersion" as set on the JSON object
  optional TypeMeta typeMeta = 1;

  // raw will hold the complete serialized object in protobuf.
  // See the protobuf definitions in the client libraries for a given kind.
  optional bytes raw = 2;

  // contentEncoding is encoding used for the raw data.
  // Unspecified means no encoding.
  optional string contentEncoding = 3;

  // contentType is the serialization method used to serialize 'raw'.
  // Unspecified means application/vnd.kubernetes.protobuf and is usually
  // omitted.
  optional string contentType = 4;
}

message TypeMeta {
  // apiVersion is the group/version for this type
  optional string apiVersion = 1;

  // kind is the name of the object schema. A protobuf definition should exist for this object.
  optional string kind = 2;
}
```

Clients that receive a response in `"application/vnd.kubernetes.protobuf"` that
does not match the expected prefix should reject the response, as future
versions may need to alter the serialization format in an incompatible way and
will do so by changing the prefix.

