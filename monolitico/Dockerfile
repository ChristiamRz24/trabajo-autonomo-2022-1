FROM node

COPY . /app

WORKDIR /app

RUN npm install

ENV PORT 3000
ENV MONGODB_CNN=mongodb://mongo:27017/test

EXPOSE 3000

ENTRYPOINT ["npm","start"]
