FROM node:latest

WORKDIR /doom-bot 
COPY ./doombot /doom-bot 

ENV CLIENTID clientid

RUN npm install discord.js 
RUN npm install @discordjs/builders 
RUN npm install @discordjs/rest
RUN npm install discord-api-types
RUN npm install docker-secret

USER node 

CMD ["node", "index.js"]