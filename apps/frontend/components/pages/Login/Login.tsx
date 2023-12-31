import Head from 'next/head';
import { useRouter } from 'next/router';
import { NextPage } from 'next/types';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { Input, PasswordInput } from 'components/atoms';
import { AuthContext } from 'components/contexts/auth/AutoContext';
import { ContentBoxLayout } from 'components/layouts/ContentBoxLayout';
import { MainLayout } from 'components/layouts/MainLayout';
import { Pages } from 'constant';
import { login, LoginData } from 'services/api/auth/login';

import style from './Login.module.css';

export const Login: NextPage = () => {
  const intl = useIntl();
  const router = useRouter();
  const { setIsAuthenticated } = useContext(AuthContext);

  const { register, handleSubmit } = useForm<LoginData>();
  const onSubmit = (data: LoginData) => {
    return login(data)
      .then(() => {
        setIsAuthenticated(true);

        return router.push(Pages.Home);
      })
      .catch((e: Response) => {
        console.log(e);
      });
  };

  return (
    <MainLayout>
      <Head>
        <meta name="description" content="login" />
        <title>Login</title>
      </Head>
      <ContentBoxLayout>
        <div className={style.container}>
          <h2 className={style.title}>
            <FormattedMessage id="login.title" />
          </h2>
          <form
            className={style.form}
            method="post"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <Input
                id="login.email"
                type="email"
                autoComplete="email"
                label={intl.formatMessage({
                  id: 'login.email.label',
                })}
                placeholder={intl.formatMessage({
                  id: 'login.email.placeholder',
                })}
                {...register('email', {
                  required: intl.formatMessage({
                    id: 'login.email.error.required',
                  }),
                  pattern: {
                    value: /^\S+@\S+\.\S+$/, // basic email regex
                    message: intl.formatMessage({
                      id: 'login.email.error.invalid',
                    }),
                  },
                })}
              />
            </div>
            <div>
              <PasswordInput
                id="login.password"
                autoComplete="current-password"
                label={intl.formatMessage({
                  id: 'login.password.label',
                })}
                placeholder={intl.formatMessage({
                  id: 'login.password.placeholder',
                })}
                {...register('password', {
                  required: intl.formatMessage({
                    id: 'login.password.error.required',
                  }),
                })}
              />
            </div>
            <button type="submit" className={style.submit}>
              <FormattedMessage id="login.submit" />
            </button>
          </form>
        </div>
      </ContentBoxLayout>
    </MainLayout>
  );
};
