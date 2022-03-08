from core.application import BaseApplication
import time

class Application(BaseApplication):
    """menu"""

    def __init__(self, name, hal, server, manager):
        super().__init__(name,hal,server,manager)
        self.requires["ball"] = ["ball_data"]
        self.time = 0


    def listener(self, source, event, data):
        super().listener(source, event, data)

        if source == "ball" and event == "ball_data" and data is not None:
            print((time.time()-self.time)*1000)
            self.time = time.time()
            self.server.send_data("ball", data)

        # if source == "cue" and event == "cue_data":
        #     self.data = self.hal.get_driver_event_data("cue", "cue_data")
        #     self.server.send_data("cue", self.data)