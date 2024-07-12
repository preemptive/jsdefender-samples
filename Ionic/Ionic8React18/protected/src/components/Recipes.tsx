import React, { useEffect, useState } from "react";
import { getHTTPRequestHandler } from "../utils/helper";
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react';
import { IonAccordion, IonAccordionGroup, IonItem, IonLabel } from '@ionic/react';


const Recipes: React.FC = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getHTTPRequestHandler('recipes', setRecipes, setLoading);
    }, []);

    return (
        <div>
            {
                recipes.map((item: any, i: any) => {
                    return (
                        <div>
                            <IonAccordionGroup>
                                <div className='flexClass upper'>
                                    <div>
                                        <img alt={ item.title } src = { item.image } width = "200" height = "200" style={{ borderRadius: '6px'}} />
                                    </div>
                                    <div>
                                        <p style={{ fontSize: '24px' }}> <strong>{ item.name }</strong></p>
                                        <ul>
                                            <li> Cuisine: { item.cuisine } </li>
                                            <li> Servings: { item.servings } </li>
                                            <li> Calories Per Serving: { item.caloriesPerServing } </li>
                                            <li> Prep Time(minutes): { item.prepTimeMinutes } </li>
                                        </ul>
                                       
                                    </div>
                                </div>
                                <div>
                                    <IonAccordion value={item.id}>
                                        <IonItem slot="header" color="light">
                                            <IonLabel>Ingredients & Instructions</IonLabel>
                                        </IonItem>
                                        <div className="ion-padding flexClass lower" slot="content">
                                        <div>
                                        <h2>Ingredients</h2>
                                        <ol>
                                            {
                                                item.ingredients.map((ing: string) => {
                                                    return (
                                                        <li>{ ing } </li>
                                                    )
                                                })
                                            }
                                        </ol>
                                    </div>
                                    <div>
                                        <h2>Instructions</h2>
                                        <ol>
                                            {
                                                item.instructions.map((ins: string) => {
                                                    return (
                                                        <li>{ ins } </li>
                                                    )
                                                })
                                            }
                                        </ol>
                                    </div>
                                        </div>
                                    </IonAccordion>
                                </div>
                                <hr style={{ backgroundColor: '#fff' }}/>
                            </IonAccordionGroup>
                        </div>)})
            }
            {loading ? (
                <div>
                    <div className="loader"></div>
                    <div id="overlay"></div>
                </div>
              ) : null}
        </div>
    );
}

export default Recipes;





