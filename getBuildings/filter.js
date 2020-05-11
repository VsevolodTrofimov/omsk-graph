const csv = require("csvtojson");
const fse = require("fs-extra");

const readStream = fse.createReadStream("out.csv");

const hospitals = [];
const fireStations = [];
const shops = [];
const apartments = [];

const mapObject = (obj, mapper) => {
  const mapped = {};

  Object.keys(obj).forEach((key) => {
    mapped[key] = mapper(obj[key], key, obj);
  });

  return mapped;
};

csv()
  .fromStream(readStream)
  .subscribe(
    async (json) => {
      const house = {
        ...mapObject(json, (val) => val || undefined),
        id: json.field1,
        field1: undefined,
        nodes: json.nodes ? JSON.parse(json.nodes) : [],
      };

      if (house.building === "apartments") {
        apartments.push(house);
      }

      if (["doctors", "hospital", "clinic"].includes(house.amenity)) {
        hospitals.push(house);
      }

      if (house.amenity === "fire_station") {
        fireStations.push(house);
      }

      if (house.shop) {
        shops.push(house);
      }
    },
    console.error,
    () => {
      const outDir = __dirname + "/filtered";
      fse.ensureDirSync(outDir);
      fse.writeJSONSync(`${outDir}/hospitals.json`, hospitals, {
        spaces: 4,
      });
      fse.writeJSONSync(`${outDir}/fireStations.json`, fireStations, {
        spaces: 4,
      });
      fse.writeJSONSync(`${outDir}/shops.json`, shops, {
        spaces: 4,
      });
      fse.writeJSONSync(`${outDir}/apartments.json`, apartments, {
        spaces: 4,
      });
      fse.writeJSONSync(
        `${outDir}/infra.json`,
        [...hospitals, ...fireStations, ...apartments],
        {
          spaces: 4,
        }
      );
    }
  );
