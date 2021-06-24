FROM nginx

COPY /app /usr/share/nginx/html

# ✅ stage base api --------------------------------------------------------------------------------

FROM node:lts-alpine3.13 as api-base

WORKDIR /srv

COPY ["package.json", "package-lock.json", "api.js", "./"]

RUN npm install --quiet

ADD api /srv/api
ADD app /srv/app