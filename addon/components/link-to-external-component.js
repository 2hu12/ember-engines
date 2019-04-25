import LinkComponent from '@ember/routing/link-component';
import { getOwner } from '@ember/application';
import { set, get } from '@ember/object';
import { FEATURES } from '@ember/canary-features';

export default LinkComponent.extend({
  didReceiveAttrs() {
    this._super(...arguments);

    const owner = getOwner(this);

    if (owner.mountPoint) {
      const routePropertyName = FEATURES.EMBER_GLIMMER_ANGLE_BRACKET_BUILT_INS
        ? 'route'
        : 'targetRouteName';
      const targetRouteName = get(this, routePropertyName);
      const externalRoute = owner._getExternalRoute(targetRouteName);

      set(this, routePropertyName, externalRoute);
    }
  },
});
