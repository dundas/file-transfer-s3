# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies in the package.json
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# The command that will be run when the container starts
CMD [ "node", "fileTransfer.js" ]
