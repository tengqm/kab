package main

import (
	"fmt"
	"html/template"
	"log"
	"net/http"
	"os"
	"path"
)

type Context struct {
	APIS       []string
	API        string
	KABVersion string
}

// Main entry of the server
func main() {
	fs := http.FileServer(http.Dir("public"))
	http.Handle("/public/", http.StripPrefix("/public/", fs))

	http.HandleFunc("/", ServeTemplate)

	fmt.Println("Listening...")
	err := http.ListenAndServe(GetPort(), nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
		return
	}
}

// Get the Port from the environment so we can run on Heroku
func GetPort() string {
	var port = os.Getenv("PORT")
	// Set a default port if there is nothing in the environment
	if port == "" {
		port = "4747"
		// TODO: Better log lib
		fmt.Println("INFO: No PORT environment variable detected, defaulting to " + port)
	}
	return ":" + port
}

func ServeTemplate(w http.ResponseWriter, r *http.Request) {
	context := Context{
		APIS:       []string{"1.13", "1.14", "1.15", "1.16", "1.17", "1.18"},
		API:        "1.18",
		KABVersion: "0.1",
	}

	lp := path.Join("templates", "base.html")
	fp := path.Join("templates", r.URL.Path)

	// Return a 404 if the template doesn't exist
	info, err := os.Stat(fp)
	if err != nil {
		if os.IsNotExist(err) {
			http.NotFound(w, r)
			return
		}
	}

	// Return a 404 if the request is for a directory
	if info.IsDir() {
		http.NotFound(w, r)
		return
	}

	tmpls, err := template.ParseFiles(lp, fp)
	if err != nil {
		fmt.Println(err)
		http.Error(w, "500 Internal Server Error", 500)
		return
	}

	tmpls.ExecuteTemplate(w, "base", context)
}
