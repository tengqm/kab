#!/bin/bash

for f in `ls 1.15/ops/list*` ; do
  bfn=$(basename $f)
  [ -f 1.15rev/ops/$bfn ] && cp $f 1.15rev/ops/
done
