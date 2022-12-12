from core.application import BaseApplication
import time

class Application(BaseApplication):
    """voice_command"""

    def __init__(self, name, hal, server, manager):
        super().__init__(name, hal, server, manager)
        self.requires["voice_command"] = ["command"]
        self.time = 0

    def listener(self, source, event, data):
        super().listener(source, event, data)
        
        if source == "voice_command" and data is not None:
            if event == "command": self.server.send_data("data", data)