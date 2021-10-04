# Common build stage
FROM node:14.17.6-alpine3.11 as rn-server-build

WORKDIR /app
COPY package.json .
#RUN npm install

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ];\
  then npm install;\
  else npm install --only=production; \
  fi

COPY . .

# CHECK IF DOCKER IGNORE IS ACTUALLY IGNORED

# Development build stage
FROM rn-server-build as rn-development-build-stage

ENV NODE_ENV development

CMD ["npm", "run", "dev"]

# Production build stage
FROM rn-server-build as rn-production-build-stage

ENV NODE_ENV production

CMD ["npm", "run", "start"]
