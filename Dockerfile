# Use the Node.js base image
FROM node:18.13.0

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first (for Docker layer caching)
COPY package*.json ./

# Install dependencies
RUN npm install --unsafe-perm

# Copy rest of your app code
COPY . .

# Expose the port your app runs on (change if different)
EXPOSE 4000

# Start the app
CMD ["npm","run", "dev"]
