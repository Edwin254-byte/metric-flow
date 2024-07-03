
source "./env.sh"; source "./func.sh"

function build_srv(){
    local name="$1"
    show_msg "Creating $name container...."

    # just execute the docker file for the respective service
    podman build -t $name "../$name"

    #add more steps to tag and finally push
}

function tag_pod(){
   local name="$1"
   local tag="edu254byte/learn:$2"
    show_msg "tagging $name pod to $tag"

    podman tag $name $tag
    show_msg "Pushing the tagged container to docker hub"
    podman push $tag
}

function start_pod(){
    local name="$1"
    local tag="docker.io/edu254byte/learn:$2"
    show_msg "starting $tag ..."

    local name="$1"

    [ "x$name" == "xnode-client" ] && port=$NODE_CLIENT_PORT
    [ "x$name" == "xsocket-client" ] && port=$SOCKET_CLIENT_PORT
    [ "x$name" == "xsocket-server" ] && port=$SOCKET_SERVER_PORT
    [ "x$port" == "x" ] && show_err "service PORT NOT found"

    printf "port to be used: $NODE_CLIENT_PORT \n"
    show_msg "starting $name pod and forwaring port: $port"

    hostname=$(hostname)
    podman rm -f $name; podman run -d -p $port:$port  --name $name --hostname $hostname "$tag"; update_firewall $port
}


function update_firewall(){
    local port="$1/tcp"
    show_msg "Allowing port $port in the firewall "
    sudo firewall-cmd --add-port="$port"
    sudo firewall-cmd --add-port="$port" --permanent

}
