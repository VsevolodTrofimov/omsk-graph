import lib


def select(paths, predicate):
    result = []
    for target in paths:
        if predicate(paths[target]):
            result.append(target)
    if len(result) == 0:
        return None
    return result


def mapDict(d, mapF):
    result = {}
    for key in d:
        mapped = mapF(key, d[key])
        if mapped != None:
            result[key] = mapped
    return result


def invert(d):
    result = {}
    for key in d:
        for item in d[key]:
            if not item in result:
                result[item] = []
            result[item].append(key)
    return result


def round2HouseObj(arr):
    result = {}
    if arr == None:
        return result
    for pair in arr:
        house, obj = map(int, pair.split('-'))
        if not house in result:
            result[house] = []
        result[house].append(obj)
    return result


def solve_11(G, houses, infra, maxTime=0, maxDistance=0, speed=40):
    # ----
    # 1.1a Find closest houses and objects
    # ----
    houseObjPaths = lib.getManyToManyPaths(
        G, houses, infra, speed)
    objHousePaths = lib.getManyToManyPaths(
        G, infra, houses, speed)
    roundPaths = {}

    # Make round paths form them
    for house in houses:
        for obj in infra:
            if(obj in houseObjPaths[house]) and (house in objHousePaths[obj]):
                roundPaths[f"{house}-{obj}"] = lib.joinPaths(
                    houseObjPaths[house][obj], objHousePaths[obj][house])
                roundPaths[f"{obj}-{house}"] = lib.joinPaths(
                    objHousePaths[obj][house], houseObjPaths[house][obj])

    # for each house find the closest object
    houseClosestObj = {}
    for house in houseObjPaths:
        shortestPath = {"length": float('inf')}
        closestObj = None
        for obj in houseObjPaths[house]:
            if(houseObjPaths[house][obj]['length'] < shortestPath['length']):
                shortestPath = houseObjPaths[house][obj]
                closestObj = obj

        houseClosestObj[house] = closestObj

    # for each object find the closest house
    objClosestHouse = {}
    for obj in infra:
        shortestPath = {"length": float('inf')}
        closestHouse = None
        for house in objHousePaths[obj]:
            if(objHousePaths[obj][house]['length'] < shortestPath['length']):
                shortestPath = objHousePaths[obj][house]
                closestHouse = house

        objClosestHouse[obj] = closestHouse

    # find shortest round paths
    shortestHouseObjRounds = {}
    for house in houseObjPaths:
        shortestPath = {"length": float('inf')}
        closestObj = None
        for obj in houseObjPaths[house]:
            if (f'{house}-{obj}' in roundPaths) and (roundPaths[f'{house}-{obj}']['length'] < shortestPath['length']):
                shortestPath = roundPaths[f'{house}-{obj}']
                closestObj = obj

        shortestHouseObjRounds[house] = closestObj

    # ----
    # 1.1b Find houses and objects in range
    # ----
    def byTime(path):
        return path['time'] <= maxTime

    def byDist(path):
        return path['length'] <= maxDistance

    houseObjByTime = mapDict(houseObjPaths, lambda _,
                             paths: select(paths, byTime))
    houseObjByDist = mapDict(houseObjPaths, lambda _,
                             paths: select(paths, byDist))

    houseObjBackByTime = invert(
        mapDict(objHousePaths, lambda _, paths: select(paths, byTime)))
    houseObjBackByDist = invert(
        mapDict(objHousePaths, lambda _, paths: select(paths, byDist)))

    houseObjRoundByTime = round2HouseObj(select(roundPaths, byTime))
    houseObjRoundByDist = round2HouseObj(select(roundPaths, byDist))

    paths = {}
    for house in houseObjPaths:
        paths[str(house)] = houseObjPaths[house]
    for obj in objHousePaths:
        paths[str(obj)] = objHousePaths[obj]
    for pair in roundPaths:
        paths[pair] = roundPaths[pair]

    output = {
        'paths': paths,
        'closest': {
            'to': houseClosestObj,
            'form': objClosestHouse,
            'round': shortestHouseObjRounds
        },
        'inRange': {
            'to': {
                'byTime': houseObjByTime,
                'byDist': houseObjByDist
            },
            'from': {
                'byTime': houseObjBackByTime,
                'byDist': houseObjBackByDist
            },
            'round': {
                'byTime': houseObjRoundByTime,
                'byDist': houseObjRoundByDist
            }
        }
    }

    return output
