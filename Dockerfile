FROM  node

COPY . /app/microservicios

WORKDIR /app/microservicios

RUN npm install

ENV PORT 3000

EXPOSE 3000

ENTRYPOINT ["node", "start"]
