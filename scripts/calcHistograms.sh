#!/bin/bash

if [ -n $1 ] ; then
    OUTPUT_PATH=$1/histograms
    mkdir -p $OUTPUT_PATH

    for curImg in $1/*.jpg; do
        BASE_IMG=`basename $curImg`
        HIST_OUTPUT="${OUTPUT_PATH}/${BASE_IMG}.txt" 
        
        if [ ! -f "$HIST_OUTPUT" ] ; then
            echo "generating histogram for $curImg ..."
            convert $curImg -format "%c" histogram:info:- > "$HIST_OUTPUT"
        fi
    done
fi
#convert test.jpg -format "%c" histogram:info:- > test.txt
