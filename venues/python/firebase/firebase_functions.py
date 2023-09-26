import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import os

# Get the directory of the current script
script_dir = os.path.dirname(os.path.abspath(__file__))

# Construct the full path to the service account key file
service_account_key_path = os.path.join(script_dir, "service-account-key.json")



# Use a service account.
#combis-jobs-etl specific service account key. 
# Generated from firebase console > settings > users and permissions > service accounts


def get_db():
  cred = credentials.Certificate(service_account_key_path)

  # Check if the app is already initialized
  if not firebase_admin._apps:
      app = firebase_admin.initialize_app(cred)
  else:
      app = firebase_admin.get_app()

  return firestore.client()

def write_to_db(data):
  db = get_db()
  doc_ref = db.collection('price_quotes').document(data['timestamp'])
  doc_ref.set(data)

def read_all_from_venues():
    db = get_db()
    venues_ref = db.collection('venues')
    venues_docs = venues_ref.stream()
    venues_data = []

    for venue_doc in venues_docs:
        # Check if the document ID is not "trigger_initial" before adding it to the list
        if venue_doc.id != "trigger_initial":
            venues_data.append(venue_doc.to_dict())

    return venues_data


def toggle_initial_on():
    # Update the 'trigger_initial' field to True
    db = get_db()
    doc_ref = db.collection('venues').document('trigger_initial')
    doc_ref.update({'trigger_initial': True})

    return 'Trigger initial set to True'

def toggle_initial_off():
    # Update the 'trigger_initial' field to False
    db = get_db()
    doc_ref = db.collection('venues').document('trigger_initial')
    doc_ref.update({'trigger_initial': False})

    return 'Trigger initial set to False'

def check_initial():
    db = get_db()
    doc_ref = db.collection('venues').document('trigger_initial')
    doc = doc_ref.get()
    data = doc.to_dict()

    return data['trigger_initial']