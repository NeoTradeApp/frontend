import {
  Switch,
  FormControlLabel,
  FormGroup,
} from '@mui/material';
import useWakeLock from '@hooks/useWakeLock';

export default function WakeLockSwitch() {
  const { isLocked, requestWakeLock, releaseWakeLock } = useWakeLock();

  const handleChange = (event) => {
    const checked = event.target.checked;
    checked ? requestWakeLock() : releaseWakeLock();
  };

  return (
    <FormGroup>
      <FormControlLabel control={
        <Switch
          checked={isLocked}
          onChange={handleChange}
        />
      } label="Keep Screen ON" />
    </FormGroup>
  );
}
