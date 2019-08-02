import click
import requests
import glob
import os
import re
import datetime
import pytz


@click.group()
def main():
    pass


@main.command()
@click.argument('folder')
def scan(folder):
    os.chdir(folder)
    for file in glob.glob("*.wav"):
        ts = re.search(r'(\d{8})_(\d{6})', file, re.IGNORECASE)
        timezone = pytz.timezone('Europe/Brussels')
        date = timezone.localize(datetime.datetime.strptime(
            "{} {}".format(ts.group(1), ts.group(2)), '%Y%m%d %H%M%S'))


if __name__ == "__main__":
    main()
