import click
import requests
import glob
import os
import re
import datetime
import pytz
import csv
import pprint
import soundfile
import requests
import uuid
import json
import webbrowser


def scan(folder):
    backendurl = "http://batman-backend-hitw.westeurope.azurecontainer.io/records"

    os.chdir(folder)
    files = sorted(glob.glob("*.wav"))

    startDate = str(re.search(r'(\d{8})', files[0], re.IGNORECASE).group(1))
    endDate = str(re.search(r'(\d{8})', files[-1], re.IGNORECASE).group(1))
    sightingid = str(uuid.uuid4())

    observations = []

    for file in glob.glob("*.wav"):
        ts = re.search(r'(\d{8})_(\d{6})', file, re.IGNORECASE)
        timezone = pytz.timezone('Europe/Brussels')
        date = timezone.localize(datetime.datetime.strptime(
            "{} {}".format(ts.group(1), ts.group(2)), '%Y%m%d %H%M%S'))
        wav = soundfile.SoundFile(file)
        duration = len(wav) / wav.samplerate

        observations.append({
            "filename": file,
            "time": date.isoformat(),
            "duration": duration
        })

    payload = {
        "observationAmount": len(files),
        "observations": observations,
        "deviceNumber": '',
        "microphoneNumber": '',
        "operatorName": '',
        "startDate": startDate,
        "endDate": endDate,
        "locationName": '',
        "locationCoordinates": {"lat": 0.0, "lng": 0.0},
        "habitatType": '',
        "primaryStructuringElementType": '',
        "secondaryStructuringElementType": '',
        "maintenanceType": '',
        "isIlluminated": '',
        "height": 0,
        "weatherType": '',
        "comment": ''
    }

    resp = requests.post(backendurl, data=json.dumps(
        payload), headers={"Content-Type": "application/json"})

    objectid = resp.json()["id"]

    if resp.status_code == 200:
        webbrowser.open(
            "http://batman-frontend-hitw.westeurope.azurecontainer.io/sightings/create/#{}".format(objectid))
