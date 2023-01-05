FROM node:16

RUN ["mkdir", "-p", "/home/server"]

WORKDIR /home/server

COPY ./server /home/server

RUN ["yarn", "global", "add", "pm2"]

RUN ["yarn", "install"] 

EXPOSE 4000
