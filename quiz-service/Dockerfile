FROM node:20 as dep

COPY package*.json ./
RUN npm install

FROM node:20
WORKDIR /home/node/app
COPY --from=dep /node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD npm run dev
