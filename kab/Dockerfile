FROM ubuntu:18.04

# install python3, pip3
RUN apt-get update -y && \
        apt-get install -y --no-install-recommends python3 python3-pip vim-tiny python3-wheel && \
        pip3 install --upgrade pip && \
        rm -rf /var/lib/apt/lists/*

# TODO(Qiming): Reenable the nginx
# setup nginx
# RUN echo "deb http://nginx.org/packages/mainline/ubuntu/ bionic nginx" >> /etc/apt/sources.list && \
#     echo "deb-src http://nginx.org/packages/mainline/ubuntu/ bionic nginx" >> /etc/apt/sources.list && \
#     apt-get update -y && \
#     apt-get install -y \
#         --allow-unauthenticated \
#         --no-install-recommends nginx && \
#     rm -rf /var/lib/apt/lists/*

# setup ssl for nginx
# ENV SSL_DIR /etc/nginx/ssl
# RUN mkdir -p $SSL_DIR
# ADD manifests/nginx/cert.conf $SSL_DIR
# RUN openssl req -x509 -nodes -days 730 -newkey rsa:2048 \
#         -keyout $SSL_DIR/server.key \
#         -out $SSL_DIR/server.crt \
#         -config $SSL_DIR/cert.conf \
#         -extensions 'v3_req'
# 
# ADD manifests/nginx/nginx.conf /etc/nginx/nginx.conf
# ADD manifests/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

ENV KAB_LOG_DIR /var/log
RUN mkdir -p $KAB_LOG_DIR

ENV APP_HOME /app
RUN mkdir -p $APP_HOME

# NOTE: The following ADD contents are sorted by change frequency
COPY kab/LICENSE kab/manage.py $APP_HOME/
ADD kab/dist $APP_HOME/dist

RUN mkdir -p $APP_HOME/data
RUN mkdir -p $APP_HOME/data/1.13
RUN mkdir -p $APP_HOME/data/1.14
RUN mkdir -p $APP_HOME/data/1.15
RUN mkdir -p $APP_HOME/data/1.16
RUN mkdir -p $APP_HOME/data/1.17
RUN mkdir -p $APP_HOME/data/1.18
RUN mkdir -p $APP_HOME/data/1.19
RUN mkdir -p $APP_HOME/data/1.20

ADD kubernetes/1.13 $APP_HOME/data/1.13
ADD kubernetes/1.14 $APP_HOME/data/1.14
ADD kubernetes/1.15 $APP_HOME/data/1.15
ADD kubernetes/1.16 $APP_HOME/data/1.16
ADD kubernetes/1.17 $APP_HOME/data/1.17
ADD kubernetes/1.18 $APP_HOME/data/1.18
ADD kubernetes/1.19 $APP_HOME/data/1.19
ADD kubernetes/1.20 $APP_HOME/data/1.20

COPY kubernetes/index.json $APP_HOME/data
COPY kubernetes/settings.json $APP_HOME/data

WORKDIR $APP_HOME

# Install KAB
RUN pip3 install "setuptools>=40.2.0" && \
    pip3 install dist/KAB*.whl && \
    rm -rf dist

EXPOSE 8000

CMD ["python3", "manage.py", "runserver", "0:8000"]
