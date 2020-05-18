#!/bin/bash

set -e

KAB_VERSION=$1

URL=$2
REPO_URL=${URL:-'git@github.ibm.com:crl-cloud-team/kab.git'}

if [ ""$KAB_VERSION == "" ] ; then
    echo -e "Please specify the tag for build:\n\n $0 <tag> [<url>]\n"
    exit -1
fi

BUILD_DIR="/tmp/build"
PKG_DIR=${BUILD_DIR}/Flowor-${KAB_VERSION}
RELEASE_FILE="kab-${KAB_VERSION}.linux.zip"

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
    for d in dist build KAB.egg-info
    do
        if [ -d $d ];then
            rm -rf $d
        fi
    done
    pip3 install --upgrade setuptools wheel
    python3 setup.py bdist_wheel
}

function create_image() {
    if [ ! -d $PKG_DIR ] ; then
        echo -e "Creating directory $PKG_DIR"
        mkdir -p $PKG_DIR
    fi

    version=$1
    image="kab:${version}"
    echo -e "  Checking image for ${image}"
    FOUND=`docker images $image --format "{{.ID}}"`
    if [ ""$FOUND == "" ] ; then
        echo -e "  ${image} not found, building from scratch..."
        docker build -f Dockerfile -t ${image} ./
        echo -e "  ${image} is ready"
    fi

    echo -e "  Dumping image for ${image}"
    docker save $image --output=$PKG_DIR/kab-$version.tar
    echo -e "  ${image} is dumped"
}

echo "Start building KAB image"

clone_code
cd $BUILD_DIR
build_wheel
create_image $KAB_VERSION

echo -e "Completed building KAB image: kab:${KAB_VERSION}"

# vim:ts=4 sts=4 sw=4 ai et
