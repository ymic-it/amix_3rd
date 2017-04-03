from flask import Flask
from redis import Redis


app = Flask(__name__)
redis = Redis(host='redis', port=6379)


@app.route('/')
def hello():
    redis.incr('hits')
    return 'this is Amix3rd Edition background APIs server!<br>'


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=80, debug=True)
