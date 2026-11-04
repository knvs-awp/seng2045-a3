"""
WSGI config for posts_proj project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.2/howto/deployment/wsgi/
"""

import os
from pathlib import Path
import sys

# Vercel starts the app from the repository root. Django modules live in src.
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'posts_proj.settings')

application = get_wsgi_application()
