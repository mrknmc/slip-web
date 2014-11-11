import time
import json
import random

DIODE_COUNT = 24


def days_to_secs(days):
    return days * 60 * 60 * 24


def main(days=7, freq=3600):

    timestamp = time.time() - days_to_secs(days + 1)

    solars = []
    winds = []

    # for x days
    for i in range(days_to_secs(days) / freq):
        # every y seconds
        timestamp = timestamp + freq

        solars.append({
            'timestamp': timestamp,
            'values': [int(random.gauss(60, 20)) for i in range(DIODE_COUNT)],
        })

        winds.append({
            'timestamp': timestamp,
            'windSpeed': random.gauss(40, 3),
            'windDirection': 2
        })

    print(json.dumps({
        'solar': solars,
        'wind': winds,
        'deviceId': 'Prospeckz_A',
        'xCoord': 55.9465002,
        'yCoord': -3.2031142,
    }))


if __name__ == '__main__':
    main()
