Kubernetes has designed its features to allow the API to continuously evolve.
The aim is to maintain compatibility with existing clients for a period so that
other projects have an opportunity to adapt.

In general, new API resources and new fields can be added often and frequently.
Elimination of resources or fields requires following the API
<a href="https://kubernetes.io/docs/reference/using-api/deprecation-policy/"
target="_blank">deprecation policy <i class='fa fa-external-link-alt'></a>.
Starting from v1.19, request to derepcated REST API endpoint returns a
`warning` header.
