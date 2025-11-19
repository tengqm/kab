## Server Side Apply

Starting from Kubernetes v1.18, you can enable the Server Side Apply feature
so that the control plane tracks managed fields for all newly created objects.
Server Side Apply provides a clear pattern for managing field conflicts,
offers server-side Apply and Update operations, and replaces the client-side
functionality of kubectl apply.

### Field Manager

A field manager represents the subject or controller that manages a specific
set of fields. With field managers explicitly specified, the API server can
better handle the conflicts that may arise when a resource is mutated
concurrently by more than one subjects or controllers.

