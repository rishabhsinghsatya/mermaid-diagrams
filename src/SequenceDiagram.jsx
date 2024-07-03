import React, { useEffect } from "react";
import mermaid from "mermaid";

mermaid.initialize({ startOnLoad: true });

const SequenceDiagram = () => {
  useEffect(() => {
    mermaid.contentLoaded();
  }, []);

  const mermaidCode = `
    sequenceDiagram
        autonumber
        Ram ->> Shyam: Let's plan a trip to Mussorie
        Shyam -->> Ram: Sounds good! When do we leave?
        Ram ->> Shyam: Let's leave tomorrow
        Shyam -->> Ram: Great, I'll start packing
        Ram ->> Car: Start the trip
        Car ->> Mussorie: Drive to Mussorie
        Note over Ram, Shyam: Ram and Shyam enjoy their trip in Mussorie
        alt After 3 days
            Ram ->> Car: Return from Mussorie
            Car ->> Home: Drive back home
        end
        Ram ->> Shyam: That was a great trip!
        Shyam -->> Ram: Yes, we should do this again sometime
  `;

  return <div className="mermaid">{mermaidCode}</div>;
};

export default SequenceDiagram;
