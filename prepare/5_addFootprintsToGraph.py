import osmnx as ox
import networkx as nx
import json
import shapely.wkt
from shapely.geometry import LineString

print('reading previous stage results')
with open('tmp/houseNodes.json', encoding='utf-8') as f:
    houseRawNodes=json.load(f)
    
for house in houseRawNodes:
    if type(house['geometry']) == str:
        house['geometry'] = shapely.wkt.loads(house['geometry'])
    if type(house['toGeometry']) == str:
        house['toGeometry'] = shapely.wkt.loads(house['toGeometry'])

G = ox.save_load.load_graphml('tmp_city.graphml')



print('adding edges')
new_edges = []

for house in houseRawNodes:
    new_edges.append({

        "from": house['closest'], 
        "to": house['osmid'], 
        "geometry": LineString([(house['geometry'].x, house['geometry'].y), (house['toGeometry'].x, house['toGeometry'].y)]),

        "key": 0,
        "107413303": 0,
        "name": None,
        "highway": "residential",
        "oneway": False, 
        "length": 0, 
        "highway": "projected_footway",
        "ref": None,
        "maxspeed": None,
        "lanes": None,
        "bridge": None,
        "junction": None,
        "service": None,
        "tunnel": None,
        "access": None,
        "width": None,
    })
    
for edge in new_edges:
    G.add_edge(
        edge["from"], 
        edge["to"], 
        osmid=0, 
        highway=edge["highway"], 
        oneway=edge["oneway"], 
        length=edge["length"], 
        geometry=edge["geometry"]
    )
    # add back edge
    G.add_edge(
        edge["to"], 
        edge["from"],
         osmid=0, 
         highway=edge["highway"], 
         oneway=edge["oneway"], 
         length=edge["length"], 
         geometry=edge["geometry"]
    )



print('adding nodes')
new_nodes = []

for house in houseRawNodes:
    new_nodes.append({
        "osmid": house['osmid'],
        "geometry": house['geometry'],
        "tag": house['tag'],
        "name": house['name'],
        "addr": house['addr'],
        "highway": None,
    })
    
for node in new_nodes:
    G.add_node(
        node["osmid"], 
        y=node["geometry"].y, 
        x=node["geometry"].x, 
        osmid=node["osmid"], 
        tag=node["tag"],
        name=node["name"],
        addr=node["addr"]
    )

print('saving full graph')
ox.save_load.save_graphml(G, 'city.graphml')

fullGraphDict = {}
for node in G.nodes:
    fullGraphDict[node] = G.nodes[node]
with open("../ui/src/graph.json", "w") as fp:
    json.dump(fullGraphDict , fp)
print('done')
