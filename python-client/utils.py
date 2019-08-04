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
import random
import randoms
import pandas as pd


def scan(folder, fake=False):
    backendurl = "http://batman-backend-hitw.westeurope.azurecontainer.io/records"

    observations = []
    location = {"lat": 0.0, "lng": 0.0}

    if fake == True:

        end_dt = datetime.datetime.now()
        start_dt = end_dt - datetime.timedelta(days=random.randint(2, 4))

        startDate = start_dt.strftime("%Y%m%d")
        endDate = end_dt.strftime("%Y%m%d")

        location = {"lat": random.uniform(
            50.3, 50.7), "lng": random.uniform(4.15, 5.6)}

        observationsAmount = random.randrange(120, 400)
        random_dates = randoms.random_dates(
            start=int(start_dt.timestamp()), end=int(end_dt.timestamp()), n=observationsAmount)
        for date in random_dates:
            if date.hour > 5 and date.hour <= 10:
                date = date + pd.Timedelta("18 hours")
            if date.hour > 10 and date.hour <= 15:
                date = date + pd.Timedelta("12 hours")
            if date.hour > 15 and date.hour <= 20:
                date = date + pd.Timedelta("6 hours")
            observations.append({
                "filename": "FAKEFILE",
                "time": date.isoformat(),
                "duration": random.randint(5, 15)
            })

    else:
        os.chdir(folder)
        files = sorted(glob.glob("*.wav"))

        startDate = str(
            re.search(r'(\d{8})', files[0], re.IGNORECASE).group(1))
        endDate = str(re.search(r'(\d{8})', files[-1], re.IGNORECASE).group(1))

        observationsAmount = len(glob.glob("*.wav"))

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

        with open("metadata.txt") as metadatafile:
            metadatacsv = csv.reader(metadatafile, delimiter=',')
            next(metadatacsv)
            for row in metadatacsv:
                try:
                    if float(row[2]) and float(row[4]):
                        location = {"lat": float(
                            row[2]), "lng": float(row[4])}
                        break
                except:
                    print("wrong location data")

    payload = {
        "observationAmount": observationsAmount,
        "observations": observations,
        "deviceNumber": '',
        "microphoneNumber": '',
        "operatorName": '',
        "startDate": startDate,
        "endDate": endDate,
        "locationName": '',
        "locationCoordinates": location,
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
