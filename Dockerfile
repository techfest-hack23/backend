FROM 416284249132.dkr.ecr.us-east-1.amazonaws.com/hackfest:node-16-alpine

ENV PORT=3030

EXPOSE $PORT

RUN mkdir /app/

COPY ./* /app/

RUN rm /app/Dockerfile
RUN rm /app/buildspec.yaml

WORKDIR /app/
RUN npm install 

CMD ["npm", "start"]
