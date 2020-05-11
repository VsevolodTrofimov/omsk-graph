import osmnx as ox
import networkx as nx

G = ox.save_load.load_graphml('omsk.graphml')

# do pathfinding
# route = nx.shortest_path(G, apartments[0]['nodes'][0], infra[0]['nodes'][0])
# ox.plot_graph_route(G, route)

ox.plot_graph(G)