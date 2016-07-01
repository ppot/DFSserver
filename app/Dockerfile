FROM node:4-onbuild

RUN mkdir /opt/DFSroots
RUN chmod 666 /opt/DFSroots
RUN ls -la /opt/DFSroots

RUN mkdir /src
WORKDIR /src
ADD package.json package.json
RUN npm install