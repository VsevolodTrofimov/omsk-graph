from collections import defaultdict
import lib
from clustering import *
import numpy as np


def solve_13_14(graph, houses, infra, speed=40):
    infra_len_paths = defaultdict()
    infra_weight_tree = defaultdict()
    for obj in infra:
        routes = lib.getFromSingleToManyPaths(graph, obj, houses, speed)
        length = sum(route['length'] for route in routes.values())
        infra_len_paths[obj] = length
        routes = [route['route'] for route in routes.values()]
        tree = lib.routes_to_tree(graph, routes)
        infra_weight_tree[obj] = tree['weight']
    id_min_weight = min(infra_weight_tree, key=infra_weight_tree.get)
    id_min_length = min(infra_len_paths, key=infra_len_paths.get)
    return {
        '1.3': {
            'id': id_min_length,
            'length': infra_len_paths[id_min_length]
        },
        '1.4': {
            'id': id_min_weight,
            'weight': infra_weight_tree[id_min_weight]
        }
    }


def solve_21(graph, houses, infra, speed=40):
    routes = lib.getFromSingleToManyPaths(graph, infra, houses, speed)
    paths_length = sum(route['length'] for route in routes.values())
    routes = [route['route'] for route in routes.values()]
    tree = lib.routes_to_tree(graph, routes)
    print(f"infra: {infra}, paths len= {paths_length}, tree weight= {tree['weight']}")
    return {
        'id': infra,
        'pathsLengthSum': paths_length,
        'treeLength': tree['weight'],
        'treeEdges': tree['edges']  # set of edges (id1, id2)
    }


def solve_22_24(graph, houses, infra, speed=40):
    # 2.2)
    houses_coords = np.array([(graph.nodes[h]['y'], graph.nodes[h]['x']) for h in houses])
    dist_matrix = np.array([[get_distance(p[0], p[1], pp[0], pp[1]) for pp in houses_coords] for p in houses_coords])


    print(houses_coords, dist_matrix)

    # plot_dendrogram(dist_matrix, truncate_mode='level')
    solution = defaultdict()
    for k in [2, 3, 5]:
        model = get_clusters(dist_matrix, k=k)
        centroids = []
        trees = []
        lengths = []
        for c in range(k):
            # 2.3 a)
            cluster_coords = houses_coords[model.labels_ == c]
            cluster = np.array(houses)[model.labels_ == c]
            centroids.append(cluster[get_centroid(cluster_coords)])
            # 2.3 c,d)
            routes = lib.getFromSingleToManyPaths(graph, centroids[-1], cluster, speed)
            paths_length = sum(route['length'] for route in routes.values())
            routes = [route['route'] for route in routes.values()]
            tree = lib.routes_to_tree(graph, routes)
            trees.append(tree)
            lengths.append(paths_length)

        # 2.3 b)
        routes = lib.getFromSingleToManyPaths(graph, infra, centroids, speed)
        paths_length = sum(route['length'] for route in routes.values())
        routes = [route['route'] for route in routes.values()]
        tree = lib.routes_to_tree(graph, routes)
        solution[k] = {
            'centroidTree': tree,            # 2.3b
            'centroidLength': paths_length,  # 2.3b (suddenly need)
            'clusterTrees': trees,           # 2.3cd
            'clusterLengths': lengths,       # 2.3cd
            'centroids': centroids    # 2.3a
        }
    return solution
