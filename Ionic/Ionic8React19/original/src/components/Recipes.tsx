import React, { useEffect, useState } from "react";
import { getHTTPRequestHandler } from "../utils/helper";
import {
  IonAccordion,
  IonAccordionGroup,
  IonItem,
  IonLabel,
} from "@ionic/react";

const Recipes: React.FC = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        await getHTTPRequestHandler("recipes", setRecipes, setLoading);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div>
      {recipes.map((item: any, i: number) => (
        <div key={item?.id ?? i}>
          <IonAccordionGroup>
            <div className="flexClass upper">
              <div>
                <img
                  alt={item?.title ?? "recipe image"}
                  src={item?.image}
                  width="200"
                  height="200"
                  style={{ borderRadius: "6px" }}
                />
              </div>

              <div>
                <p style={{ fontSize: "24px" }}>
                  <strong>{item?.name ?? "Untitled"}</strong>
                </p>
                <ul>
                  <li>Cuisine: {item?.cuisine ?? "N/A"}</li>
                  <li>Servings: {item?.servings ?? "-"}</li>
                  <li>
                    Calories Per Serving: {item?.caloriesPerServing ?? "-"}
                  </li>
                  <li>Prep Time (minutes): {item?.prepTimeMinutes ?? "-"}</li>
                </ul>
              </div>
            </div>

            <div>
              <IonAccordion value={item?.id}>
                <IonItem slot="header" color="light">
                  <IonLabel>Ingredients & Instructions</IonLabel>
                </IonItem>

                <div className="ion-padding flexClass lower" slot="content">
                  <div>
                    <h2>Ingredients</h2>
                    <ol>
                      {item?.ingredients?.map((ing: string, idx: number) => (
                        <li key={`ing-${idx}`}>{ing}</li>
                      ))}
                    </ol>
                  </div>

                  <div>
                    <h2>Instructions</h2>
                    <ol>
                      {item?.instructions?.map((ins: string, idx: number) => (
                        <li key={`ins-${idx}`}>{ins}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              </IonAccordion>
            </div>

            <hr style={{ backgroundColor: "#fff" }} />
          </IonAccordionGroup>
        </div>
      ))}

      {loading && (
        <div>
          <div className="loader"></div>
          <div id="overlay"></div>
        </div>
      )}
    </div>
  );
};

export default Recipes;
