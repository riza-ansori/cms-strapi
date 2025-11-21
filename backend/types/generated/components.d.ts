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

export interface SharedNavLink extends Struct.ComponentSchema {
  collectionName: 'components_nav_links';
  info: {
    displayName: 'Navigation Link';
  };
  attributes: {
    label: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface SharedSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_social_links';
  info: {
    displayName: 'Social Link';
  };
  attributes: {
    platform: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface SharedStatItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_stats';
  info: {
    displayName: 'Stat Item';
  };
  attributes: {
    label: Schema.Attribute.String;
    value: Schema.Attribute.String;
  };
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
      'shared.nav-link': SharedNavLink;
      'shared.social-link': SharedSocialLink;
      'shared.stat-item': SharedStatItem;
      'stats.stats-component': StatsStatsComponent;
    }
  }
}
