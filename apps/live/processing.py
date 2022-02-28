from apps.application import BaseApplication
import socketio

class Application(BaseApplication):
    """live"""

    def __init__(self, name, hal, server, manager):
        super().__init__(name,hal,server,manager)
        self.requires["ball"] = ["ball_data"]

        self.sio = socketio.Client()

        self.sio.connect("https://vps.thomasjuldo.com/", socketio_path="/realtimepool/socket.io")
        

    def listener(self, source, event):
        super().listener(source, event)

        if source == "ball" and event == "ball_data":
            self.data = self.hal.get_driver_event_data("ball", "ball_data")

            l= []
            for x,y in self.data:
                x/=1888
                y/=1049
                l.append([x,y])

            self.sio.emit("update_data",l)
