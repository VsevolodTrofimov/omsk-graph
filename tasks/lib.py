import osmnx as ox
import networkx as nx

speed = 40  # km/h


def load():
    return ox.save_load.load_graphml('../../prepare/data/city.graphml')


def getTaggedNodes(G):
    allTagged = G.nodes(data="tag")

    allHouses = []
    allInfra = []

    for (key, tag) in allTagged:
        # Check if key is even then add pair to new dictionary
        if tag == "apartments":
            allHouses.append(key)
        if tag == "fire_station":
            allInfra.append(key)
        if tag == "hospital":
            allInfra.append(key)
        if tag == "shop":
            allInfra.append(key)

    return allHouses, allInfra


def route2Path(G, route, speed):
    length = 0  # meters
    time = 0  # minutes

    for i in range(1, len(route)):
        edge = G[route[i - 1]][route[i]][0]
        length += edge['length']

    time = length / (speed / 3.6) / 60

    return {
        "route": route,
        "length": length,
        "time": time
    }


def getFromToPath(G, start, end, speed):
    return route2Path(G, nx.dijkstra_path(G, start, end, "length"), speed)


def getFormSingleToManyPaths(G, start, ends, speed):
    result = {}

    _, routes = nx.single_source_dijkstra(G, start, weight="length")

    for end in ends:
        if end in routes:
            result[end] = route2Path(G, routes[end], speed)

    return result


def skip():
    pass


def getManyToManyPaths(G, starts, ends, speed, cb=skip):
    result = {}

    for start in starts:
        result[start] = getFormSingleToManyPaths(G, start, ends, speed)
        cb()

    return result


def joinPaths(a, b):
    return {
        "route": a['route'] + b['route'],
        "length": a['length'] + b['length'],
        "time": a['time'] + b['time']
    }
