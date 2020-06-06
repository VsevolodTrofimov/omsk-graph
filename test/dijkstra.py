import heapq
from collections import defaultdict
import random
import csv
from tqdm import tqdm


def dijkstra(G, starts, ends):
    INF = 1e15
    counter = 0
    graph = G.adj
    dist = defaultdict(lambda: INF)
    parents = defaultdict(lambda: 'None')
    for start in starts:
        dist[start] = 0
    h = [(0, start) for start in starts]  # heap <- (dist, node)

    while len(h):
        d, v = heapq.heappop(h)
        counter += (v in ends)
        for u in graph[v].keys():
            try:
                length = graph[v][u][0]['length']
            except Exception:
                length = INF
            if dist[v] + length < dist[u]:
                parents[u] = v
                dist[u] = dist[v] + length
                heapq.heappush(h, (dist[u], u,))
        if counter == len(ends):
            break
    return dist, parents


def dijkstraForTests(graph, starts, ends):
    INF = 1e15
    counter = 0
    dist = defaultdict(lambda: INF)
    parents = defaultdict(lambda: 'None')
    for start in starts:
        dist[start] = 0
    h = [(0, start) for start in starts]  # heap <- (dist, node)

    while len(h):
        d, v = heapq.heappop(h)
        counter += (v in ends)
        for u in graph[v].keys():
            try:
                length = graph[v][u][0]['length']
            except Exception:
                length = INF
            if dist[v] + length < dist[u]:
                parents[u] = v
                dist[u] = dist[v] + length
                heapq.heappush(h, (dist[u], u,))
    return dist, parents


def getGraphFromCSV(CSVName):
    graph = {}
    with open(f"{CSVName}.csv", newline='') as csvfile:
        reader = csv.reader(csvfile, delimiter=' ', quotechar='|')
        for i, line in enumerate(reader):
            if i != 0:
                row = line[0].split(',')
                for j, el in enumerate(row):
                    if j != 0:
                        if int(el) != 0:
                            length = int(el)
                            if i - 1 not in graph:
                                graph.update({i - 1: {}})
                            if j - 1 not in graph[i - 1]:
                                graph[i - 1].update({j - 1: {0: {'length': length}}})
                            graph[i - 1][j - 1][0]['length'] = length
    return graph


def writeResultToSCV(dist, CSVName):
    with open(f"{CSVName}.csv", 'w', newline='') as csvfile:
        writer = csv.writer(csvfile, delimiter=' ',
                            quotechar='|', quoting=csv.QUOTE_MINIMAL)
        writer.writerow(['vertex', 'path'])
        for k in sorted(dist.keys()):
            writer.writerow([k, dist[k]])


if __name__ == '__main__':
    exportNames = ['export_test', 'export_test1', 'export_test2', 'export_test3', 'export_test4']
    resultNames = ['result_test', 'result_test1', 'result_test2', 'result_test3', 'result_test4']
    for i in tqdm(range(len(exportNames))):
        graph = getGraphFromCSV(exportNames[i])
        d, p = dijkstraForTests(graph, [0], graph.keys())
        writeResultToSCV(d, resultNames[i])
