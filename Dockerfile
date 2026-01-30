# Use Node.js 22 as the base image
FROM node:22-alpine

# Create non-root user
RUN useradd -m -u 1001 appuser

# Set the working directory inside the container
WORKDIR /app

# Set up environment variables for proxy (Replace with actual proxy details)
#ARG HTTP_PROXY=<>
#ARG HTTPS_PROXY=<>
#ENV http_proxy=$HTTP_PROXY
#ENV https_proxy=$HTTPS_PROXY

# Copy package.json and package-lock.json first to leverage Docker's caching
COPY package.json package-lock.json ./

# Configure npm to use proxy
#RUN npm config set proxy $HTTP_PROXY && \
 #   npm config set https-proxy $HTTPS_PROXY

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Change ownership and switch to non-root user
RUN chown -R appuser:appuser /app
USER appuser

# Expose the Vite development server port (default is 5173)
EXPOSE 5173

# Run the app
CMD ["npm", "run", "dev", "--", "--host"]
