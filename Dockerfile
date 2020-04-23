FROM node:lts

WORKDIR /usr/src/app
COPY package.json ./

RUN npm install
RUN npm install pm2 -g

COPY . .
RUN npm run build
ENV NODE_ENV=production
ENV PORT=4000
EXPOSE 4000
CMD ["pm2", "start", "build/server.js", "--name", "mn-app"]