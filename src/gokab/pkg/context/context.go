package context

type Context struct {
	APIS       []string
	API        string
	KABVersion string
}

func GetContext() *Context {
	return &Context{
		APIS:       []string{"1.13", "1.14", "1.15", "1.16", "1.17", "1.18"},
		API:        "1.18",
		KABVersion: "0.1",
	}
}
