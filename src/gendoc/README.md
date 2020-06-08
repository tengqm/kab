# How to Generate OpenAPI spec

The first step is to clone the `k8s.io/kube-openapi` project.

```
git clone git@github.com:kubernetes/kube-openapi.git
cd kube-openapi
```

Build the `openapi-gen` command line tool:

```
go build -o openapi-gen cmd/openapi-gen/openapi-gen.go
```

With this tool, we can then generate the OpenAPI spec for any data type
defined in Go source files.


```
./openapi-gen -i <path> -p <package>
```

where `<path>` is the path to the package containing the type definition,
`<package>` is the package name to use for the generated Go file.

E.g.

```
openapi-gen -i k8s.io/kubernetes/staging/src/k8s.io/kubelet/config/v1beta1 -p kubelet
```

We now get an `openapi_generated.go` file under `$GOPATH/src/kubelet`. The
generated Go source contains a `GetOpenAPIDefinitions()` function which
returns a map between the data type and its schema definition.

Each `OpenAPIDefinition` in the above map contains a `Schema` field, which can
be used to dump the JSON or YAML representation of the data type.
See `cmd/gen-kubelet.go` for an example how that data can be dumped.
