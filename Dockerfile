FROM node:latest 
WORKDIR /doom-bot 
COPY . /doom-bot 
RUN npm install discord.js
ENV TOKEN OTEzNjY5NzIxMTU5Nzc0Mjc5.YaB3PA.RZwO-5ttiXkNZ3zb64BZO9pP92Y
CMD ["node", "index.js"]