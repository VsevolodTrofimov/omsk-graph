import json
import geopandas as gpd

# Load preprocessed house
with open('../getBuildings/filtered/apartments.json', encoding='utf-8') as f:
    apartments=json.load(f)

with open('../getBuildings/filtered/infra.json', encoding='utf-8') as f:
    infra=json.load(f)

both = apartments + infra

# for house in both:
#     house['geometry'] = shape(house['geometry'])

houses = gpd.GeoDataFrame(both)

# nodes = gpd.read_file('data/sample/nodes/nodes.shp')
# edges = gpd.read_file('data/sample/edges/edges.shp')


new_nodes, new_edges = connect_poi(houses, nodes, edges, key_col='key', path=None)