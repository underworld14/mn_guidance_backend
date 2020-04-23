FROM node:lts

# Create app directory
WORKDIR /app

COPY package.json ./

RUN npm install -g pm2

COPY . .
RUN npm install
RUN npm run build

EXPOSE 6000/tcp
ENV NODE_ENV production
ENV PORT 6000
CMD ["pm2", "start", "build/server.js", "--name", "mn_guidance_backend"]