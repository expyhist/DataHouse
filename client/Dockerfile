# ======================== npm ========================

FROM node:16 as build-stage

RUN ["mkdir", "-p", "/home/client"]

WORKDIR /home/client

COPY ./client /home/client

RUN ["yarn", "install"] 

RUN ["yarn", "build"]

# ======================== nginx and https ========================

FROM nginx:1.20 as production-stage

COPY ./client/nginx.conf /etc/nginx/nginx.conf

COPY --from=build-stage /home/client/dist /usr/share/nginx/html
