# **Metric Flow**

**Developer:** Edwin Odhiambo

## **Table of Contents**

1. [Goal](#goal)
2. [Problem Statement](#problem-statement)
3. [Note](#note)
4. [Key Features](#key-features)
5. [General Infrastructure and Flow](#general-infrastructure-and-flow)
6. [Simulation Setup](#simulation-setup)
7. [Getting Started](#getting-started)
   - [Part 1: Setting Up the Rocky Linux Base OS in VirtualBox](#part-1-setting-up-the-rocky-linux-base-os-in-virtualbox)
   - [Part 2: Creating VMs](#part-2-creating-vms)
   - [Part 3: Installing Metric Flow on VMs](#part-3-installing-metric-flow-on-vms)
   - [Part 4: Running the Services](#part-4-running-the-services)
   - [Part 5: Collecting Data on Other VMs](#part-5-collecting-data-on-other-vms)
8. [Contributing](#contributing)
9. [License](#license)
10. [Contact](#contact)

## **Goal**

The Metric Flow project aims to simulate utilizing various modern technologies such as WebSocket protocol with Socket.io, bash scripting, containerization using Podman, and Vagrant virtualization. By the end of this project, you should have a solid understanding of WebSocket concepts and deployment processes using Docker Hub and Podman.

## **Problem Statement**

When code executes successfully on one machine but fails on another, it often indicates environment-specific issues. To address this problem, this project explores the use of container technologies like Docker and Podman to create consistent environments across different machines.

## **Note**

This project primarily focuses on backend technologies that come into play post-software development, emphasizing less on the UI aspect and more on bash scripting, containerization, firewall management, and virtualization.

## **Key Features**

1. **Authentication with JWT:** Utilizes JSON Web Tokens for secure user authentication.
2. **User Data Management:** Implements MongoDB for managing user data.
3. **Task Automation:** Uses bash scripting for automating tasks and setups.
4. **Containerization:** Employs Podman and Docker Hub for container management and deployment.
5. **Virtualization:** Uses Vagrant for creating and managing virtual machines.
6. **Machine Metrics Monitoring:** Reads machine metrics like RAM, CPU, and clock speed using Node.js OS module.
7. **Metrics Display:** Utilizes React for displaying machine metrics.
8. **Firewall Management:** Manages firewalls on Unix virtual machines, specifically focusing on the RHEL family (e.g., Rocky Linux).

## **General Infrastructure and Flow**

Metric Flow consists of three main services:

1. **Socket Server**
   - **Role:** Acts as the primary server, built with Node.js.
   - **Functionality:** Hosts the Socket.io server instance and manages user authentication.
2. **Socket Client**
   - **Role:** Provides the user interface.
   - **Functionality:** Built with React, it allows users to authenticate and view machine metrics.
3. **Node Client**
   - **Role:** Acts as a metric data sender.
   - **Functionality:** A Node.js server that runs a Socket.io client instance, sending machine metrics to the Socket Server.

**Service Communication:**

- All services communicate using the Socket.io protocol.
- Authentication is managed over HTTP, while other data is transmitted via WebSockets (WS).
- The Node Client connects to the Socket Server and sends machine metrics using the WebSocket protocol.
- The Socket Server aggregates metrics from all Node Client instances and forwards them to the Socket Client for display.
- The Socket Client ensures that only authenticated users can view the collected metrics.

## **Simulation Setup**

- **Environment:**
  - The Socket Server and Socket Client will run on a single virtual machine (Rocky Linux).
  - The Node Client will be deployed on multiple machines, including the one hosting the Socket Server and Socket Client.
- **Visualization:**
  - The Socket Client will be accessed via a web browser, allowing users to view the authentication process and the metrics transmitted by the Socket Server.

## **Getting Started**

Welcome to Metric Flow! This guide will walk you through the entire process of setting up and running the Metric Flow system using Vagrant, VirtualBox, and Rocky Linux.

### Part 1: Setting Up the Rocky Linux Base OS in VirtualBox

**Prerequisites:**

- **Vagrant**: [Download Vagrant](https://www.vagrantup.com/downloads)
- **Oracle VM VirtualBox**: [Download VirtualBox](https://www.virtualbox.org/wiki/Downloads)
- **Rocky Linux**: [Download Rocky Linux](https://download.rockylinux.org/pub/rocky/9/isos/x86_64/Rocky-9.1-x86_64-minimal.iso) (Minimal version recommended)
- **Cygwin**: [Download Cygwin](https://www.cygwin.com/)

**Instructions:**

1. **Download Rocky Linux Minimal ISO**: Get a copy of the Rocky Linux minimal image from [Rocky Linux Downloads](https://download.rockylinux.org/pub/rocky/9/isos/x86_64/Rocky-9.1-x86_64-minimal.iso).
2. **Create a VirtualBox VM**:
   - Open VirtualBox and create a new VM.
   - Skip Unattended Installation.
   - Set the Base Memory to 2048MB and the Processors to 1 CPU.
   - Allocate 80GB for the Hard Disk. (If your machine is limited, set the max amount it can allow)
   - Create port forwarding: Map host port 4022 to guest port 22.
3. **Install Rocky Linux**:
   - Start the VM and follow the installation steps.
   - Set up root and user accounts with passwords.
   - Select "Custom" under Storage Configuration and allocate all space to `rl-root`.
4. **Configure SSH Access**:
   - Use `ssh-copy-id` to set up SSH access: `ssh-copy-id -P 4022 <your-username>@localhost`.
5. **Install Guest Additions**:
   - Follow instructions from [this guide](https://github.com/Edwin254-byte/metric-flow/blob/master/install-virtualbox-guest-additions.txt) to install Guest Additions.
6. **Update and Configure VM**:
   - Log in using Cygwin and run:
     ```bash
     dnf update -y && dnf install -y vim git rsync wget
     ssh-keygen -t ed25519
     ssh-copy-id localhost
     ```
7. **Set Up SSH Keys**:
   - Add your public key to GitHub and Bitbucket.
8. **Package and Add Vagrant Box**:
   - Shut down the VM and remove port forwarding rules.
   - Package the VM:
     ```bash
     vagrant package --base centos8_1911
     vagrant box add --name centos8.1 /path/to/package.box
     ```

### Part 2: Creating VMs

**Prerequisites:**

1. **Update Hosts File**:
   - Add the following entries:
     ```plaintext
     192.168.10.2 v1.lcl
     192.168.10.3 v2.lcl
     192.168.10.4 v3.lcl
     192.168.10.5 v4.lcl
     ```
2. **Generate SSH Keys**:
   - Ensure your SSH keys are in `~/.ssh`.
3. **Configure Network**:
   - Set your IP to `192.168.10.1` under host adapter settings.

**Instructions:**

1. **Install Vagrant**: Download Vagrant if not already installed.
2. **Replace Vagrantfile**:
   - Navigate to your Vagrant installation directory.
   - Replace the Vagrantfile with the one from [Metric Flow Vagrantfile](https://github.com/Edwin254-byte/metric-flow/blob/master/Vagrantfile).
   - Modify RAM and CPU allocation based on your machine’s resources.
3. **Create VMs**:
   - Run the command to bring up VMs:
     ```bash
     vagrant up v1 v2 v3
     ```
   - Wait for the VMs to start.

### Part 3: Installing Metric Flow on VMs

**Instructions:**

1. **SSH into VM v3**:
   ```bash
   ssh <your-username>@v3.lcl
   ```
2. **Clone Metric Flow Repository**:
   ```bash
   git clone https://github.com/Edwin254-byte/metric-flow
   ```
3. **Install Podman**:
   ```bash
   sudo dnf install -y podman
   ```
4. **Start Services**:
   - Navigate to `metric-flow/scripts` and run:
     ```bash
     cd metric-flow/scripts
     sh run.sh -a r -s ss -t ss-3
     sh run.sh -a r -s sc -t sc-2
     sh run.sh -a r -s nc -t nc-2
     ```
5. **Check Services**:
   - Verify if services are running:
     ```bash
     podman ps
     ```
   - Expect to see three services running.

### Part 4: Running the Services

**Instructions:**

1. **SSH Back to v3**:
   ```bash
   ssh <your-username>@v3.lcl
   ```
2. **Navigate to Metric Flow Directory**:
   ```bash
   cd ~/metric-flow/socket-server
   ```
3. **Seed Database**:
   - Modify `src

/seed/seed-handler.ts` as needed.

- Run:
  ```bash
  npm run seed
  ```

4. **Access Metric Flow**:
   - Open your browser and go to `http://v3.lcl:3000`.
   - Log in using the credentials from the seed file.
   - View performance metrics for VM v3.

### Part 5: Collecting Data on Other VMs

**Instructions:**

1. **SSH into VM v1**:
   ```bash
   ssh <your-username>@v1.lcl
   ```
2. **Install Podman**:
   ```bash
   sudo dnf install -y podman
   ```
3. **Clone Metric Flow Repository**:
   ```bash
   git clone https://github.com/Edwin254-byte/metric-flow
   ```
4. **Start Node Client Container**:
   - Navigate to `metric-flow/scripts` and run:
     ```bash
     cd metric-flow/scripts
     sh run.sh -a r -s nc -t nc-2
     ```
5. **Verify Metrics**:

   - Return to your browser and refresh the page to view VM v1 metrics.

6. **Repeat for Other VMs**:
   - For collecting metrics from other VMs (e.g., v2), repeat the steps above, but SSH into the respective VM (`ssh <your-username>@v2.lcl`).

---

Feel free to update the links and specific commands according to your actual setup and repository contents. This "Getting Started" section should provide a thorough guide for users to set up and run the Metric Flow system.

## **Contributing**

If you would like to contribute to this project, please fork the repository and submit a pull request with your changes. Make sure to adhere to the project’s coding standards and include appropriate documentation.

## **License**

Metric Flow is licensed under the MIT License. See the full text below for details.

```
MIT License

© 2024

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```

## **Contact**

For any inquiries or support, please contact Edwin Odhiambo at [odhiamboedu123@gmail.com](mailto:odhiamboedu123@gmail.com).
