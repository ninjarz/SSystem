import tornado.web


class BaseHandler(tornado.web.RequestHandler):
    def initialize(self):
        pass

    def data_received(self, chunk):
        pass

    def on_finish(self):
        pass

    def get_current_user(self):
        return self.get_secure_cookie("user")

