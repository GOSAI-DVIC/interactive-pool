from core.application import BaseApplication

class Application(BaseApplication):
    """control_password"""

    def __init__(self, name, hal, server, manager):
        super().__init__(name,hal,server,manager)
       
        

    def listener(self, source, event, data):
        super().listener(source, event, data)

