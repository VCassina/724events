import { fireEvent, render, screen, waitFor } from "@testing-library/react"; // fireEvent peut déclancher des événements, render utilise un compsant et screen accède naturellement aux éléments à l'écran.
import Home from "./index"; // On vient comparer à l'original dans le dossier.

describe("When Form is created", () => {  // Premier describe, une sorte de "function" pour les tests qui donnera un contexte en cas d'erreur.
  it("a list of fields card is displayed", async () => {  // Premier teste.
    render(<Home />); // Dans le composant Home :
    await screen.findByText("Email"); // Await parce qu'on cherche à tester un composant avant de passer au suivant, c'est la logique du test.
    await screen.findByText("Nom"); // Ici, on cherche à trouvé les données indiquées.
    await screen.findByText("Prénom"); // Elles y sont donc tout va bien.
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent( // On déclanche un evenement particulier (comme indiqué dans la description).
        await screen.findByText("Envoyer"), // Est-ce qu'on trouve "Envoyer".
        new MouseEvent("click", { // Si oui, on clique sur cet événement.
          cancelable: false,
          bubbles: true,
        })
      );
      await screen.findByText("En cours"); 
      await waitFor(() => screen.findByText("Message envoyé !"), { timeout: 6500 }); 
      // Problème donc ici ! L'élément sur l'écran "message envoyé !" n'est pas trouvé... Pourtant je le vois.
      // Peut-être qu'il faut, lui demander d'attendre !! Car on attend une réponse de l'API.
      
      /* EN EFFET ! Ajout d'un waitFor, et ça fonctionne ! */
    });
  });

});


// describe("When a page is created", () => {
//   it("a list of events is displayed", () => {
//     // to implement
//   })
//   it("a list a people is displayed", () => {
//     // to implement
//   })
//   it("a footer is displayed", () => {
//     // to implement
//   })
//   it("an event card, with the last event, is displayed", () => {
//     // to implement
//   })
// });
