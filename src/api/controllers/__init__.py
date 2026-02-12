from api.controllers.auth_controller import auth_bp


def register_controllers(api):
    """
    Registra todos los sub-blueprints (controladores) en el blueprint principal.
    Se llama desde routes.py al inicializar la API.
    """
    api.register_blueprint(auth_bp)