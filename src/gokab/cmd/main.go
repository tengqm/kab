package main

import (
	"html/template"
	"log"
	"net/http"
	"os"
	"path"

	"gokab/pkg/context"
)

// Main entry of the server
func main() {
	fs := http.FileServer(http.Dir("public"))
	http.Handle("/public/", http.StripPrefix("/public/", fs))

	http.HandleFunc("/", ServeTemplate)

	log.Println("INFO: Listening...")
	err := http.ListenAndServe(GetPort(), nil)
	if err != nil {
		log.Println("ERROR: ListenAndServe: ", err)
		return
	}
}

// Get the Port from the environment so we can run on Heroku
func GetPort() string {
	var port = os.Getenv("PORT")
	// Set a default port if there is nothing in the environment
	if port == "" {
		port = "8080"
		log.Println("INFO: No PORT environment variable detected, defaulting to " + port)
	}
	return ":" + port
}

func ServeTemplate(w http.ResponseWriter, r *http.Request) {

	ctx := context.GetContext()

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
		log.Println(err)
		http.Error(w, "500 Internal Server Error", 500)
		return
	}

	tmpls.ExecuteTemplate(w, "base", ctx)
}
