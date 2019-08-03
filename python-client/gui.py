from tkinter import *
from tkinter import ttk
from tkinter import filedialog

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

root = Tk()
root.title("Plecotus")

folder_path = StringVar()

def browse_button():
    filename = filedialog.askdirectory()
    folder_path.set(filename)
    print(filename)

def scan():

    backendurl = "http://batman-backend-hitw.westeurope.azurecontainer.io/records"

    os.chdir(str(folder_path))
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


mainframe = ttk.Frame(root, padding="3 3 12 12")
mainframe.grid(column=0, row=0, sticky=(N, W, E, S))
root.columnconfigure(0, weight=1)
root.rowconfigure(0, weight=1)

ttk.Label(mainframe, text="Selectionner le dossier").grid(column=0, row=0, sticky=W)
ttk.Button(mainframe, text="Ouvrir", command=browse_button).grid(column=1, row=0, sticky=E)

ttk.Label(mainframe, textvariable=folder_path).grid(column=0, row=1, sticky=W)
ttk.Button(mainframe, text="Importer", command=scan).grid(column=1, row=1, sticky=E)

root.mainloop()

