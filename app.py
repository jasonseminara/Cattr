#!flask/bin/python

from flask import Flask, abort, send_from_directory,Response, make_response,jsonify,request
from flask.ext.sqlalchemy import SQLAlchemy
from flask.ext.restful import Api, Resource,reqparse,fields, marshal
import os,requests,json

app = Flask(__name__)
app.config.from_object(os.environ['APP_SETTINGS'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config.update(SEND_FILE_MAX_AGE_DEFAULT=0)

db = SQLAlchemy(app)
api = Api(app)
from models import Cat, Tag, CatTag, Availability, Reservation, Posting, Address



cats = [{
        'id': 1,
        'title': 'Buy groceries',
        'description': 'Milk, Cheese, Pizza, Fruit, Tylenol', 
        'done': False
    },
    {
        'id': 2,
        'title': 'Learn Python',
        'description': 'Need to find a good Python tutorial on the web', 
        'done': False
    }]

cat_fields = {
    'title': fields.String,
    'description': fields.String,
    'done': fields.Boolean,
    'uri': fields.Url('cat')
}

def get_cat_by_id(id):
    cat = [cat for cat in cats if cat['id'] == id] 
    print(cat)     
    return cat[0] if len(cat) > 0 else abort(404)

class UserAPI(Resource):
    def get(self, id):
        pass

    def put(self, id):
        pass

    def delete(self, id):
        pass


class CatListAPI(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('title', type = str, required = True,
            help = 'No cat title provided', location = 'json')
        self.reqparse.add_argument('description', type = str, default = "", location = 'json')
        super(CatListAPI, self).__init__()

    def get(self):
        return {'cats': [marshal(cat, cat_fields) for cat in cats]}

    def post(self):
        args = self.reqparse.parse_args()
        cat = {
            'id': cats[-1]['id'] + 1,
            'title': args['title'],
            'description': args['description'],
            'done': False
        }
        cats.append(cat)
        return {'cat': marshal(cat, cat_fields)}, 201


class CatAPI(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('title', type = str, location = 'json')
        self.reqparse.add_argument('description', type = str, location = 'json')
        self.reqparse.add_argument('done', type = bool, location = 'json')
        super(CatAPI, self).__init__()

    def get(self, id):
        cat = get_cat_by_id(id)
        return {'cat': marshal(cat, cat_fields)}

    def put(self, id):
        cat = get_cat_by_id(id)
        args = self.reqparse.parse_args()
        for k, v in args.items():
            if v is not None:
                cat[k] = v
        return { 'cat': marshal(cat, cat_fields) }

    def delete(self, id):
        cat = get_cat_by_id(id)
        cats.remove(cat)
        return {'result': True},204


api.add_resource( UserAPI,    '/users/<int:id>',     endpoint = 'user')
api.add_resource( CatListAPI, '/api/cats',           endpoint = 'cats')
api.add_resource( CatAPI,     '/api/cats/<int:id>',  endpoint = 'cat' )



# 
# 
# 
# 
# 



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