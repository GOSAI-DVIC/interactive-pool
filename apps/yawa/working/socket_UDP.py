# SERVER

import socket

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
adress= ("172.21.72.160",5000)
sock.bind(adress)

while True:
    data,addr = sock.recvfrom(1024)
    print(data)
    print(addr)
    print()