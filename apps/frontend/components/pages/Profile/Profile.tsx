import { Input } from 'components/atoms';
import { ContentBoxLayout } from 'components/layouts/ContentBoxLayout';
import { HeaderBarLayout } from 'components/layouts/HeaderBarLayout';
import { useGetMe } from 'services/api/user/useUser';

import style from './Profile.module.css';

export const Profile = (): JSX.Element => {
  const user = useGetMe();

  return (
    <HeaderBarLayout>
      <ContentBoxLayout>
        <div className={style.div}>
          <h2 className={style.title}>Your profile</h2>
          <Input
            id="userEmail"
            type="email"
            label="Email"
            value={user?.email}
            disabled
          />
        </div>
      </ContentBoxLayout>
    </HeaderBarLayout>
  );
};
