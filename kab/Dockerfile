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

ENV KAB_ROOT /app

ENV KAB_LOG_DIR $KAB_ROOT/log
RUN mkdir -p $KAB_ROOT && \
    mkdir -p $KAB_LOG_DIR

# NOTE: The following ADD contents are sorted by change frequency
COPY kab/LICENSE kab/manage.py $KAB_ROOT/
ADD kab/dist $KAB_ROOT/dist

RUN mkdir -p $KAB_ROOT/data && \
    mkdir -p $KAB_ROOT/data/1.16 && \
    mkdir -p $KAB_ROOT/data/1.17 && \
    mkdir -p $KAB_ROOT/data/1.18 && \
    mkdir -p $KAB_ROOT/data/1.19 && \
    mkdir -p $KAB_ROOT/data/1.20 && \
    mkdir -p $KAB_ROOT/data/1.21 && \
    mkdir -p $KAB_ROOT/data/1.22 && \
    mkdir -p $KAB_ROOT/data/1.23

ADD kubernetes/1.16 $KAB_ROOT/data/1.16
ADD kubernetes/1.17 $KAB_ROOT/data/1.17
ADD kubernetes/1.18 $KAB_ROOT/data/1.18
ADD kubernetes/1.19 $KAB_ROOT/data/1.19
ADD kubernetes/1.20 $KAB_ROOT/data/1.20
ADD kubernetes/1.21 $KAB_ROOT/data/1.21
ADD kubernetes/1.22 $KAB_ROOT/data/1.22
ADD kubernetes/1.23 $KAB_ROOT/data/1.23

COPY kubernetes/index.json $KAB_ROOT/data
COPY kubernetes/settings.json $KAB_ROOT/data
COPY kubernetes/features.json $KAB_ROOT/data

WORKDIR $KAB_ROOT

# Install KAB
RUN pip3 install "setuptools>=40.2.0" && \
    pip3 install dist/KAB*.whl && \
    rm -rf dist

EXPOSE 8000

CMD ["python3", "manage.py", "runserver", "0:8000"]
