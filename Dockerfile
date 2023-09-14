FROM node:16.14

WORKDIR /app

COPY . .

RUN npm install --production
RUN npm run build
CMD [ "npm" , "start" ]
