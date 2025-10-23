# Base image with Java for Jenkins agent
FROM openjdk:17-slim

# Install minimal tools: Node.js, Git, curl, bash, build-essential
RUN apt-get update && \
    apt-get install -y curl gnupg git build-essential bash coreutils && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    rm -rf /var/lib/apt/lists/*

# Create Jenkins user with home directory
RUN useradd -m -d /home/jenkins jenkins

# Set working directory inside Jenkins home
WORKDIR /home/jenkins/app

# Copy package files first for caching
COPY package*.json ./

# Fix permissions for Jenkins user
RUN chown -R jenkins:jenkins /home/jenkins/app

# Switch to Jenkins user
USER jenkins

# Install Node dependencies
RUN npm install --production

# Copy the rest of the application source code
COPY --chown=jenkins:jenkins . .

# Ensure workspace directory exists and is writable
RUN mkdir -p /home/jenkins/app/workspace

# Expose backend port
EXPOSE 3000

# Default command to run Node backend
CMD ["npm", "start"]
