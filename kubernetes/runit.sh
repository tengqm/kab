export DIR=$PWD/$1
docker run -p 80:8080 -e SWAGGER_JSON=/data/swagger_recreate.json -v $DIR:/data swaggerapi/swagger-ui
