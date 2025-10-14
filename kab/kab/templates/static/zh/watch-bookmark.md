## Watch Bookmarks

To mitigate the impact of short history window, Kubernetes introduced a
concept of `bookmark` watch event. It is a special kind of event to mark that
all changes up to a given `resourceVersion` the client is requesting have
already been sent. Object returned in that event is of the type requested by
the request, but only `resourceVersion` field is set, e.g.:

```console
GET /api/v1/namespaces/test/pods?watch=1&amp;resourceVersion=10245&amp;allowWatchBookmarks=true
---
200 OK
Transfer-Encoding: chunked
Content-Type: application/json

{
  "type": "ADDED",
  "object": {"kind": "Pod", "apiVersion": "v1", "metadata": {"resourceVersion": "10596", ...}, ...}
}
...
{
  "type": "BOOKMARK",
  "object": {"kind": "Pod", "apiVersion": "v1", "metadata": {"resourceVersion": "12746"} }
}
```

`Bookmark` events can be requested by `allowWatchBookmarks=true` option in
**watch** requests, but clients shouldn't assume bookmarks are returned at any
specific interval, nor may they assume the server will send any `bookmark`
event.

