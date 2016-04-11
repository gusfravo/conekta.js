FROM ubuntu:14.04

MAINTAINER Leo Fischer
LABEL Description="A docker image to quickly test conekta.js"

RUN apt-get update

#install required software before using nvm/node/npm/bower and phantom
RUN apt-get update && apt-get install -y curl git vim python build-essential libfreetype6-dev libfontconfig

#setup default non root user
RUN useradd -ms /bin/bash test_user
RUN echo "test_user:sudo" | chpasswd
RUN usermod -aG sudo test_user
RUN mkdir -p /data/db/
RUN chown test_user /data/db
RUN sudo echo "test_user ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

USER test_user
ENV HOME /home/test_user

RUN echo "set tabstop=2" >> ~/.vimrc
RUN echo "set shiftwidth=2" >> ~/.vimrc
RUN echo "set softtabstop=2" >> ~/.vimrc

#Install NVM
RUN curl https://raw.githubusercontent.com/creationix/nvm/v0.20.0/install.sh | bash

ENV NVM_DIR /home/test_user/.nvm
ENV NODE_VERSION 5.1.1

# Install and configure default Node versions
RUN /bin/bash -l -c "echo '. ~/.nvm/nvm.sh' >> ~/.profile"
RUN /bin/bash -l -c "nvm install $NODE_VERSION"
RUN /bin/bash -l -c "nvm alias default $NODE_VERSION"
RUN /bin/bash -l -c "nvm use default"

ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH      $NVM_DIR/v$NODE_VERSION/bin:$PATH

#Install bower/grunt
RUN /bin/bash -l -c "npm install -g bower forever --user test_user"
RUN /bin/bash -l -c "npm install -g grunt"

#Install and configure node dependencies
WORKDIR $HOME
RUN git clone https://github.com/conekta/conekta.js.git
WORKDIR $HOME/conekta.js
RUN /bin/bash -l -c "npm install"
