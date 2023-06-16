FROM node:18.16.0-slim

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["tail", "-f", "/dev/null"]