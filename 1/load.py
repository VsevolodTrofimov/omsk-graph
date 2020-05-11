import osmnx as ox
import connectPOI

omsk = {'city': 'Omsk', 'country': 'Russia'}

G = ox.graph_from_place(omsk, network_type='drive')

connect_poi([], G.nodes, G.edges, key_col="")

ox.save_graph_shapefile(G, filename='sample', folder=None, encoding='utf-8')