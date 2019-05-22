#!/bin/bash

baseDir=imgs_final
destDir=imgs_new
curPicIdx=1
newIdx=1
totalPics=3843

mkdir -p "$destDir"

while [ $curPicIdx -lt $totalPics ] ; do

    curFileName="${baseDir}/tl-${curPicIdx}.jpg"
    newFileName="${destDir}/tl-${newIdx}.jpg"

    if [ -e $curFileName ] ; then
        echo "$curFileName -> $newFileName"
        cp "$curFileName" "$newFileName"

        newIdx=`expr $newIdx + 1`
    fi

    curPicIdx=`expr $curPicIdx + 1`

done
