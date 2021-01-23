## API Concepts

### 1. Overview

The Kubernetes API is a resource-based (RESTful) programmatic interface
provided through HTTP.
The REST API is the fundamental fabric of Kubernetes, exposed by the API server.
With the API, you can:

- create, retrieve, update and delete primary resources via the standard HTTP
  verbs (`POST`, `PUT`, `PATCH`, `DELETE`, `GET`).
- operate the additional subresources for objects that support them.
- instruct the API server to return responses in specific format for
  convenience or efficiency. 
- <a href="{% url 'static-page' 'watch' %}">watch</a> the changes on certain
  resources to get notifications.
- retrieve a consistent list of resources to allow other components to
  effectively cache and sync the resource states.

### 2. The Kubernetes API

The specification for each API contains the following components:

<ul>
  <li>the <a href="{% url 'static-page' 'path' %}">path</a>
  </li>
  <li>the <a href="{% url 'static-page' 'verbs' %}">verb</a>
    <ul>
      <li>Kubernetes handles the <code>CREATE</code>, <code>DELETE</code>,
        <code>PUT</code>, <code>GET</code> much the same way as any other
        RESTful Web services.
      </li>
      <li>The handling of the <a href="{% url 'static-page' 'patches' %}">
        PATCH</a> verb is a source of complexity. The body of the request
        differs when the patch type is different.
      </li>
    </ul>
  </li>
  <li>the headers, which contains additional information such as:
    <ul>
      <li>the <a href="{% url 'static-page' 'content-type' %}">content type</a>
       of the request body and the expected response. The JSON format
       (<code>"application/json"</code>) is common, but Kubernetes has
       also defined a <a href="{% url 'static-page' 'protobuf' %}">protobuf</a>
       format for the sake of efficiency and performance.
      </li>
      <li>the authentication credentials
      </li>
    </ul>
  </li>
  <li>the body, encoded in a specific <a href="{% url 'static-page' 'content-type' %}">content type</a>.
    <ul>
      <li>Kubernetes has a lot of <a href="{% url 'list-definitions' '' 'all' %}">definitions</a>,
        some of which are <a href="{% url 'list-resources' '' 'all' %}">resources</a>
        that are directly exposed to be created, updated, others are data
        structrures for higher level concepts.
      </li>
      <li>Kubernetes has <a href="{% url 'static-page' 'extensions' %}">extensions</a>
        to the basic <a href="https://www.openapis.org/" target="_blank">OpenAPI</a>
        specification.
      </li>
      <li>An API <a href="{% url 'static-page' 'resource' %}">resource</a>
        may be an <a href="{% url 'static-page' 'object' %}">object</a>.
      </li>
      <li>An object is identified by its <a href="{% url 'static-page' 'name' %}">name</a>.
        For some objects, the name can be automatically generated completely or partially
        generated when `metadata.generateName` is specified.
      </li>
      <li>An object usually has a schema definition which is called a
        <a href="{% url 'static-page' 'kind' %}">kind</a>.
      </li>
      <li>Once an object is persisted into the database, it gets a
        <a href="{% url 'static-page' 'uid' %}">unique ID</a> and a
        <a href="{% url 'static-page' 'resource-version' %}">resource version</a>.
      </li>
      <li>For some long running requestions, the data transferred between the
        servers and the clients could be binary
        <a href="{% url 'static-page' 'stream' %}">streams</a>.
      </li>
    </ul>
  </li>
  <li>the query strings (also called <i>parameters</i>), such as:
    <ul>
     <li><a href="{% url 'static-page' 'dry-run' %}">dry-run</a>
     </li>
     <li><a href="{% url 'static-page' 'exact' %}">exact</a>: specify whether
       the <code>export</code> parameter should maintain cluster-specific fields
       like<code>namespace</code>.
     </li>
     <li><a href="{% url 'static-page' 'export' %}">export</a>: specify
        whether the value should be exported.
     </li>
     <li><a href="{% url 'static-page' 'pretty' %}">pretty</a>: .
     </li>
     <li><code>limit</code> and <code>continue</code> for splitting large
       response into <a href="{% url 'static-page' 'pagination' %}">chunks</a>.
     </li>
     <li><a href="{% url 'static-page' 'watch' %}">pretty</a>: starts a
       subscription on a specific resource to get notified when future changes
       are made.
     </li>
     <li><code>fieldManager</code>: for raising a
       <a href="{% url 'static-page' 'server-side-apply' %}">server-side apply</a>
       request.
     </li>
    </ul>
  </li>
</ul>

### 3. References

#### The OpenAPI Specification

The official API specification is generated in the
<a href="https://www.openapis.org/" target="_blank">OpenAPI V2
<i class='fa fa-external-link-alt'></i></a>
format from the Go source code and published at the kubernetes
<a href="https://github.com/kubernetes/kubernetes/blob/master/api/openapi-spec/swagger.json"
target="_blank">repo <i class='fa fa-external-link-alt'></i></a>.

#### Working with the API

You can use the <kbd>kubectl</kbd> command line interface to invoke the API
and you can use other tools as well. There are
<a href="https://kubernetes.io/docs/reference/using-api/client-libraries"
target="_blank">client libraries <i class='fa fa-external-link-alt'></i></a>
to use if you are writing applications to invoke the API.


