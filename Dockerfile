FROM node:4-onbuild

RUN apt-get update -qq && apt-get install -y build-essential
RUN apt-get install -y ruby ruby-dev
RUN gem install sass
RUN gem install compass

RUN mkdir /src

WORKDIR /src
ADD . .

RUN npm install gulp-cli -g
RUN npm install http-server -g

# Bower gets upset becasue this is all run with root
RUN echo '{ "allow_root": true }' > /root/.bowerrc
RUN npm install bower -g

RUN npm install
RUN bower install

EXPOSE 3000
