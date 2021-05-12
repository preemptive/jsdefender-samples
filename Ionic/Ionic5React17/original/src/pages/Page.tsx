import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import Planet from '../components/Planet';
import Character from '../components/Character';
import Film from '../components/Film';
import './Page.css';

const Page: React.FC = () => {

  const { name } = useParams<{ name: string; }>();
  let title = '';
  let comp = null;
  switch(name) {
    case 'planet':
      title = "Planets";
      comp = <Planet />;
      break;
    case 'character':
      title = "Characters";
      comp = <Character />;
      break;
    case 'movie':
      title = "Movies & Shows";
      comp = <Film />;
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
        {comp}
      </IonContent>
    </IonPage>
  );
};

export default Page;
