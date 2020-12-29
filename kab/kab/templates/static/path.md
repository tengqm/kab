## HTTP Paths

There are several parts in the HTTP paths for an API request:

- **GROUP**: The API group **TODO Link**
- **VERSION**: The API group version **TODO Link**
- **RESOURCEYPTE**: The resource type **TODO Link**
- **NAMESPACE**: The namespace for namespaced resources.
- **NAME**: The name of the resource. **TODO Link**
- **SUBRESOURCE**: The name of the sub-resource, if any. **TODO Link**

The following paths are used to retrieve collections and resources.

### Cluster-scoped resources

- `GET /apis/GROUP/VERSION/RESOURCETYPE` -
  returns the collection of resources of the resource type
- `GET /apis/GROUP/VERSION/RESOURCETYPE/NAME` -
  returns the resource with NAME under the resource type
- `GET /apis/GROUP/VERSION/RESOURCETYPE/NAME/SUBRESOURCE` -
  returns the subresource SUBRESOURCE under the resource NAME

### Namespace-scoped resources

- `GET /apis/GROUP/VERSION/RESOURCETYPE` -
  returns the collection of all instances of the resource type across all
  namespaces.
- `GET /apis/GROUP/VERSION/namespaces/NAMESPACE/RESOURCETYPE` -
  returns collection of all instances of the resource type in NAMESPACE
- `GET /apis/GROUP/VERSION/namespaces/NAMESPACE/RESOURCETYPE/NAME` -
  returns the instance of the resource type with NAME in NAMESPACE
- `GET /apis/GROUP/VERSION/namespaces/NAMESPACE/RESOURCETYPE/NAME/SUBRESOURCE` -
  returns the subresource SUBRESOURCE under resource NAME.

Since a `namespace` is a *cluster-scoped* resource type, you can retrieve the
list of all namespaces with `GET /api/v1/namespaces` and details about a
particular namespace with `GET /api/v1/namespaces/NAME`.

### Sub-Resources

Some resource types will have one or more sub-resources, represented as sub
paths below the resource.

The path for a cluster-scoped subresource looks like:

```html
/apis/GROUP/VERSION/RESOURCETYPE/NAME/SUBRESOURCE
```

while the path for a namespace-scoped subresource looks like:

```html
/apis/GROUP/VERSION/namespaces/NAMESPACE/RESOURCETYPE/NAME/SUBRESOURCE
```

It is not possible to access sub-resources across multiple resources -
generally a new virtual resource type would be used if that becomes necessary.

