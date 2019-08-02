# app.py - a minimal flask api using flask_restful
from flask import Flask, redirect, url_for, jsonify, request
from flask_restplus import Resource, Api, fields
import pprint
import os
import re
from werkzeug.exceptions import BadRequest, InternalServerError, NotFound
import json
import logging
import datetime
import pymongo
from bson.objectid import ObjectId

logging.basicConfig(
    format='%(asctime)s [%(process)d] [%(levelname)s] %(message)s',
    datefmt='[%Y-%m-%d %H:%M:%S %z]')

app = Flask(__name__)

password = "B4tm4n"
client = pymongo.MongoClient("mongodb+srv://batman:" + password + "@batman-hitw-td41w.mongodb.net/hitw?retryWrites=true&w=majority")
db = client.hitw

api = Api(app,
          version="v0.0.0",
          title="BATMAN BACKEND",
          description="BATMAN BACKEND")


@api.route('/hello')
@api.doc()
class HelloWorld(Resource):
    def get(self):
        post_res = db.releves.insert_one({'name':'toto', 'age':42})
        get_res = db.releves.find_one({'_id': post_res.inserted_id})
        del get_res['_id']
        return jsonify(get_res)

# test with curl -H "Content-Type: application/json" -X PUT -d "{penis: tachatte}" http://localhost:8000/records
@api.route('/records')
@api.doc()
class Records(Resource):
    def put(self):
        payload = json.loads(request.data)
        return payload["penis"]

if __name__ == "__main__":
    app.run()  # pragma: no cover
