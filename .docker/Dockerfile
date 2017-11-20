FROM node:latest

WORKDIR /usr/local/src

ADD package.json package.json
ADD package-lock.json package-lock.json
RUN npm i

ADD src/* src/
ADD bin/* bin/

ENTRYPOINT ["./bin/cast-service"]

VOLUME config.yml
