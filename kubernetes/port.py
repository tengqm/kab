#!/usr/bin/env python3

import argparse
import json
import os
import pathlib
import sys

from kab.core import helpers
from kab.core import jsondiff

basedir = "."
ARGS = None


def parse_args():
    global ARGS

    parser = argparse.ArgumentParser(description="API comparator")
    parser.add_argument("--base", dest="base_version", required=True,
                        help="Base API version for comparison")
    parser.add_argument("--to", dest="to_version", required=True,
                        help="Target version for comparsion")
    parser.add_argument("--type", dest="data_type", default="defs",
                        choices=["defs", "ops"],
                        help=("Data type for comparison, one of 'defs' "
                              "and 'ops'"))
    parser.add_argument("--file", required=True,
                        help="File for comparison")
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

def traverse(major, minor0, minor1):
    helpers.init(".")
    result = {}
    direction = minor1 - minor0
    minor_from = minor0

    if direction > 0:
        minor_to = minor0 + 1
    else:
        minor_to = minor0 - 1

    while True:
        v0 = str(major) + "." + str(minor_from)
        v1 = str(major) + "." + str(minor_to)
        print("checking " + v1)
        path0 = os.path.join(v0, ARGS.data_type)
        for file0 in pathlib.Path(path0).glob(ARGS.file):
            basename = os.path.basename(file0)
            file1 = os.path.join(v1, ARGS.data_type, basename)
            if not os.path.isfile(file1):
                if basename not in result:
                    result[basename] = {v1: {"status": "DELETED"}}
                else:
                    result[basename][v1] = {"status": "DELETED"}
                continue

            if ARGS.data_type == "defs":
                res = jsondiff.compare([v0, v1], file0, file1, root=".")
            else:
                opid = os.path.splitext(basename)[0]
                print(opid)
                res = jsondiff.compare_ops([v0, v1], opid, root=".")

            if res:
                if basename not in result:
                    result[basename] = {
                        v1: {"status": "CHANGED", "changes": res}
                    }
                else:
                    result[basename][v1] = {
                        "status": "CHANGED",
                        "changes": res
                    }
            else:
                result[basename] = None

        path1 = os.path.join(v1, ARGS.data_type)
        for f in pathlib.Path(path1).glob(ARGS.file):
            basename = os.path.basename(f)
            if basename not in result:
                result[basename] = {v1: {"status": "ADDED"}}
            elif result[basename] is None:
                result.pop(basename)

        # Done?
        if minor_to == minor1:
            break

        # go to next version
        if direction > 0:
            minor_from += 1
            minor_to +=1
        else:
            minor_from -= 1
            minor_to -= 1

    return result

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
    print(json.dumps(result, indent=2)) 
    return 0


if __name__ == "__main__":
    sys.exit(main())

