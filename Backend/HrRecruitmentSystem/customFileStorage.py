import os
import time
from storages.backends import do_spaces

class CustomSpacesStorage(do_spaces.SpacesStorage):
    def get_available_name(self, name, max_length=None):
        # Get the original file extension
        original_extension = os.path.splitext(name)[1]

        # Generate a new filename using the current timestamp and the original file extension
        new_name = '{}{}'.format(int(time.time()), original_extension)

        return super().get_available_name(new_name, max_length=max_length)