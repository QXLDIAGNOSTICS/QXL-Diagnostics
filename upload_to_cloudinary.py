import os, hashlib, requests, time

api_key = "429976576884211"
api_secret = "HEt_e1xVUwWrocf9zslZQirJQGw"
cloud_name = "btjglif5"
folder = "Assets-QXL/app-ui"
img_dir = "/Users/afi/Downloads/QXL/QXL-Diagnostics/App ui "

files = [f for f in os.listdir(img_dir) if f.endswith('.png')]
urls = []

for filename in sorted(files):
    filepath = os.path.join(img_dir, filename)
    timestamp = int(time.time())
    params = f"folder={folder}&timestamp={timestamp}"
    sig_input = params + api_secret
    signature = hashlib.sha1(sig_input.encode()).hexdigest()

    print(f"Uploading: {filename}")
    with open(filepath, 'rb') as f:
        resp = requests.post(
            f"https://api.cloudinary.com/v1_1/{cloud_name}/image/upload",
            data={"folder": folder, "timestamp": timestamp, "api_key": api_key, "signature": signature},
            files={"file": (filename, f, "image/png")}
        )
    result = resp.json()
    url = result.get("secure_url", f"ERROR: {result.get('error')}")
    print(f"  -> {url}")
    urls.append(url)

print("\n=== All done ===")
for u in urls:
    print(u)
