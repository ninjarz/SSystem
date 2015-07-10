import tornado.ioloop
import tornado.web
import tornado.httputil
import tornado.autoreload
import base64
import uuid

from config import *
from service.webhandler import *
from service.wshandler import *

if __name__ == "__main__":
    application = tornado.web.Application(
        [
            (r"/", MainHandler),
            (r"/login", LoginHandler),
            (r"/student(.*)", StudentHandler),
            (r"/teacher(.*)", TeacherHandler),
            (r"/admin(.*)", AdminHandler),
            (r"/web/static/(.*)", tornado.web.StaticFileHandler, dict(path=config_data['static_path'])),
        ],
        static_path=config_data['static_path'],
        template_path=config_data['template_path'],
        cookie_secret=base64.b64encode(uuid.uuid4().bytes + uuid.uuid4().bytes),
        login_url="/",
    )
    application.listen(8080)
    tornado.ioloop.IOLoop.instance().start()
