# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2015-12-11 04:20
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cattr', '0008_auto_20151210_2319'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reservation',
            name='end',
            field=models.DateTimeField(),
        ),
        migrations.AlterField(
            model_name='reservation',
            name='start',
            field=models.DateTimeField(),
        ),
    ]