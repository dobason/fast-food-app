'use client';
// Icons
import PersonIcon from '@/lib/utils/assets/svg/person';

// Components
import CustomButton from '@/lib/ui/useable-components/button';
import CustomTextField from '@/lib/ui/useable-components/input-field';
import CustomPasswordTextField from '@/lib/ui/useable-components/password-input-field';
import CustomPhoneTextField from '@/lib/ui/useable-components/phone-input-field';
import CustomDropdownComponent from '@/lib/ui/useable-components/custom-dropdown';

// Interfaces
import { ILoginWithEmailProps } from '@/lib/utils/interfaces';

// Hooks
import { useAuth } from '@/lib/context/auth/auth.context';
import useToast from '@/lib/hooks/useToast';
import { useTranslations } from 'next-intl';
import { useRegister } from '@/lib/api/restful/hooks/useUser';

import { useState } from 'react';

export default function SignUpWithEmail({
  handleChangePanel,
  formData,
  handleFormChange,
}: ILoginWithEmailProps) {
  // Hooks
  const t = useTranslations();
  const { setUser, setIsAuthModalVisible } = useAuth();
  const { showToast } = useToast();
  const { mutate: register, isPending: isLoading } = useRegister();
  const [isValid, setIsValid] = useState(true);

  // Role options
  const roleOptions = [
    { label: 'User', code: 'user', _id: 'role-user' },
    { label: 'Merchant', code: 'merchant', _id: 'role-merchant' },
  ];

  // Validation
  const validatePassword = (password: string) => {
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return strongPasswordRegex.test(password);
  };

  // Handlers
  const handleSubmit = () => {
    console.log({ formData });
    // Required fields validation
    if (!formData.name || !formData.email || !formData.password || !formData.role) {
      showToast({
        type: 'error',
        title: t('create_user_label'),
        message: t('all_fields_are_required_to_be_filled_message'),
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValid(emailRegex.test(formData.email));

    if (!emailRegex.test(formData.email)) {
      showToast({
        type: 'error',
        title: t('create_user_label'),
        message: t('please_enter_valid_email_address_message'),
      });
      return;
    }

    // Password strength validation
    if (!validatePassword(formData.password)) {
      showToast({
        type: 'error',
        title: t('create_user_label'),
        message: t('password_not_strong_enough_message'),
      });
      return;
    }

    console.log({ formData });

    // Register using the useRegister mutation
    register(
      {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: (formData.role || 'user') as 'user' | 'merchant' | 'admin',
        phone: formData.phone,
      },
      {
        onSuccess: (data) => {
          // Update user context with returned user data
          if (data.user) {
            setUser(data.user);
          }

          showToast({
            type: 'success',
            title: t('register_label'),
            message: t('successfully_registered_your_account_message'),
          });

          // Successfully registered, close modal
          handleChangePanel(0);
          setIsAuthModalVisible(false);
        },
        onError: (error: any) => {
          console.error('An error occurred while registering a new user', error);
          showToast({
            type: 'error',
            title: t('register_label'),
            message: error.message || t('an_error_occurred_while_registering_message'),
          });
        },
      }
    );
  };
  return (
    <div className="flex flex-col items-start justify-between w-full h-full dark:bg-gray-900 dark:text-gray-100">
      <PersonIcon lightColor="#000000" darkColor="#FFFFFF" />
      <div className="flex flex-col w-full h-auto self-start left-2 my-2">
        <h3 className="text-3xl font-semibold">{t('lets_get_you_started_label')}</h3>
        {/*replace lets with let's in the translation*/}
        <p>{t('first_lets_create_your_account_message')}</p>
        {/*replace "First" with "First," in the translation*/}
      </div>
      <div className="flex flex-col gap-y-1 my-3 w-full">
        <CustomTextField
          value={formData.name}
          showLabel={false}
          name="name"
          type="text"
          placeholder={t('nameLabel')}
          onChange={(e) => handleFormChange('name', e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-y-1 my-3 w-full">
        <CustomTextField
          value={formData.email}
          showLabel={false}
          name="email"
          type="email"
          placeholder={t('emailLabel')}
          onChange={(e) => handleFormChange('email', e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-y-1 my-3 w-full">
        <CustomDropdownComponent
          name="role"
          placeholder={'Select Role'}
          options={roleOptions}
          selectedItem={roleOptions.find((r) => r.code === formData.role) || null}
          setSelectedItem={(name, value) => handleFormChange(name, value.code || '')}
          showLabel={false}
          filter={false}
        />
      </div>
      {/* Email Validation message */}
      <div className={` ${isValid ? `hidden` : ``} h-[20px]  `}>
        {!isValid && (
          <p className="text-red-500 text-sm">{t('please_enter_valid_email_address_message')}</p>
        )}
      </div>
      <div className="flex flex-col gap-y-1 my-3 w-full">
        <CustomPhoneTextField
          value={formData.phone}
          showLabel={false}
          mask={'999 999 999'}
          name="phone"
          type="text"
          placeholder={t('phone_label')}
          onChange={(val) => handleFormChange('phone', val)}
        />
      </div>
      <div className="flex flex-col gap-y-1 my-3 w-full">
        <CustomPasswordTextField
          value={formData.password}
          showLabel={false}
          name="password"
          placeholder={t('password_label')}
          onChange={(e) => handleFormChange('password', e.target.value)}
        />
      </div>

      <CustomButton
        label={t('continue_label')}
        className={`bg-[#5AC12F] flex items-center justify-center gap-x-4 px-3 rounded-full border border-gray-300 p-3 m-auto w-72`}
        onClick={handleSubmit}
        loading={isLoading}
      />
    </div>
  );
}
