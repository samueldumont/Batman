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


@click.group()
def main():
    pass


@main.command()
@click.argument('folder')
def scan(folder):
    '''
    metadata = []
      with open("metadata.txt") as metadatafile:
            metadatacsv = csv.reader(metadatafile, delimiter=',')
            next(metadatacsv)
            for row in metadatacsv:
                metadatadate = datetime.datetime.strptime(
                    "{} {}".format(row[0], row[1]), '%Y-%b-%d %H:%M:%S')
                metadata[metadatadate.day][metadatadate.hour][metadatadate.minute] = {
                    ""}
                pprint.pprint(metadatadate)
    '''

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
        "locationCoordinates": {"lat":0.0, "long":0.0},
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

    '''
    for file in glob.glob("*.wav"):
        ts = re.search(r'(\d{8})_(\d{6})', file, re.IGNORECASE)
        timezone = pytz.timezone('Europe/Brussels')
        date = timezone.localize(datetime.datetime.strptime(
            "{} {}".format(ts.group(1), ts.group(2)), '%Y%m%d %H%M%S'))
        wav = soundfile.SoundFile(file)
        duration = len(wav) / wav.samplerate

        payload = {
            "id": str(uuid.uuid4()),
            "filename": file,
            "time": date.isoformat(),
            "duration": duration
        }

        resp = requests.put(backendurl, data=json.dumps(
            payload), headers={"Content-Type": "application/json"})

        print(resp.status_code)
    '''


if __name__ == "__main__":
    main()
