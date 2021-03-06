from sklearn.cluster import AgglomerativeClustering
from scipy.cluster.hierarchy import dendrogram
from matplotlib import pyplot as plt
import math
import numpy as np


def get_clusters(dist_matrix, k: int):
    model = AgglomerativeClustering(linkage='complete', n_clusters=k)
    model.fit(dist_matrix)
    return model


def get_distance(lat1: float, long1: float, lat2: float, long2: float):
    if abs(lat1 - lat2) + abs(long1 - long2) < 1e-6:
        return 0
    else:
        return math.acos(math.sin(lat1) * math.sin(lat2)
                         + math.cos(lat1) * math.cos(lat2) * math.cos(long1 - long2)
                         ) * 6371


def get_centroid(cluster):
    coords = np.mean(cluster, axis=0)
    return np.argmin([get_distance(*coords, lat, long) for lat, long in cluster])


def plot_dendrogram(dist_matrix, houses, **kwargs):
    model = AgglomerativeClustering(distance_threshold=0, linkage='complete', n_clusters=None)
    model.fit(dist_matrix)
    counts = np.zeros(model.children_.shape[0])
    n_samples = len(model.labels_)
    for i, merge in enumerate(model.children_):
        current_count = 0
        for child_idx in merge:
            if child_idx < n_samples:
                current_count += 1
            else:
                current_count += counts[child_idx - n_samples]
        counts[i] = current_count

    linkage_matrix = np.column_stack([model.children_, model.distances_,
                                      counts]).astype(float)

    dendrogram(linkage_matrix, orientation="left", labels=houses, leaf_font_size=6, **kwargs)
    plt.xlabel("Index of point")
    plt.ylabel("Distance")
    #plt.show()
    plt.savefig('dendrogram', dpi=1000)
