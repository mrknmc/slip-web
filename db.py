import random
import time

from dropbox.client import DropboxOAuth2FlowNoRedirect, DropboxClient
from dropbox.datastore import DatastoreManager, Datastore

SOLAR_MU = 100
SOLAR_STD_DEV = 20

WIND_MU = 1024
WIND_STD_DEV = 86

DROPBOX_APP_KEY = '492mxhrdjmsxqkz'
DROPBOX_APP_SECRET = 'gtx5q6ux3q6hat0'

auth_flow = DropboxOAuth2FlowNoRedirect(DROPBOX_APP_KEY, DROPBOX_APP_SECRET)

authorize_url = auth_flow.start()
print('1. Go to: {}'.format(authorize_url))
print('2. Click \'Allow\' (you might have to log in first).')
print('3. Copy the authorization code.')

auth_code = raw_input('Enter the authorization code here: ').strip()

access_token, user_id = auth_flow.finish(auth_code)

client = DropboxClient(access_token)
manager = DatastoreManager(client)

# create the datastore
datastore = manager.open_datastore('.2KpSYCh9COM38q_rChYoME5D83LxNgloKAPxDuVMNNQ')

print('Datastore ID: {}'.format(datastore.get_id()))

measurements_table = datastore.get_table('measurements')

# coords = 55.944370, -3.186866
# ts = time.time()

# for i in range(50):
#     measurement = {
#         'deviceId': '0123012038123',
#         'timestamp': ts + 60.0,
#         'lightIntensity': random.normalvariate(SOLAR_MU, SOLAR_STD_DEV),
#         'windDirection': random.choice(range(4)),
#         'windSpeed': random.normalvariate(WIND_MU, WIND_STD_DEV),
#         'xCoord': coords[0],
#         'yCoord': coords[1],
#     }
#     first_task = measurements_table.insert(**measurement)

datastore.commit()
