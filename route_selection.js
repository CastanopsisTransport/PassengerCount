let selectedRoute = null;

async function searchRoute() {
  const route = document.getElementById("routeInput").value;

  const res = await fetch(
    `https://data.etabus.gov.hk/v1/transport/kmb/route/${route}`
  );

  const json = await res.json();
  const list = document.getElementById("routeList");
  list.innerHTML = "";

  json.data.forEach(r => {
    const li = document.createElement("li");

    const text = `${r.route} | ${r.orig_tc} → ${r.dest_tc} (${r.orig_en} → ${r.dest_en}) | ${r.bound} | service ${r.service_type}`;

    li.innerHTML = `<button onclick='selectRoute(${JSON.stringify(r)})'>${text}</button>`;

    list.appendChild(li);
  });
}

function selectRoute(routeObj) {
  selectedRoute = routeObj;
  loadStops();
}