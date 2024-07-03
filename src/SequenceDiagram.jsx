import React, { useEffect } from "react";
import mermaid from "mermaid";

mermaid.initialize({ startOnLoad: true });

const MermaidDiagram = () => {
  useEffect(() => {
    mermaid.contentLoaded();
    generateJson();
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

  const generateJson = () => {
    const lines = mermaidCode.trim().split("\n");
    const actors = new Set();
    const sections = [];
    let order = 0;

    lines.forEach((line) => {
      line = line.trim();
      if (
        line.startsWith("Note") ||
        line === "sequenceDiagram" ||
        line === "autonumber"
      ) {
        return;
      }

      if (line.startsWith("alt")) {
        const condition = {
          type: "condition",
          order: order++,
          options: [],
          childrens: [],
          message: line.replace("alt ", ""),
          from: "",
          id: `condition${order}`,
        };
        sections.push(condition);
        return;
      }

      const arrowIndex = line.indexOf("->>");
      const message = line.substring(line.indexOf(":") + 1).trim();

      if (arrowIndex !== -1) {
        const from = line.substring(0, arrowIndex).trim();
        const to = line.substring(arrowIndex + 3, line.indexOf(":")).trim();
        actors.add(from);
        actors.add(to);

        const step = {
          order: order++,
          from,
          type: "step",
          message,
          to,
          id: `step${order}`,
        };

        sections.push(step);
      }
    });

    const actorList = Array.from(actors).map((actor, index) => ({
      name: actor,
      order: index,
      id: `actor${index}`,
    }));

    const jsonResult = {
      actors: actorList,
      sections,
      subSections: [], // Assuming there are no subSections in the given example
    };

    console.log(jsonResult);
  };

  return <div className="mermaid">{mermaidCode}</div>;
};

export default MermaidDiagram;
