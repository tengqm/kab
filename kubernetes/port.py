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
    # TODO(Qiming): Make this a list
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
        print("Error: base dir '%s' is invalid" % ARGS.base_version)
        return -1
    if not os.path.isdir(ARGS.to_version):
        print("Error: target dir '%s' is invalid" % ARGS.base_version)
        return -1

    return 0


def traverse():
    helpers.init(".")
    dropped = []
    diffs = {}
    v0 = ARGS.base_version
    v1 = ARGS.to_version
    path = os.path.join(v0, ARGS.data_type)

    # check dropped or changed
    for f in pathlib.Path(path).glob(ARGS.file):
        basename = os.path.basename(f)
        t = os.path.join(v1, ARGS.data_type, basename)
        if not os.path.isfile(t):
            dropped.append(t)
            continue
        if ARGS.data_type == "defs":
            res = jsondiff.compare([v0, v1], f, t, root=".")
        else:
            res = jsondiff.compare_ops([v0, v1], basename, root=".")
        diffs[basename] = res
    print(json.dumps(diffs, indent=2)) 
    return 0

def main():
    global ARGS

    ret = parse_args()
    if ret != 0:
        return ret
    traverse()
    return 0


if __name__ == "__main__":
    sys.exit(main())

