import { useSelector } from 'react-redux';
import { createProfile } from '../../api/users';
import { Button } from './../ui';

export const ProfileForm = () => {
  //destructuring below
  const { mainColor, secondaryColor, eyeColor } = useSelector(
    ({ profile }) => {
      const { creature } = profile;

      return creature;
    },
  );

  const onSubmit = (event) => {
    event.preventDefault();
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
        />
      </div>

      <div className="mb-4 flex justify-between">
        <label htmlFor="secondaryColor">Secondary Color</label>
        <input
          type="color"
          name="secondaryColor"
          id="secondaryColor"
          value={secondaryColor}
        />
      </div>
      <div className="mb-4 flex justify-between">
        <label htmlFor="eyeColor">Eye Color</label>

        <input
          type="color"
          name="eyeColor"
          id="eyeColor"
          value={eyeColor}
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
