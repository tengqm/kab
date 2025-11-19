## Stream

Some of the API operations exposed by Kubernetes involve transfer of binary
streams between the client and a container, including `attach`, `exec`,
`portforward` and `logging`. The API exposes certain operations over
upgradable HTTP connections (described in
<a href="https://tools.ietf.org/html/rfc2817" target="_blank">
RFC2817 <i class='fa fa-external-link-alt'></i></a>)
via the WebSocket and SPDY protocols. These actions are exposed as
subresources with their associated verbs (`exec`, `log`, `attach` and
`portforward`) are requested via a `GET` and `POST`. The `GET` operation is
mainly to support JavaScript in a browser and the `POST` operation is
semantically accurate.

There are two primary protocols used today:

- **Streamed Channels**: When dealing with multiple independent binary streams
  of data such as the remote execution of a shell command (writing to STDIN,
  reading from STDOUT and STDERR) or forwarding multiple ports the streams can
  be multiplexed onto a single TCP connection. Kubernetes supports a SPDY based
  framing protocol that leverages SPDY channels and a WebSocket framing protocol
  that multiplexes multiple channels onto the same stream by prefixing each
  binary chunk with a byte indicating its channel. The WebSocket protocol
  supports an optional subprotocol that handles base64-encoded bytes from the
  client and returns base64-encoded bytes from the server and character based
  channel prefixes (`'0'`, `'1'`, `'2'`) for ease of use from JavaScript in a
  browser.

- **Streaming response**: The default log output for a channel of streaming
  data is an HTTP Chunked Transfer-Encoding, which can return an arbitrary
  stream of binary data from the server. Browser-based JavaScript is limited in
  its ability to access the raw data from a chunked response, especially when
  very large amounts of logs are returned, and in future API calls it may be
  desirable to transfer large files. The streaming API endpoints support an
  optional WebSocket upgrade that provides a unidirectional channel from the
  server to the client and chunks data as binary WebSocket frames. An optional
  WebSocket subprotocol is exposed that base64 encodes the stream before
  returning it to the client.

Clients should use the SPDY protocols if their clients have native support, or
WebSockets as a fallback. Note that WebSockets is susceptible to
"Head-of-Line" blocking and so clients must read and process each message
sequentially. In the future, an HTTP/2 implementation will be exposed that
deprecates SPDY.

