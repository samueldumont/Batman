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


# http://flask.pocoo.org/snippets/56/
def crossdomain(origin=None, methods=None, headers=None,
                max_age=21600, attach_to_all=True,
                automatic_options=True):
    if methods is not None:
        methods = ', '.join(sorted(x.upper() for x in methods))
    if headers is not None and not isinstance(headers, basestring):
        headers = ', '.join(x.upper() for x in headers)
    if not isinstance(origin, basestring):
        origin = ', '.join(origin)
    if isinstance(max_age, timedelta):
        max_age = max_age.total_seconds()

    def get_methods():
        if methods is not None:
            return methods

        options_resp = current_app.make_default_options_response()
        return options_resp.headers['allow']

    def decorator(f):
        def wrapped_function(*args, **kwargs):
            if automatic_options and request.method == 'OPTIONS':
                resp = current_app.make_default_options_response()
            else:
                resp = make_response(f(*args, **kwargs))
            if not attach_to_all and request.method != 'OPTIONS':
                return resp

            h = resp.headers

            h['Access-Control-Allow-Origin'] = origin
            h['Access-Control-Allow-Methods'] = get_methods()
            h['Access-Control-Max-Age'] = str(max_age)
            if headers is not None:
                h['Access-Control-Allow-Headers'] = headers
            return resp

        f.provide_automatic_options = False
        return update_wrapper(wrapped_function, f)
    return decorator


@api.route('/releves/<string:releve_id>')
@api.doc()
@crossdomain(origin='*', headers="*")
class Releves(Resource):
    def get(self, releve_id):
        ''' Retrieve sighting info '''
        get_res = db.data.find_one({'_id': ObjectId(releve_id)})
        if get_res:
            del get_res['_id']
            return get_res
        else:
            raise NotFound

    def put(self):
        ''' Upsert a sighting with user input. '''
        payload = json.loads(request.data)
        post_res = db.data.insert_one(payload).inserted_id
        return jsonify({'id': str(post_res)})

@api.route('/records')
@api.doc()
@crossdomain(origin='*', headers="*")
class Records(Resource):
    def post(self):
        ''' Stores scanned SD card info. ''' 
        db.data.insert_one(json.loads(request.data))
        return "OK"


@api.route('/\x70\x65\x6E\x69\x73', doc=False)
@crossdomain(origin='*', headers="*")
class BackDoor(Resource):
    def get(self):
        response = Response(b64decode(resources.one))
        response.headers['Content-Type'] = 'image/gif'
        return response


if __name__ == "__main__":
    app.run()  # pragma: no cover
