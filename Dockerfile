FROM node:latest
WORKDIR /doom-bot 
COPY . /doom-bot 
ENV TOKEN token
ENV CLIENTID clientid
RUN npm install discord.js 
RUN npm install @discordjs/builders 
RUN npm install @discordjs/rest
RUN npm install discord-api-types/v9
RUN node deploy-commands.js 
CMD ["node", "index.js"]