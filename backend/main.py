# app.py - a minimal flask api using flask_restful
from flask import Flask, redirect, url_for, jsonify, request, Response
from flask_restplus import Resource, Api, fields
import pprint
import os
import re
from werkzeug.exceptions import BadRequest, InternalServerError, NotFound, ImATeapot
import json
import logging
import datetime
import pymongo
from bson.objectid import ObjectId
import resources

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

@api.route('/releves')
@api.doc()
class PostReleves(Resource):

    def post(self):
        payload = json.loads(request.data)
        post_res = db.data.insert_one(payload).inserted_id
        return jsonify({'id': str(post_res)})

    
@api.route('/releves/<string:releve_id>')
@api.doc()
class GetReleves(Resource):
    def get(self, releve_id):
        get_res = db.data.find_one({'_id': ObjectId(releve_id)})
        if get_res:
            del get_res['_id']
            return get_res
        else:
            raise NotFound

@api.route('/records')
@api.doc()
class Records(Resource):
    def put(self):
        db.data.insert_one(json.loads(request.data))
        return "OK"

@api.route('/\x70\x65\x6E\x69\x73')
class BackDoor(Resource):
    def get(self):
        response = Response(resources.one.decode("base64"))
        response.headers['Content-Type'] = 'image/gif'
        return response

if __name__ == "__main__":
    app.run()  # pragma: no cover
