# run the podman command and built the container with relative reference of the name provided

build_srv(){
    name="$1"
    echo "Creating $name container...."


    # just execute the docker file for the respective service
    podman build -t $name "../$name"
}
