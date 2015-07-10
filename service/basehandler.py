import tornado.web


class BaseHandler(tornado.web.RequestHandler):
    def initialize(self):
        pass

    def data_received(self, chunk):
        pass

    def on_finish(self):
        pass


