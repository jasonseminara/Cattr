#!flask/bin/python

from flask import Flask, abort, send_from_directory,Response, make_response,jsonify,request
from flask.ext.sqlalchemy import SQLAlchemy
from flask.ext.restful import Api, Resource,reqparse,fields, marshal
from werkzeug.contrib.atom import AtomFeed
import flask.ext.restless
import os,requests,json
from urllib.parse import urljoin

app = Flask(__name__)
app.config.from_object(os.environ['APP_SETTINGS'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config.update(SEND_FILE_MAX_AGE_DEFAULT=0)

db = SQLAlchemy(app)
api = Api(app)
from models import User,Cat, Tag, Availability, Posting, Address



manager = flask.ext.restless.APIManager(app, flask_sqlalchemy_db=db)

# Create API endpoints, which will be available at /api/<tablename> by
# default. Allowed HTTP methods can be specified as well.
manager.create_api(Cat, methods=['GET', 'POST', 'PUT','DELETE','PATCH'],results_per_page=-1)
manager.create_api(Tag, methods=['GET'],results_per_page=-1)
manager.create_api(User, methods=['GET', 'POST', 'PUT'])
manager.create_api(Availability, methods=['GET', 'POST', 'PUT', 'DELETE'],results_per_page=-1)
manager.create_api(Address, methods=['GET', 'POST', 'PUT','DELETE'])
# 
# 
# 
# 
# 

def make_external(url):
    return urljoin(request.url_root, url)

@app.route('/', methods=['GET', 'POST'])
def index():
    errors = []
    results = {}
    if request.method == "POST":
        # get url that the user has entered
        try:
            url = request.form['url']
            r = requests.get(url)
            print(r.text)
        except:
            errors.append(
                "Unable to get URL. Please make sure it's valid and try again."
            )
    return app.send_static_file('index.html')

@app.route('/cats/<int:catid>/recent.atom')
def recent_feed(catid):
    cats = Cat.query.get(catid)
    feed = AtomFeed("Availability for " +cats.name, feed_url=request.url,
                    url=request.host_url,
                    subtitle="The RSS feed for Cats",
                    id=request.url)
    for av in cats.availability:

        feed.add(cats.name, av.start,
            content_type='html',
            url=make_external('/api/availability/'+str(av.id)),
            updated=av.last_updated,
            summary="taken:" + str(av.reservation_taken)
            )
    return feed.get_response()


@app.route('/register', methods=['POST'])
def readUser():
    
    resp = Response(request.form['name'] )
    resp.headers['X-Something'] = 'A value'
    return resp


@app.route('/js/<path:path>')
def send_js(path):
    return send_from_directory('static/js', path)

@app.route('/scripts/<path:path>')
def send_scripts(path):
    return send_from_directory('static/scripts', path)

@app.route('/images/<path:path>')
def send_images(path):
    return send_from_directory('static/images', path)

@app.route('/styles/<path:path>')
def send_styles(path):
    return send_from_directory('static/styles', path)

@app.route('/views/<path:path>')
def send_views(path):
    return send_from_directory('static/views', path)



if __name__ == '__main__':
  app.run()