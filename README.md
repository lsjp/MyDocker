# MyDocker
***
## httpd
#### sample:
1. docker run -itd --name proxy -v "$PWD":/usr/local/apache2/htdocs/ httpd:2.4

#### runnable:
 /usr/local/gitroot/MyDocker/apache2/conf/httpd.conf:/usr/local/apache2/conf/httpd.conf -v /usr/local/gitroot/MyDocker/apache2/conf/extra/proxy-html.conf:/usr/local/apache2/conf/extra/proxy-html.conf -p 80:80 httpd

***
## nginx
#### sample:
1. docker run --name some-nginx -v /some/content:/usr/share/nginx/html:ro -d nginx

2. docker run -itd -p 80:80 --name nginx --link node1 -v /usr/local/gitroot/MyDocker/nginx/nginx.conf:/etc/nginx/nginx.conf:ro nginx

#### runnable: <font color=red>--link="node1"</font>
 docker run -itd --link="node1" -p 80:80 --name="nginx" -v "/usr/local/gitroot/MyDocker/nginx/sites-enabled:/etc/nginx/sites-enabled" -v "/usr/local/gitroot/MyDocker/nginx/nginx.conf:/etc/nginx/nginx.conf:ro" -v "/usr/local/gitroot/MyDocker/nginx/log:/var/log/nginx" nginx

***
## nodejs
docker pull node

#### sample:
1. docker run -it --rm --name my-running-script -v "$PWD":/usr/src/app -w /usr/src/app node:4 node your-daemon-or-script.js

#### runnable:  <font color=red>--name node1</font>
 docker run -itd --name node1 -v /usr/local/gitroot/MyDocker/myapp:/usr/src/app -w /usr/src/app node node bin/www
