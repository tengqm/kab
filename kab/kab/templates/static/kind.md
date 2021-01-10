## Kind

All resource types have a concrete schema defined in JSON, which is called a
**kind**. The name of a kind is always in CamelCase and singular.

The *kind*s in Kubernetes are grouped into three categories:

- *Objects*: A persistent entity in the system. All API objects have common
  metadata (i.e. `ObjectMeta`).
  Each object may have multiple resources exposed for users to perform
  specific actions.
- *Lists*: A collection of resources of one (usually) or more (occasionally)
  kinds. The name of the list kind must end with `List`. Lists have a limited
  set of common metadata (i.e. `ListMeta`). All lists use the required `items`
  field to contain the array of objects they return.
- *Simple* kinds: Used for specific actions on objects and for non-persistent
  entities. For instance, the `Status` kind is returned when errors occur and
  is not persisted in the system.
  Many simple resources are "subresources".

