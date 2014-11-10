import time
import random

DIODE_COUNT = 24


def days_to_secs(days):
    return days * 60 * 60 * 24


def main(days=7, freq=3600):

    template = """{{
    "windSpeed": {wind_speed},
    "lightIntensities": {light_intensities},
    "timestamp": {timestamp},
    "windDirection": 2
}},"""

    timestamp = time.time() - days_to_secs(days + 1)

    # for x days
    for i in xrange(days_to_secs(days) / freq):
        # every y seconds
        timestamp = timestamp + freq
        d = {
            'wind_speed': random.gauss(40, 3),
            'light_intensities': [int(random.gauss(60, 20)) for i in xrange(DIODE_COUNT)],
            'timestamp': timestamp,
        }

        print(template.format(**d))


if __name__ == '__main__':
    main()
