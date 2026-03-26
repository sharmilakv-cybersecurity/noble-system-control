import urllib.request
import os

companies = {
    "c-systems": "csystems.com",
    "tsg": "tsg-solutions.com",
    "jindal": "jindal.com",
    "polycab": "polycab.com",
    "gst": "gstfire.com",
    "heinrich": "heinrichlimited.com",
    "cpplus": "cppluscorp.com",
    "hilti": "hilti.com"
}

for name, domain in companies.items():
    url = f"https://logo.clearbit.com/{domain}"
    filename = f"{name}-logo.png"
    try:
        urllib.request.urlretrieve(url, filename)
        print(f"Downloaded {filename} from {domain}")
    except Exception as e:
        print(f"Failed to download {filename} from {domain}: {e}")
