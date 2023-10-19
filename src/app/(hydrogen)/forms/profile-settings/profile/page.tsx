import { routes } from '@/config/routes';
import ProfileSettingsView from '@/app/shared/account-settings/profile-settings';

export default function ProfileSettingsFormPage() {
  return (
    <ProfileSettingsView
      settings={{
        first_name: 'Giselle',
        website: 'www.example.com',
        email: 'zonilysu@mailinator.com',
        role: 'software_engineer',
        description: '<p>Similique cupidatat .</p>',
      }}
    />
  );
}
