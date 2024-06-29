# **Metric Flow**

**Developer:** Edwin Odhiambo  

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
To get started with the Metric Flow project, follow the steps below:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/edwin254-byte/metric-flow.git
   cd metric-flow
   ```

2. **Setup Virtual Machines:**
   - Install and configure Vagrant.
   - Initialize and provision the Rocky Linux VM using the provided `Vagrantfile`.

3. **Build and Run Containers:**
   - Install Podman or Docker.
   - Build the containers for each service (Socket Server, Socket Client, Node Client).
   - Use provided scripts or instructions in the `docker-compose.yml` or equivalent files.

4. **Start the Services:**
   - Start the Socket Server and Socket Client on the Rocky Linux VM.
   - Deploy and run the Node Client on multiple machines.

5. **Access the Application:**
   - Open a web browser and navigate to the Socket Client URL.
   - Log in and view the metrics being transmitted from the Node Clients.

## **Contributing**
If you would like to contribute to this project, please fork the repository and submit a pull request with your changes. Make sure to adhere to the project’s coding standards and include appropriate documentation.

## **License**
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## **Contact**
For any inquiries or support, please contact Edwin Odhiambo at [odhiamboedu123@gmail.com](mailto:odhiamboedu123@gmail.com).


