import { createContext, useContext, useState, ReactNode } from "react";

export type Lang = "fr" | "en";

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Lang, string>> = {
  // Nav
  "nav.estate": { fr: "Le Domaine", en: "The Estate" },
  "nav.today": { fr: "Aujourd'hui", en: "Today" },
  "nav.tomorrow": { fr: "Demain", en: "Tomorrow" },
  "nav.gallery": { fr: "Galerie", en: "Gallery" },
  "nav.photos": { fr: "Photos", en: "Photos" },
  "nav.renderings": { fr: "Rendus", en: "Renderings" },
  "nav.contact": { fr: "Contact", en: "Contact" },

  // Hero
  "hero.name": { fr: "Domaine de Bellecombe", en: "Domaine de Bellecombe" },
  "hero.subname": { fr: "Haute-Savoie", en: "Haute-Savoie" },
  "hero.tagline": { fr: "Un domaine historique aux portes de Genève", en: "A historic estate at the gates of Geneva" },
  "hero.cta.today": { fr: "Aujourd'hui", en: "Today" },
  "hero.cta.tomorrow": { fr: "Demain", en: "Tomorrow" },

  // Part 1 label
  "part1.label": { fr: "AUJOURD'HUI", en: "TODAY" },

  // Intro
  "intro.text": {
    fr: "Un domaine de 27 hectares aux origines médiévales, niché entre l'Arve et les forêts de Haute-Savoie. Trois bâtiments historiques, un étang, des prairies et les vestiges d'un château du XIIIe siècle — à vingt minutes de Genève.",
    en: "A 27-hectare estate with medieval origins, nestled between the Arve river and the forests of Haute-Savoie. Three historic buildings, a pond, meadows and the remains of a 13th-century castle — twenty minutes from Geneva."
  },
  "intro.eyebrow": { fr: "Le lieu", en: "The place" },

  // Key Facts
  "facts.land": { fr: "hectares", en: "hectares" },
  "facts.mainHouse": { fr: "m² maison principale", en: "m² main house" },
  "facts.buildings": { fr: "bâtiments", en: "buildings" },
  "facts.origins": { fr: "origines", en: "origins" },
  "facts.fromGeneva": { fr: "de Genève", en: "from Geneva" },
  "facts.price": { fr: "Sur demande", en: "On request" },
  "facts.priceLabel": { fr: "prix", en: "price" },

  // Gallery
  "gallery.title": { fr: "Le Domaine", en: "The Estate" },
  "gallery.all": { fr: "Tout", en: "All" },
  "gallery.exterior": { fr: "Extérieur", en: "Exterior" },
  "gallery.interior": { fr: "Intérieur", en: "Interior" },
  "gallery.grounds": { fr: "Parc", en: "Grounds" },

  // Details
  "details.title": { fr: "Le Bien", en: "The Property" },
  "details.description": {
    fr: "Le Domaine de Bellecombe se compose de trois bâtiments implantés au cœur d'un parc de 27,6 hectares : la maison principale, une maison de gardien et une grange.\n\nLe terrain comprend un rivage sur l'Arve, un étang avec pavillons, trois prairies et plus de 20 hectares de forêt. Le site abrite les ruines du Château de Boringe, érigé en 1225 par Pierre de Savoie pour contrôler l'unique pont sur l'Arve entre Genève et Sallanches.\n\nL'ensemble est inscrit au patrimoine remarquable et classé en zone naturelle protégée.",
    en: "The Domaine de Bellecombe comprises three buildings set within a 27.6-hectare park: the main house, a caretaker's house and a barn.\n\nThe grounds include a riverfront along the Arve, a pond with pavilions, three meadows and over 20 hectares of forest. The site holds the ruins of Château de Boringe, built in 1225 by Peter of Savoy to control the only bridge across the Arve between Geneva and Sallanches.\n\nThe entire estate is listed as remarkable heritage and sits within a protected natural zone."
  },
  "details.mainHouse": { fr: "Maison principale : 663 m²", en: "Main house: 663 m²" },
  "details.secondaryHouse": { fr: "Maison de Gardien : 150 m²", en: "Caretaker's house: 150 m²" },
  "details.barn": { fr: "Grange : 156 m²", en: "Barn: 156 m²" },
  "details.land": { fr: "Terrain : 27,6 hectares", en: "Land: 27.6 hectares" },
  "details.forest": { fr: "Forêt : +20 hectares", en: "Forest: +20 hectares" },
  "details.pond": { fr: "Étang avec pavillons", en: "Pond with pavilions" },
  "details.riverfront": { fr: "950 m de Rivage sur l'Arve", en: "950 m of Arve riverfront" },
  "details.ruins": { fr: "Ruines médiévales (XIIIe s.)", en: "Medieval ruins (13th c.)" },
  "details.heritage": { fr: "Patrimoine remarquable", en: "Listed heritage" },
  "details.cellar": { fr: "Glacière et zones souterraines historiques", en: "Ice cellar & historic underground zones" },

  // Location
  "location.title": { fr: "Situation", en: "Location" },
  "location.car": { fr: "Voiture", en: "By car" },
  "location.train": { fr: "Train", en: "Train" },
  "location.reignier": { fr: "Reignier", en: "Reignier" },
  "location.geneva": { fr: "Genève", en: "Geneva" },
  "location.annemasse": { fr: "Annemasse", en: "Annemasse" },
  "location.annecy": { fr: "Annecy", en: "Annecy" },
  "location.chamonix": { fr: "Chamonix", en: "Chamonix" },
  "location.lausanne": { fr: "Lausanne", en: "Lausanne" },
  "location.lyon": { fr: "Lyon", en: "Lyon" },
  "location.paris": { fr: "Paris (TGV)", en: "Paris (TGV)" },
  "location.description": {
    fr: "*Gare de Reignier à 5 min en voiture\nLiaison directe sur Genève en 25 min, Annecy en 45 min via le Léman Express.\n",
    en: "*Reignier station 5 min away by car\nDirect connection to Geneva in 25 min, Annecy in 45 min via the Léman Express.\n"
  },

  // Parallax quote
  "parallax.eyebrow": { fr: "Un lieu rare", en: "A rare place" },
  "parallax.quote": {
    fr: "« Huit siècles d'histoire au bord d'une rivière, à vingt minutes d'une capitale européenne. »",
    en: "“Eight centuries of history on a riverbank, twenty minutes from a European capital.”"
  },
  "parallax.attribution": { fr: "Domaine de Bellecombe · 1225", en: "Domaine de Bellecombe · 1225" },

  // Transition
  "transition.label": { fr: "DEMAIN", en: "TOMORROW" },
  "transition.tagline": { fr: "Et si on allait plus loin…", en: "What if we went further…" },

  // Part 2 label
  "part2.label": { fr: "DEMAIN", en: "TOMORROW" },

  // Project intro
  "project.intro": {
    fr: "Un projet de rénovation pensé pour révéler le potentiel du domaine — dans le respect de son caractère patrimonial. Réhabilitation de la maison principale et des annexes, entre héritage et confort contemporain.",
    en: "A renovation project designed to unlock the estate's full potential — respecting its heritage character. Rehabilitation of the main house and outbuildings, bridging tradition and contemporary comfort."
  },

  // Hand-drawn animation
  "animation.caption": { fr: "Du croquis à la réalité", en: "From sketch to reality" },
  "animation.placeholder": { fr: "Animation à venir", en: "Animation coming soon" },

  // Plans
  "plans.title": { fr: "Les Plans", en: "The Plans" },
  "plans.ground": { fr: "RDC", en: "Ground" },
  "plans.first": { fr: "1er étage", en: "1st Floor" },
  "plans.second": { fr: "2e étage", en: "2nd Floor" },
  "plans.attic": { fr: "Combles", en: "Attic" },

  // Renderings
  "renderings.title": { fr: "La Vision", en: "The Vision" },

  // Before/After
  "beforeafter.title": { fr: "Avant & Après", en: "Before & After" },
  "beforeafter.today": { fr: "Aujourd'hui", en: "Today" },
  "beforeafter.tomorrow": { fr: "Demain", en: "Tomorrow" },

  // Contact
  "contact.title": { fr: "Contact", en: "Contact" },
  "contact.name": { fr: "Nom", en: "Name" },
  "contact.email": { fr: "Email", en: "Email" },
  "contact.phone": { fr: "Téléphone", en: "Phone" },
  "contact.date": { fr: "Date souhaitée", en: "Preferred date" },
  "contact.message": { fr: "Message", en: "Message" },
  "contact.interest": { fr: "Intéressé(e) par :", en: "Interested in:" },
  "contact.interest.property": { fr: "Le domaine", en: "The estate" },
  "contact.interest.project": { fr: "Le projet", en: "The project" },
  "contact.interest.both": { fr: "Les deux", en: "Both" },
  "contact.submit": { fr: "Envoyer", en: "Send" },
  "contact.thanks": { fr: "Merci, nous reviendrons vers vous.", en: "Thank you, we'll be in touch." },
  "contact.gdpr": {
    fr: "Vos données sont traitées conformément au RGPD.",
    en: "Your data is processed in accordance with GDPR."
  },
  "contact.agent": { fr: "Votre interlocuteur", en: "Your Contact" },

  // Footer
  "footer.address": { fr: "528/530 Chemin de Saint-Romain, F-74930 Reignier-Esery, Haute-Savoie", en: "528/530 Chemin de Saint-Romain, F-74930 Reignier-Esery, Haute-Savoie" },
  "footer.legal": {
    fr: "Informations non contractuelles.",
    en: "Non-contractual information."
  },
  "footer.credit": { fr: "Site par", en: "Site by" },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>("fr");

  const t = (key: string): string => {
    return translations[key]?.[lang] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
