import { useLowDevices } from '@hakit/core';
import { useEffect, useRef } from 'react';
import { BiSolidBatteryLow } from 'react-icons/bi';
import { toast } from 'react-toastify';

const BatteryIcon = () => <BiSolidBatteryLow color="red" size={24} />;

const useLowBatteryNotification = () => {
  const devices = useLowDevices();
  const prevLowIdsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const currentIds = new Set(devices.map((device) => device.entity_id));

    prevLowIdsRef.current.forEach((id) => {
      if (!currentIds.has(id)) {
        toast.dismiss(id);
      }
    });

    devices.forEach((device) => {
      toast.warning(
        `Low battery: ${device.attributes.friendly_name}: ${device.state}${device.attributes.unit_of_measurement}`,
        {
          toastId: device.entity_id,
          autoClose: false,
          icon: BatteryIcon,
        }
      );
    });

    prevLowIdsRef.current = currentIds;
  }, [devices]);
};

export { useLowBatteryNotification };
