# Use the official lightweight Node image for the build process
FROM node:18-alpine AS builder

# Set the working directory to /app
WORKDIR /app

# Copy dependency files and install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy the project code
COPY . .

# Build the Next.js project for production
RUN npm run build

# Use a smaller image for the second stage, optimized for production
FROM node:18-alpine AS runner

# Set the working directory to /app again
WORKDIR /app

# Copy the necessary files from the builder stage

# Copy build output and configurations, but avoid copying node_modules directly from the builder stage,
# as it may include unnecessary dev dependencies and cause issues with dependency management.
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json

# Install only production dependencies in the runner stage
# This step ensures that only necessary dependencies are included, making the image leaner.
RUN npm install --only=production

# Set environment variables for production
ENV NODE_ENV=production
ENV PORT=3000

# Expose port 3000 to allow external access
EXPOSE 3000

# Start the application using a production-ready command
CMD ["npm", "start"]
