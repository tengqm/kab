#!/bin/bash

set -e

KAB_VERSION=$1

URL=$2
REPO_URL=${URL:-'git@github.com:tengqm/KAB.git'}

if [ ""$KAB_VERSION == "" ] ; then
    echo -e "Please specify the tag for build:\n\n $0 <tag> [<url>]\n"
    exit -1
fi

BUILD_DIR="/tmp/build"

function clone_code() {
    if [ -d $BUILD_DIR ] ; then
        echo -e "Deleting old $BUILD_DIR"
        rm -fr $BUILD_DIR
    fi
    git clone $REPO_URL $BUILD_DIR
    cd $BUILD_DIR
    git checkout -b $KAB_VERSION $KAB_VERSION
    if [ $? -ne 0 ] ; then
        echo -e "Invalid tag specified: ${KAB_VERSION}"
        exit -1
    fi
}

function build_wheel() {
    pushd $BUILD_DIR/kab

    for d in dist build KAB.egg-info
    do
        if [ -d $d ];then
            rm -rf $d
        fi
    done
    pip3 install setuptools wheel
    python3 setup.py bdist_wheel

    popd
}

function create_image() {
    pushd $BUILD_DIR

    version=$1
    image="kab:${version}"
    echo -e "Checking image for ${image}"
    FOUND=`docker images $image --format "{{.ID}}"`
    if [ ""$FOUND == "" ] ; then
        echo -e "${image} not found, building from scratch..."
        docker build -f kab/Dockerfile -t ${image} ./
        echo -e "${image} is ready"
    fi

    popd
}

echo "Start building KAB image"

clone_code
build_wheel
create_image $KAB_VERSION

echo -e "Completed building KAB image: kab:${KAB_VERSION}"

# vim:ts=4 sts=4 sw=4 ai et
