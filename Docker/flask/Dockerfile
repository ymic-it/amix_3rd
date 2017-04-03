FROM python:3.5.2-alpine

ADD . /code

RUN apk --no-cache update
RUN apk --no-cache add git mariadb-client 

RUN pip3 install PyMySQL
WORKDIR /code
RUN pip install -r requirements.txt

CMD python app.py
