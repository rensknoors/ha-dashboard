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
      lowBatteryDevices.forEach((device) => {
        toast(
          `Low battery: ${device.attributes.friendly_name}: ${device.state}${device.attributes.unit_of_measurement}`,
          {
            position: 'bottom-left',
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            progress: undefined,
            theme: 'dark',
          }
        );
      });
    }
  }, [devices]);

  return null;
};

export default LowBatteryNotification;
