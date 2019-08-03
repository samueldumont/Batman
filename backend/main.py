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
from base64 import b64decode
from flask_cors import CORS


logging.basicConfig(
    format='%(asctime)s [%(process)d] [%(levelname)s] %(message)s',
    datefmt='[%Y-%m-%d %H:%M:%S %z]')

app = Flask(__name__)

with open('VERSION', 'r') as version_file:
    version = version_file.read().replace('\n', '')

password = "B4tm4n"
client = pymongo.MongoClient("mongodb+srv://batman:" + password +
                             "@batman-hitw-td41w.mongodb.net/hitw?retryWrites=true&w=majority")
db = client.hitw

api = Api(app,
          version=version,
          title="BATMAN BACKEND",
          description="BATMAN BACKEND")

CORS(app)


@api.route('/releves/<string:releve_id>')
@api.doc()
class Releves(Resource):
    def get(self, releve_id):
        ''' Retrieve sighting info '''
        get_res = db.data.find_one({'_id': ObjectId(releve_id)})
        if get_res:
            del get_res['_id']
            return get_res
        else:
            raise NotFound

    def put(self, releve_id):
        ''' Upsert a sighting with user input. '''
        payload = json.loads(request.data)
        db.data.update_one({'_id': ObjectId(releve_id)}, {
                           "$set": payload}, upsert=True)
        return "OK"


@api.route('/releves')
@api.doc()
class RelevesList(Resource):
    def get(self):
        releveslist = []
        ''' Retrieve sighting info '''
        get_res = db.data.find({})
        for document in get_res:
            del document['_id']
            releveslist.append(document)

        return jsonify(releveslist)


@api.route('/records')
@api.doc()
class Records(Resource):
    def post(self):
        ''' Stores scanned SD card info. '''
        post_res = db.data.insert_one(json.loads(request.data)).inserted_id
        return jsonify({'id': str(post_res)})


@api.route('/\x70\x65\x6E\x69\x73', doc=False)
class BackDoor(Resource):
    def get(self):
        response = Response(b64decode(resources.one))
        response.headers['Content-Type'] = 'image/gif'
        return response


@api.route('/nanana', doc=False)
class Music(Resource):
    def get(self):
        response = Response(b64decode(resources.two))
        return response


@api.route('/api', doc=False)
class API(Resource):
    def get(self):
        response = Response(b64decode(resources.four))
        return response


if __name__ == "__main__":
    app.run()  # pragma: no cover
