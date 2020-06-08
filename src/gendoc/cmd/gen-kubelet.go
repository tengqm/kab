package main

import (
	"fmt"

	"github.com/go-openapi/spec"

	"gendoc/pkg/kubelet"
)

func deref(path string) spec.Ref {
	refo, err := spec.NewRef(path)
	if err != nil {
		return spec.Ref{}
	}
	return refo
}

func main() {
	defs := kubelet.GetOpenAPIDefinitions(deref)
	for k, s := range defs {
		if k == "k8s.io/kubelet/config/v1beta1.KubeletConfiguration" {
			fmt.Printf("dependencies: %v", s.Dependencies)
			bs, err := s.Schema.MarshalJSON()
			if err != nil {
				fmt.Println("Failed marshalling JSON")
			} else {
				str := string(bs[:])
				fmt.Print(str)
			}
			break
		}
	}
	return
}
