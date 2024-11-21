FROM node

COPY ./ ./

RUN npm install

CMD ["/bin/sh", "-c", "npm run build && npm run preview "]
