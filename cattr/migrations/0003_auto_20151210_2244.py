# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2015-12-11 03:44
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cattr', '0002_auto_20151210_2233'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cat',
            name='description',
            field=models.TextField(),
        ),
    ]
