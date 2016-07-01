FROM node:4-onbuild
RUN mkdir /opt/DFSroots
RUN chmod 666 /opt/DFSroots
RUN ls -la /opt/DFSroots 
# replace this with your application's default port

EXPOSE 8888