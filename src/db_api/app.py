#!/usr/bin/env python
# -*- coding: UTF-8 -*-
from flask import Flask,make_response
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
    response = make_response(str(json.dumps(returnDic)))
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response

# 問題リストを返す
@app.route('/question/list/<genreId>/<sourceNo>')
def get_lists(genreId,sourceNo):
    returnDic = {"genreId":genreId, "sourceNo":sourceNo, "main": db.getList(genreId, sourceNo)}
    response = make_response(str(json.dumps(returnDic)))
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response

# 問題を一つランダムに返す
@app.route('/question/rand/<genreId>/<sourceNo>')
def get_rand(genreId,sourceNo):
    list = db.getList(genreId, sourceNo)
    if(list != False):
        returnDic = {"genreId":genreId, "sourceNo":sourceNo, "main": random.choice(db.getList(genreId, sourceNo))}
    else:
        returnDic = {"error": "Not found questions"}
    response = make_response(str(json.dumps(returnDic)))
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response

# 問題を一つランダムに返す
@app.route('/question/rand/')
def get_all_rand():
    returnDic = {"genreId":"all", "sourceNo":"all", "main": random.choice(db.getList())}
    return str(json.dumps(returnDic))

# 問題をジャンルリストを返す
@app.route('/genre/list')
def get_genre():
    returnDic = {"main":{"1":"医療秘書実務", "2":"医療関連法規", "3": "医学的基礎知識"}}
    response = make_response(str(json.dumps(returnDic)))
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response

# 問題を出典元リストを返す
@app.route('/source/list')
def get_source():
    returnDic = {"main":db.getSourceList()}
    response = make_response(str(json.dumps(returnDic)))
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=80, debug=True)
