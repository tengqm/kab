## About Labels

### Requirements

The label name must be a *qualified name*, which means:

- It cannot be empty string.
- It must consist of alphanumeric characters, `'-'`, `'_'` or `'.'`.
- It must start and end with a alphanumeric character.
- It *may* have a prefix part, separated with the name with a `'/'`.
  This prefix is also referred to as the *label namespace*.
- The name may have at most 63 characters if there is no prefix;
- If the name has a prefix, the prefix must be a valid DNS subdomain and the
  rest of the name can have at most 63 characters.

The label value must be meet some requirements as well.

- It can be at most 63 characters;
- It must consist of alphanumeric characters, `'-'`, `'_'` or `'.'`;
- It must start and end with a alphanumeric character.

### Label Namespaces

Kubernetes reserves all labels and annotations in the `"kubernetes.io"` namespace.

There are some namespaces reserved by Kubernetes. For example:

- `"kubelet.kubernetes.io"`: a label namespace suffix for kubelet to self-set.
  The kubelet can set labels like `"[*.]kubelet.kubernetes.io/*"`.
- `"node.kubernetes.io"`: a label namespace suffix for kubelet to self-set.
  The kubelet can set labels like `"[*.]node.kubernetes.io/*"`.

