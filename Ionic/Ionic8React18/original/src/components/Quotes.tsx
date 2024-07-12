import React, { useEffect, useState } from "react";
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import { getHTTPRequestHandler } from "../utils/helper";

const Quotes: React.FC = () => {
    const [quotes, setQuotes] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getHTTPRequestHandler('quotes', setQuotes, setLoading);
    }, []);

    return (
        <div>
            {quotes.map((item: any, i: any) => {
                return(
            <IonCard color='light'>
            <IonCardHeader>
              <IonCardTitle>{item.id}</IonCardTitle>
              <IonCardSubtitle>Author: {item.author}</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>{item.quote}</IonCardContent>
          </IonCard>
                );
            })}
            {loading ? (
                <div>
                    <div className="loader"></div>
                    <div id="overlay"></div>
                </div>
              ) : null}
        </div>
      );
};

export default Quotes;