import osmnx as ox
import networkx as nx
import json

# Load preprocessed house nodes
with open('./houseNodes.json', encoding='utf-8') as f:
    houseRawNodes=json.load(f)


form = houseRawNodes[0]['closest']
to = houseRawNodes[10]['closest']

G = ox.load_graphml('omsk.graphml')
route = nx.shortest_path(G, form, to)
ox.plot_graph_route(G, route, edge_linewidth=0.1, node_size=0.2)

plt.savefig('foo.png')