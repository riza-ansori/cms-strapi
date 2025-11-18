import { useEffect, useRef } from "react";
import "pannellum/build/pannellum.css";
import "pannellum/build/pannellum.js";

function PanoViewer({ image, hotspots = [] }) {
    const panoRef = useRef(null);
    const viewerRef = useRef(null);

    useEffect(() => {
        if (!panoRef.current) return;

        if (viewerRef.current) {
            viewerRef.current.destroy();
        }

        viewerRef.current = window.pannellum.viewer(panoRef.current, {
            type: "equirectangular",
            panorama: image,
            autoLoad: true,
        });

        const viewer = viewerRef.current;

        // 🔥 Pastikan hotspot ditambahkan HANYA setelah scene selesai dibuat
        viewer.on("scenechange", () => {
            viewer.on("load", () => {
                if (Array.isArray(hotspots)) {
                    hotspots.forEach((h) => {
                        viewer.addHotSpot({
                            pitch: h.pitch,
                            yaw: h.yaw,
                            type: h.type || "info",
                            text: h.text || "",
                            cssClass: "custom-hotspot"
                        });
                    });
                }
            });
        });

        return () => viewer?.destroy();
    }, [image, hotspots]);

    return (
        <div
            ref={panoRef}
            style={{ width: "800px", height: "400px", background: "#000" }}
        />
    );
}

export default PanoViewer;
