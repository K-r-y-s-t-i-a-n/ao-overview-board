import { Group, Avatar, Flex, Box, Loader } from '@mantine/core';
import { FormEvent, useState } from 'react';
import { Tooltip, Text } from '@mantine/core';
import AppCard from '../../components/core/AppCard';
import CardTitle from '../../components/core/CardTitle';
import { useUserStore } from '../../app/store';

// const uploadImage = async (file: File): Promise<string | null> => {
// try {
// const validImg = await isImageFile(file);

// if (!validImg) {
//   throw new Error('Invalid image file.');
// }

//     const formData = new FormData();
//     formData.append('file', file);

//     const response = await axios.post(
//       '/users/upload-image',
//       formData
//       // {
//       //   onUploadProgress: (progressEvent) => {
//       //     const percentCompleted = Math.round(
//       //       (progressEvent.loaded * 100) / progressEvent.total
//       //     );
//       //     // update progress bar or display message to user
//       //   },
//       // }
//     );
//     console.log(response);
//     return response.data.url;
//   } catch (error) {
//     throw error;
//   }
// };

// interface Props {
//   user: User | null;
// }

const Profile = () => {
  const [uploading, setUploading] = useState(false);
  const user = useUserStore((store) => store.data);

  const handleChangePhoto = async (e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    target.value = ''; // reset input value

    // if (!file) {
    //   return;
    // }

    // setUploading(true);

    // try {
    //   const imageUrl = await uploadImage(file);
    //   if (imageUrl) {
    //     setProfileImg(imageUrl);
    //   }
    // } catch (e: any) {
    //   console.log(e.response.data.message);
    //   if (e.response.data.message) {
    //     Notification({
    //       color: 'red',
    //       message: e.response.data.message,
    //     });
    //   } else {
    //     Notification({
    //       color: 'red',
    //       message: 'Failed to upload photo.',
    //     });
    //   }
    // }

    setUploading(false);
  };

  return (
    <Box sx={{ animation: 'slide-left .3s' }}>
      <CardTitle title="Profile info" />
      <AppCard mb={12}>
        <Group>
          {uploading ? (
            <>
              <Avatar size="xl">
                <Loader />
              </Avatar>
            </>
          ) : (
            <>
              <Tooltip.Floating label="Update Photo">
                <label htmlFor="photo">
                  <Avatar
                    size="xl"
                    // src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
                    // src={profilePhotoBaseUrl + user?.image}
                    // onClick={handleChangePhoto}
                    sx={{ cursor: 'pointer' }}
                  >
                    {user?.first_name.charAt(0) + '' + user?.last_name?.charAt(0)}
                  </Avatar>
                </label>
              </Tooltip.Floating>
            </>
          )}

          <input
            style={{
              width: '0.1px',
              height: '0.1px',
              opacity: 0,
              overflow: 'hidden',
              position: 'absolute',
              zIndex: -1,
            }}
            name="photo"
            id="photo"
            type="file"
            accept="image/*"
            onChange={handleChangePhoto}
            disabled={uploading}
          />

          <Flex direction="column">
            <Text size="md" weight={500}>
              {user?.display_name || ''}
            </Text>

            <Text size="sm" weight={400}>
              {user?.team || ''}
            </Text>
            <Text size="sm" weight={400}>
              {user?.email || ''}
            </Text>
          </Flex>
        </Group>
      </AppCard>
    </Box>
  );
};

export default Profile;
