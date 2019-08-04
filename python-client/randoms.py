import datetime
import random
import pprint
import pandas as pd
import numpy as np


def random_dates(start=None, end=None, n=1):
    if start == None and end == None:
        end_dt = datetime.datetime.now()
        start_dt = end_dt - datetime.timedelta(days=random.randint(2, 4))
        start = int(start_dt.timestamp())
        end = int(end_dt.timestamp())
    return pd.to_datetime(np.random.randint(start, end, n), unit='s').tz_localize('Europe/Brussels')
