FROM python:alpine3.17

ENV PYTHONUNBUFFERED=1
# install python3, pip3
# RUN apt-get update -y && \
#        apt-get install -y --no-install-recommends python3 python3-pip python3-wheel && \
#        pip3 install --upgrade pip && \
#        rm -rf /var/lib/apt/lists/*
# RUN apk add --update --no-cache python3 py3-pip && \
#     ln -sf python3 /usr/bin/python && \
#   python3 -m ensurepip && \
RUN pip3 install --no-cache --upgrade pip

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
# COPY manifests/nginx/cert.conf $SSL_DIR
# RUN openssl req -x509 -nodes -days 730 -newkey rsa:2048 \
#         -keyout $SSL_DIR/server.key \
#         -out $SSL_DIR/server.crt \
#         -config $SSL_DIR/cert.conf \
#         -extensions 'v3_req'
# 
# COPY manifests/nginx/nginx.conf /etc/nginx/nginx.conf
# COPY manifests/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

ENV KAB_ROOT /app
ENV KAB_LOG_DIR $KAB_ROOT/log

RUN mkdir -p $KAB_ROOT && \
    mkdir -p $KAB_LOG_DIR

# NOTE: The following ADD contents are sorted by change frequency
COPY kab/LICENSE kab/manage.py $KAB_ROOT/
COPY kab/dist $KAB_ROOT/dist

RUN mkdir -p $KAB_ROOT/data && \
    mkdir -p $KAB_ROOT/data/1.21 && \
    mkdir -p $KAB_ROOT/data/1.22 && \
    mkdir -p $KAB_ROOT/data/1.23 && \
    mkdir -p $KAB_ROOT/data/1.24 && \
    mkdir -p $KAB_ROOT/data/1.25 && \
    mkdir -p $KAB_ROOT/data/1.26 && \
    mkdir -p $KAB_ROOT/data/1.27

COPY kubernetes/1.21 $KAB_ROOT/data/1.21
COPY kubernetes/1.22 $KAB_ROOT/data/1.22
COPY kubernetes/1.23 $KAB_ROOT/data/1.23
COPY kubernetes/1.24 $KAB_ROOT/data/1.24
COPY kubernetes/1.25 $KAB_ROOT/data/1.25
COPY kubernetes/1.26 $KAB_ROOT/data/1.26
COPY kubernetes/1.27 $KAB_ROOT/data/1.27

COPY kubernetes/index.json $KAB_ROOT/data
COPY kubernetes/settings.json $KAB_ROOT/data
COPY kubernetes/features.json $KAB_ROOT/data

WORKDIR $KAB_ROOT

# Install KAB
RUN pip3 install "setuptools>=67.6.1" && \
    pip3 install dist/kab-*.whl && \
    rm -rf dist

EXPOSE 8000

CMD ["python3", "manage.py", "runserver", "0:8000"]
