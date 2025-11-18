// Components
import CustomButton from '@/lib/ui/useable-components/button';
import CustomTextField from '@/lib/ui/useable-components/input-field';

// Interfaces
import { ILoginWithEmailProps } from '@/lib/utils/interfaces';

// Icons
import EmailIcon from '@/public/assets/images/svgs/email';

// Hooks
import { useAuth } from '@/lib/context/auth/auth.context';
import useToast from '@/lib/hooks/useToast';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { FiMail } from 'react-icons/fi';
import { useCheckEmail } from '@/lib/api/restful/hooks/useUser';

//Import Googlr Icons from react-icons colored

export default function LoginWithEmail({
  handleChangePanel,
  formData,
  handleFormChange,
}: ILoginWithEmailProps) {
  // Hooks
  const t = useTranslations();
  const { setUser } = useAuth();
  const { showToast } = useToast();

  // Inside component
  const [isValid, setIsValid] = useState(true);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Use the mutation hook for checking email
  const { mutate: checkEmail, isPending: isLoading } = useCheckEmail();

  const handleChange = (email: string) => {
    handleFormChange('email', email);
    setUser((prev) => ({ ...prev, email }));

    // Real-time email validation
    setIsValid(emailRegex.test(email));
  };
  // Handlers
  const handleSubmit = () => {
    const email = formData?.email ?? '';
    const valid = emailRegex.test(email);
    setIsValid(valid);

    if (!email || !valid) {
      return showToast({
        type: 'error',
        title: t('error'),
        message: t('please_enter_valid_email_address_message'),
      });
    }

    // Check email using mutation
    checkEmail(email, {
      onSuccess: (data) => {
        // Check if email exists using the new API
        if (data.exists) {
          // Email exists - go to password
          showToast({
            type: 'success',
            title: t('Login'),
            message: t('Got_your_account_please_enter_your_password'),
          });
          handleChangePanel(7); // go to password
        } else {
          // Email doesn't exist - go to registration
          handleChangePanel(2); // go to registration
        }
      },
      onError: (error) => {
        showToast({
          type: 'error',
          title: t('error'),
          message: error.message || 'Failed to check email',
        });
      },
    });
  };

  return (
    <div className="flex flex-col items-start justify-start w-full h-full px-4 py-6 md:px-8 dark:bg-gray-900 dark:text-gray-300">
      <EmailIcon lightColor="#000000" darkColor="#FFFFFF" />

      <div className="flex flex-col w-full mt-4">
        <h3 className="text-xl md:text-2xl font-semibold dark:text-white">
          {t('whats_your_email_label')}?
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          {t('well_check_if_you_have_an_account_message')}
        </p>
      </div>

      <div className="flex flex-col gap-y-2 mt-6 w-full">
        {/* Email Input Field with Icon */}
        <div className="relative w-full">
          <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          <CustomTextField
            value={formData?.email}
            showLabel={false}
            name="email"
            type="text"
            placeholder="example@domain.com"
            onChange={(e) => handleChange(e.target.value)}
            className={`pl-10 w-full py-2 px-3 rounded-md border ${
              isValid ? 'border-gray-300' : 'border-red-500'
            } focus:outline-none focus:ring-2 focus:ring-[#5AC12F] dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300`}
          />
        </div>

        {/* Validation message */}
        <div className="h-[20px]">
          {!isValid && (
            <p className="text-red-500 text-sm">{t('please_enter_valid_email_address_message')}</p>
          )}
        </div>
      </div>

      {/* Submit Email */}
      <CustomButton
        label={t('Continue_with_mail')}
        loading={isLoading}
        onClick={handleSubmit}
        className={`bg-[#5AC12F] flex items-center justify-center gap-x-4 px-3 rounded-full border border-gray-300 p-3 mt-6 w-full md:w-72 self-center`}
      />
    </div>
  );
}
