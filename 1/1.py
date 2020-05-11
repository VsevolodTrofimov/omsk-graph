import osmnx as ox
import networkx as nx
import json

# Load preprocessed data
with open('../getBuildings/filtered/apartments.json', encoding='utf-8') as f:
    apartments=json.load(f)

with open('../getBuildings/filtered/infra.json', encoding='utf-8') as f:
    infra=json.load(f)

G = ox.save_load.load_graphml('omsk.graphml')

# do pathfinding
route = nx.shortest_path(G, apartments[0]['nodes'][0], infra[0]['nodes'][0])
ox.plot_graph_route(G, route)

ox.plot_graph(G)