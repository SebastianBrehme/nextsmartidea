FROM node:6.9

# Create dependencies
RUN apt-get install -y git
RUN git clone https://github.com/SebastianBrehme/nextsmartidea
WORKDIR nextsmartidea/public

# Install app dependencies
#COPY public/package.json /usr/src/app/
#RUN npm install -g angular/cli
#RUN npm install -g firebase-tools
RUN npm install -g angular-cli@1.0.0-beta.28.3 && npm cache clean
RUN npm install -g firebase-tools
RUN npm install


# Bundle app source


EXPOSE 8080

CMD cd ./nextsmartidea/public/ &&  ng serve
