#--------- multiple vms configs -----------------
current_dir            = File.dirname(File.expand_path(__FILE__))
ssh_id_file    = "#{current_dir}/../.ssh/id_ed25519"

$script = <<-'SCRIPT'
printf "Writing to hosts file...\n"
sed -i -e '$ a 192.168.10.2 v1.lcl\n192.168.10.3 v2.lcl\n192.168.10.4 v3.lcl\n192.168.10.5 v4.lcl\n192.168.10.6 v5.lcl\n' $HOSTS
SCRIPT

Vagrant.configure("2") do |config|

  config.ssh.insert_key = false
  config.ssh.username = "edu"
  config.ssh.private_key_path = [ssh_id_file]

  config.vm.provision "shell", inline: $script

  #---------- v1 (main)-------------
  config.vm.define "v1" do |v1|
    v1.vm.box = "r9"
    v1.vm.network "private_network", ip: "192.168.10.2"
    v1.vm.hostname = "v1.lcl"
   
    
    #resource management
    #v1.vm.network "forwarded_port", guest:80, host:8080
    # forward the ssh ports to unique port numbers
    # v1.vm.network "forwarded_port", guest: 22, host: 2222

    v1.vm.provider "virtualbox" do |v|
      v.memory = 8192
      v.cpus = 2
    end
  end

  #---------- v2 -------------
  config.vm.define "v2" do |v2|
    v2.vm.box = "r9"
    v2.vm.network "private_network", ip: "192.168.10.3"
    v2.vm.hostname = "v2.lcl"

   
   #resource management
    #v2.vm.network "forwarded_port", guest:80, host:8080
    # forward the ssh ports to unique port numbers
    # v2.vm.network "forwarded_port", guest: 22, host: 2223

    v2.vm.provider "virtualbox" do |v|
      v.memory = 6144
      v.cpus = 2
    end
  end
 
  #---------- v3 -------------
  config.vm.define "v3" do |v3|
    v3.vm.box = "r9"
    v3.vm.network "private_network", ip: "192.168.10.4"
    v3.vm.hostname = "v3.lcl"

   
   #resource management
    #v3.vm.network "forwarded_port", guest:80, host:8080
    # forward the ssh ports to unique port numbers
    # v3.vm.network "forwarded_port", guest: 22, host: 2224

    v3.vm.provider "virtualbox" do |v|
      v.memory = 1024
      v.cpus = 1
    end
  end

  #---------- v4 -------------
  config.vm.define "v4" do |v4|
    v4.vm.box = "r9"
    v4.vm.network "private_network", ip: "192.168.10.5"
    v4.vm.hostname = "v4.lcl"

   
   #resource management
    #v4.vm.network "forwarded_port", guest:80, host:8080
    # forward the ssh ports to unique port numbers
    # v4.vm.network "forwarded_port", guest: 22, host: 2225

    v4.vm.provider "virtualbox" do |v|
      v.memory = 1024
      v.cpus = 1
    end
  end

  #---------- v5 -------------
  config.vm.define "v5" do |v5|
    v5.vm.box = "r9"
    v5.vm.network "private_network", ip: "192.168.10.6"
    v5.vm.hostname = "v5.lcl"

   
   #resource management
    #v5.vm.network "forwarded_port", guest:80, host:8080
    # forward the ssh ports to unique port numbers
    # v5.vm.network "forwarded_port", guest: 22, host: 2225

    v5.vm.provider "virtualbox" do |v|
      v.memory = 1024
      v.cpus = 1
    end
  end


end
