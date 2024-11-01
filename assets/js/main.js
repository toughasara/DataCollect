document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".section");
    const boutonsSuivant = document.querySelectorAll("button[onclick^='nextSection']");
    const boutonEnvoyer = document.querySelector("button[type='submit']");
    const nomInput = document.getElementById('name');
    const prenomInput = document.getElementById('prename');
    const ageInput = document.getElementById('age');
    const emailInput = document.getElementById('email');
    const telephoneInput = document.getElementById('tele');
    const adresseInput = document.getElementById('adresse');
    const feedbackInput = document.getElementById('feedback');

    afficherSection(1);

    function validerInformationsPersonnelles() {
        return nomInput.value.trim().length > 0 && prenomInput.value.trim().length > 0 && ageInput.value >= 18 && ageInput.value <= 100;
    }

    function validerContactProfessionnel() {
        return emailInput.value.trim().length > 0 && telephoneInput.value.trim().length > 0 && adresseInput.value.trim().length > 0;
    }

    function validerFeedback() {
        return feedbackInput.value.trim().length > 0;
    }

    function basculerEtatBouton(indexSection) {
        if (indexSection === 1) {
            boutonsSuivant[0].disabled = !validerInformationsPersonnelles();
        }
        else if (indexSection === 2) {
            boutonsSuivant[1].disabled = !validerContactProfessionnel();
        }
        else if (indexSection === 3) {
            boutonEnvoyer.disabled = !validerFeedback();
        }
    }

    function afficherSection(indexSection) {
        sections.forEach((section, index) => {
            section.classList.toggle("d-none", index + 1 !== indexSection);
        });
        basculerEtatBouton(indexSection);
    }

    window.nextSection = (indexSection) => {
        if ((indexSection === 2 && validerInformationsPersonnelles()) ||
            (indexSection === 3 && validerContactProfessionnel())) {
            afficherSection(indexSection);
        }
    };

    window.prevSection = (indexSection) => {
        afficherSection(indexSection);
    };

    window.submitForm = (event) => {
        event.preventDefault();
        if (validerFeedback()) {
            const recapitulatif = `
                Nom: ${nomInput.value}
                Prenom: ${prenomInput.value}
                Age: ${ageInput.value}
                Email: ${emailInput.value}
                Téléphone: ${telephoneInput.value}
                Adresse: ${adresseInput.value}
                Commentaires: ${feedbackInput.value}
            `;
            alert("Récapitulatif des informations:\n" + recapitulatif);
            document.getElementById("formulaire").reset();
            afficherSection(1);
        }
        else {
            alert("Veuillez compléter tous les champs requis.");
        }
    };

    nomInput.addEventListener('input', () => basculerEtatBouton(1));
    prenomInput.addEventListener('input', () => basculerEtatBouton(1));
    ageInput.addEventListener('input', () => basculerEtatBouton(1));
    emailInput.addEventListener('input', () => basculerEtatBouton(2));
    telephoneInput.addEventListener('input', () => basculerEtatBouton(2));
    adresseInput.addEventListener('input', () => basculerEtatBouton(2));
    feedbackInput.addEventListener('input', () => basculerEtatBouton(3));
});