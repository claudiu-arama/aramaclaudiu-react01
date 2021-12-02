import { useDispatch, useSelector } from 'react-redux';
import {
  patchUserProfile,
  setCreatureColor,
} from '../../actions/creators/profile';
import { createProfile } from '../../api/users';
import { useProfileColors } from './../../hooks';
import { Button } from './../ui';

export const ProfileForm = () => {
  //destructuring below
  const { mainColor, secondaryColor, eyeColor } = useProfileColors();

  const userId = useSelector(({ auth }) => {
    return auth.user.id;
  });
  const sendColors = useDispatch();

  const onSubmit = (event) => {
    event.preventDefault();

    sendColors(
      patchUserProfile(userId, {
        mainColor,
        secondaryColor,
        eyeColor,
      }),
    );
  };

  const onColorPickerChange = (event) => {
    const element = event.target;
    const targetProperty = element.name;
    const colorValue = element.value;

    sendColors(setCreatureColor(targetProperty, colorValue));
  };
  return (
    <form onSubmit={onSubmit}>
      <div className="mb-4 flex justify-between">
        <label htmlFor="mainColor">Main Color</label>
        <input
          type="color"
          name="mainColor"
          id="mainColor"
          value={mainColor}
          onChange={onColorPickerChange}
        />
      </div>

      <div className="mb-4 flex justify-between">
        <label htmlFor="secondaryColor">Secondary Color</label>
        <input
          type="color"
          name="secondaryColor"
          id="secondaryColor"
          value={secondaryColor}
          onChange={onColorPickerChange}
        />
      </div>
      <div className="mb-4 flex justify-between">
        <label htmlFor="eyeColor">Eye Color</label>

        <input
          type="color"
          name="eyeColor"
          id="eyeColor"
          value={eyeColor}
          onChange={onColorPickerChange}
        />
      </div>

      <div className="text-center">
        <Button type="submit" title="save">
          Save
        </Button>
      </div>
    </form>
  );
};

export default ProfileForm;
