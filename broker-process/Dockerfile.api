FROM node:22.16.0

COPY package-lock.json package.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

CMD [ "npm", "run", "start:prod" ]