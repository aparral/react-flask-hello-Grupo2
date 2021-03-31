"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Favoritos, Servicio_registrados, Servicios_prestados, Comentarios
# from flask_cors import CORS, cross_origin
from api.utils import generate_sitemap, APIException
from werkzeug.security import generate_password_hash, check_password_hash       ## Nos permite manejar tokens por authentication (usuarios)    
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity   #from models import Person
import datetime

api = Blueprint('api', __name__)


@api.route('/hash', methods=['POST', 'GET'])
def handle_hash():
    
    expiracion = datetime.timedelta(days=3)
    access_token = create_access_token(identity='mortega@4geeks.co', expires_delta=expiracion)
    response_token = {
        "users": "Manu",
        "token": access_token
    }

    return jsonify(response_token), 200

@api.route('/login', methods=['POST'])
def login():
    
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    if not email:
        return jsonify({"msg":"Email required"}), 400

    if not password:
        return jsonify({"msg":"Password required"}), 400
    
    user = User.query.filter_by(email=email).first()
    print(user)

    if not user:
        return jsonify({"msg": "The email is not correct",
        "status": 401
        
        }), 401

    expiracion = datetime.timedelta(days=3)
    access_token = create_access_token(identity=user.email, expires_delta=expiracion)

    data = {
        "user": user.serialize(),
        "token": access_token,
        "expires": expiracion.total_seconds()*1000,
        "userId": user.id,
        "email": user.email,
        "tipo_user": user.tipo_user
        }

    return jsonify(data), 200

@api.route('/register', methods=['POST'])
def register():
    
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    tipo_user = request.json.get("tipo_user", None)

    email_query = User.query.filter_by(email=email).first()
    if email_query:
        return "This email has been already taken", 401

    user = User()
    user.email = email
    user.password = password
    user.tipo_user = tipo_user
    print(user)
    db.session.add(user)
    db.session.commit()

    expiracion = datetime.timedelta(days=3)
    access_token = create_access_token(identity=user.email, expires_delta=expiracion)

    response_token = {
        "msg": "Added successfully",
        "email": user.email,
        "userId":user.id,
        "tipo_user": user.tipo_user,
        "token": access_token
    }
  
    return jsonify(response_token), 200    

@api.route('/user', methods=["GET"])
def get_all_users():
    return jsonify({"Users": User.get_all_users()})

@api.route('/user/<int:id>', methods=["GET"])
def get_user_by_id(id):
    user = User.get_user(id)
    return jsonify(user)

@api.route('/servicio-registrados', methods=['POST'])
def add_servicio():
    id_user= request.json.get('id_user')
    tipo_membresia = request.json.get('tipo_membresia')
    category = request.json.get('category')
    subcategory = request.json.get('subcategory')
    tipo_cobro = request.json.get('tipo_cobro')
    valor = request.json.get('valor')
    name_servicio = request.json.get('name_servicio')
    descrip_servicio = request.json.get('descrip_servicio')
    duracion = request.json.get('duracion')
    revision = request.json.get('revision')
    proceso = request.json.get('proceso')
    experiencia = request.json.get('experiencia')
    portafolio = request.json.get('portafolio')
    merit = request.json.get('merit')
            
    if not tipo_membresia:
        return jsonify({"msg":"el tipo_membresia esta vacio"}), 400
    if not category:
        return jsonify({"msg":"el category de servicio esta vacio"}), 400
    if not subcategory:
        return jsonify({"msg":"el subcategory de servicio esta vacio"}), 400
    if not tipo_cobro:
        return jsonify({"msg":"tipo de cobro esta vacio"}), 400
    if not valor:
        return jsonify({"msg":"el valor de servicio esta vacio"}), 400
    if not name_servicio:
        return jsonify({"msg":"el nombre de servicio esta vacio"}), 400
    if not descrip_servicio:
        return jsonify({"msg":"el descripcion de servicio esta vacio"}), 400
    if not revision:
        return jsonify({"msg":"el revision de servicio esta vacio"}), 400
    if not experiencia:
        return jsonify({"msg":"su experiencia esta vacio"}), 400 
            
    servicio_registrados = Servicio_registrados()
    servicio_registrados.id = request.json.get("id", None)
    servicio_registrados.tipo_membresia = request.json.get("tipo_membresia", None)
    servicio_registrados.category = request.json.get("category", None)
    servicio_registrados.subcategory = request.json.get("subcategory", None)
    servicio_registrados.tipo_cobro = request.json.get("tipo_cobro", None)
    servicio_registrados.valor = request.json.get("valor", None)
    servicio_registrados.name_servicio = request.json.get("name_servicio", None)
    servicio_registrados.descrip_servicio = request.json.get("descrip_servicio", None)
    servicio_registrados.duracion = request.json.get("duracion", None)
    servicio_registrados.revision = request.json.get("revision", None)
    servicio_registrados.proceso = request.json.get("proceso", None)
    servicio_registrados.experiencia = request.json.get("experiencia", None)
    servicio_registrados.portafolio = request.json.get("portafolio", None)
    servicio_registrados.merit = request.json.get("merit", None)
        
    db.session.add(servicio_registrados)
    db.session.commit()

    Servicio_registrados.add_servicio(
        tipo_membresia, category, subcategory, tipo_cobro, valor, name_servicio, 
        descrip_servicio, duracion, revision, proceso, experiencia, portafolio, merit )

    return jsonify({
        "msg": "me he guardado exitosamente"
        }), 200

@api.route('/servicio-registrados', methods=["GET"])
def get_all_servicios():
    return jsonify({"servicio-registrados": servicio-registrados.get_all_servicios()})

@api.route('/servicio-registrados/<int:id>', methods=["GET"])
def get_servicio_id(id):
    servicioById = Servicio-registrados.get_servicio(id)
    return jsonify(servicioById)

@api.route('/favoritos', methods=["POST"])
def add_favoritos():
        if request.method == 'POST':
            id_user= request.json.get("id_user")
            id_servicio_registrados= request.json.get("id_servicio_registrados")
            name_servicio= request.json.get("name_servicio")
            

            if not id_user:
                return jsonify({"msg":"user id esta vacio"}), 400
            if not id_servicio_registrados:
                return jsonify({"msg":"servicio id esta vacio"}), 400
            if not name_servicio:
                return jsonify({"msg":"el nombre de servicio esta vacio"}), 400

            favoritos = Favoritos()
            favoritos.id_user = request.json.get("id_user", None)
            favoritos.id_servicio_registrados = request.json.get("id_servicio_registrados", None)
            favoritos.name_servicio= request.json.get("name_servicio", None)

            db.session.add(favoritos)
            db.session.commit()

            return jsonify({"msg":"mission success"}), 200

@api.route('/favoritos/<int:id_user>', methods=["GET"])
def get_favoritos_by_user(id_user):
    favoritos = Favoritos()
    return jsonify({"favoritos": favoritos.get_favoritos_by_user(id_user)})


@api.route('/passwordrecovery1', methods=['POST'])
def passwordrecovery1():
    
    email = request.json.get("email", None)
    
    email_query = User.query.filter_by(email=email).first()
    if not email_query:
        return "This email isn't in our database", 401

    user = User()
    user.email = email
    recovery_hash = generate_password_hash(email)
    user.hash = recovery_hash 
    print(user)

    response = {
        "msg": "User found and Hash generated successfully",
        "email": user.email,
        "recovery_hash": user.hash
    }
  
    return jsonify(response), 200  