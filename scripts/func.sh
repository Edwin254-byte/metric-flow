# replace bash enviroment variables in a file
function perform_replace(){
    local file="$1"; local data=$(sed -e "s/#.*//g" -e "s/\s*//g" -e "/^$/d" $file); local key=; local value=;
	while read -r line;
	do
		key=$(awk -F= '{print $1}' <<< $line ); value="$( sed -e 's,^.*=,,g' -e 's,",,g' <<< $line  )"; sed -i -e "s|\$$key|$value|g" "$file";
	done <<< $data
}

# remove comments and empty lines from src and write result to dst file
function clean(){ local src="$1"; local dst="$2"; sed -e "s/\s*#.*//g" -e "s/\s*//g" -e '/^$/d' "$src" >> "$dst"; printf "\n" >> "$dst"; }

function show_err(){ printf '\e[1;31m%-6s\e[m\n' "$(date '+%Y-%m-%dT%H:%M:%S%:z') - ERROR: $1"; exit 1; }

function show_msg(){ printf '\e[1;32m%-6s\e[m\n' "$(date '+%Y-%m-%dT%H:%M:%S%:z') - INFO: $1"; }

function show_warn(){ printf '\e[1;33m%-6s\e[m\n' "$(date '+%Y-%m-%dT%H:%M:%S%:z') - WARN: $1"; }