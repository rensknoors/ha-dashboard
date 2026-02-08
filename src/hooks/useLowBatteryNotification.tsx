import { useLowDevices } from '@hakit/core';
import { useEffect } from 'react';
import { BiSolidBatteryLow } from 'react-icons/bi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useLowBatteryNotification = () => {
  const devices = useLowDevices();

  useEffect(() => {
    const lowBatteryDevices = devices.filter(
      (device) =>
        parseInt(device.state, 10) <= 20 &&
        device.attributes.device_class === 'battery'
    );

    if (lowBatteryDevices.length) {
      lowBatteryDevices.forEach((device) => {
        toast.warning(
          `Low battery: ${device.attributes.friendly_name}: ${device.state}${device.attributes.unit_of_measurement}`,
          {
            toastId: device.entity_id,
            autoClose: false,
            icon: () => <BiSolidBatteryLow color="red" size={24} />,
          }
        );
      });
    }
  }, [devices]);
};

export { useLowBatteryNotification };
