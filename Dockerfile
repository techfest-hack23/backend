#for builds outside of AWS use node:16-alpine
#FROM node:16-alpine
FROM 416284249132.dkr.ecr.us-east-1.amazonaws.com/hackfest:node-16-alpine


USER node

WORKDIR /home/node
ENV PORT=3030

EXPOSE $PORT

COPY --chown=node:node . /home/node

RUN rm /home/node/Dockerfile
RUN rm /home/node/buildspec.yaml



ENV NODE_ENV=production

RUN npm install 


CMD ["npm", "start", "/home/node"]
