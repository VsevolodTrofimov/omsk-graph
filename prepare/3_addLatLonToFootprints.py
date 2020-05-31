import json
import geopandas as gpd
import osmnx
import shapely.wkt

print('reading previous stage results')
with open('tmp/filtered/apartments.json', encoding='utf-8') as f:
    apartments=json.load(f)

with open('tmp/filtered/infra.json', encoding='utf-8') as f:
    infra=json.load(f)

nodes = gpd.read_file('data/tmp_city/nodes/nodes.shp')
edges = gpd.read_file('data/tmp_city/edges/edges.shp')

both = apartments + infra

print('Simplifying geometry')
for house in both:
    if type(house['geometry']) == str:
        house['geometry'] = shapely.wkt.loads(house['geometry'])

houses = gpd.GeoDataFrame(both, crs='epsg:3857')
houses['geometry'] = houses['geometry'].centroid
houses['lon'] = houses['geometry'].apply(lambda p: p.x)
houses['lat'] = houses['geometry'].apply(lambda p: p.y)

nodes['lon'] = nodes['geometry'].apply(lambda p: p.x)
nodes['lat'] = nodes['geometry'].apply(lambda p: p.y)

print('saving')
houses.to_csv('tmp/houses.csv')
nodes.to_csv('tmp/nodes.csv')
print('done')