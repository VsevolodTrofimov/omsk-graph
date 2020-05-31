import osmnx as ox
from pathlib import Path
Path("tmp").mkdir(parents=True, exist_ok=True)

place = {'city': 'Omsk', 'country': 'Russia'}

print('loading', place['city'], place['country'])


print('loading graph...')
G = ox.graph_from_place(place, network_type='drive')
print('saving graph...')
ox.save_graph_shapefile(G, filename='tmp_city', folder=None, encoding='utf-8')
ox.save_graphml(G, 'tmp_city.graphml')


print('loading footprints...')
F = ox.footprints.footprints_from_place(place, footprint_type='building')
print('saving footprints...')
F.to_csv('tmp/out.csv')

print('done')