FROM node:12 as builder

COPY package*.json ./

RUN npm install

COPY . .

RUN ["npm", "run", "build"]

# Serve through nginx
FROM nginx 
EXPOSE 80

COPY --from=builder /public /usr/share/nginx/html