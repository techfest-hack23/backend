    FROM node:16-alpine

    ENV PORT=3030

    EXPOSE $PORT

    RUN mkdir /app/

    COPY ./* /app/

    RUN rm /app/Dockerfile
    RUN rm /app/buildspec.yaml

    CMD ["npm", "start"]