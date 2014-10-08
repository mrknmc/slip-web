import dropbox
from dropbox.client import DropboxOAuth2FlowNoRedirect, DropboxClient
from dropbox.datastore import DatastoreManager
from dropbox import rest as dbrest


DROPBOX_APP_KEY = '492mxhrdjmsxqkz'
DROPBOX_APP_SECRET = 'gtx5q6ux3q6hat0'

auth_flow = DropboxOAuth2FlowNoRedirect(DROPBOX_APP_KEY, DROPBOX_APP_SECRET)

authorize_url = auth_flow.start()
print "1. Go to: " + authorize_url
print "2. Click \"Allow\" (you might have to log in first)."
print "3. Copy the authorization code."

auth_code = raw_input("Enter the authorization code here: ").strip()

access_token, user_id = auth_flow.finish(auth_code)

client = DropboxClient(access_token)
manager = DatastoreManager(client)
datastore = manager.open_default_datastore()
tasks_table = datastore.get_table('tasks')
first_task = tasks_table.insert(taskname='Buy milk', completed=False)
datastore.commit()