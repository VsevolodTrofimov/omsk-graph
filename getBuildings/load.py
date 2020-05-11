import osmnx
import networkx
import matplotlib.pyplot as plt
import json

omsk = {'city': 'Omsk', 'country': 'Russia'}

# G = osmnx.graph_from_place(omsk, network_type='drive')
F = osmnx.footprints.footprints_from_place(omsk, footprint_type='building')
F.to_csv('out.csv')
# networkx.draw(G)
# plt.savefig("omsk.png")
