FROM node:latest
WORKDIR /doom-bot 
COPY . /doom-bot 
ENV TOKEN token
ENV CLIENTID clientid
RUN npm install discord.js 
RUN npm install @discordjs/builders 
RUN node deploy-commands.js 
CMD ["node", "index.js"]