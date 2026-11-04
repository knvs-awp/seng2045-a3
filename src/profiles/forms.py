from django import forms
from .models import Profile


class ProfileForm(forms.ModelForm):
    avatar = forms.ImageField(
        required=False,
        widget=forms.FileInput(attrs={'class': 'form-control', 'accept': 'image/*'}),
        help_text='Preview only until you click Save.',
    )

    class Meta:
        model = Profile
        fields = ('bio', 'avatar',)
        widgets = {
            'bio': forms.Textarea(attrs={'rows': 4}),
        }
