# Worklenz Docker Guide

## Table of Contents

- [Prerequisites](#prerequisites)
- [Step 1: Clone the Repository](#step-1-clone-the-repository)
- [Step 2: Prepare the Docker Environment](#step-2-prepare-the-docker-environment)
  - [Create a `.env` File](#create-a-env-file)
  - [Configure the `.env` File](#configure-the-env-file)
- [Step 3: Build and Start Containers](#step-3-build-and-start-containers)
- [Step 4: Access the App](#step-4-access-the-app)
- [Step 5: Troubleshooting Common Issues](#step-5-troubleshooting-common-issues)
- [Additional notes](#additional-notes)



## Prerequisites

Before you begin, ensure you have the following:
- **Docker and Docker Compose** installed on your system.  
  You can install Docker by following the [official Docker installation guide](https://docs.docker.com/get-docker/) and [Docker Compose installation guide](https://docs.docker.com/compose/install/).
- A **supported operating system**: Linux, macOS, or Windows (with Docker Desktop).
- **Git** installed for cloning the repository.

### Minimum system requirements

- **CPU**: 2+ cores
- **RAM**: 4GB minimum (8GB recommended)
- **Disk Space**: 10GB free for Docker images and containers




## Step 1: Cloning from the Repository

Start by cloning the Worklenz repository to your local machine:

```bash
git clone https://github.com/Worklenz/worklenz.git
```


Navigate to the project folder:

```bash
cd worklenz
```



## Step 2: Prepare Docker Environment

The app uses Docker Compose for easier management of multiple containers. To configure the app with Docker Compose:

### Create a .env file  by copying the provided sample:

```bash
cp .env.sample .env
```

### Configure the `.env` File with the Necessary Credentials

#### Database Configuration

```env
DB_NAME=worklenz_db
DB_USER=<your-db-username>
DB_PASSWORD=<your-db-password>
DB_HOST=localhost
DB_PORT=5432
```

#### AWS Configuration

```env
AWS_REGION=<your-aws-region>
S3_URL=<your-s3-url>
S3_ACCESS_KEY_ID=<your-access-key>
S3_SECRET_ACCESS_KEY=<your-secret-key>
```
#### Google OAuth Configuration

```env
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>
GOOGLE_CALLBACK_URL=<your-callback-url>
```
#### Slack Webhook URL

```env
SLACK_WEBHOOK=<your-slack-webhook-url>
```
#### Session and Cookie Configuration

```env
COOKIE_SECRET=<your-cookie-secret>
SESSION_NAME=<your-session-name>
SESSION_SECRET=<your-session-secret>
```
#### Backend Configuration

```env
ANGULAR_DIST_DIR=./dist
ANGULAR_SRC_DIR=./src
BACKEND_PUBLIC_DIR=./public
BACKEND_VIEWS_DIR=./views
COMMIT_BUILD_IMMEDIATELY=true
NODE_ENV=development
PORT=3000
HOSTNAME=localhost
```



## Step 3: Build and Start Containers

Start your docker engine if it’s haven’t 
Use Docker Compose to build and start the containers:
```bash
docker-compose up --build -d
```

This command will do the following:
- **Build the Docker images** if they don’t exist.
- **Start the app containers** in detached mode (-d).
- Ensure that all necessary services (like the database and app) are running.

**Stopping and Removing Containers**
To stop all running containers:

```bash
docker-compose down
```

To remove all containers and images **(use with caution)**:
```bash
docker system prune -a
```



## Step 4: Access the App

Once the containers are running, you can access the Worklenz App through the following:
- **Backend URL**: http://localhost:3000
- **FrontEnd URl**:http://localhost:4200




## Step 5:  Troubleshooting Common Issues

While setting up Worklenz with Docker, you may encounter some common issues. Here are some solutions to resolve them:

### Issue 1: Containers Not Starting

**Solution for Linux/macOS**:
Check the Docker container logs for any errors:

```bash
docker-compose logs
```

If you see errors related to missing environment variables or other issues, ensure that your .env file is properly configured and all necessary fields are filled.

You can also check if there are any conflicting services or ports in use:

```bash
sudo lsof -i :3000
```

If port 3000 is in use, stop the process using it:

```bash
sudo kill -9 <PID>
```

Restart the Docker containers:

```bash
docker-compose down
docker-compose up --build -d
```

**Solution for Windows**:

Check the Docker container logs for any errors:

```cmd
docker-compose logs
```

If you see errors related to missing environment variables or other issues, verify your .env file.

To check if port 3000 is in use, run:

```cmd
netstat -ano | findstr :3000
```

Find the PID (Process ID) from the output, and stop the process using:

```cmd
taskkill /PID <PID> /F
```

Restart the Docker containers:

```cmd
docker-compose down
docker-compose up --build -d
```

### Issue 2: Database Connection Issues

**Solution for Linux/macOS**:

Ensure the database container is running:

```bash
docker ps
```

Check the database configuration in your .env file, especially:

**DB_HOST**
**DB_USER**
**DB_PASSWORD**

If the database container isn't running, try restarting it:

```bash
docker-compose down
docker-compose up --build -d
```

**Solution for Windows**:

Check if the database container is running:

```cmd
docker ps
```

Verify the database configuration in your .env file.

Restart the containers if needed:

```cmd
docker-compose down
docker-compose up --build -d
```

### Issue 3: Port Already in Use

**Solution for Linux/macOS**:

If you get an error saying a port is already in use (e.g., port 3000), you can find the process using the port:

```bash
sudo lsof -i :3000
```
If a process is using the port, kill it with:

```bash
sudo kill -9 <PID>
```

Alternatively, you can change the port in your **.env** file and restart the containers.

**Solution for Windows**:

Check if port 3000 is in use:

```cmd
netstat -ano | findstr :3000
```
Find the PID (Process ID) from the output, then terminate the process:

```cmd
taskkill /PID <PID> /F
```

You can also change the port in your **.env** file and restart the containers.


### Issue 4: Permissions Issues with Files

**Solution for Linux/macOS**:

If you encounter permission errors, ensure that the necessary files and directories are accessible by Docker. Check file permissions:

```bash
ls -l
```
Adjust file permissions using:

```bash
sudo chmod -R 755 <directory>
```

**Solution for Windows**:

If you encounter permission errors, ensure Docker Desktop has access to the necessary directories. Right-click on the folder, select Properties, and go to the Security tab to check the permissions.

### Issue 5: Unable to Connect to External Services (e.g., AWS, Google OAuth)

**Solution for Linux/macOS**:

Ensure your **.env** file is properly configured for external services like **AWS** or **Google OAuth**. Check that the required keys and URLs are correct.

You can test if external services are accessible by using curl:

```bash
curl https://your-service-url.com
```

**Solution for Windows**:

Similarly, verify that your .env file is correctly configured.

Test connectivity using curl (if installed) or use a web browser to check if external services are accessible.

### Issue 6: Slow Performance or Timeout Errors

**Solution for Linux/macOS**:

If Docker is running slowly, ensure that your machine has sufficient resources (CPU, RAM, Disk Space).

You can check resource usage with:

```bash
top
```

Consider increasing Docker's allocated memory and CPU via the Docker Desktop settings.

**Solution for Windows**:

Similarly, monitor the system's resource usage in Task Manager.

You can adjust Docker Desktop’s resource allocation through the Docker Desktop settings:

**Open Docker Desktop** > **Go to Settings** > **Resources** and adjust memory, CPU, and disk settings.

### Issue 7: Docker Daemon Not Starting

**Solution for Linux/macOS**:

Ensure that the Docker service is running. You can start Docker with:

```bash
sudo systemctl start docker
```

To check the Docker daemon status:

```bash
sudo systemctl status docker
```

**Solution for Windows**:

Ensure that Docker Desktop is running. You can start it from the Start Menu.

If Docker isn't starting, try restarting Docker Desktop or reinstalling it if necessary.

### Issue 8: Unable to Access App in Browser

**Solution for Linux/macOS**:

Make sure the containers are running:

```bash
docker ps
```

Check the port mappings in your **docker-compose.yml** file to ensure the correct ports are exposed.

If you're accessing the app from a remote machine, ensure that your firewall is configured to allow traffic on ports 3000 and 4200.

**Solution for Windows**:

Check if the containers are running:

```cmd
docker ps
```
Ensure your firewall is not blocking access to the relevant ports **(3000 and 4200)**. You can add rules to allow these ports.




## Additional notes

- **Updating Docker Images**:

To ensure you are using the latest versions of the Docker images, you can pull the latest versions before building the containers:

```bash
docker-compose pull
docker-compose up --build -d
```

- **Backing Up Volumes**:

If your Docker setup uses volumes for persistent data storage (e.g., for databases), make sure to back up your data regularly. You can do this with:

```bash
docker run --rm -v worklenz_db_volume:/data -v $(pwd):/backup ubuntu tar czf /backup/db_backup.tar.gz /data
```

- **Docker Resource Allocation**:

Adjust the resource allocation (CPU and memory) in Docker Desktop settings (Windows/Mac) or through Docker Daemon configurations (Linux) to ensure smooth operation of the app.

- **Updating Dependencies**:

If the application dependencies or Docker images are outdated, consider updating them. Use package managers (e.g., npm for Node.js) to update app dependencies inside the containers.

- **Clean Up Unused Resources**:

To free up disk space, remove unused Docker objects periodically:

```bash
docker system prune -a
```

- **Custom Ports**:

If you need to run multiple instances of Worklenz on the same machine, update the ports in the docker-compose.yml file to avoid conflicts. For example, change 3000 to 3100 for the backend and 4200 to 4300 for the frontend.

- **Monitor Logs**:

To monitor container logs in real-time for debugging, use:

```bash
docker-compose logs -f
```
