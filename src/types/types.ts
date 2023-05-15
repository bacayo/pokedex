export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  species: {
    name: string;
    url: string;
  };
  abilities: {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }[];
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
  sprites: {
    front_default: string;
    front_shiny: string;
    front_female?: string;
    front_shiny_female?: string;
    back_default: string;
    back_shiny: string;
    back_female?: string;
    back_shiny_female?: string;
    other: {
      dream_world: {
        front_default: string;
        front_female?: string;
      };
      "official-artwork": {
        front_default: string;
      };
    };
    versions: {
      [version: string]: {
        front_default: string;
        front_female?: string;
        front_shiny: string;
        front_shiny_female?: string;
        back_default: string;
        back_female?: string;
        back_shiny: string;
        back_shiny_female?: string;
      };
    };
  };
}

export interface PokemonType {
  name: string;
  url: string;
}

export interface PokemonSpecies {
  id: number;
  name: string;
  order: number;
  gender_rate: number;
  capture_rate: number;
  growth_rate: {
    url: string;
    name: string;
  };
  base_happiness: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  habitat: {
    name: string;
  };
  flavor_text_entries: {
    flavor_text: string;
    language: {
      name: string;
    };
  }[];
  genera: {
    genus: string;
    language: {
      name: string;
    };
  }[];
}
