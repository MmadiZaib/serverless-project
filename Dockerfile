# stage 1 - install dependencies
FROM node:12-alpine as app-dependencies
# label stage as intermediate
LABEL stage=intermediate
# copy only necessary files for dependencies install
COPY package*.json ./
# install dependencies
RUN yarn install

# stage 2 - serve app
FROM node:12-alpine as app-build
# change working directory
WORKDIR /var/www/app
# copy dependencies from previous stage
COPY --from=app-dependencies /node_modules ./node_modules
# copy app files
COPY . .
# expose port
EXPOSE 3000
# start serverless
CMD ["yarn", "run", "serve"]