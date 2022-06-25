# ======================== npm ========================

FROM node:16 as build-stage

RUN ["mkdir", "-p", "/home/client"]

WORKDIR /home/client

COPY ./client /home/client

RUN ["yarn", "install"] 

RUN ["yarn", "build"]

RUN ["mkdir", "-p", "/home/server"]

# ======================== nginx and https ========================

FROM nginx:1.18 as production-stage

COPY ./client/nginx.conf /etc/nginx/nginx.conf

COPY --from=build-stage /home/client/dist /usr/share/nginx/html

# COPY /etc/letsencrypt/live/leafsyang.xyz/fullchain.pem /etc/letsencrypt/live/leafsyang.xyz/fullchain.pem

# COPY /etc/letsencrypt/live/leafsyang.xyz/privkey.pem /etc/letsencrypt/live/leafsyang.xyz/privkey.pem