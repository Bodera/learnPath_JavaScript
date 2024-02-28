FROM node:18-alpine
COPY ./src ./src
WORKDIR /src
RUN apk add --no-cache bash
CMD ["/bin/sh"]
ENTRYPOINT bash
