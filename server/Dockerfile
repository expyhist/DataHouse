FROM node:16

WORKDIR /home/server

COPY ./server /home/server

RUN ["yarn", "global", "add", "pm2"]

RUN ["yarn", "install"] 

EXPOSE 3000
