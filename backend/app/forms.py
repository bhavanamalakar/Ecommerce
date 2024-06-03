# forms.py

from django import forms

class PreferencesForm(forms.Form):
    dark_mode = forms.BooleanField(label='Dark Mode', required=False)
