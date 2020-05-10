const osmread = require("osm-read");

const fse = require("fs-extra");

const hospitals = [];
const fireStations = [];
const shops = [];
const houses = [];

const wtf = [];

const parser = osmread.parse({
  filePath: "omsk.xml",
  node: function (node) {
    if (["doctors", "hospital", "clinic"].includes(node.tags.amenity)) {
      hospitals.push(node);
    } else if (node.tags.amenity === "fire_station") {
      fireStations.push(node);
    } else if (
      "pharmacy" === node.tags.amenity ||
      "was:shop" in node.tags ||
      (node.tags.highway === "bus_stop" &&
        node.tags.name &&
        (node.tags.name.includes("ТК") ||
          node.tags.name.includes("ОБИ") ||
          node.tags.name.includes("Мега")))
    ) {
      shops.push(node);
    } else if (
      Object.keys(node.tags).every(
        (tag) =>
          tag !== "created_by" && tag !== "highway" && tag !== "population:date"
      )
    ) {
      houses.push(node);
    } else {
      if (node.tags.name) {
        console.log(node.tags.name);
      }
      wtf.push(node);
    }
  },
  endDocument: function () {
    fse.ensureDirSync("filtered");
    fse.writeJSONSync("filtered/hospitals.json", hospitals, { spaces: 4 });
    fse.writeJSONSync("filtered/fireStations.json", fireStations, {
      spaces: 4,
    });
    fse.writeJSONSync("filtered/shops.json", shops, {
      spaces: 4,
    });
    fse.writeJSONSync("filtered/houses.json", houses, {
      spaces: 4,
    });

    fse.writeJSONSync(
      "filtered/infra.json",
      [...hospitals, ...fireStations, ...shops],
      {
        spaces: 4,
      }
    );

    fse.writeJSONSync("wtf.tmp.json", wtf, {
      spaces: 4,
    });
  },
});
