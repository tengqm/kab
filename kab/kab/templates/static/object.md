## Objects

Kubernetes objects are persistent entities that represent a concrete instance
of a concept in the cluster. Collectively, these objects form the state of
your cluster. Each object is a *record of intent*. Once an object is created,
the system constantly works to ensure that object exists.

Most Kubernetes objects have following fields that govern the object's
configuration:

- `apiVersion`: the [API group and version](#api-groups-and-versioning) used
  for creating or updating the object.
- `kind`: the kind of the object you want to operate on.
- `metadata`: the data that helps uniquely identify an object, for example, a
  `name` string, a `UID` and the `namespace` the object resides in.
- `spec`: the *desired state* of the object, i.e. properties you want the
  object to have.
- `status`: the *current state* of the object, as supplied and updated by the
  system. The Kubernetes control plane actively and continually manages every
  object's actual state to match the desired state you provided.

