# Stage 1: Build stage
FROM node:alpine AS build
WORKDIR /opt/demo

# Copy package.json and package-lock.json
COPY package*.json ./

# Install all dependencies, including dev dependencies
RUN npm install

# Copy TypeScript source files
COPY src ./src

# Copy TypeScript configuration file (if exists)
COPY tsconfig.json ./

# Build TypeScript code
RUN npm run build

# Stage 2: Production stage
FROM node:alpine AS production
WORKDIR /opt/demo

# provide the environments needed
ENV PORT=3200
ENV PUB_SOCKET_SERVER_URL=http://socket-server.v3.lcl
ENV INT_SOCKET_SERVER_URL=http://socket-server:3300
ENV LCL_SOCKET_SERVER_URL=http:/127.0.0.1:3300
ENV NODE_ENV=production

# Copy only the necessary files from the build stage
COPY --from=build /opt/demo/dist ./dist
COPY --from=build /opt/demo/package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Command to run the application
CMD ["node", "dist/index.js"]

