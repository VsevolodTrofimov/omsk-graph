import lib


def solve_12(G, houses, infra, speed=40):
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

    # ----
    # 1.2 MINMAX
    # ----
    objMax = {}
    for obj in infra:
        toMax = -1
        toHouse = None

        fromMax = -1
        fromHouse = None

        roundMax = -1
        roundHouse = None

        for house in houses:
            if houseObjPaths[house][obj]['length'] > toMax:
                toMax = houseObjPaths[house][obj]['length']
                toHouse = house

            if objHousePaths[obj][house]['length'] > fromMax:
                fromMax = houseObjPaths[house][obj]['length']
                fromHouse = house

            if roundPaths[f"{house}-{obj}"]['length'] > roundMax:
                roundMax = roundPaths[f"{house}-{obj}"]['length']
                roundHouse = house

        objMax[obj] = {
            "to": {
                "distance": toMax,
                "house": toHouse
            },
            "from": {
                "distance": fromMax,
                "house": fromHouse
            },
            "round": {
                "distance": roundMax,
                "house": roundHouse
            }
        }

    def findMinPath(kind):
        distance = float('inf')
        minObj = None
        for obj in objMax:
            if objMax[obj][kind]["distance"] < distance:
                distance = objMax[obj][kind]["distance"]
                minObj = obj
        return distance, minObj

    objMinMaxTo = findMinPath('to')
    objMinMaxFrom = findMinPath('from')
    objMinMaxRound = findMinPath('round')

    paths = {}
    for house in houseObjPaths:
        paths[str(house)] = houseObjPaths[house]
    for obj in objHousePaths:
        paths[str(obj)] = objHousePaths[obj]
    for pair in roundPaths:
        paths[pair] = roundPaths[pair]

    output = {
        'paths': paths,
        'minmax': {
            'to': objMinMaxTo,
            'from': objMinMaxFrom,
            'round': objMinMaxRound
        }
    }

    return output
