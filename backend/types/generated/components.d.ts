import type { Schema, Struct } from '@strapi/strapi';

export interface FooterNavigationLink extends Struct.ComponentSchema {
  collectionName: 'components_footer_navigation-links';
  info: {
    displayName: 'Navigation-link';
  };
  attributes: {};
}

export interface FooterSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_footer_social-links';
  info: {
    displayName: 'Social-link';
  };
  attributes: {};
}

export interface StatsStatsComponent extends Struct.ComponentSchema {
  collectionName: 'components_stats_stats-components';
  info: {
    displayName: 'Stats-component';
  };
  attributes: {};
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'footer.navigation-link': FooterNavigationLink;
      'footer.social-link': FooterSocialLink;
      'stats.stats-component': StatsStatsComponent;
    }
  }
}
