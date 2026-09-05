import { EntityName, useEntity, useHass } from '@hakit/core';

/** Generic on/off control for any `switch.*` entity — the Tesla integration
 * exposes charge/sentry/defrost/seat-heater/steering-wheel-heater this way. */
export const useSwitchEntity = (entity: EntityName) => {
  const state = useEntity(entity);
  const callService = useHass((state) => state.helpers.callService);
  const isOn = state.state === 'on';

  const toggle = () => {
    callService({
      domain: 'switch',
      service: isOn ? 'turn_off' : 'turn_on',
      target: { entity_id: entity },
    });
  };

  return { isOn, toggle, state };
};
