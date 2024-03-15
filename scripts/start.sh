# just start the container with the name provided
source "./env.sh"; source "./utils.sh"

function start_pod(){
    local name="$1"
    echo "starting $name pod..."

    local name="$1"

    [ "x$name" == "xnode-client" ] && port=$NODE_CLIENT_PORT
    [ "x$name" == "xsocket-client" ] && port=$SOCKET_CLIENT_PORT
    [ "x$name" == "xsocket-server" ] && port=$SOCKET_SERVER_PORT
    [ "x$port" == "x" ] && show_err "service PORT NOT found"

    printf "port to be used: $NODE_CLIENT_PORT \n"
    show_msg "starting $name pod and forwaring port: $port"

    podman rm -f $name; podman run -d -p $port:$port  --name $name $name; update_firewall $port
}


function update_firewall(){
    local port="$1/tcp"
    show_msg "Allowing port $port in the firewall "
    sudo firewall-cmd --add-port="$port"
    sudo firewall-cmd --add-port="$port" --permanent

}
