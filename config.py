import os

config_data = {
    "static_path": os.path.join(os.path.dirname(__file__), "web/static"),
    "template_path": os.path.join(os.path.dirname(__file__), "web/template"),
}


def config():
    global config_data
    lines = open("config", 'r').readlines()
    for line in lines:
        words = line.split(' ')
        if type(config_data[words[0]]) is int:
            config_data[words[0]] = int(words[1])
        else:
            config_data[words[0]] = words[1]
