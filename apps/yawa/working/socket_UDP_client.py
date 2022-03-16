import socket
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
adress= ("172.21.72.160",5000)
response = "Salut"
sock.sendto(response.encode(),adress)