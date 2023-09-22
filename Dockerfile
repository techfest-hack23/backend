    FROM 012345678910.dkr.ecr.us-east-1.amazonaws.com/base-image

    ENV PORT=3030

    EXPOSE $PORT

    RUN mkdir /app/

    COPY ./* /app/

    RUN rm /app/Dockerfile
    RUN rm /app/buildspec.yaml

    CMD ["npm", "start"]