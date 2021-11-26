FROM node:latest

WORKDIR /doom-bot 
COPY . /doom-bot 

RUN npm install discord.js 
RUN npm install @discordjs/builders 

ENV TOKEN token
ENV CLIENTID clientid
CMD ["node", "index.js"]