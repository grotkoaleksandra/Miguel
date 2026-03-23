export interface Dictionary {
  metadata: {
    title: string;
    description: string;
  };
  nav: {
    home: string;
    work: string;
    about: string;
    contact: string;
    letsTalk: string;
    signIn: string;
    intranet: string;
  };
  home: {
    hero: {
      line1: string;
      line2: string;
      line3: string;
    };
    projects: {
      title: string;
      viewAll: string;
      list: {
        title: string;
        category: string;
        description: string;
        image: string;
        status: string;
      }[];
    };
    services: {
      title: string;
      list: {
        title: string;
        description: string;
      }[];
    };
    cta: {
      title: string;
      subtitle: string;
      button: string;
    };
  };
  about: {
    title: string;
    description: string;
    history: {
      title: string;
      content: string;
    };
  };
  contact: {
    title: string;
    description: string;
    form: {
      name: string;
      email: string;
      message: string;
      submit: string;
    };
  };
  footer: {
    rights: string;
    language: string;
    tagline: string;
  };
}
