FROM node:20-alpine

RUN apk add git

WORKDIR /app

RUN git clone https://github.com/Clxssyy/cg-robot .

RUN npm install

CMD ["npx", "vite", "--host"]

