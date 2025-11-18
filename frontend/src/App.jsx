import { useEffect, useState } from "react";
import { getPanoramas } from "./services/api";
import PanoViewer from "./components/PanoViewer";

function App() {
    const [panos, setPanos] = useState([]);

    useEffect(() => {
        getPanoramas().then((data) => {
            setPanos(data || []);
        });
    }, []);

    return (
        <div>
            <h1>React + Strapi 360 Viewer</h1>

            {panos.map((pano) => {
                // STRUKTUR STRAPI 5
                const imageUrl = "http://localhost:1337" + pano.image.url;

                return (
                    <div key={pano.id} style={{ marginBottom: 30 }}>
                        <h3>{pano.title}</h3>
                        <PanoViewer image={imageUrl} hotspots={pano.hotspots} />
                    </div>
                );
            })}
        </div>
    );
}

export default App;
