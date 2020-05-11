const csv = require("csvtojson");
const fse = require("fs-extra");

const houses = fse.createReadStream("houses.csv");
const nodes = fse.createReadStream("nodes.csv");

function distanceBetween(lat1, lon1, lat2, lon2) {
  var rlat1 = (Math.PI * lat1) / 180;
  var rlat2 = (Math.PI * lat2) / 180;
  var rlon1 = (Math.PI * lon1) / 180;
  var rlon2 = (Math.PI * lon2) / 180;
  var theta = lon1 - lon2;
  var rtheta = (Math.PI * theta) / 180;
  var dist =
    Math.sin(rlat1) * Math.sin(rlat2) +
    Math.cos(rlat1) * Math.cos(rlat2) * Math.cos(rtheta);
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;

  return dist;
}
csv()
  .fromStream(nodes)
  .then(async (nodes) => {
    csv()
      .fromStream(houses)
      .then((houses) => {
        const withClosest = houses.map((house, idx) => {
          console.log(idx, "/", houses.length);
          let closest = nodes[0];
          let minD = distanceBetween(
            nodes[0].lat,
            nodes[0].lon,
            house.lat,
            house.lon
          );

          for (const node of nodes) {
            let d = distanceBetween(node.lat, node.lon, house.lat, house.lon);

            if (d < minD) {
              minD = d;
              closest = node;
            }
          }

          let tag = "apartments";

          if (house.building === "apartments") {
            tag = "apartments";
          }

          if (["doctors", "hospital", "clinic"].includes(house.amenity)) {
            tag = "hospital";
          }

          if (house.amenity === "fire_station") {
            tag = "fire_station";
          }

          if (house.shop) {
            tag = "shop";
          }

          return {
            osmid: house.id,
            geometry: house.geometry,
            tag,
            toGeometry: closest.geometry,
            closest: closest.osmid,
          };
        });

        fse.writeJSONSync("houseNodes.json", withClosest, { spaces: 2 });
      });
  });
