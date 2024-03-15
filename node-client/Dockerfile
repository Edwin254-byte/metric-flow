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
ENV NODE_ENV=production

# copy .env file
COPY .env ./.env


# Copy only the necessary files from the build stage
COPY --from=build /opt/demo/dist ./dist
COPY --from=build /opt/demo/package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Command to run the application
CMD ["node", "dist/index.js"]

