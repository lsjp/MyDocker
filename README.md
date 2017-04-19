# MyDocker
***
## httpd
#### sample:
1. docker run -itd --name proxy -v "$PWD":/usr/local/apache2/htdocs/ httpd:2.4

2. docker run -itd --name proxy -v /usr/local/gitroot/MyDocker/apache2/conf/httpd.conf:/usr/local/apache2/conf/httpd.conf -v /usr/local/gitroot/MyDocker/apache2/conf/extra/proxy-html.conf:/usr/local/apache2/conf/extra/proxy-html.conf -p 80:80 httpd
***
## nodejs
docker pull node

#### sample:
1. docker run -it --rm --name my-running-script -v "$PWD":/usr/src/app -w /usr/src/app node:4 node your-daemon-or-script.js
2. docker run -itd -p 3001:3000 --name app1 -v /home/zhaopeng/Documents/MyDemo2017/express/myapp:/usr/src/app -w /usr/src/app node node bin/www
