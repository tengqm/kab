#!/usr/bin/env python3

import argparse
import json
import os
import pathlib
import sys

import jsonpatch
import jsonpointer

from kab.core import helpers
from kab.core import jsondiff
from kab.core import jsonutil

basedir = "."
ARGS = None


def parse_args():
    global ARGS

    parser = argparse.ArgumentParser(description="API comparator")
    parser.add_argument("--base", dest="base_version", required=True,
                        help="Base API version for comparison")
    parser.add_argument("--to", dest="to_version", required=True,
                        help="Target version for comparsion")
    parser.add_argument("--field", dest="field",
                        help="Field whose value will be copied")
    parser.add_argument("--type", dest="data_type", default="defs",
                        choices=["defs", "ops", "parameters"],
                        help="File type to check")
    parser.add_argument("--file", required=True,
                        help="File for checking")
    ARGS = parser.parse_args()

    if not os.path.isdir(ARGS.base_version):
        print("Error: base version '%s' is invalid" % ARGS.base_version)
        return -1
    if not os.path.isdir(ARGS.to_version):
        print("Error: target version '%s' is invalid" % ARGS.to_version)
        return -1

    return 0


def parse_version(ver):
    """Split version into major and minor"""
    vs = ver.split(".")
    if len(vs) != 2:
        return -1, -1
    return int(vs[0]), int(vs[1])


def get_next_version(minor_to, minor1, direction):
    if minor_to == minor1:
        return -1
    if direction > 0:
        return minor_to + 1
    return minor_to - 1

def traverse(major, minor0, minor1):
    helpers.init(".")
    result = {}
    direction = minor1 - minor0
    minor_from = minor0

    if direction > 0:
        minor_to = minor0 + 1
    else:
        minor_to = minor0 - 1

    v0 = str(major) + "." + str(minor_from)
    file0 = os.path.join(v0, ARGS.data_type, ARGS.file)
    if not os.path.isfile(file0):
        print("%s is not found." % file0)
        return -1
    data = {}
    try:
        with open(file0, "r") as f:
            data = json.loads(f.read())
    except Exception as ex:
        print("Cannot read %s: %s" % (file0, str(ex)))
        return -1

    value = jsonpointer.resolve_pointer(data, ARGS.field, None) 
    if value is None:
        print("Source value is None!" % value)
        return -1
    else:
        print("Source:\n%s" % json.dumps(value, indent=2, sort_keys=True))

    basename = os.path.basename(file0)
    while True:
        v1 = str(major) + "." + str(minor_to)
        print("updating " + v1)
        file1 = os.path.join(v1, ARGS.data_type, basename)
        if not os.path.isfile(file1):
            print("Not found in version %s, skipping" % v1)
            minor_to = get_next_version(minor_to, minor1, direction)
            if minor_to == -1:
                break
            continue

        data = {}
        try:
            with open(file1, "r") as f:
                data = json.loads(f.read())
        except Exception as ex:
            print("Cannot read %s: %s" % (file1, str(ex)))

        if not data:
            minor_to = get_next_version(minor_to, minor1, direction)
            if minor_to == -1:
                break
            continue

        data1 = jsonpointer.set_pointer(data, ARGS.field, value)
        try:
            with open(file1, "w") as f:
                f.write(json.dumps(data1, indent=2, sort_keys=True))
        except Exception as ex:
            print("Cannot update %s: %s" % (file1, str(ex)))

        minor_to = get_next_version(minor_to, minor1, direction)
        if minor_to == -1:
            break
        continue
 
    return 0

def main():
    global ARGS

    ret = parse_args()
    if ret != 0:
        return ret

    vmajor0, vminor0 = parse_version(ARGS.base_version) 
    vmajor1, vminor1 = parse_version(ARGS.to_version) 
    if vminor0 == vminor1:
        print("Error: the two versions specified cannot be the same")
        return -1

    result = traverse(vmajor0, vminor0, vminor1)
    return result


if __name__ == "__main__":
    sys.exit(main())

