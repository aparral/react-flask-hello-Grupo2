  
import os
from flask_admin import Admin
from .models import db, User, Favoritos, Servicio_registrados, Servicios_prestados, Comentarios, Document
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='Cotec Admin', template_mode='bootstrap3')

     
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(Favoritos, db.session))
    admin.add_view(ModelView(Servicio_registrados, db.session))
    admin.add_view(ModelView(Servicios_prestados, db.session))
    admin.add_view(ModelView(Comentarios, db.session))
    admin.add_view(ModelView(Document, db.session))
    
    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))
