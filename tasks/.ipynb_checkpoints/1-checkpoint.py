def mapDict(d, mapF):
    result = {}
    for key in d:
        mapped = mapF(key, d[key])
        if mapped != None:
            result[key] = mapped
    return result


withPath = mapDict(houseClosestObj, lambda house, obj: {
                   "target": obj, "path": houseObjPaths[house][obj]})

with open("houseClosestObj.json", "w") as fp:
    json.dump(withPath, fp)
