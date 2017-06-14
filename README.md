
[![Build Status](https://travis-ci.org/SebastianBrehme/nextsmartidea.svg?branch=master)](https://travis-ci.org/SebastianBrehme/nextsmartidea) 
[![Coverage Status](https://coveralls.io/repos/github/SebastianBrehme/nextsmartidea/badge.svg?branch=master)](https://coveralls.io/github/SebastianBrehme/nextsmartidea?branch=master) 
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/770fe9cdd0814f1cbdd9f56536dc7725)](https://www.codacy.com/app/nextsmartidea/nextsmartidea?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=SebastianBrehme/nextsmartidea&amp;utm_campaign=Badge_Grade)

[![Docker Stars](https://img.shields.io/docker/stars/nextsmartidea/nextsmartidea.svg)](https://hub.docker.com/r/nextsmartidea/nextsmartidea/)
[![Docker Pulls](https://img.shields.io/docker/pulls/nextsmartidea/nextsmartidea.svg)](https://hub.docker.com/r/nextsmartidea/nextsmartidea/)
[![Docker Automated buil](https://img.shields.io/docker/automated/nextsmartidea/nextsmartidea.svg)](https://hub.docker.com/r/nextsmartidea/nextsmartidea/)
[![Docker Build Statu](https://img.shields.io/docker/build/nextsmartidea/nextsmartidea.svg)](https://hub.docker.com/r/nextsmartidea/nextsmartidea/)

# SmartEvent Manager by NextSmartIdea

Hey Guys,

you can find information about our project here: https://nextsmartidea.wordpress.com/

link to our web-app: https://smartevent-a3c4f.firebaseapp.com/

# Install this with Nodejs
- Make sure you have installed Nodejs Version 6.9 or higher
- Clone this repository
- Navigate in the public folder
- Run the following commands (should be the same on every platform)
```
npm install -g @angular/cli
npm install -g firebase-tools
npm install
```
## RUN IT!
Still in the public folder
```
ng serve
```
*Congrats you made it!*

# Install this using docker
All you need to do:
```
docker run --rm --name smartevent -p 4200:4200 nextsmartidea/nextsmartidea
```
(Feel free to configuer docker params as you wish...)
