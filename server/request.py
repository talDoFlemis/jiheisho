import requests

url = "http://localhost:8000/predict"
files = {"file": open("../data/test/mandril/M (2).jpg", "rb")}
response = requests.post(url, files=files)
print(response.json())
