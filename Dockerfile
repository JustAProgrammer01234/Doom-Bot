FROM node:latest 
WORKDIR /doom-bot 
COPY . /doom-bot 
RUN npm install discord.js
ENV TOKEN token
CMD ["node", "index.js"]