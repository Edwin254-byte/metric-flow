#!/bin/bash

# Function to parse named arguments
parse_args() {
  # Initialize variables with default values
  local name=""
  local age=""

  # Parse named arguments
  while getopts ":n:a:" opt; do
    case $opt in
      n)
        name="$OPTARG"
        ;;
      a)
        age="$OPTARG"
        ;;
      \?)
        echo "Invalid option: -$OPTARG" >&2
        exit 1
        ;;
      :)
        echo "Option -$OPTARG requires an argument." >&2
        exit 1
        ;;
    esac
  done

  # Check if no options were provided
  if [ $OPTIND -eq 1 ]; then
    echo "Usage: $(basename "$0") -n <name> -a <age>"
    exit 1
  fi

  # Check if required options have been provided
  if [ -z "$name" ] || [ -z "$age" ]; then
    echo "Error: Missing required arguments."
    echo "Usage: $(basename "$0") -n <name> -a <age>"
    exit 1
  fi

  # Output the values of the named arguments
  echo "Name: $name"
  echo "Age: $age"
}

# Call the function to parse arguments
parse_args "$@"
