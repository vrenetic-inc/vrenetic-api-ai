FROM vrenetic/vrenetic-stretch:1.1

RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -

RUN apt-get update && apt-get install -y nodejs

WORKDIR /usr/src/vrenetic-ai-api

COPY . /usr/src/vrenetic-ai-api/

ENV NODE_ENV=test

RUN cd src && npm install

EXPOSE 8110

CMD node src/server.js
