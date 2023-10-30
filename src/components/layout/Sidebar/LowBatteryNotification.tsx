import { useLowDevices } from '@hakit/core';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LowBatteryNotification = () => {
  const devices = useLowDevices();

  useEffect(() => {
    const lowBatteryDevices = devices.filter(
      (device) =>
        parseInt(device.state, 10) <= 20 &&
        device.attributes.device_class === 'battery'
    );

    if (lowBatteryDevices.length > 0) {
      const message = lowBatteryDevices
        .map(
          (device) =>
            `${device.attributes.friendly_name}: ${device.state}${device.attributes.unit_of_measurement}}`
        )
        .join(', ');

      toast.warn(`Low battery on devices: ${message}`);
    }
  }, [devices]);

  return null;
};

export default LowBatteryNotification;
