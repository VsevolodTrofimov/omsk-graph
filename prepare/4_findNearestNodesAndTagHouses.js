const csv = require("csvtojson");
const fse = require("fs-extra");

const houses = fse.createReadStream("tmp/houses.csv");
const nodes = fse.createReadStream("tmp/nodes.csv");

function distanceBetween(lat1, lon1, lat2, lon2) {
  const rlat1 = (Math.PI * lat1) / 180;
  const rlat2 = (Math.PI * lat2) / 180;
  const theta = lon1 - lon2;
  const rtheta = (Math.PI * theta) / 180;

  let dist =
    Math.sin(rlat1) * Math.sin(rlat2) +
    Math.cos(rlat1) * Math.cos(rlat2) * Math.cos(rtheta);
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;

  return dist;
}

let distance = [];

console.log("starting to match houses with graph nodes");
csv()
  .fromStream(nodes)
  .then(async (nodes) => {
    csv()
      .fromStream(houses)
      .then((houses) => {
        const withClosest = houses
          .map((house, idx) => {
            process.stdout.write(`\r${idx}/${houses.length}`);
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

            distance.push(minD);

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
              osmid: parseInt(house.id),
              geometry: house.geometry,
              distance: minD,
              addr: `${house["addr:street"]}, д. ${house["addr:housenumber"]}`,
              name: house["name"],
              tag,
              toGeometry: closest.geometry,
              closest: parseInt(closest.osmid),
            };
          })
          // filter out houses that are too far away and probably are mislabeled
          .filter((x) => x.distance < 1);

        console.log(`\nsaving ${withClosest.length} places`);
        fse.writeJSONSync("tmp/houseNodes.json", withClosest, { spaces: 2 });
        console.log("done");
      });
  });
