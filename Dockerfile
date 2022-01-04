FROM node:latest

WORKDIR /doom-bot 
COPY ./doombot /doom-bot 

ENV TOKEN token
ENV CLIENTID 913669721159774279

RUN npm install discord.js 
RUN npm install @discordjs/builders 
RUN npm install @discordjs/rest
RUN npm install discord-api-types
RUN node deploy-commands.js 

USER node 

CMD ["node", "index.js"]