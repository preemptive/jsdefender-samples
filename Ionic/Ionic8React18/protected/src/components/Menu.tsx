import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { pricetagSharp, pricetagsOutline, receiptOutline, receiptSharp, heartOutline, heartSharp } from 'ionicons/icons';
import './Menu.css';

const appPages = [
  {
    title: 'Products',
    url: '/folder/products',
    iosIcon: pricetagsOutline,
    mdIcon: pricetagSharp
  },
  {
    title: 'Recipes',
    url: '/folder/recipes',
    iosIcon: receiptOutline,
    mdIcon: receiptSharp
  },
  {
    title: 'Quotes',
    url: '/folder/quotes',
    iosIcon: heartOutline,
    mdIcon: heartSharp
  },
];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Celestial Systems Inc.</IonListHeader>
          <IonNote>https://celestialsys.com/</IonNote>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon aria-hidden="true" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
