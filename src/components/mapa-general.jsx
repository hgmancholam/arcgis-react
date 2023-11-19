/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";
import { loadModules } from "esri-loader";

export default function MapaGeneral() {
  const viewRef = useRef(null);
  const layerRef = useRef(null);
  let webmap;
  let foundLayer;
  let view;

  useEffect(() => {
    const loadMap = async () => {
      loadModules(["esri/WebMap", "esri/views/MapView"], { css: true })
        .then(async ([WebMap, MapView]) => {
          webmap = new WebMap({
            portalItem: {
              id: "a303da876dd846129817e510222725fe",
            },
          });

          view = new MapView({
            container: "mapDiv",
            map: webmap,
            zoom: 5,
            center: [-67.2973, 4.5709],
            constraints: {},
            navigation: {},
          });

          webmap.load().then(() => {
            viewRef.current = view;
          });
        })
        .catch((err) => {
          console.error("Error loading modules: ", err);
        });
    };
    loadMap();
  }, []);

  return (
    <div className="contenedor-mapa">
      <div
        id="mapDiv"
        className="recuadro-mapa"
        style={{ height: "800px", width: "100%" }}
      ></div>
    </div>
  );
}
