import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

import { useParams } from 'react-router';
import './Page.css';

import Products from '../components/Products';
import Recipes from '../components/Recipes';
import Quotes from '../components/Quotes';
import ExploreContainer from '../components/ExploreContainer';

const Page: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  const pageMap: Record<string, { title: string; component: JSX.Element }> = {
    products: { title: 'Products', component: <Products /> },
    recipes: { title: 'Recipes', component: <Recipes /> },
    quotes: { title: 'Quotes', component: <Quotes /> },
  };

  const selectedPage = pageMap[name ?? ''];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{selectedPage?.title ?? ''}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{selectedPage?.title ?? name}</IonTitle>
          </IonToolbar>
        </IonHeader>

        {selectedPage?.component ?? <ExploreContainer />}
      </IonContent>
    </IonPage>
  );
};

export default Page;
