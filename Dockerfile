FROM node:14.17.5-alpine
WORKDIR /PERFECT-UI
RUN npm install -g @angular/cli@11.0.7
COPY . .
RUN npm i
RUN npm run build

FROM nginx:1.15.8-alpine
COPY --from=builder /PERFECT-UI/dist/PerfectAngular/ /usr/share/nginx/html
