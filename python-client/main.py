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
                metadata[metadatadate.day][metadatadate.hour][metadatadate.minute] = {""}
                pprint.pprint(metadatadate)
    '''
    os.chdir(folder)

    for file in glob.glob("*.wav"):
        ts = re.search(r'(\d{8})_(\d{6})', file, re.IGNORECASE)
        timezone = pytz.timezone('Europe/Brussels')
        date = timezone.localize(datetime.datetime.strptime(
            "{} {}".format(ts.group(1), ts.group(2)), '%Y%m%d %H%M%S'))
        wav = soundfile.SoundFile(file)
        duration = len(wav) / wav.samplerate

        payload = {
            "filename": file,
            "time": date.isoformat(),
            "duration": duration
        }

        pprint.pprint(payload)


if __name__ == "__main__":
    main()
