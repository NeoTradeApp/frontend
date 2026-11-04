FROM node:16.3.0-alpine AS frontend-build

# Create app directory
WORKDIR /usr/src/app

COPY ./ /usr/src/app/

RUN npm ci

RUN npm run build


# Set nginx base image
FROM nginx

# Copy custom configuration file from the current directory
# COPY ./nginx/trade_app.conf /etc/nginx/sites-available/trade_app.conf

# link directory
# RUN ln -s /etc/nginx/sites-available /etc/nginx/sites-enabled

COPY --from=frontend-build /usr/src/app/build /var/www/html
