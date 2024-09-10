import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import './Page.css';
import Products from '../components/Products';
import Recipes from '../components/Recipes';
import Quotes from '../components/Quotes';
import ExploreContainer from '../components/ExploreContainer';

const Page: React.FC = () => {

  const { name } = useParams<{ name: string; }>();
  let title = '';
  let comp = null;
  switch(name) {
    case 'products':
      title = "Products";
      comp = <Products />;
      break;
    case 'recipes':
      title = "Recipes";
      comp = <Recipes />;
      break;
    case 'quotes':
      title = "Quotes";
      comp = <Quotes />;
      break;
    default:
      title = '';
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>
            {title}
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        {title ? comp : <ExploreContainer />}
      </IonContent>
    </IonPage>
  );
};

export default Page;
