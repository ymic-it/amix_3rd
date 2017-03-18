FROM mysql:5.6


# utf8サポート
RUN { \
  echo '[mysqld]'; \
  echo 'character-set-server = utf8mb4'; \
  echo '[client]'; \
  echo 'default-character-set = utf8mb4'; \
} > /etc/mysql/conf.d/charset.cnf

RUN apt-get update && apt-get install -y nano locales \
  --no-install-recommends && rm -rf /var/lib/apt/lists/*

RUN dpkg-reconfigure locales && \
    locale-gen C.UTF-8 && \
    /usr/sbin/update-locale LANG=C.UTF-8


ENV LC_ALL C.UTF-8
ENV TERM xterm
