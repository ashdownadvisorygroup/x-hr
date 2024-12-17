FROM node:16-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files and install dependencies using Yarn
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --silent

# Copy the entire app source code
COPY . .

# Build the Angular app for production
RUN yarn build --output-path=dist --configuration=production

# Stage 2: Serve the app using NGINX
FROM nginx:1.27.1-alpine

# Remove default NGINX HTML files
RUN rm -rf /usr/share/nginx/html/*

# Copy Angular build output to NGINX's HTML directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom NGINX configuration
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Expose the port NGINX is running on
EXPOSE 80

ENTRYPOINT [ "/usr/local/bin/docker-entrypoint.sh" ]

