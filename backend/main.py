# app.py - a minimal flask api using flask_restful
from flask import Flask, redirect, url_for
from flask import jsonify
from flask_restplus import Resource, Api, fields
import pprint
import os
import re
from werkzeug.exceptions import BadRequest, InternalServerError, NotFound
import json
import logging
import datetime
import pymongo

logging.basicConfig(
    format='%(asctime)s [%(process)d] [%(levelname)s] %(message)s',
    datefmt='[%Y-%m-%d %H:%M:%S %z]')

app = Flask(__name__)

password = os.environ['MONGO_PASSWORD']
client = pymongo.MongoClient("mongodb+srv://batman:" + password +"@batman-hitw-td41w.mongodb.net/test?retryWrites=true&w=majority")
db = client.test

api = Api(app,
          version="v0.0.0",
          title="BATMAN BACKEND",
          description="BATMAN BACKEND")


@api.route('/hello')
@api.doc()
class HelloWorld(Resource):
    def get(self):
        return jsonify(hello="world")


if __name__ == "__main__":
    app.run()  # pragma: no cover
