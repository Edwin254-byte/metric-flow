#!/bin/bash

# varibles parsed: -a: action [g:generate,b:build,r:runs], -s: service [nc:node-container,sc:socket-client,ss:server-socket]

# source the files needed inorder to run their function
source "./utils.sh"; source "./pod.sh"; 


# Call the function to parse arguments
 parse_args "$@"

# call respective operation
[ "x$action" == "xg" ] && copy_env $service
[ "x$action" == "xb" ] && copy_env $service && build_srv $service
[ "x$action" == "xr" ] && copy_env $service && start_pod $service
