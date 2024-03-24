#!/bin/bash

source "./func.sh"

function cmd_usage(){
    show_warn "Allowed options for: $(basename "$0")" >&2
    echo "-s service: nc(node-client),sc(socket-client),ss(socket-server)" >&2
    echo "-a action: b(build), g(generate), s(start), t(tag)" >&2
}

# ----------------------Function to parse named arguments
function parse_args() {

show_msg "Parsing args..."

# Parse named arguments
while getopts ":s:a:" opt; do
  case $opt in
    s)
    [ "x$OPTARG" == "xss" ] && service="socket-server"
    [ "x$OPTARG" == "xnc" ] && service="node-client"
    [ "x$OPTARG" == "xsc" ] && service="socket-client"
    [ "x$service" == "x" ] &&  cmd_usage && show_err "Invalid value for -s option: $OPTARG"
      ;;   
    a)
    [ "x$OPTARG" == "xg" ] && action="g"
    [ "x$OPTARG" == "xb" ] && action="b"
    [ "x$OPTARG" == "xr" ] && action="r"
    [ "x$OPTARG" == "xt" ] && action="t"
    [ "x$action" == "x" ] &&  cmd_usage && show_err "Invalid value for -a option: $OPTARG"

      ;;
    t)
    [ "x$OPTARG" != "x" ] && tag="$OPTARG"
      ;;
    \?)
       cmd_usage; show_err "Invalid option: -$OPTARG"; ;;
    :)
      cmd_usage;  show_err "Option -$OPTARG requires an argument."; ;;
  esac
done


  # Check if no options were provided
  if [ $OPTIND -eq 1 ]; then
     cmd_usage; show_err "Error: Missing required options.";
  fi

  # Check if required options have been provided
  if [ -z "$service" ] || [ -z "$action" ]; then
     cmd_usage; show_err "Error: Missing required options.";
  fi
}


# ------------------------------function to copy env. It needs 1 argument i.e. service name
function copy_env() {
show_msg "Generating the .env file"

# Define the source file
source_file="env.sh"
tmp_env_file="tmp-env.sh"

# Check if the source file exists
if [ ! -f "$source_file" ]; then
    show_err "Error: $source_file not found."; 
fi

# Define the destination folder path
destination_folder="../$1"
show_msg "Destination folder is $destination_folder"

# Check if the destination folder exists
if [ ! -d "$destination_folder" ]; then
    show_err "Error: Destination folder $destination_folder not found.";
fi

# Define the destination .env file path
env_file="$destination_folder/.env"

cat $source_file > $tmp_env_file;perform_replace $tmp_env_file; rm -f $env_file; clean $tmp_env_file $env_file;rm -f $tmp_env_file;

show_msg "Contents of $source_file copied to $env_file successfully."
}

