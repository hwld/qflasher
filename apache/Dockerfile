FROM amazonlinux:2

RUN yum update -y && yum install -y httpd procps

COPY ./my.conf /etc/httpd/conf.d/

ENTRYPOINT [ "httpd", "-DFOREGROUND" ]