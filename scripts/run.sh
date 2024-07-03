#!/bin/bash

# varibles parsed: -a: action [g:generate,b:build,r:runs,t-tag], -s: service [nc:node-container,sc:socket-client,ss:server-socket]

# source the files needed inorder to run their function
source "./gen.sh"; source "./pod.sh"; 


# Call the function to parse arguments
 parse_args "$@"

# call respective operation
[ "x$action" == "xg" ] && copy_env $service
[ "x$action" == "xb" ] && copy_env $service && build_srv $service # only creates the image
[ "x$action" == "xr" ] && start_pod $service $tag
[ "x$action" == "xt" ] && tag_pod $service $tag # This will tag and also push image to docker hub
