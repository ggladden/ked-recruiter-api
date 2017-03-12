FROM node:7.5

# Install utilities
RUN apt-get update -qq && apt-get install -y \
  build-essential \
  lsof \
  curl

# Prepare app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app/

# Install dependencies
COPY package.json /usr/src/app/
RUN npm install -g serve
RUN npm config set registry http://registry.npmjs.org/ && npm install

ADD . /usr/src/app/

EXPOSE 5000
CMD [ "serve", "-s", "build" ]