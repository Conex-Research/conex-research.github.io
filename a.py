# -*- coding: utf-8 -*-
"""
Created on Sat Oct  1 16:23:46 2022

@author: Prinzessin
"""



import geopandas as gpd
earthquake = gpd.read_file('LA.geo.json')
print(earthquake.head())
