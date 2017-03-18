# ベースイメージの指定
#ROM python:3.5.2-alpine

# 必要なファイルをローカルからコンテナにコピー
# ADD requirements.txt /web/hello/
 # ADD hello.py /web/hello/

# requirements.txtに記載されたパッケージをインストール
#WORKDIR /web/hello/
#RUN pip install -r requirements.txt
#RUN python /web/hello/hello.py

# （コンテナ内で作業する場合）必要なパッケージをインストール
#RUN apk update
#RUN apk add zsh vim tmux git tig


# Pythonは公式イメージ
FROM python:3.5.2

# オリジナルはJoshua Conner氏
# MAINTAINER Joshua Conner <joshua.conner@gmail.com>
MAINTAINER Ryosuke Kamei <sr2smail@gmail.com>

# 各ライブラリインストール
# Pythonがパッケージ依存するものもインストール
# Pythonプロフェッショナルプログラミング第2版P9より
RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install -y  vim \
                        sudo \
                        python3-dev \
                        zlib1g-dev \
                        libsqlite3-dev \
                        libreadline6-dev \
                        libgdbm-dev \
                        libbz2-dev \
                        tk-dev

# ユーザ作成
RUN groupadd web
RUN useradd -d /home/python -m python

# pipでインストール
# virtualenv Pythonの仮想環境構築コマンド
# flake8 コーディングスタイル/シンタックスのチェック
# ipython Pythonのインタラクティブモード拡張
# Flask Pytrhonの軽量フレームワーク
RUN pip install virtualenv \
                ipython \
                flake8 \
                Flask

# MySQLドライバ"mysql-connector-python"をインストール
# pipのを使うとうまくいかない。
# git cloneしてビルド、インストール
RUN git clone https://github.com/mysql/mysql-connector-python.git
WORKDIR mysql-connector-python
RUN python ./setup.py build
RUN python ./setup.py install

ADD hello.py /web/hello/

# ユーザを変更
USER python

# Flaskの場合
# ポートを解放（Flaskのデフォルトのポート番号:5000）
EXPOSE 5000
# サーバ起動
#ENTRYPOINT ["/usr/local/bin/python", "/home/python/flask_sample.py"]

ENTRYPOINT ["/usr/local/bin/python", "/web/hello/hello.py"]

# フレームワークを指定しない時や、サーバにログインしてから実行したい場合
# ENTRYPOINT ["/usr/bin/tail", "-f", "/dev/null"]
