FROM node:alpine as builder

## Install build toolchain, install node deps and compile native add-ons
RUN apk add --no-cache python make g++

COPY package*.json ./

RUN npm update
RUN npm install

COPY . .

RUN ["npm", "run", "build"]

# Serve through nginx
FROM nginx 
EXPOSE 80

COPY --from=builder /app/public /usr/share/nginx/html