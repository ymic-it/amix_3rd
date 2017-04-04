#!/usr/bin/env python
# -*- coding: UTF-8 -*-
from flask import Flask
from redis import Redis
import dbManager as db
from pprint import pprint
import json
import random

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False
redis = Redis(host='redis', port=6379)


@app.route('/')
def hello():
    redis.incr('hits')
    return 'this is Amix3rd Edition ackground APIs server!<br>'

@app.route('/get/test',methods=['GET'])
def get_test():
    return db.getTest()

# 指定されたものの問題量を返す
@app.route('/question/size/<genreId>/<sourceNo>')
def get_size(genreId,sourceNo):
    returnDic = {"genreId":genreId, "sourceNo":sourceNo, "count": str(db.getSize(genreId, sourceNo))}
    return str(json.dumps(returnDic))

@app.route('/question/list/<genreId>/<sourceNo>')
def get_lists(genreId,sourceNo):
    returnDic = {"genreId":genreId, "sourceNo":sourceNo, "list": db.getList(genreId, sourceNo)}
    return str(json.dumps(returnDic))

@app.route('/question/rand/<genreId>/<sourceNo>')
def get_rand(genreId,sourceNo):
    returnDic = {"genreId":genreId, "sourceNo":sourceNo, "main": random.choice(db.getList(genreId, sourceNo))}
    return str(json.dumps(returnDic))

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=80, debug=True)
