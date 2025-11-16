## UIDs

UID（唯一标识符）是由 Kubernetes 系统所生成的一个 UUID 值，用来唯一性地标识某个对象。
UUID 值的内部是一个 128 位的整数，在跨越不同时空的情况下发生冲突的概率极低，
并且不需要集中式的控制。
每个对象在其整个生命周期内都具有一个确定的 UID 值。
UUID 字符串的格式是根据 ISO/IEC 9834-8 和 ITU-T X.667 标准来格式化的，
标准定义在 <a href="http://www.ietf.org/rfc/rfc4122.txt" target="_blank">
RFC4222</a> 中。
