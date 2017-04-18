# MyDocker
## httpd
***
#### sample:
1. docker run -itd --name proxy -v "$PWD":/usr/local/apache2/htdocs/ httpd:2.4

2. docker run -itd --name proxy -v /usr/local/gitroot/MyDocker/apache2/conf/httpd.conf:/usr/local/apache2/conf/httpd.conf -v /usr/local/gitroot/MyDocker/apache2/conf/extra/proxy-html.conf:/usr/local/apache2/conf/extra/proxy-html.conf -p 80:80 httpd
***
