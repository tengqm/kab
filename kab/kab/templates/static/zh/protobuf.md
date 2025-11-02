## Protobuf 编码

Kubernetes 会使用一种封套格式来处理 *Protobuf* 格式的响应。
封套部分用一个 4 字节的**魔数（Magic Number）**来标示磁盘或 etcd
中的数据是 *Protobuf* 格式而非 JSON 格式的。
其后是 Protobuf 协议编码的封套消息，给出内容的编码以及下层对象的类型；
最后是对象本身的内容。

封套的格式如下：

```
// 四字节的魔数前缀
Bytes 0-3: "k8s\x00" [0x6b, 0x38, 0x73, 0x00]

// Protobuf 编码的消息，其内容使用下面的 IDL
message Unknown {
  // typeMeta 应该包含 "apiVersion" 和 "kind" 的字符串值，
  // 正如 JSON 对象中所设置的那样。
  optional TypeMeta typeMeta = 1;

  // raw 中包含 protobuf 格式序列化的完整对象。
  // 针对不同资源类别，可参考客户端库中对应的 protobuf 定义。
  optional bytes raw = 2;

  // contentEncoding 是对原始数据所施行的编码。
  // 如果未设置，则标示没有施行额外的编码处理。
  optional string contentEncoding = 3;

  // contentType 是对 'raw' 中数据进行序列化是所采用的方法。
  // 如果未设置，则意味着采用 application/vnd.kubernetes.protobuf 编码。
  // 此字段通常会被省略。
  optional string contentType = 4;
}

message TypeMeta {
  // apiVersion 是对应资源类别的 API 组与版本信息
  optional string apiVersion = 1;

  // kind 是对象模式（Schema）的名称。
  // 每个对象都应该具有与之对应的 protobuf 定义。
  optional string kind = 2;
}
```

客户端接收到 `"application/vnd.kubernetes.protobuf"` 编码的响应消息时，
如果消息前缀与所期望的前缀不匹配，应该拒绝处理该响应。
这是因为将来的版本中可能会以某种不兼容的格式来执行序列化操作，
格式变更时对应的前缀也会发生变化。

