FROM vrenetic/vrenetic-buster:1.0
ENV DEBIAN_FRONTEND noninteractive

RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get update && apt-get install -y nodejs

WORKDIR /usr/src/
COPY . /usr/src/

RUN pip3 install pip==19.1.1
ARG NEXUS_USER_AND_PASS
RUN pip3 install -i https://${NEXUS_USER_AND_PASS}@nexus.core.vrenetic.io:443/repository/pypi-hosted/simple --extra-index-url https://pypi.org/simple vrenetic-ai

ENV NODE_ENV=test
RUN cd src && npm install

EXPOSE 8110

CMD node src/server.js
