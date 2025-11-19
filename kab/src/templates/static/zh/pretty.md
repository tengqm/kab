## Pretty

当用户为查询字符串 `pretty` 设置 `"true"`、`"1"` 或 `"T"` 这类值，
并且内容类型（Content-Type）为 `"application/json"` 时，
API 服务器会将结果的 JSON 数据进行缩进与换行相关的排版，方便人类阅读。

API 服务器还会检测请求中所设置的 `User-Agent` 头部是否带有以下前缀：

- `"curl"`
- `"Wget"`
- `"Mozilla/5.0"`

如果此头部字段包含了以上前缀之一，返回的 JSON 结果也会被排版。

