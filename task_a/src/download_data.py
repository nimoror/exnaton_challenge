import os

import requests


def download_file(url, filename):
    """Download a file from a URL to a local directory if it's not already there."""
    if not os.path.exists(filename):
        print(f"Downloading {filename}...")
        response = requests.get(url)
        if response.status_code == 200:
            with open(filename, "wb") as f:
                f.write(response.content)
            print(f"Downloaded {filename} successfully.")
        else:
            print(f"Failed to download {filename}. Status code: {response.status_code}")
    else:
        print(f"{filename} already exists. No download needed.")


def main():
    # Directory where the JSON files will be saved
    data_dir = "exnaton_challenge/task_a/data"
    os.makedirs(data_dir, exist_ok=True)

    # URLs of the JSON files
    urls = {
        "95ce3367.json": "https://exnaton-public-s3-bucket20230329123331528000000001.s3.eu-central-1.amazonaws.com/challenge/95ce3367-cbce-4a4d-bbe3-da082831d7bd.json",
        "1db7649e.json": "https://exnaton-public-s3-bucket20230329123331528000000001.s3.eu-central-1.amazonaws.com/challenge/1db7649e-9342-4e04-97c7-f0ebb88ed1f8.json",
    }

    # Download each file if it's not already present
    for filename, url in urls.items():
        file_path = os.path.join(data_dir, filename)
        download_file(url, file_path)


if __name__ == "__main__":
    main()
